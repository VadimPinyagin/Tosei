import {readFileSync, rmSync} from 'node:fs';
import {readdir, readFile} from 'node:fs/promises';
import { extname } from 'node:path';

//import {styleText} from 'node:util'; // Раскраска вывода в терминал (нативная от Node.js)


import gulp from 'gulp';
import rename from 'gulp-rename';
import plumber from 'gulp-plumber';
import * as dartSass from 'sass';
import gulpSass from 'gulp-sass';
import postcss from 'gulp-postcss';
import postUrl from 'postcss-url';
//import autoprefixer from 'autoprefixer';
import lightningcss from 'postcss-lightningcss';
//import csso from 'postcss-csso';
import {createGulpEsbuild} from 'gulp-esbuild';
import browserslistToEsbuild from 'browserslist-to-esbuild';
import {nunjucksCompile} from 'gulp-nunjucks';
import data from 'gulp-data'; // Для передачи глобальных данных в njk, например, versionNumber
import sharp from 'gulp-sharp-responsive';
import svgo from 'gulp-svgmin';
import {stacksvg} from 'gulp-stacksvg';
import server from 'browser-sync';
import bemlinter from 'gulp-html-bemlinter';

const {src, dest, watch, series, parallel} = gulp;
const sass = gulpSass(dartSass);
const PATH_TO_SOURCE = './source/';
const PATH_TO_DIST = './build/';
const PATH_TO_RAW = './raw/';
const PATHS_TO_STATIC = [
  `${PATH_TO_SOURCE}fonts/**/*.{woff2,woff}`,
  `${PATH_TO_SOURCE}*.ico`,
  `${PATH_TO_SOURCE}*.webmanifest`,
  `${PATH_TO_SOURCE}favicons/**/*.{png,svg}`,
  `${PATH_TO_SOURCE}vendor/**/*`,
  `${PATH_TO_SOURCE}images/**/*`,
  `!${PATH_TO_SOURCE}**/README.md`,
];

let isDevelopment = true;

// Разрешаем делать console log в этом файле ниже этой строки
// eslint-disable no-console

// Кастомный обработчик ошибок для plumber
const plumberOptions = {
  errorHandler(error) {
    console.error(error.toString()); // Выводим полную ошибку
    this.emit('end'); // Не ломаем watch, завершаем текущую задачу
  },
};

// Вспомогательная функция для получения имени файла без расширения
function getFileNameWithoutExt(filename) {
  return filename.replace(/\.[^/.]+$/, '');
}

// Функция для асинхронной загрузки всех глобальных JSON из папки data/global
async function getGlobalData() {
  const globalDataDir = `${PATH_TO_SOURCE}data/global`;
  const combinedData = {};
  try {
    const files = await readdir(globalDataDir);
    for (const file of files) {
      if (extname(file) === '.json') {
        const filePath = `${globalDataDir}/${file}`;
        const content = await readFile(filePath, 'utf8');
        try {
          combinedData[getFileNameWithoutExt(file)] = JSON.parse(content);
        } catch (err) {
          throw new Error(`Ошибка парсинга JSON файла ${file}: ${err.message}`);
        }
      }
    }
  } catch (err) {
    throw new Error(`Ошибка чтения папки с глобальными данными: ${err.message}`);
  }
  return combinedData;
}

// Функция для загрузки JSON конкретной страницы, если он есть
async function getPageData(filePath) {
  // Получаем имя файла без пути и расширения
  const fileName = filePath.split(/[\\/]/).pop(); // работает и на Windows и на Unix
  const pageName = getFileNameWithoutExt(fileName);
  const pageDataPath = `${PATH_TO_SOURCE}data/pages/${pageName}.json`;
  try {
    const content = await readFile(pageDataPath, 'utf8');
    return JSON.parse(content);
  } catch (err) {
    if (err.code === 'ENOENT') {
      // Файл не найден - это нормально, возвращаем пустой объект
      return {};
    }
    throw new Error(`Ошибка чтения или парсинга JSON файла страницы ${pageName}: ${err.message}`);
  }
}

export function processMarkup() {

  const versionNumber = Number(new Date().toISOString().replace(/\D+/g, ''));

  // Страницы лежат в папке pages и имеют расширение njk для корректной подсветки
  // При расширении html, она (подсветка) работать не будет.
  // Base нужен для сокращения путей к шаблонам или их деталям
  return src(`${PATH_TO_SOURCE}pages/*.njk`, { base: `${PATH_TO_SOURCE}layouts/` })
    .pipe(plumber(plumberOptions))
    // .pipe(data(() => ({
    //   versionNumber: versionNumber,
    //   template: 'default.njk',
    //   // другие глобальные переменные
    // })))

    .pipe(data(async (file) => {
      const globalData = await getGlobalData();
      const pageData = await getPageData(file.path);

      return {
        versionNumber,
        template: 'default.njk',
        // другие глобальные переменные
        ...globalData,
        ...pageData,
      };
    }))
    .pipe(nunjucksCompile({
      manageEnv: (env) => {
        env.opts.autoescape = false; // содержимое переменных вставляется в шаблон без экранирования
      }
    }))
    .pipe(rename((filePath) => {
      // Из-за того, что исходные страницы переложили в папку pages.
      // Обнулим директорию, чтобы собранные файлы попадали прямо в build
      filePath.dirname = '';
    }))
    .pipe(dest(PATH_TO_DIST))
    .pipe(server.stream());
}

export function lintBem() {
  return src(`${PATH_TO_DIST}**/*.html`)
    .pipe(bemlinter());
}

export function processStyles() {
  return src(`${PATH_TO_SOURCE}styles/*.scss`, {sourcemaps: isDevelopment})
    .pipe(plumber())
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss([
      postUrl([
        {
          filter: '**/*',
          assetsPath: '../',
        },
        {
          filter: '**/icons/**/*.svg',
          url: (asset) => asset.url.replace(
            /icons\/(.+?)\.svg$/,
            (match, p1) => `icons/stack.svg#${p1.replace(/\//g, '_')}`
          ),
          multi: true,
        },
      ]),
      lightningcss({
        lightningcssOptions: {
          minify: !isDevelopment,
        },
      })
    ]))
    .pipe(dest(`${PATH_TO_DIST}styles`, {sourcemaps: isDevelopment}))
    .pipe(server.stream());
}

export function processScripts() {
  const gulpEsbuild = createGulpEsbuild({incremental: isDevelopment});

  return src(`${PATH_TO_SOURCE}scripts/*.js`)
    .pipe(gulpEsbuild({
      bundle: true,
      format: 'esm',
      // splitting: true,
      platform: 'browser',
      minify: !isDevelopment,
      sourcemap: isDevelopment,
      target: browserslistToEsbuild(),
    }))
    .pipe(dest(`${PATH_TO_DIST}scripts`))
    .pipe(server.stream());
}

export function optimizeRaster() {
  const RAW_DENSITY = 2;
  const TARGET_FORMATS = [undefined, 'webp']; // undefined — initial format: jpg or png

  function createOptionsFormat() {
    const formats = [];

    for (const format of TARGET_FORMATS) {
      for (let density = RAW_DENSITY; density > 0; density--) {
        formats.push(
          {
            format,
            rename: {suffix: `@${density}x`},
            width: ({width}) => Math.ceil(width * density / RAW_DENSITY),
            jpegOptions: {progressive: true},
          },
        );
      }
    }

    return {formats};
  }

  return src(`${PATH_TO_RAW}images/**/*.{png,jpg,jpeg}`)
    .pipe(sharp(createOptionsFormat()))
    .pipe(dest(`${PATH_TO_SOURCE}images`));
}

export function optimizeVector() {
  return src([`${PATH_TO_RAW}**/*.svg`])
    .pipe(svgo())
    .pipe(dest(PATH_TO_SOURCE));
}

export function createStack() {
  return src(`${PATH_TO_SOURCE}icons/**/*.svg`)
    .pipe(stacksvg())
    .pipe(dest(`${PATH_TO_DIST}icons`));
}

export function copyStatic() {
  return src(PATHS_TO_STATIC, {base: PATH_TO_SOURCE})
    .pipe(dest(PATH_TO_DIST));
}

export function startServer() {
  const serveStatic = PATHS_TO_STATIC
    .filter((path) => path.startsWith('!') === false)
    .map((path) => {
      const dir = path.replace(/(\/\*\*\/.*$)|\/$/, '');
      const route = dir.replace(PATH_TO_SOURCE, '/');

      return {route, dir};
    });

  server.init({
    server: {
      baseDir: PATH_TO_DIST
    },
    serveStatic,
    cors: true,
    notify: false,
    ui: false,
  }, (err, bs) => {
    bs.addMiddleware('*', (req, res) => {
      res.write(readFileSync(`${PATH_TO_DIST}404.html`));
      res.end();
    });
  });

  watch(`${PATH_TO_SOURCE}**/*.{html,njk}`, series(processMarkup));
  watch(`${PATH_TO_SOURCE}styles/**/*.scss`, series(processStyles));
  watch(`${PATH_TO_SOURCE}scripts/**/*.js`, series(processScripts));
  watch(`${PATH_TO_SOURCE}icons/**/*.svg`, series(createStack, reloadServer));
  watch(PATHS_TO_STATIC, series(reloadServer));
}

function reloadServer(done) {
  server.reload();
  done();
}

export function removeBuild(done) {
  rmSync(PATH_TO_DIST, {
    force: true,
    recursive: true,
  });
  done();
}

export function buildProd(done) {
  isDevelopment = false;
  series(
    removeBuild,
    parallel(
      processMarkup,
      processStyles,
      processScripts,
      createStack,
      copyStatic,
    ),
  )(done);
}

export function runDev(done) {
  series(
    removeBuild,
    parallel(
      processMarkup,
      processStyles,
      processScripts,
      createStack,
    ),
    startServer,
  )(done);
}

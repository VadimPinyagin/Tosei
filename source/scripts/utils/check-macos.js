//////////////////////////////////////////////////////////////////
// check MacOS

const iosChecker = () => {
  if (navigator.userAgent.indexOf('Mac OS X') !== -1) {
    document.body.classList.add('mac');
  } else {
    document.body.classList.add('pc');
  }
};

// export const iosChecker = () => {
// 	return [
// 			'iPad Simulator',
// 			'iPhone Simulator',
// 			'iPod Simulator',
// 			'iPad',
// 			'iPhone',
// 			'iPod'
// 		].includes(navigator.platform)
// 		// iPad on iOS 13 detection
// 		|| (navigator.userAgent.includes('Mac') && 'ontouchend' in document);
// };

iosChecker();

// end check MacOS
//////////////////////////////////////////////////////////////////

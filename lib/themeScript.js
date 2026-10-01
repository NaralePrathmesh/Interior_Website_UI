/* Runs before the first paint (inlined in <head>). The site opens in the light, off-white theme unless the visitor chose dark. */
export const THEME_KEY = 'aangan-theme';
export const themeInitScript = `(function(){try{var t=localStorage.getItem('${THEME_KEY}');if(t!=='light'&&t!=='dark'){t='light'}document.documentElement.setAttribute('data-theme',t)}catch(e){document.documentElement.setAttribute('data-theme','light')}})();`;

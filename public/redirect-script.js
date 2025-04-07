// GitHub Pages SPA重定向脚本
// 用于处理刷新和直接访问非根路径的情况

(function() {
  // 仅在GitHub Pages环境中执行
  if (window.location.hostname.indexOf('github.io') > -1) {
    // 检查是否是404页面重定向
    var redirect = sessionStorage.redirect;
    delete sessionStorage.redirect;
    
    // 如果有保存的路径，则重定向到该路径
    if (redirect && redirect !== window.location.href) {
      history.replaceState(null, null, redirect);
    }
  }
})();
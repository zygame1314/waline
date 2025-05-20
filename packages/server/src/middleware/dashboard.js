module.exports = function () {
  return (ctx) => {
    ctx.type = 'html';
    ctx.body = `<!doctype html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Waline Management System</title>
    <meta name="viewport" content="width=device-width,initial-scale=1">
  </head>
  <body>
    <script>
    window.SITE_URL = ${JSON.stringify(process.env.SITE_URL)};
    window.SITE_NAME = ${JSON.stringify(process.env.SITE_NAME)};
    window.recaptchaV3Key = ${JSON.stringify(process.env.RECAPTCHA_V3_KEY)};
    window.turnstileKey = ${JSON.stringify(process.env.TURNSTILE_KEY)};
    window.serverURL = '${ctx.serverURL}/api/';
    </script>
    <script src="${process.env.WALINE_ADMIN_MODULE_ASSET_URL || '//unpkg.com/@waline/admin'}"></script>
    
    <!-- 在页面加载后执行脚本隐藏社交登录按钮 -->
    <script>
      // 等待DOM完全加载
      document.addEventListener('DOMContentLoaded', function() {
        // 立即执行一次
        hideLoginButtons();
        
        // 设置间隔持续检查并隐藏，防止动态加载的元素
        setInterval(hideLoginButtons, 500);
        
        function hideLoginButtons() {
          // 隐藏社交账号容器
          var socialAccounts = document.querySelectorAll('.social-accounts, .social-login, .social-login-btns');
          socialAccounts.forEach(function(el) {
            if(el) el.style.display = 'none';
          });
          
          // 隐藏包含"oauth"的链接
          var oauthLinks = document.querySelectorAll('a[href*="oauth"]');
          oauthLinks.forEach(function(el) {
            if(el) el.style.display = 'none';
          });
          
          // 隐藏可能的社交登录相关文本
          var titles = document.querySelectorAll('.login-title + .social-accounts, .login-title + .social-login');
          titles.forEach(function(el) {
            if(el && el.previousElementSibling) el.previousElementSibling.style.display = 'none';
          });
        }
      });
    </script>
  </body>
</html>`;
  };
};

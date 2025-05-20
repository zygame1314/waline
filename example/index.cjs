const Application = require('@waline/vercel');

module.exports = Application({
  plugins: [],
  async postSave(comment) {
  },
  async prepare(app) {
    const originalDashboard = require('@waline/vercel/dist/middleware/dashboard');

    app.use(async (ctx, next) => {
      if (!ctx.path.startsWith('/ui')) {
        return next();
      }

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
            window.serverURL = '${ctx.serverURL || ''}/api/';
            
            // 设置ALLOW_SOCIALS为false，禁用社交登录
            window.ALLOW_SOCIALS = false;
            </script>
            <script src="//unpkg.com/@waline/admin"></script>
            
            <!-- 隐藏社交登录按钮的脚本 -->
            <script>
              document.addEventListener('DOMContentLoaded', function() {
                function hideLoginButtons() {
                  var elements = document.querySelectorAll('.social-accounts, .social-login, .social-login-btns, a[href*="oauth"]');
                  elements.forEach(function(el) {
                    if(el) el.style.display = 'none';
                  });
                }
                
                // 立即执行一次
                hideLoginButtons();
                // 持续检查，确保动态加载的元素也被隐藏
                setInterval(hideLoginButtons, 500);
              });
            </script>
          </body>
        </html>`;
    });
  }
});

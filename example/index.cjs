const Application = require('@waline/vercel');

const disableSocialLoginPlugin = {
  middlewares: [
    async (ctx, next) => {
      await next();

      const isDashboardPath = ctx.path.startsWith('/ui') || ctx.path === '/';
      const acceptsHtml = ctx.accepts('html');
      const contentType = ctx.response.get('content-type') || '';
      const isHtmlResponse = typeof ctx.body === 'string' && contentType.includes('text/html');

      if (isDashboardPath && acceptsHtml && isHtmlResponse && ctx.body.includes('<title>Waline Management System</title>')) {
        const scriptToInject = `window.ALLOW_SOCIALS = [];`;

        const adminScriptTagPattern = /<script\s+src="[^"]*@waline\/admin[^"]*"[^>]*><\/script>/;
        const match = ctx.body.match(adminScriptTagPattern);

        if (match && match[0]) {
          const adminScriptTagFull = match[0];
          ctx.body = ctx.body.replace(adminScriptTagFull, `<script>${scriptToInject}</script>\n${adminScriptTagFull}`);
        } else {
          if (ctx.body.includes('</head>')) {
            ctx.body = ctx.body.replace('</head>', `<script>${scriptToInject}</script>\n</head>`);
          } else {
            const firstScriptTagIndex = ctx.body.indexOf('<script');
            if (firstScriptTagIndex !== -1) {
              ctx.body = ctx.body.substring(0, firstScriptTagIndex) + `<script>${scriptToInject}</script>\n` + ctx.body.substring(firstScriptTagIndex);
            } else {
              ctx.body += `<script>${scriptToInject}</script>`;
            }
          }
        }
      }
    },
  ],
};

module.exports = Application({
  plugins: [disableSocialLoginPlugin],
  async postSave(comment) {
  },
});

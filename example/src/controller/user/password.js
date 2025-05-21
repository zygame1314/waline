const jwt = require('jsonwebtoken');

const BaseRest = require('../rest.js');

module.exports = class extends BaseRest {
  async putAction() {
    const {
      SMTP_HOST,
      SMTP_SERVICE,
      SENDER_EMAIL,
      SENDER_NAME,
      SMTP_USER,
      SITE_NAME,
    } = process.env;
    const hasMailService = SMTP_HOST || SMTP_SERVICE;

    if (!hasMailService) {
      return this.fail();
    }

    const { email } = this.post();
    const userModel = this.getModel('Users');
    const user = await userModel.select({ email });

    if (think.isEmpty(user)) {
      return this.fail();
    }

    const notify = this.service('notify', this);
    const token = jwt.sign(user[0].email, this.config('jwtKey'));
    const profileUrl = `${this.ctx.serverURL}/ui/profile?token=${token}`;

    await notify.transporter.sendMail({
      from:
        SENDER_EMAIL && SENDER_NAME
          ? `"${SENDER_NAME}" <${SENDER_EMAIL}>`
          : SMTP_USER,
      to: user[0].email,
      subject: this.locale('[{{name | safe}}] Reset Password', {
        name: SITE_NAME || 'Waline',
      }),
      html: this.locale(
        'Please click <a href="{{url}}">{{url}}</a> to login and change your password as soon as possible!',
        { url: profileUrl },
      ),
    });

    return this.success();
  }
};

const Base = require('./base.js');

module.exports = class extends Base {
  async __before(...args) {
    await super.__before(...args);

    const { userInfo } = this.ctx.state;

    if (think.isEmpty(userInfo)) {
      return this.fail(401);
    }

    if (userInfo.type !== 'administrator') {
      return this.fail(403);
    }
  }

  /**
   * @api {GET} /api/db export site data
   * @apiGroup Site
   * @apiVersion  0.0.1
   *
   * @apiParam  {String}  lang  language
   */
  async getAction() {}

  /**
   * @api {POST} /api/db import site data
   * @apiGroup Site
   * @apiVersion  0.0.1
   *
   * @apiParam  {String}  lang  language
   */
  async postAction() {
    this.rules = {
      table: {
        string: true,
        required: true,
        method: 'GET',
      },
    };
  }

  /**
   * @api {PUT} /api/db update site table data
   * @apiGroup Site
   * @apiVersion  0.0.1
   *
   * @apiParam  {String}  lang  language
   */
  async putAction() {
    this.rules = {
      table: {
        string: true,
        required: true,
        method: 'GET',
      },
      objectId: {
        required: true,
        method: 'GET',
      },
    };
  }

  /**
   * @api {DELETE} /api/db clean site data
   * @apiGroup Site
   * @apiVersion  0.0.1
   *
   * @apiParam  {String}  lang  language
   */
  async deleteAction() {
    this.rules = {
      table: {
        string: true,
        required: true,
        method: 'GET',
      },
    };
  }
};

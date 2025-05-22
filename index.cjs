const Application = require('./app');

module.exports = Waline({
  plugins: [],
  disallowIPList: [],
  async avatarUrl(comment) {
    const reg = new RegExp('(\\d+)@qq\\.com$', 'i');
    const mail = comment.mail;
    if (reg.test(mail)) {
      const q = mail.replace(/@qq\.com/i, '').toLowerCase();
      return 'https://q1.qlogo.cn/headimg_dl?dst_uin=' + q + '&spec=4';
    }
  },
  mailSubjectAdmin: '{{site.name | safe}} 上有新评论了',
  mailTemplateAdmin: `
    <div style="font-family:'Courier New', monospace;line-height:1.6;max-width:550px;margin:50px auto;background-color:#fff;padding:4px;">
      <div style="border:4px solid #000;position:relative;padding:20px;background-color:#fefefe;">
        <div style="position:absolute;width:10px;height:10px;background-color:#000;top:-5px;left:-5px;"></div>
        <div style="position:absolute;width:10px;height:10px;background-color:#000;top:-5px;right:-5px;"></div>
        <div style="position:absolute;width:10px;height:10px;background-color:#000;bottom:-5px;left:-5px;"></div>
        <div style="position:absolute;width:10px;height:10px;background-color:#000;bottom:-5px;right:-5px;"></div>

        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:15px;border-bottom:3px dashed #000;padding-bottom:15px;">
          <div style="flex-grow:1;font-size:16px;font-weight:bold;color:#000;">
            您在<a style="color:#000;text-decoration:none;border-bottom:2px solid #000;" href="{{site.url}}" target="_blank">{{site.name}}</a>上的文章有了新的评论
          </div>
          <div style="width:70px;height:70px;background-color:#4a90e2;display:flex;justify-content:center;align-items:center;color:white;font-weight:bold;border:3px solid #000;transform:rotate(5deg);margin-left:20px;font-size:12px;text-align:center;">NEW<br>COMMENT</div>
        </div>

        <div style="background-color:#f8f8f8;border:3px solid #000;padding:15px;margin-bottom:15px;position:relative;">
          <p><strong style="color:#000;">{{self.nick}}</strong> 回复说：</p>
          <div style="background-color:#e8f4ff;border:2px solid #000;padding:12px;margin:15px 0;position:relative;">
            {{self.comment | safe}}
          </div>
          
          <p>
            <a href="{{site.postUrl}}" target="_blank" style="display:inline-block;padding:8px 16px;background-color:#000;color:#fff;text-decoration:none;border:3px solid #000;margin-top:10px;font-weight:bold;text-transform:uppercase;letter-spacing:1px;font-size:14px;">查看完整内容</a>
          </p>
        </div>

        <div style="display:flex;justify-content:space-between;border-top:3px dashed #000;padding-top:15px;color:#666;font-size:14px;">
          <div>感谢您使用 {{site.name}}</div>
        </div>
      </div>
    </div>`,
  mailSubject: '{{parent.nick | safe}}，『{{site.name | safe}}』上的评论收到了回复',
  mailTemplate: `
    <div style="font-family:'Courier New', monospace;line-height:1.6;max-width:550px;margin:50px auto;background-color:#fff;padding:4px;">
      <div style="border:4px solid #000;position:relative;padding:20px;background-color:#fefefe;">
        <div style="position:absolute;width:10px;height:10px;background-color:#000;top:-5px;left:-5px;"></div>
        <div style="position:absolute;width:10px;height:10px;background-color:#000;top:-5px;right:-5px;"></div>
        <div style="position:absolute;width:10px;height:10px;background-color:#000;bottom:-5px;left:-5px;"></div>
        <div style="position:absolute;width:10px;height:10px;background-color:#000;bottom:-5px;right:-5px;"></div>

        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:15px;border-bottom:3px dashed #000;padding-bottom:15px;">
          <div style="flex-grow:1;font-size:16px;font-weight:bold;color:#000;">
            {{parent.nick}}，您在<a style="color:#000;text-decoration:none;border-bottom:2px solid #000;" href="{{site.url}}" target="_blank">{{site.name}}</a>上的评论收到了回复
          </div>
          <div style="width:70px;height:70px;background-color:#4a90e2;display:flex;justify-content:center;align-items:center;color:white;font-weight:bold;border:3px solid #000;transform:rotate(5deg);margin-left:20px;font-size:12px;text-align:center;">NEW<br>REPLY</div>
        </div>

        <div style="background-color:#f8f8f8;border:3px solid #000;padding:15px;margin-bottom:15px;position:relative;">
          <p>您曾发表评论：</p>
          <div style="background-color:#e8f4ff;border:2px solid #000;padding:12px;margin:15px 0;position:relative;">
            {{parent.comment | safe}}
          </div>
          
          <p><strong style="color:#000;">{{self.nick}}</strong> 回复说：</p>
          <div style="background-color:#e8f4ff;border:2px solid #000;padding:12px;margin:15px 0;position:relative;">
            {{self.comment | safe}}
          </div>
          
          <p>
            <a href="{{site.postUrl}}" target="_blank" style="display:inline-block;padding:8px 16px;background-color:#000;color:#fff;text-decoration:none;border:3px solid #000;margin-top:10px;font-weight:bold;text-transform:uppercase;letter-spacing:1px;font-size:14px;">查看完整内容</a>
          </p>
        </div>

        <div style="display:flex;justify-content:space-between;border-top:3px dashed #000;padding-top:15px;color:#666;font-size:14px;">
          <div>欢迎再次光临 <a style="color:#000;text-decoration:none;border-bottom:2px solid #000;" href="{{site.url}}" target="_blank">{{site.name}}</a></div>
        </div>
      </div>
    </div>`,
});
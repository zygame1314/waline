const Application = require('./app');

module.exports = Application({
	plugins: [],
	async postSave(comment) {
		return {
			mailSubjectAdmin: '{{site.name | safe}} 上有新评论了',
			mailTemplateAdmin: `<div style="border-radius: 10px 10px 10px 10px;font-size:14px;color: #555555;width: 666px;font-family:'Century Gothic','Trebuchet MS','Hiragino Sans GB',微软雅黑,'Microsoft Yahei',Tahoma,Helvetica,Arial,'SimSun',sans-serif;margin:50px auto;border:1px solid #eee;max-width:100%;background: #ffffff repeating-linear-gradient(-45deg,#fff,#fff 1.125rem,transparent 1.125rem,transparent 2.25rem);box-shadow: 0 1px 5px rgba(0, 0, 0, 0.15);">
 <div style="width:100%;background:#49BDAD;color:#ffffff;border-radius: 10px 10px 0 0;background-image: -moz-linear-gradient(0deg, rgb(67, 198, 184), rgb(255, 209, 244));background-image: -webkit-linear-gradient(0deg, rgb(67, 198, 184), rgb(255, 209, 244));height: 66px;">
 <p style="font-size:15px;word-break:break-all;padding: 23px 32px;margin:0;background-color: hsla(0,0%,100%,.4);border-radius: 10px 10px 0 0;">您在<a style="text-decoration:none;color: #ffffff;" href="{{site.url}}" target="_blank">{{site.name}}</a>上的留言有新评论啦！</p>
 </div>
  <div style="margin:40px auto;width:90%"><p>{{self.nick}} 回复说：</p>
  <div style="background: #fafafa repeating-linear-gradient(-45deg,#fff,#fff 1.125rem,transparent 1.125rem,transparent 2.25rem);box-shadow: 0 2px 5px rgba(0, 0, 0, 0.15);margin:20px 0px;padding:15px;border-radius:5px;font-size:14px;color:#555555;">{{self.comment | safe}}</div>
  <p>您可以点击<a style="text-decoration:none; color:#12addb" href="{{site.postUrl}}" target="_blank">查看回复的完整内容</a>。<hr />
  </p><style type="text/css">a:link{text-decoration:none}a:visited{text-decoration:none}a:hover{text-decoration:none}a:active{text-decoration:none}</style>
  </div>
 </div>`,
			mailSubject: '{{parent.nick | safe}}，『{{site.name | safe}}』上的评论收到了回复',
			mailTemplate: `<div style="border-radius: 10px 10px 10px 10px;font-size:14px;color: #555555;width: 666px;font-family:'Century Gothic','Trebuchet MS','Hiragino Sans GB',微软雅黑,'Microsoft Yahei',Tahoma,Helvetica,Arial,'SimSun',sans-serif;margin:50px auto;border:1px solid #eee;max-width:100%;background: #ffffff repeating-linear-gradient(-45deg,#fff,#fff 1.125rem,transparent 1.125rem,transparent 2.25rem);box-shadow: 0 1px 5px rgba(0, 0, 0, 0.15);">
 <div style="width:100%;background:#49BDAD;color:#ffffff;border-radius: 10px 10px 0 0;background-image: -moz-linear-gradient(0deg, rgb(67, 198, 184), rgb(255, 209, 244));background-image: -webkit-linear-gradient(0deg, rgb(67, 198, 184), rgb(255, 209, 244));height: 66px;">
 <p style="font-size:15px;word-break:break-all;padding: 23px 32px;margin:0;background-color: hsla(0,0%,100%,.4);border-radius: 10px 10px 0 0;">您在<a style="text-decoration:none;color: #ffffff;" href="{{site.url}}" target="_blank">{{site.name}}</a>上的留言有新回复啦！</p>
 </div>
  <div style="margin:40px auto;width:90%"><p>Hi, {{parent.nick}}，您曾在文章上发表评论：</p>
  <div style="background: #fafafa repeating-linear-gradient(-45deg,#fff,#fff 1.125rem,transparent 1.125rem,transparent 2.25rem);box-shadow: 0 2px 5px rgba(0, 0, 0, 0.15);margin:20px 0px;padding:15px;border-radius:5px;font-size:14px;color:#555555;">{{self.comment | safe}}</div>
  <p><strong>{{self.nick}}</strong> 给您的回复如下：</p>
  <div style="background: #fafafa repeating-linear-gradient(-45deg,#fff,#fff 1.125rem,transparent 1.125rem,transparent 2.25rem);box-shadow: 0 2px 5px rgba(0, 0, 0, 0.15);margin:20px 0px;padding:15px;border-radius:5px;font-size:14px;color:#555555;">{{self.comment | safe}}</div>
  <p>您可以点击<a style="text-decoration:none; color:#12addb" href="{{site.postUrl}}" target="_blank">查看回复的完整内容</a>，欢迎再次光临<a style="text-decoration:none; color:#12addb" href="{{site.url}}" target="_blank">{{site.name}}</a>。<hr />
  <p style="font-size:12px;color:#b7adad">本邮件为系统自动发送，请勿直接回复邮件哦，可到博文内容回复。</p>
  </p><style type="text/css">a:link{text-decoration:none}a:visited{text-decoration:none}a:hover{text-decoration:none}a:active{text-decoration:none}</style>
  </div>
 </div>`
		};
	},
});
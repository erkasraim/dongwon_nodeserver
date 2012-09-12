var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost/dongwon');

var NoticeSchema = new Schema({
        title : String, // 공지사항 
        description : String, // 내용
        regDttm : String, // 등록일자 
});
var NoticeModel = mongoose.model('notice', NoticeSchema);

exports.list = function(req, res) {
	NoticeModel.find({}, function (err, docs) {
        	if(!err) {
			res.render('noticelist.html.jade', { 
				noticeList:docs 
			});
                }
        });
}

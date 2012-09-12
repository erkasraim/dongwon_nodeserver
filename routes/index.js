
exports.index = function(req, res) {
	res.render('index', {} );
};
exports.shop = require('./shop');
exports.notice = require('./notice');
//exports.noticeList = require('./noticeList');
//exports.noteceDetail = require('./noticeDetail');


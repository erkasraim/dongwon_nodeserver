
exports.index = function(req, res) {
	res.render('index', {} );
};
exports.shop = require('./shop');
//exports.noticeList = require('./noticeList');
//exports.noteceDetail = require('./noticeDetail');



exports.index = function(req, res) {
	res.render('index', {type:req.param('type')} );
};
exports.shop = require('./shop');
exports.notice = require('./notice');
exports.qna = require('./qna');
exports.good = require('./good');

exports.upload = require('./upload');


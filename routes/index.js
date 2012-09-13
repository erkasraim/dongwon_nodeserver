
exports.index = function(req, res) {
	res.render('index', {} );
};
exports.shop = require('./shop');
exports.notice = require('./notice');
exports.qna = require('./qna');


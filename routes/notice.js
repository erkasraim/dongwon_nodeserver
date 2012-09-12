var mongoDB = require('../dao');

exports.list = function(req, res) {
	console.log("req.param: " + req.param("type"));
	mongoDB.getNotice ( function (err, docs) {
        	if(!err) {
			res.render('noticelist.html.jade', { 
				noticelist:docs 
				, type:req.param("type")
			});
                }
        });
}

exports.edit = function(req, res) {
	console.log("notice.edit / id : " + req.param("id"));
	if (req.param("id") == 'undefined') {
		res.render('noticeedit.html.jade', {notice:'why call??'});
		return;
	}
	mongoDB.getNoticeById(req.param("id"), function( err, docs) {
		if (!err) {
			console.log(docs);
			res.render('noticeedit.html.jade', {
				noticelist: docs
				, isNew:'no'
			});
		} else {
			console.log('do not find id');
			res.render('noticeedit.html.jade', {
				noticelist: [{
					_id:'new'
					,name:''
					,address:''
					,phone:''
					,imgUrl:''
				}]
				, isNew:'yes'
			});
		}
	});
}

exports.update = function(req, res) {
	console.log("notice update / id : " + req.body._id);
	console.log("form info : " + req.body);
	mongoDB.updateNoticeById(req.body, function (err, docs) {
		if (!err) {
			console.log(docs);
			var result = { 
				"success" : "공지사항 수정에 성공하였습니다.",
				"redirect" : "/dongwon/notice/list?type=admin" 
			}
			res.send(result);
		}
	});
}

exports.insert = function(req, res) {
	console.log("notice insert / id : " + req.body._id);
	console.log("form info : " + req.body);
	mongoDB.insertNotice(req.body, function (err, docs) {
		if (!err) {
			console.log(docs);
			var result = { 
				"success" : "공지사항 수정에 성공하였습니다.",
				"redirect" : "/dongwon/notice/list?type=admin" 
			}
			res.send(result);
		}
	});
}

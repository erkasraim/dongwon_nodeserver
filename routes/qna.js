var mongoDB = require('../dao');

exports.list = function(req, res) {
	console.log("req.param: " + req.param("type"));
	mongoDB.getQna ( function (err, docs) {
        	if(!err) {
			res.render('qnalist.html.jade', { 
				qnalist:docs 
				, type:req.param("type")
			});
                }
        });
}

exports.edit = function(req, res) {
	console.log("qna.edit / id : " + req.param("id"));
	if (req.param("id") == 'undefined') {
		res.render('qnaedit.html.jade', {qna:'why call??'});
		return;
	}
	mongoDB.getQnaById(req.param("id"), function( err, docs) {
		if (!err) {
			console.log(docs);
			res.render('qnaedit.html.jade', {
				qnalist: docs
				, isNew:'no'
				, type:req.param("type")
			});
		} else {
			console.log('do not find id');
			res.render('qnaedit.html.jade', {
				qnalist: [{
					_id:'new'
					,title:''
					,description:''
				}]
				, isNew:'yes'
				, type:req.param("type")
			});
		}
	});
}

exports.update = function(req, res) {
	console.log("qna update / id : " + req.body._id);
	console.log("form info : " + req.body);
	mongoDB.updateQnaById(req.body, function (err, docs) {
		if (!err) {
			console.log(docs);
			var result = { 
				"success" : "Q & A 수정에 성공하였습니다.",
				"redirect" : "/dongwon/qna/list?type=admin" 
			}
			res.send(result);
		}
	});
}

exports.insert = function(req, res) {
	console.log("qna insert / id : " + req.body._id);
	console.log("form info : " + req.body);
	mongoDB.insertQna(req.body, function (err, docs) {
		if (!err) {
			console.log(docs);
			var result = { 
				"success" : "Q & A 수정에 성공하였습니다.",
				"redirect" : "/dongwon/qna/list?type=admin" 
			}
			res.send(result);
		}
	});
}

exports.detail = function(req, res) {
	console.log("qna detail / id : " + req.param("id") + " / type :" + req.param("type"));
	mongoDB.getQnaById(req.param("id"), function( err, docs) {
                if (!err) {
                        console.log(docs);
                        res.render('qnadetail.html.jade', {
                                qnalist: docs
                                , isNew:'no'
				, type:req.param("type")
                        });
                }
        });
}

exports.remove = function(req, res) {
	console.log("qna remove / id : " + req.body._id);
	mongoDB.deleteQna(req.body._id, function (err, docs) {
		if (!err) {
			var result = {
                                "success" : "삭제되었습니다.",
                                "redirect" : "/dongwon/qna/list?type=admin"
                        }
                        res.send(result);
		}
	});
}

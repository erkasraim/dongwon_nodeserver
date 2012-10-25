var mongoDB = require('../dao');

exports.list = function(req, res) {
	console.log("req.param: " + req.param("type"));
	mongoDB.getGood ( function (err, docs) {
        	if(!err) {
			res.render('goodlist.html.jade', { 
				goodlist:docs 
				, type:req.param("type")
			});
                }
        });
}

exports.edit = function(req, res) {
	console.log("good.edit / id : " + req.param("id"));
	if (req.param("id") == 'undefined') {
		res.render('goodedit.html.jade', {good:'why call??'});
		return;
	}
	mongoDB.getGoodById(req.param("id"), function( err, docs) {
		if (!err) {
			console.log(docs);
			res.render('goodedit.html.jade', {
				goodlist: docs
				, isNew:'no'
				, type:req.param("type")
			});
		} else {
			console.log('do not find id');
			res.render('goodedit.html.jade', {
				goodlist: [{
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
	console.log("good update / id : " + req.body._id);
	console.log("form info : " + req.body);
	mongoDB.updateGoodById(req.body, function (err, docs) {
		if (!err) {
			console.log(docs);
			var result = { 
				"success" : "칭찬히기 수정에 성공하였습니다.",
				"redirect" : "/dongwon/good/list?type="+req.body.type 
			}
			res.send(result);
		}
	});
}

exports.insert = function(req, res) {
	console.log("good insert / id : " + req.body._id);
	console.log("form info : " + req.body);
	mongoDB.insertGood(req.body, function (err, docs) {
		if (!err) {
			console.log(docs);
			var result = { 
				"success" : "칭찬하기 수정에 성공하였습니다.",
				"redirect" : "/dongwon/good/list?type="+req.body.type 
			}
			res.send(result);
		}
	});
}

exports.detail = function(req, res) {
	console.log("good detail / id : " + req.param("id") + " / type :" + req.param("type"));
	mongoDB.getGoodById(req.param("id"), function( err, docs) {
                if (!err) {
                        console.log(docs);
                        res.render('gooddetail.html.jade', {
                                goodlist: docs
                                , isNew:'no'
				, type:req.param("type")
                        });
                }
        });
}

exports.remove = function(req, res) {
	console.log("good remove / id : " + req.body._id + ", type : " + req.body.type);
	mongoDB.deleteGood(req.body._id, function (err, docs) {
		if (!err) {
			var result = {
                                "success" : "삭제되었습니다.",
                                "redirect" : "/dongwon/good/list?type="+req.body.type
                        }
                        res.send(result);
		}
	});
}

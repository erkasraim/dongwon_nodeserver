var mongoDB = require('../dao');

exports.list = function(req, res) {
	console.log("req.param: " + req.param("type"));
	mongoDB.getShopList ( function (err, docs) {
        	if(!err) {
			res.render('shoplist.html.jade', { 
				shoplist:docs 
				, type:req.param("type")
			});
                }
        });
}

exports.edit = function(req, res) {
	console.log("shop.edit / id : " + req.param("id"));
	if (req.param("id") == 'undefined') {
		res.render('shopedit.html.jade', {shop:'why call??'});
		return;
	}
	mongoDB.getShopListById(req.param("id"), function( err, docs) {
		if (!err) {
			console.log(docs);
			res.render('shopedit.html.jade', {
				shoplist: docs
				, isNew:'no'
			});
		} else {
			console.log('do not find id');
			res.render('shopedit.html.jade', {
				shoplist: [{
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
	console.log("shop update / id : " + req.body._id);
	console.log("form info : " + req.body);
	mongoDB.updateShopListById(req.body, function (err, docs) {
		if (!err) {
			console.log(docs);
			var result = { 
				"success" : "매장정보 수정에 성공하였습니다.",
				"redirect" : "/dongwon/shop/list?type=admin" 
			}
			res.send(result);
		}
	});
}

exports.insert = function(req, res) {
	console.log("shop insert / id : " + req.body._id);
	console.log("form info : " + req.body);
	mongoDB.insertShopList(req.body, function (err, docs) {
		if (!err) {
			console.log(docs);
			var result = { 
				"success" : "매장정보 수정에 성공하였습니다.",
				"redirect" : "/dongwon/shop/list?type=admin" 
			}
			res.send(result);
		}
	});
}

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost/dongwon');

var ShopListSchema = new Schema({
        name : String, // 매장이름
        address : String, //주소
        phone : String, //전화번호
        imgUrl : String, //매장 위치 지도이미지 주소
});

var ShopListModel = mongoose.model('shoplist', ShopListSchema);

var NoticeSchema = new Schema({
        title : String, // 공지사항
        description : String, // 내용
        regDttm : String, // 등록일자
});
var NoticeModel = mongoose.model('notice', NoticeSchema);

var QnaSchema = new Schema({
        title : String, // qna 제목
        description : String, // 내용
	regDttm : String,
});
var QnaModel = mongoose.model('qna', QnaSchema);

var GoodSchema = new Schema({
        title : String, // 제목
        description : String, // 내용
	regDttm : String,
	shopinfo : Number,
	shopname : String,
});
var GoodModel = mongoose.model('good', GoodSchema);

var MongoDB = module.exports = {
	getShopList : function (callback) {
		ShopListModel.find({}).limit(20).sort('_id', 1).exec(callback);
	},
	getShopListById : function (id, callback) {
		ShopListModel.find({_id:id}, callback);
	},
	updateShopListById : function (shop, callback) {
		ShopListModel.update({_id:shop._id}, {name:shop.name
			, address:shop.address 
			, phone:shop.phone
			, imgUrl:shop.imgUrl
		}, callback);
	}
	, insertShopList : function (shop, callback) {
		ShopListModel.create({name:shop.name
			, address:shop.address 
			, phone:shop.phone
			, imgUrl:shop.imgUrl
		}, callback);
	}
	, deleteShop : function (id, callback) {
                ShopListModel.find({_id:id}).remove(callback);
        }
	, getNotice : function (callback) {
		NoticeModel.find({}).limit(20).sort('regDttm', -1).exec(callback);
        }
	, getNoticeById : function (id, callback) {
                NoticeModel.find({_id:id}, callback);
        }
	, updateNoticeById : function (notice, callback) {
                NoticeModel.update({_id:notice._id}, {title:notice.title
			, description:notice.description
                }, callback);
        }
	, insertNotice : function (notice, callback) {
		var date = new Date();
		var month = date.getMonth()*1+1;
                if (month < 10) {
			month = '0'+month; 
		}
		var regDt = date.getFullYear() + '.' + month + '.' + date.getDate();
                NoticeModel.create({title:notice.title
			, description:notice.description
			, regDttm:regDt
                }, callback);
        }
	, deleteNotice : function (id, callback) {
		NoticeModel.find({_id:id}).remove(callback);
	}
	, getQna : function (callback) {
		QnaModel.find({}).limit(20).sort('regDttm', -1).exec(callback);
        }
        , getQnaById : function (id, callback) {
                QnaModel.find({_id:id}, callback);
        }
        , updateQnaById : function (qna, callback) {
                QnaModel.update({_id:qna._id}, {title:qna.title
                        , description:qna.description
                }, callback);
        }
        , insertQna : function (qna, callback) {
		var date = new Date();
                QnaModel.create({title:qna.title
                        , description:qna.description
                        , regDttm:date.getTime()
                }, callback);
        }
	, deleteQna : function (id, callback) {
		QnaModel.find({_id:id}).remove(callback);
	}
	, getGood : function (callback) {
                GoodModel.find({}).limit(20).sort('regDttm', -1).exec(callback);
        }
        , getGoodById : function (id, callback) {
                GoodModel.find({_id:id}, callback);
        }
        , updateGoodById : function (good, callback) {
                GoodModel.update({_id:good._id}, {title:good.title
                        , description:good.description
			, shopinfo:good.shopinfo
			, shopname:good.shopname
                }, callback);
        }
        , insertGood : function (good, callback) {
		var date = new Date();
                GoodModel.create({title:good.title
                        , description:good.description
                        , regDttm:date.getTime()
			, shopinfo:good.shopinfo
			, shopname:good.shopname
                }, callback);
        }
	, deleteGood : function (id, callback) {
		GoodModel.find({_id:id}).remove(callback);
	}
}

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
});
var QnaModel = mongoose.model('qna', QnaSchema);

var GoodSchema = new Schema({
        title : String, // 제목
        description : String, // 내용
});
var GoodModel = mongoose.model('good', GoodSchema);

var MongoDB = module.exports = {
	getShopList : function (callback) {
		ShopListModel.find({}, callback);
	},
	getShopListById : function (id, callback) {
		ShopListModel.find({_id:id}, callback);
	},
	updateShopListById : function (shop, callback) {
		ShopListModel.update({name:shop.name
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
	, getNotice : function (callback) {
                NoticeModel.find({}, callback);
        }
	, getNoticeById : function (id, callback) {
                NoticeModel.find({_id:id}, callback);
        }
	, updateNoticeById : function (notice, callback) {
                NoticeModel.update({title:notice.title
			, description:notice.description
                }, callback);
        }
	, insertNotice : function (notice, callback) {
		var date = new Date();
		var regDt = date.getFullYear() + '.' + date.getMonth()+1 + '.' + date.getDate();
                NoticeModel.create({title:notice.title
			, description:notice.description
			, regDttm:regDt
                }, callback);
        }
}

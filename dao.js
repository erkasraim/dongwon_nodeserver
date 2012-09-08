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
}

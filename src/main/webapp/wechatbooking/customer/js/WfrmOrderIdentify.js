window.onload = function(){
	init();
}
function init(){
	var params = getRequestParam();
	var price = params["price"];
	var roomName = getCookie("roomName");
	var startDate = params["startDate"];
	var endDate = params["endDate"];
	var count = params["count"];
	var customer = getCookie("customer");
	var phone = params["phone"];
	var idNum = params["idNum"];
	$("#orderPrice").html("￥ "+price);
	$("#room_name").html(roomName);
	$("#my-start").html(startDate);
	$("#my-end").html(endDate);
	$("#my-count").html(count);
	$("#customer-name").html(customer);
	$("#my-phone").html(phone);
	$("#my-idCard").html(idNum);
}
/**
 * 前台支付
 * 将该笔订单设置为未完成订单
 */
function onclick_frontPay(){
	//TODO
	console.info("前台支付");
}
/**
 * 立即支付
 * @param {Object} id 支付方式的id
 */
function onclick_pay(id){
	if(id == "crm_pay"){
		console.info("crm支付");
	}
	if(id == "wechat_pay"){
		console.info("微信支付");
	}
	if(id == "alibaba_pay"){
		console.info("支付宝支付");
	}
}

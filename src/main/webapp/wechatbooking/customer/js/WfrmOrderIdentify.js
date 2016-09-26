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
function onclick_frontPay(){
	console.info("前台支付");
}
function onclick_pay(){
	console.info("立即支付");
}

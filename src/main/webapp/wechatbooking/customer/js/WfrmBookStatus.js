var orderId;
var returnCode;
var frontPay;
window.onload = function(){
	console.info("订单状态页面");
	init();
}
function init(){
	var params = getRequestParam();
	returnCode = params["returnCode"];
    frontPay = params["frontPay"];
	orderId = getCookie("pay_orderId");
	finishPay();
}
function finishPay(){
    if(frontPay != null && frontPay != "" && frontPay !== undefined){
        alert("预订成功，请前往前台支付");
        return;
    }
	var requestPath = getRequestPath();
	if(returnCode != null && returnCode !="" && returnCode!==undefined && returnCode == 1){
		$.ajax({
        //请求方式
        type:"post",
        //请求路径
        url:requestPath+'myOrder/finishPay',
        //是否异步请求
        async:true,
        //传参
        data:{
            id:orderId			
        },
        //发送请求前执行方法
//		beforeSend:function(){ },
        //成功返回后调用函数
        success:function(data){
        	alert("支付成功");
        },
        //调用出错执行的函数
//		error:function(){ }
  });
	}else {
		alert("支付失败");
	}
	
}

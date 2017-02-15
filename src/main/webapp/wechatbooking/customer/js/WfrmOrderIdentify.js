var startDate;
var endDate;
var count;
var mcId;
var roomTypeId;
var orderId;
var clinker;
var ilinktel;
var idNum;
var price;
var roomName;
window.onload = function(){
	init();
}
function init(){
	debugger;
	var params = getRequestParam();
	price = params["price"];
	roomName = getCookie("roomName");
	startDate = params["startDate"];
	endDate = params["endDate"];
	count = params["count"];
	clinker = getCookie("customer");
	ilinktel = params["phone"];
	idNum = params["idNum"];
	mcId = params["mcId"];
	roomTypeId = params["roomTypeId"];
	$("#orderPrice").html("￥ "+price);
	$("#room_name").html(roomName);
	$("#my-start").html(startDate);
	$("#my-end").html(endDate);
	$("#my-count").html(count);
	$("#customer-name").html(clinker);
	$("#my-phone").html(ilinktel);
	$("#my-idCard").html(idNum);
}
/**
 * 前台支付
 * 将该笔订单设置为未完成订单
 */
function onclick_frontPay(){
    path = "../templates/WfrmBookStatus.html?frontPay=1";
    checkOrder("",path);
}
/**
 * 立即支付
 * @param {Object} id 支付方式的id
 */
function onclick_pay(id){
	if(id == "crm_pay"){ //crm支付 paytypeid:3
        var payTypeId = 3;
        checkOrder(payTypeId,"");
	}
	if(id == "wechat_pay"){ //微信支付 paytypeid:6
        var payTypeId = 6;
        checkOrder(payTypeId,"");
	}
}
function getPaySign(payTypeId){
    var openId = getCookie("openId");
    var mpid = getCookie("mpId");
    var requestPath = getRequestPath();
    var finishPath = requestPath+RESOURCE_PROJECT_NAME+"myOrder/finishPay?orderId="+orderId;
	var requestPath = getRequestPath();
    var param = "{'body':'订单描述','openid':'"+openId+"','mpid':'"+mpid+"','udStateUrl':'"+finishPath+"','money':'"+price
        +"','trueMoney':'"+price+"','kind':'10325'"+",'storeid':'"+mcId+"','paytypeid':'"+payTypeId+"'"+",'orderId':'"+orderId
        +"','payFrom':3"+",'payMoney':'"+price+"','ishdfk':'0','goods':[{'goodsName':'手机','price':'99'" +
        ",'quantity':'1'},{'goodsName':'电视','price':'2','quantity':'2'}]}";
	$.ajax({
        //请求方式
        type:"post",
        //请求路径
        url:requestPath+RESOURCE_PROJECT_NAME+'myOrder/createPayMd5',
        //是否异步请求
        async:true,
        //传参
        data:{
            mcId:mcId,
            data:param
        },
        //发送请求前执行方法
//		beforeSend:function(){ },
        //成功返回后调用函数
        success:function(data){
        	debugger;
        	if(data.ret == 0){
        		param = param +"&sign="+data.content;
        		var path = RESOURCE_PAY_COMMON_IP_PORT+"tcsl/CommPayPage.htm?data="+param;
                payOrder(path);
        	}
        },
        //调用出错执行的函数
//		error:function(){ }
  });
}
/**
 * 检查该房型是否可预订
 */
function checkOrder(payTypeId,path){
	var requestPath = getRequestPath();
	//判断房间数量是否足够
	$.ajax({
        //请求方式
        type:"post",
        //请求路径
        url:requestPath+RESOURCE_PROJECT_NAME+'myOrder/checkOrder',
        //是否异步请求
        async:true,
        //传参
        data:{
            mcId:mcId,
            roomTypeId:roomTypeId,
            count:count,
            endDate:endDate,
			startDate:startDate
        },
        //发送请求前执行方法
//		beforeSend:function(){ },
        //成功返回后调用函数
        success:function(data){
        	debugger;
        	if(data.ret == 0){
        		orderId = data.content;
                if(payTypeId == "" && path != ""){ //前台支付
                    payOrder(path);
                }
                if(payTypeId != "" && path == ""){ //立即支付
                    getPaySign(payTypeId);
                }
        	}
        },
        //调用出错执行的函数
//		error:function(){ }
  });
}
/**
 * 添加订单
 */
function payOrder(path){
	debugger;
	var requestPath = getRequestPath();
	var now = getNowTime();
	var dinerId = getCookie("dinerId");
    var shopName = getCookie("shopName");
    var shopTel = getCookie("orderTel");
	var openId = getCookie("openId");
    var address = getCookie("address",address);
    if(openId == null || openId == "" || openId === undefined){
        alert("WfrmOrderIdentify payOrder() openId is null");
        return;
    }
	$.ajax({
        //请求方式
        type:"post",
        //请求路径
        url:requestPath+RESOURCE_PROJECT_NAME+'myOrder/addOrder',
        //是否异步请求
        async:true,
        //传参
        data:{
            orderId:orderId,
			mcId:mcId,
			clinker:clinker,
			ilinktel:ilinktel,
			startDate:startDate,
			endDate:endDate,
			orderTime:now,
			dinerid:dinerId,
			idcard:idNum,
			roomTypeId:roomTypeId,
			count:count,
			price:price,
            roomName:roomName,
            openId:openId,
            shopName:shopName,
            shopTel:shopTel,
            address:address
        },
        //发送请求前执行方法
//		beforeSend:function(){ },
        //成功返回后调用函数
        success:function(data){
        	debugger
        	saveCookie("pay_orderId",orderId);
			saveCookie("pay_price",price);
    		window.location.href = path;
        },
        //调用出错执行的函数
//		error:function(){ }
  });
}
/**
 * 返回当前时间 YYYY-MM-DD HH:mm:ss
 */
function getNowTime(){
	var now = new Date();
    var year = now.getFullYear();       //年
    var month = now.getMonth() + 1;     //月
    var day = now.getDate();
    var hh = now.getHours();            //时
    var mm = now.getMinutes();          //分
    var ss = now.getSeconds();           //秒

    var clock = year+"-";

    if (month < 10)
        clock += "0";

    clock += month + "-";

    if (day < 10)
        clock += "0";

    clock += day + " ";
    
    if(hh < 10)
    	clock += "0";
    clock += hh + ":";
    
    if(mm < 10)
    	clock += "0";
    clock += mm + ":";
    
    if(ss < 10)
    	clock += "0";
    clock += ss;

    return (clock);
}

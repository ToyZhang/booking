var price;
var totalPrice;
var selectCount;
var mcId;
var roomTypeId;
window.onload = function(){
	init();
}
function init(){
	var params = getRequestParam();
	mcId = params["mcId"];
	roomTypeId = params["roomTypeId"];
	var startDate = params["begDate"];
	$("#my-startDate").html(startDate);
	var endDate = params["endDate"];
	$("#my-endDate").html(endDate);
	var requestPath = getRequestPath();
	$.ajax({
        //请求方式
        type:"post",
        //请求路径
        url:requestPath+'book/queryInfo',
        //是否异步请求
        async:true,
        //传参
        data:{
            mcId:mcId,
            roomTypeId:roomTypeId,
            startDate:startDate,
            endDate:endDate
        },
        //发送请求前执行方法
//		beforeSend:function(){ },
        //成功返回后调用函数
        success:function(data){
            if(data.ret == 0){
            	var content = data.content;
            	var days = content.days;
				$("#stayDay").html(days);
				var name = content.cname;
				$("#room_name").html(name);
            	price = content.totalPrice;  
            	var shopName = content.shopName;
            	var imgName = content.imgName;
            	var img = document.createElement("img");
				//拼接访问路径
				var requestUrl = RESOURCE_NGINX_DOMAIN_NAME + "/image/"+shopName+"/"+name+"/"+imgName;
            	img.src = requestUrl;
            	img.className = "am-img-responsive";
            	img.style = "margin:auto";
            	$("#room_img").append(img);
            	var count = content.count - 0;
            	if(count != null || count != "" || count !== undefined){
            		for(var i=0;i<count;i++){
	            		var option = document.createElement("option");
	            		option.value = i+1;
	            		option.innerHTML = (i+1)+" 间";
	            		$("#doc-select-2").append(option);
            		}
            		selectRoomCount();
            	}
            }
        },
        //调用出错执行的函数
//		error:function(){ }
  });
}
function selectRoomCount(){
    debugger;
    if($("#doc-select-2").val() == null ||
        $("#doc-select-2").val() == "" ||
        $("#doc-select-2").val()=== undefined){
        $("#orderPrice").html("总价:￥0");
        return;
    }
	selectCount = $("#doc-select-2 option:selected").val() - 0;
	totalPrice = selectCount * price;
	$("#orderPrice").html("总价:￥"+totalPrice);
}
function onclick_order(){
	var price = totalPrice;
	var roomName = $("#room_name").html();
	var startDate = $("#my-startDate").html();
	var endDate = $("#my-endDate").html();
	var count = selectCount;
	var customer = $("#orderName").val();
    var checkName = true;
    var checkPhone = true;
    var checkId = true;
	if(customer == null || customer == "" || customer === undefined){
        checkName = false;
	}
	var phoneReg = /^[0-9]{11,12}$/; //验证电话号码有效性
	var phone = $("#orderTel").val();
	if(!phoneReg.exec(phone)){
	    checkPhone = false;
	}
	$("#phone-msg").html("");
	var idNum = $("#orderIDCard").val();
	var idNumReg = /^[0-9]{17}[a-zA-Z0-9]$/;
	if(!idNumReg.exec(idNum)){
	    checkId = false;
	}
	if(checkName == true){
        $("#customer-msg").html("");
    }else {
        $("#customer-msg").html("联系人信息为空");
    }
    if(checkPhone == true){
        $("#phone-msg").html("");
    }else {
        $("#phone-msg").html("联系电话信息有误");
    }
    if(checkId == true){
        $("#idCard-msg").html("");
    }else {
        $("#idCard-msg").html("身份证信息有误");
    }
    if(checkName == false || checkPhone == false || checkId == false){
        return;
    }
	saveCookie("roomName",roomName);
	saveCookie("customer",customer);
	var url = "../templates/WfrmOrderIdentify.html?price="+price
	+"&startDate="+startDate+"&endDate="+endDate+"&count="+count+"&phone="+phone+"&idNum="+idNum
	+"&mcId="+mcId+"&roomTypeId="+roomTypeId;
	window.location.href = url;
}

var price;
var totalPrice;
var selectCount;
window.onload = function(){
	init();
}
function init(){
	var params = getRequestParam();
	var mcId = params["mcId"];
	var roomTypeId = params["roomTypeId"];
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
            startDate:"2016-06-29",//startDate,
            endDate:"2016-06-30"//endDate
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
            	var request = getRequestPath().split(":");
				var ip = request[1].substring(2);
				//拼接访问路径
				var requestUrl = "http://"+ip+":808" +  //该端口号需与nginx设置一致
						"/image/"+shopName+"/"+name+"/"+imgName;
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
	var phone = $("#orderTel").val();
	var idNum = $("#orderIDCard").val();
	saveCookie("roomName",roomName);
	saveCookie("customer",customer);
	var url = "../templates/WfrmOrderIdentify.html?price="+price
	+"&startDate="+startDate+"&endDate="+endDate+"&count="+count+"&phone="+phone+"&idNum="+idNum;
	window.location.href = url;
}

var mcId;
var dinerId;
var openId;
var mpId;
window.onload = function(){
	var params = getRequestParam();
	mcId = params["mcid"];
	dinerId = params["dinerid"];
	openId = params["openid"];
	mpId = params["mpid"];
	debugger;
    var startDate = currentTime();
    var endDate = yestodayTime(startDate);
	init(startDate,endDate);
}
/**
 * 初始化时间按钮
 */
$(function() {
	debugger;
    var startDate = currentTime();
    var endDate = yestodayTime(startDate);
    $('#my-startDate').text(startDate);
    $('#my-endDate').text(endDate);
    var $alert = $('#my-alert');
    $('#my-start').datepicker().
      on('changeDate.datepicker.amui', function(event) {
        $alert.hide();
        $('#my-startDate').text($('#my-start').data('date'));
        $(this).datepicker('close');
  	});

    $('#my-end').datepicker().
      on('changeDate.datepicker.amui', function(event) {
        if (event.date.valueOf() < startDate.valueOf()) {
          $alert.find('p').text('结束日期应大于开始日期！').end().show();
        } else {
            $alert.hide();
            endDate = new Date(event.date);
            $('#my-endDate').text($('#my-end').data('date'));
            var start = $('#my-startDate').html();
            var end = $('#my-endDate').html();
            $("#myRoomList").empty();
            init(start,end);
        }
        $(this).datepicker('close');
  	});
});

function init(startDate,endDate){
	var requestPath = getRequestPath();
	$.ajax({
        //请求方式
        type:"post",
        //请求路径
        url:requestPath+'hotelDetail/queryHotelDetail',
        //是否异步请求
        async:true,
        //传参
        data:{
            mcId:mcId,
            startDate:startDate,
            endDate:endDate
        },
        //发送请求前执行方法
//		beforeSend:function(){ },
        //成功返回后调用函数
        success:function(data){
            if(data.ret == 0){
                var content = data.content;
                var name = content.name; //商户名称
                $("#hotel_name").html(name);
                var address = content.address; //商户地址
                $("#hotel_address").html(address);
                var mcId = content.mcid; //商户id
                var phone = content.phone; //商户电话
                $("#hotel_phone").html(phone);
                var roomList = content.roomInfoList; //房间列表
                for(var i=0; i<roomList.length; i++){
                	var roomTypeId = roomList[i].croomtypeid;
                	var price = roomList[i].mprice;
                	var roomName = roomList[i].cname;
                	var imgName = roomList[i].imgName;
                	createItem(roomTypeId,price,roomName,imgName,name);
                } 
            }
            $('p').on('click',function(e){
				var orderRoom = e.target;
				var roomTypeId = orderRoom.id;
				if(roomTypeId != null && roomTypeId != "" && roomTypeId !== undefined){
					onclick_order(roomTypeId);
				}
			});
        },
        //调用出错执行的函数
//		error:function(){ }
   });
   
}/**
  * 创建房间模块
  * @param {Object} roomTypeId
  * @param {Object} price
  * @param {Object} roomName
  * @param {Object} imgName
  * @param {Object} shopName
  * Example:
  * <li class="am-g am-list-item-desced am-list-item-thumbed am-list-item-thumb-left">
	    <div class="am-u-sm-4 am-list-thumb">
	        <img src="../images/hotelDefault.jpg"/>
	    </div>
	    <p class="am-badge am-badge-warning am-text-lg">预订</span>
	    <span class="am-badge am-badge-warning am-text-lg">￥200</span> 
	    <strong>商务大床房</strong>
	</li>
  */
function createItem(roomTypeId,price,roomName,imgName,shopName){
	var li = document.createElement("li");
	li.className = "am-g am-list-item-desced am-list-item-thumbed am-list-item-thumb-left";
	//房间图片
	var imgDiv = document.createElement("div");
	imgDiv.className = "am-u-sm-4 am-list-thumb";
	var img = document.createElement("img");
	//根据请求路径获取服务器所在ip
	var request = getRequestPath().split(":");
	var ip = request[1].substring(2);
	var requestUrl = "http://"+ip+":808" +  //该端口号需与nginx设置一致
						"/image/"+shopName+"/"+roomName+"/"+imgName;
	img.src = requestUrl;
	img.onerror = function(){
		img.src = "../images/hotelDefault.jpg";
	};
	imgDiv.appendChild(img);
	li.appendChild(imgDiv);
	//预定按钮
	var pOrder = document.createElement("p");
	pOrder.clsName = "am-badge am-badge-warning am-text-lg";
	pOrder.innerHTML = "预定";
	pOrder.id = roomTypeId;
	pOrder.style = "cursor:pointer";
	pOrder.className = "am-badge am-badge-warning am-text-lg";
	li.appendChild(pOrder);
	//价格
	var pPrice = document.createElement("p");
	pPrice.innerHTML = "￥"+price;
	pPrice.className = "am-badge am-badge-warning am-text-lg";
	li.appendChild(pPrice);
	//房间名称
	var strong = document.createElement("strong");
	strong.innerHTML = roomName;
	li.appendChild(strong);
	$("#myRoomList").append(li);
}
function onclick_order(roomTypeId){
	var begDate = $('#my-startDate').text().trim();
	var endDate = $('#my-endDate').text().trim();
	var errStatus = $('#my-alert').css('display');  //错误提示信息 none 隐藏   block 显示
	if(errStatus == "none"){
		var url = "../templates/WfrmBookDetail.html?mcId="+mcId
		+"&roomTypeId="+roomTypeId+"&begDate="+begDate+"&endDate="+endDate;
		window.location.href = url;
	}
}
/*
 * 显示酒店设施页面
 */
function onclick_hotel(){
	var url = "../templates/WfrmHotelFacility.html?mcid="+mcId;
	window.location.href = url;
}

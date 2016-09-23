var mcId;
var dinerId;
var openId;
var mpId;
window.onload = function(){
	console.info("酒店详情");
	test();
	//init();
}
/**
 * 初始化时间按钮
 */
$(function() {
    var startDate = new Date();
    var endDate = new Date();
    var $alert = $('#my-alert');
    $('#my-start').datepicker().
      on('changeDate.datepicker.amui', function(event) {
        if (event.date.valueOf() > endDate.valueOf()) {
          $alert.find('p').text('开始日期应小于结束日期！').end().show();
        } else {
          $alert.hide();
          startDate = new Date(event.date);
          $('#my-startDate').text($('#my-start').data('date'));
        }
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
        }
        $(this).datepicker('close');
  	});
});
function test(){
	var data = {"ret":0,
"content":{
"hoteImg":null,
"phone":"58361686",
"roomInfoList":[{"croomtypeid":"00010000000014","mprice":"122.00","cname":"单人套房"},
	{"croomtypeid":"00010000000013","mprice":"122.00","cname":"双人套房"},
	{"croomtypeid":"00010000000001","mprice":"122.00","cname":"标准间"},
	{"croomtypeid":"00010000000006","mprice":"0.01","cname":"豪华单间"},
	{"croomtypeid":"00010000000011","mprice":"122.00","cname":"豪华商务单"}],
"name":"吾享餐饮O2O",
"address":"天津市南开区华苑产业园区榕苑路7号",
"mcid":"961"}
};
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
                	createItem(roomTypeId,price,roomName);
                }
                $('p').on('click',function(e){
					var orderRoom = e.target;
					var roomTypeId = orderRoom.id;
					if(roomTypeId != null && roomTypeId != "" && roomTypeId !== undefined){
						onclick_order(roomTypeId);
					}
				});
}
function init(){
	var params = getRequestParam();
	mcId = params["mcid"];
	dinerId = params["dinerid"];
	openId = params["openid"];
	mpId = params["mpid"];
	var startDate = CurentTime();
	var endDate = yestodayTime();
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
                	createItem(roomTypeId,price,roomName);
                }
            }           
        },
        //调用出错执行的函数
//		error:function(){ }
    });
	console.info("获取到的参数",mcId,dinerId,openId,mpId);
}/**
  * 
  * @param {Object} roomTypeId
  * @param {Object} price
  * @param {Object} roomName
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
function createItem(roomTypeId,price,roomName){
	var li = document.createElement("li");
	li.className = "am-g am-list-item-desced am-list-item-thumbed am-list-item-thumb-left";
	//房间图片
	var imgDiv = document.createElement("div");
	imgDiv.className = "am-u-sm-4 am-list-thumb";
	var img = document.createElement("img");
	//TODO 需要接口返回房间图片名称   src格式为 ip:808/image/商户名称/房间id/图片名称
	img.src = "../images/hotelDefault.jpg";
	
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
	var begDate = $('#my-startDate').text();
	var endDate = $('#my-endDate').text();
	var errStatus = $('#my-alert').css('display');  //错误提示信息 none 隐藏   block 显示
	if(errStatus == "none"){
		//TODO 跳转到订单页面 去支付
	}
}
function CurentTime() {
    var now = new Date();
    var year = now.getFullYear();       //年
    var month = now.getMonth() + 1;     //月
    var day = now.getDate();
    var hh = now.getHours();            //时
    var mm = now.getMinutes();          //分
    var ss = now.getSeconds();           //秒

    var clock = "";

    if (month < 10)
        clock += "0";

    clock += month + "-";

    if (day < 10)
        clock += "0";

    clock += day + " ";

    return (clock);
}
function yestodayTime() {
    var now = new Date();
    var year = now.getFullYear();       //年
    var month = now.getMonth() + 1;     //月
    var day = now.getDate();
    var hh = now.getHours();            //时
    var mm = now.getMinutes();          //分
    var ss = now.getSeconds();           //秒

    var clock = "";

    if (month < 10)
        clock += "0";

    clock += month + "-";

    if (day < 10)
        clock += "0";

    clock += day + 1 + " ";

    return (clock);
}
var map;
var gcId;
$(function(){
	//获取相关参数
	var params = getRequestParam();
	gcId = params['gcid'];
	//根据ip自动定位
	map = new BMap.Map("allmap"); //创建地图实例
	var point = new BMap.Point(0,0); //创建坐标点
	map.centerAndZoom(point,12); //初始化地图 设置中心店，显示级别
	var name;
	function myFun(result){
		var cityName = result.name;
		map.setCenter(cityName);
		getCityName(cityName);
	}
	function getCityName(cityName){ //获取根据ip定位城市名称
		name = cityName;
		$("#cityName").html(name);
		//初始化地图中酒店数据
		init(name,gcId);
	}
	var myCity = new BMap.LocalCity();
	myCity.get(myFun);
	//初始化城市选择框
	$(".city").CityPicker();
})
function init(name,gcId){
	var requestPath = getRequestPath();
    $.ajax({
        //请求方式
        type:"post",
        //请求路径
        url:requestPath+RESOURCE_PROJECT_NAME+'mapBook/getHotelList',
        //是否异步请求
        async:true,
        //传参
        data:{
            gcId:gcId,
            cityName:name
        },
        //发送请求前执行方法
//		beforeSend:function(){ },
        //成功返回后调用函数
        success:function(data){
            if(data.ret == 0){
                var hotelList= data.content;
                for(var i=0; i<hotelList.length; i++){
					var info = hotelList[i];
					createHotel(info);
				}
            }

        },
        //调用出错执行的函数
//		error:function(){ }
    });
}
/**
 * 切换城市
 * @param {Object} name
 */
function changeLocalCity(name){
	map.clearOverlays();//清空原来的标注
	init(name,gcId);
	map.centerAndZoom(name,12);
}
/**
 * 创建酒店图层
 */
function createHotel(info){
	//酒店信息
	var mcId = info.mcid;
	var hotelName = info.name;
	var hotelAddr = info.address;
	var hotelLongitude = info.longtitude;
	var hoteLatitude = info.latitude;
	var hotelTel = info.ordertel;
	//房间信息
	var roomInfo = info.roomInfoList;
	var div = document.createElement("div"); //房间信息容器
	div.className = "hotelBox";
	var titleTag = document.createElement("div");//酒店名称标签
	titleTag.className = "hotelName";
	titleTag.innerHTML = hotelName;
	div.appendChild(titleTag);
	//酒店描述标签
	var desTag = document.createElement("div");
	desTag.className = "hotelAddr";
	desTag.innerHTML = hotelAddr;
	div.appendChild(desTag);
	//酒店电话标签
	var telTag = document.createElement("a");
	telTag.innerHTML = hotelTel;
	div.appendChild(telTag);
	//房间容器
	for(var i=0 ; i<roomInfo.length ; i++){
		var roomName = roomInfo[i].cname;
		var roomPrice = roomInfo[i].mprice;
		var roomTypeId = roomInfo[i].croomtypeid;
		var roomstatus = roomInfo[i].roomstatus - 0; //房型数量充足可预订 1，房型数量不足不可预订 2
		var beg = getDay(0);
		var end = getDay(1);
		var room = "-zty-" + mcId + "-zty-" + roomTypeId + "-zty-" + beg + "-zty-" + end;
		if(roomstatus == 1){
			var content = "<div style='float:left;width:100px;text-align:center;' onclick = 'onclick_room(this.id)' 							id='"+room+"'><img src = '../images/icon_room.svg'/>"+
					"<div style='color:#4FBFFF;'>"+roomName+"</div>"+
					"<div style='color:#FFA520;'>￥ "+roomPrice+"</div>"
		"</div>";
		var tag = document.createElement("div");
		tag.innerHTML = content;
		div.appendChild(tag);
		}
	}
	//创建标记图层
	var marker = new BMap.Marker(new BMap.Point(hotelLongitude,hoteLatitude));
	map.addOverlay(marker);
	//创建标记点击后窗口内容
	var infoWindow = new BMap.InfoWindow(div);
	//标记添加点击事件
	marker.addEventListener("click", function () {
		this.openInfoWindow(infoWindow); 
		marker.setAnimation(BMAP_ANIMATION_BOUNCE); //图标跳动效果
	});
	
}
/**
 * 房间点击事件
 */
function onclick_room(roomInfo){
	var info = roomInfo.split("-zty-");
	var mcId = info[1];
	var typeId = info[2];
	var beg = info[3];
	var end = info[4];
	var url = "../templates/WfrmBookDetail.html?mcId="+mcId
		+"&roomTypeId="+typeId+"&begDate="+beg+"&endDate="+end;
	window.location.href = url;
}

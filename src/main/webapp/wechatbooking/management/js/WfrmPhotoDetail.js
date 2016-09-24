window.onload = function(){
	init();
}
function init(){
	var a = document.cookie;
	console.info("cookie内容",a);
	var request = getRequestPath().split(":");
	var ip = request[1].substring(2);
	var roomType = getCookie("roomName");
	var shopName = getCookie("shopName");
	var imgName = getCookie("detailImg");
	var requestUrl = "http://"+ip+":808" +  //该端口号需与nginx设置一致
						"/image/"+shopName+"/"+roomType+"/"+imgName;
	var img = document.getElementById("displayImg");
	img.src = requestUrl;
	var detail = document.getElementById("imgInfo");
	var roomName;
	if(roomType == "outdoor_scene"){
		roomName = "酒店外景";
	}else{
		roomName = roomType;
	}
	detail.innerHTML = shopName + "/" + roomName + "/" + imgName;
}

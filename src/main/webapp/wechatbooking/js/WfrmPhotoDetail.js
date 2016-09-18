window.onload = function(){
	init();
}
function init(){
	var request = getRequestPath().split(":");
	var ip = request[1].substring(2);
	var roomType = getCookie("roomType");
	var shopName = getCookie("shopName");
	var imgName = getCookie("detailImg");
	var requestUrl = "http://"+ip+":808" +  //该端口号需与nginx设置一致
						"/image/"+shopName+"/"+roomType+"/"+imgName;
	var detail = document.getElementById("imgInfo");
	var roomName = getRoomName(roomType);
	detail.innerHTML = shopName + "/" + roomName + "/" + imgName;
	var img = document.getElementById("displayImg");
	img.src = requestUrl;
}

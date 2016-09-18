/**
 * 保存cookie
 * @param name
 * @param value
 * @returns {boolean}
 */
function  saveCookie(name,value) {
    document.cookie = name + '=' +encodeURIComponent(value);
    return true;
}
/**
 * 获取cookie中指定参数
 * @param cookieName
 * @returns value
 */
function getCookie(cookieName) {
    var strCookie = document.cookie;
    var arrCookie = strCookie.split("; ");
    for(var i = 0; i < arrCookie.length; i++){
        var arr = arrCookie[i].split("=");
        if(cookieName == arr[0]){
            return decodeURIComponent(arr[1]);
        }
    }
    return "";
}
/**
 * 获取房间名称
 * @param {Object} roomType 房间类型
 */
function getRoomName(roomType){
	switch(roomType){
		case "standard_room":
			return "标准间";
		case "single_suite":
			return "单人套房";
		case "deluxe_single_room":
			return "豪华单间";
		case "double_suite":
			return "双人套房";
		case "deluxe_commerce_room":
			return "豪华商务单人间";
		case "outdoor_scene":
			return "酒店外景";
		default:
			return "";
	}
}
/**
 * 获取后台接口请求路径
 */
function getRequestPath(){
	var localPaths = (window.document.location.href).split("/",3);
    var requestPath;
    for(var i = 0; i < localPaths.length; i++){
    	if(i == 2){
    		requestPath = "http://"+localPaths[i]+"/";
    	}
    }
    return requestPath;
}
/**
 * 参数非空判断
 * @param params 待检查参数
 */
function checkEmpty(params){
	if(params == null || params === undefined){
		return false;
	}
	for(var i=0; i<params.length; i++){
		if(params[i] == null || params[i] == "" || params[i] === undefined){
			return false;
		}
	}
	return true;
}

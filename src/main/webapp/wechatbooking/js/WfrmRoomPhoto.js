window.onload = function(){
	console.info("加载房型图片管理");
}
function loadPage(src){
	window.open(src,'displayContent');
}
/**
 * 上传图片
 * @param {Object} roomType
 */
function onclick_btnUploadPhoto(roomType){
	if(roomType == null || roomType == "" || roomType == undefined){
		console.error("WfrmRoomPhoto roomType is null");
	}
	if(roomType == "standard_room"){
		var displatSrc = "../templates/WfrmUploadPhoto.html";
		document.cookie="roomType="+"standard_room";
		loadPage(displatSrc);
	}
	if(roomType == "single_suite"){
		var displatSrc = "../templates/WfrmUploadPhoto.html";
		document.cookie="roomType="+"single_suite";
		loadPage(displatSrc);
	}
	if(roomType == "deluxe_single_room"){
		var displatSrc = "../templates/WfrmUploadPhoto.html";
		document.cookie="roomType="+"deluxe_single_room";
		loadPage(displatSrc);
	}
	if(roomType == "double_suite"){
		var displatSrc = "../templates/WfrmUploadPhoto.html";
		document.cookie="roomType="+"double_suite";
		loadPage(displatSrc);
	}
	if(roomType == "deluxe_commerce_room"){
		var displatSrc = "../templates/WfrmUploadPhoto.html";
		document.cookie="roomType="+"deluxe_commerce_room";
		loadPage(displatSrc);
	}
}

/**
 * 查看图片
 * @param {Object} roomType
 */
function onclick_btnLookPhoto(roomType){
	if(roomType == null || roomType == "" || roomType == undefined){
		console.error("WfrmRoomPhoto roomType is null");
	}
	if(roomType == "standard_room"){
		var displatSrc = "../templates/WfrmLookPhoto.html";
		document.cookie="roomType="+"standard_room";
		loadPage(displatSrc);
	}
	if(roomType == "single_suite"){
		var displatSrc = "../templates/WfrmLookPhoto.html";
		document.cookie="roomType="+"single_suite";
		loadPage(displatSrc);
	}
	if(roomType == "deluxe_single_room"){
		var displatSrc = "../templates/WfrmLookPhoto.html";
		document.cookie="roomType="+"deluxe_single_room";
		loadPage(displatSrc);
	}
	if(roomType == "double_suite"){
		var displatSrc = "../templates/WfrmLookPhoto.html";
		document.cookie="roomType="+"double_suite";
		loadPage(displatSrc);
	}
	if(roomType == "deluxe_commerce_room"){
		var displatSrc = "../templates/WfrmLookPhoto.html";
		document.cookie="roomType="+"deluxe_commerce_room";
		loadPage(displatSrc);
	}
}

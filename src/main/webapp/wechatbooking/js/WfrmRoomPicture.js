window.onload=function(){
	console.info("加载 房型图片管理");
}
function onclick_uploadPhoto(roomType){
	if(roomType == "" || roomType == undefined || roomType == null){
		return;
	}
	if(roomType == "standard_room"){
		window.open('../templates/WfrmUploadPhoto.html','displayContent');
		console.info("标准间上传图片");
	}
	if(roomType == "single_suite"){
		console.info("单人套房上传图片");
	}
	if(roomType == "deluxe_single_room"){
		console.info("豪华单间上传图片");
	}
	if(roomType == "double_suite"){
		console.info("双人套房上传图片");
	}
	if(roomType == "commerce_single_room"){
		console.info("豪华商务单人间上传图片");
	}
}
function onclick_catchPhoto(){
	console.info("查看图片");
}

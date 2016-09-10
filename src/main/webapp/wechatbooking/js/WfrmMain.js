window.onload=function(){
	var value = document.cookie;
	console.info("获取到的值",value);
	init();
}
function init(){
	//1.查询后台获取数据
	//2.商户名称赋值
	$("#shopTitle").html("test");
	//3.加载首页
	onclick_topPage();
}
function loadPage(src){
	 window.open(src,'displayContent');
}
/**
 * 首页 点击事件
 */
function onclick_topPage() {
	var displatSrc = "../templates/WfrmHomePage.html";
	loadPage(displatSrc);
}
/**
 * 酒店信息维护 点击事件
 */
function onclick_hotelInfoMaintain(){
	console.info("点击酒店信息维护");
}
/**
 * 房型图片管理 点击事件
 */
function onclick_roomCaptureManage(){
	console.info("点击房型图片管理");
}
/**
 * 酒店外景图管理 点击事件
 */
function onclick_hotelOutCaptureManage(){
	console.info("点击酒店外景图管理");
}
/**
 * 酒店服务设施维护 点击事件
 */
function onclick_hotelServiceMatain(){
	console.info("点击 酒店服务设施维护");
}
/**
 * 订单统计
 */
function onClick_orderCount(){
	console.info("订单统计");
}
/**
 * 订单详情
 */
function onclick_orderDetail(){
	console.info("订单详情");
}
function logout() {
	window.location.href='WfrmLogin.html';
}

          
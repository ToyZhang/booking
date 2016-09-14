window.onload = function(){
	init();
}
function init(){
	var requestPath = getRequestPath();
	var type = getCookie("roomType");
	var name = getCookie("shopName");
	$.ajax({
		//请求方式
		type:"post",
		//请求路径
		url:requestPath+'uploadPhoto/queryPhoto',
		//是否异步请求
		async:true,
		//传参
		data:{
			shopName:name,
			roomType:type
		},
		//发送请求前执行方法
//		beforeSend:function(){ },
		//成功返回后调用函数
		success:function(data){
			var imgList = $("#imgList");
			var imgs = data.content;
			for( var i=0; i < imgs.length;i++){
				var imgName = imgs[i];
				createImgTag(name,type,imgName);
			}
			$('img').on('click',function(e){
				detailImg(e);
			});
		},
		//调用出错执行的函数
//		error:function(){ }
	});
}
/**
 * 
 * @param {Object} shopName 商户名称
 * @param {Object} roomType 房间类型
 * @param {Object} imgName 图片名称
 */
function createImgTag(shopName,roomType,imgName){
	var ul = $("#imgList");
	var li = document.createElement("li");
	var span = document.createElement("span");
	var img = document.createElement("img");
	img.className = 'am-img-thumbnail am-img-bdrs';
	//根据请求路径获取服务器所在ip
	var request = getRequestPath().split(":");
	var ip = request[1].substring(2);
	//拼接访问路径
	var requestUrl = "http://"+ip+":808" +  //该端口号需与nginx设置一致
						"/image/"+shopName+"/"+roomType+"/"+imgName;
	img.src = requestUrl;
	span.appendChild(img);
	var descDiv = document.createElement("div");
	descDiv.className = "gallery-desc";
	span.appendChild(descDiv);
	li.appendChild(span);
	var delDiv = document.createElement("div");
	delDiv.style = "cursor:pointer";
	delDiv.className = 'gallery-title';
//	delDiv.id = "room_gallery_btnDel";
//	$("#room_gallery_btnDel").click = deleteImg();
//	delDiv.onclick = deleteImg();
	var delIcon = document.createElement("span");
	delDiv.appendChild(delIcon);
	li.appendChild(delDiv);
	ul.append(li);
	/* Example:
	<li>
 		<span>
 			<img class='am-img-thumbnail am-img-bdrs' 						src='http://127.0.0.1:808/image/testZTY/standard_room/14541223424598127.jpg' onclick="detailImg()"/>
 			<div class='gallery-desc'>
 				
 			</div>
 		</span>
 		<div style='cursor:pointer' class='gallery-title' id='btndel' onclick="deleteImg()">
 			<span class='am-icon-trash am-icon-sm'></span>
 		</div>
 	</li>*/
}
function detailImg(){
	
}
function deleteImg(){
	console.info("删除图片");
}


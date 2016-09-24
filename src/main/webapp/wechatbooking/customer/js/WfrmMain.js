var mcId;
var gcId;
var dinerId;
var openId;
var mpId;
window.onload = function(){
	query();
}
/**
 * 查询显示数据
 */
function query(){
	//获取请求参数
	var params = getRequestParam();
	gcId = params["gcid"];
	dinerId = params["dinerid"];
	openId = params["openid"];
	mpId = params["mpid"];
	var values = [gcId,dinerId];
	if(!checkEmpty(values)){
		return;
	}
	var requestPath = getRequestPath();
	$.ajax({
        //请求方式
        type:"post",
        //请求路径
        url:requestPath+'hotelDetail/queryHotelList',
        //是否异步请求
        async:true,
        //传参
        data:{
            gcId:gcId
        },
        //发送请求前执行方法
//		beforeSend:function(){ },
        //成功返回后调用函数
        success:function(data){
            if(data.ret == 0){
                var content = data.content;
                for(var i=0;i<content.length;i++){
                	var address = content[i].address;
                	mcId = content[i].mcid;
                	var name = content[i].name;
                	var imgName = content[i].hoteImg;
                	createHotelItem(address,name,imgName);
                }
                $('a').on('click',function(e){
					var hotel = e.target;
					onclick_hotel(hotel);
				});
            }
            
        },
        //调用出错执行的函数
//		error:function(){ }
    });
}
/**
 * 创建酒店
 * @param {Object} address 酒店地址
 * @param {Object} name 酒店名称
 * @param {Object} imgName 酒店图片名称
 * Example:<li  class='am-g am-list-item-desced am-list-item-thumbed am-list-item-thumb-left'>
	                    <div class='am-u-sm-4 am-list-thumb'>
	                       <img src="http://localhost:808/image/123.jpg" />
	                    </div>
	                    <div class=' am-u-sm-8 am-list-main'>
	                    	<h3 class='am-list-item-hd'>
	                            <a>吾享网络测试 传值mcid=1221 dinerid = 订单id</a>
	                        </h3>
	                        <div class='am-list-item-text' style='width: 250px; padding: 10px;'>
	                            	天津市南开区
	                        </div>
	                        <div class='am-list-item-hd'>
	                            <p class='am-text-xxl am-text-warning'>
	                                
	                            </p>
	                        </div>
	                    </div>
                	</li>
 */
function createHotelItem(address,name,imgName){
	var ul = document.getElementById("hotel_list");
	var li = document.createElement("li");
	li.className = "am-g am-list-item-desced am-list-item-thumbed am-list-item-thumb-left";
	var imgDiv = document.createElement("div");
	imgDiv.className = "am-u-sm-4 am-list-thumb";
	//拼接访问路径
	var img =document.createElement("img");
	//根据请求路径获取服务器所在ip
	var request = getRequestPath().split(":");
	var ip = request[1].substring(2);
	var requestUrl;
	if(imgName == null || imgName == "" || imgName === undefined){
		requestUrl = "../images/hotelDefault.jpg";
	}else{
		requestUrl = "http://"+ip+":808" +  //该端口号需与nginx设置一致
					"/image/"+name+"/outdoor_scene/"+imgName;
	}
	img.src = requestUrl;
	imgDiv.appendChild(img);
	li.appendChild(imgDiv);
	//酒店主要内容
	var divMain = document.createElement("div");
	divMain.className = "am-u-sm-8 am-list-main";
	//酒店名称
	var h3 = document.createElement("h3");
	h3.className = "am-list-item-hd";
	var a = document.createElement("a");
	a.innerHTML = name;
	a.style = "cursor:pointer";
	h3.appendChild(a);
	divMain.appendChild(h3);
	//酒店地址
	var addressDiv = document.createElement("div");
	addressDiv.className = "am-list-item-text";
	addressDiv.style = "width: 250px; padding: 10px;";
	addressDiv.innerHTML = address;
	divMain.appendChild(addressDiv);
	//提示内容
	var tipDiv = document.createElement("div");
	tipDiv.className = "am-list-item-hd";
	var p = document.createElement("p");
	p.className = "am-text-xxl am-text-warning";
	tipDiv.appendChild(p);
	divMain.appendChild(tipDiv);
	li.appendChild(divMain);
	ul.appendChild(li);
}
function onclick_hotel(){
	debugger;
	if((gcId != null && gcId != "" && gcId !== undefined)
		&& (dinerId != null && dinerId != "" && dinerId !== undefined)
		&& (openId == null || openId == "" || openId === undefined)
		&& (mpId == null || mpId == "" || mpId === undefined)){
		saveCookie("customer-mcId",mcId);
		saveCookie("dinerId",dinerId);
		window.location.href = "../templates/WfrmMyOrder.html";
	}else{
		var url = "../templates/WfrmHotelDetail.html?mcid="+mcId+"&dinerid="+dinerId+"&openid="+openId+"&mpid="+mpId;
		window.location.href = url;
	}
	
}

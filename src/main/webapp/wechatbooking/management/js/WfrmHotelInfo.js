window.onload = function(){
	var $mcId;
	init();
}
/**
 * 初始化页面数据
 */
function init(){
	var requestPath = getRequestPath();
    $mcId = getCookie("mcId");
    $.ajax({
        //请求方式
        type:"post",
        //请求路径
        url:requestPath+RESOURCE_PROJECT_NAME+'hotelInfo/queryInfo',
        //是否异步请求
        async:true,
        //传参
        data:{
            mcId:$mcId
        },
        //发送请求前执行方法
//		beforeSend:function(){ },
        //成功返回后调用函数
        success:function(data){
            var hotel = data.content;
            var hotelName = hotel.hotelName;
            var phoneNum = hotel.phoneNum;
            var address = hotel.address;
            var desp = hotel.description;
            document.getElementById("hotel_name").value = hotelName;
            document.getElementById("phone_num").value = phoneNum;
            document.getElementById("hotel_address").value = address;
            document.getElementById("hotel_desp").value = desp;         	
        },
        //调用出错执行的函数
//		error:function(){ }
    });
}
function onclick_btnSave(){
	var hotelName = $("#hotel_name").val();
	var saveIcon = document.getElementById("saveIcon");
	saveIcon.style = "display:''";
    if(hotelName == null || hotelName == "" || hotelName === undefined){
    	onblur_hotelName();
    	saveIcon.style = "display:none";
    	return;
   	}
	var requestPath = getRequestPath();
    var phoneNum = $("#phone_num").val();
    var address = $("#hotel_address").val();
    var description = $("#hotel_desp").val();
    $.ajax({
        //请求方式
        type:"post",
        //请求路径
        url:requestPath+RESOURCE_PROJECT_NAME+'hotelInfo/updateInfo',
        //是否异步请求
        async:true,
        //传参
        data:{
            mcId:$mcId,
            hotelName:hotelName,
            phoneNum:phoneNum,
            address:address,
            description:description
        },
        //发送请求前执行方法
//		beforeSend:function(){ },
        //成功返回后调用函数
        success:function(data){
            if(data.ret == 0){
                saveIcon.style = "display:none";
                var modal = $('#my-alert');
                modal.modal('toggle');
            }
        },
        //调用出错执行的函数
//		error:function(){ }
    });
	
}
function onblur_hotelName(){
	var hotelName = $("#hotel_name").val();
	if(hotelName == null || hotelName == "" || hotelName === undefined){
    	document.getElementById("hotel_name_box").className = "am-form-group am-form-error am-form-icon am-form-feedback am-u-sm-8 am-u-md-4";
   }else{
		document.getElementById("hotel_name_box").className = "am-form-group am-form-icon am-form-feedback am-u-sm-8 am-u-md-4";
	}
}

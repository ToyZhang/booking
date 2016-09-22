window.onload = function(){
	var dinerId = getCookie("dinerId");
	var mcId = getCookie("customer-mcId");
	var requestPath = getRequestPath();
	$.ajax({
        //请求方式
        type:"post",
        //请求路径
        url:requestPath+'myOrder/query',
        //是否异步请求
        async:true,
        //传参
        data:{
            mcId:mcId,
            dinerId:dinerId
        },
        //发送请求前执行方法
//		beforeSend:function(){ },
        //成功返回后调用函数
        success:function(data){
        	/**
        	 * 返回值 cancelList  finishList  noFinishList
        	 * 
				clinker:"杀毒"
				cname:"豪华单间"
				dtbegdate:"2016-04-18"
				dtenddate:"2016-04-19"
				icount:1
				id:"WX-201604181634553455-124"
				ilinktel:"15620824880"
				money:0.01
				mprice:0.01
				orderno:"WX-201604181634553455-124"
				stayDays:1
        	 */
            if(data.ret == 0){
            	console.info("返回内容",data.content);
                var finishList = data.content.finishList;
                var noFinishList = data.content.noFinishList;
                var cancelList = data.content.cancelList;
                for(var i=0 ; i< noFinishList.length ; i++){
                	var name = noFinishList[i].cname;
                	var id = noFinishList[i].id;
//              	var startDate = 
//              	createItem();
                }
            }
        },
        //调用出错执行的函数
//		error:function(){ }
    });
}
/**
 * Example:
 *    <div class='am-panel am-panel-default'>
                    <div class='am-panel-bd'>
                        <strong>{0}</strong>
                        <br />
                        <p>
                            入住 <strong>{4}</strong> (住{6}晚) </p>
                        <p>
                            <i class='am-icon-info am-icon-sm'></i>&nbsp;&nbsp;{8}<br />
                        </p>
                        <p>
                            <i class='am-icon-phone am-icon-sm'></i>&nbsp;&nbsp;{3}<br />
                         <p>
                            <i class='am-icon-user am-icon-sm'></i>&nbsp;&nbsp;{2}<br /></p>
                        <hr />
                        <p>
                            订单状态：到店支付 ￥{1}</p>
                        <button type='button' class='am-btn am-btn-warning am-btn-xl am-btn-block'
                        	onclick="onclick_pay()">
                            立即支付
                        </button>
                        <button type='button' class='am-btn am-btn-warning am-btn-xl am-btn-block' 							onclick="onclick_cancelOrder()">
                            取消订单
                        </button>
                    </div>
                </div>
 */
function createItem(){
	
}
function onclick_pay(){
	console.info("立即支付");
}
function onclick_cancelOrder(){
	console.info("取消订单");
}

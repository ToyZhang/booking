$().ready(function(){
	$('#example').DataTable({
//	  	language: {
//	       "lengthMenu": "每页 _MENU_ 条记录",
//	       "zeroRecords": "没有找到记录",
//	       "info": "第 _PAGE_ 页 ( 总共 _PAGES_ 页 )",
//	       "infoEmpty": "无记录",
//	       "infoFiltered": "(从 _MAX_ 条记录过滤)"
//		},
	    initComplete: function () {	
	        var api = this.api();
	        api.columns().indexes().flatten().each(function (i) {                     
	
	            var column = api.column(5);
	            var select = $('<select><option value=""></option></select>').appendTo($(column.footer()).empty()).on('change', function () {
	            	var val = $.fn.dataTable.util.escapeRegex(
	                	$(this).val()
	            	);
	            	column.search(val ? '^' + val + '$' : '', true, false).draw();
	        	});
	            column.data().unique().sort().each(function (d, j) {
	                select.append('<option value="' + d + '">' + d + '</option>')
		            });
		        });
		   }
});
	initData();
})
function initData(){
	var requestPath = getRequestPath();
	var mcId = getCookie("mcId");
	$.ajax({
        //请求方式
        type:"post",
        //请求路径
        url:requestPath+'orderDetail/query',
        //是否异步请求
        async:true,
        //传参
        data:{
            mcId:mcId
        },
        //发送请求前执行方法
//		beforeSend:function(){ },
        //成功返回后调用函数
        success:function(data){
            if(data.ret == 0){
                var content = data.content;
                for(var i=0; i<content.length; i++){
                	var id = content[i].id;
                	var icount = content[i].icount;
                	var dtorderdate = content[i].dtorderdate;
                	var cname = content[i].cname;
                	var clinker = content[i].clinker;
                	var mprice = content[i].mprice;
                	var ilinktel = content[i].ilinktel;
                	var dtbegdate = content[i].dtbegdate;
                	var dtenddate = content[i].dtenddate;
                	var stateid = content[i].stateid;
                	var idcard = content[i].idcard;
                  	createItem(id,icount,dtorderdate,cname,clinker,mprice,ilinktel,dtbegdate,dtenddate,stateid,idcard)
                }
            }
        },
        //调用出错执行的函数
//		error:function(){ }
    });
}
/**
 * 创建table中显示记录
 * @param {Object} id 订单号
 * @param {Object} icount 预订数量
 * @param {Object} dtorderdate 预订时间
 * @param {Object} cname 预订房型
 * @param {Object} clinker 客户姓名
 * @param {Object} mprice 预定价格
 * @param {Object} ilinktel 联系电话
 * @param {Object} dtbegdate 到店时间
 * @param {Object} dtenddate 离店时间
 * @param {Object} stateid 订单状态
 * @param {Object} idcard 身份证号
 */
function createItem(id,icount,dtorderdate,cname,clinker,mprice,ilinktel,dtbegdate,dtenddate,stateid,idcard){
	var stateName = getStatusName(stateid);
	var detail =  createDetail(id,icount,dtorderdate,cname,clinker,mprice,ilinktel,dtbegdate,dtenddate,stateName,idcard);
	$('#example').DataTable().row.add([
		cname,
		"<span class='am-active'>"+clinker+"</span>",
		"<span class='am-active'><a>"+mprice+"</a></span>",
		ilinktel,
		dtbegdate + "~" + dtenddate,
		stateName,
		"<button class='am-btn am-btn-primary' id='my-popover'" +
        "data-am-popover=\"{content:"+detail+",trigger:\'hover\'}\">订单详情</button>"
	]).draw();		
	/**
	 * Example:
	 * 	<tr>
			<td>123</td>
			<td class='am-active'>311</td>
			<td class='am-active'>
				<a>1231</a>
			</td>
			<td>
				<a>123</a>
			</td>
			<td>123</td>
			<td>1231</td>
			<td>
				<button class='am-btn am-btn-primary' id='my-popover' 
					data-am-popover='{content:"订号&nbsp;:&nbsp;1231231",trigger:"hover"}'>订单详情</button>
			</td>
		</tr>
	 */
}
/**
 * 创建订单详情中显示内容
 * @param {Object} id 订单号
 * @param {Object} icount 预订数量
 * @param {Object} dtorderdate 预订时间
 * @param {Object} cname 预订房型
 * @param {Object} clinker 客户姓名
 * @param {Object} mprice 客房价格
 * @param {Object} ilinktel 联系电话
 * @param {Object} dtbegdate 到店时间
 * @param {Object} dtenddate 离店时间
 * @param {Object} stateName 订单状态
 * @param {Object} idcard 身份证号
 */
function createDetail(id,icount,dtorderdate,cname,clinker,mprice,ilinktel,dtbegdate,dtenddate,stateName,idcard){
	var info = "\'订单号&nbsp;:&nbsp;"+ id
		+"&lt;br&gt;身份证&nbsp;:&nbsp;" + idcard
		+"&lt;br&gt;预订时间&nbsp;:&nbsp;" + dtorderdate
		+"&lt;br&gt;客户姓名&nbsp;:&nbsp;" + clinker
		+"&lt;br&gt;预订房型&nbsp;:&nbsp;" + cname
		+"&lt;br&gt;预订价格&nbsp;:&nbsp;" + mprice
		+"&lt;br&gt;预订数量&nbsp;:&nbsp;" + icount
		+"&lt;br&gt;联系电话&nbsp;:&nbsp;" + ilinktel
		+"&lt;br&gt;到店时间&nbsp;:&nbsp;" + dtbegdate
		+"&lt;br&gt;离店时间&nbsp;:&nbsp;" + dtenddate+"\'";
	return info;
}
/**
 * 获取订单状态名称
 * @param {Object} status
 */
function getStatusName(status) {
	var state = status - 0;
    switch (state){
        case 0:
            return "未到店";
        case 1:
            return "未已入住";
        case 2:
            return "已入住";
        case 3:
            return "取消";
        default:
            return "";
    }
}




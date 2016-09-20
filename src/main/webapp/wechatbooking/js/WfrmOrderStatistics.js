window.onload = function(){
	init();
}
function init(){
	var queryValue = [];
	var queryDate = [];
	var requestPath = getRequestPath();
	var mcId = getCookie("mcId");
	var interval = 7;
	var stateId = 2;
	$.ajax({
		//请求方式
		type:"post",
		//请求路径
		url:requestPath+'orderStatistics/queryInfo',
		//是否异步请求
		async:true,
		//传参
		data:{
			mcId:mcId,
			interval:interval,
			stateId:stateId
		},
		//发送请求前执行方法
//		beforeSend:function(){ },
		//成功返回后调用函数
		success:function(data){
		    debugger;
			if(data.ret == 0){
				var content = data.content;
				var newOrderCount = content.newOrderCount;
				var cancelCount = content.cancelOrderCount;
				var allCount = content.allOrderCount;
				document.getElementById('newOrderCount').innerHTML = newOrderCount;
				document.getElementById('cancelOrderCount').innerHTML = cancelCount;
				document.getElementById('allOrderCount').innerHTML = allCount;
				var statisticsList = content.statisticsItems;
				for (var i=0; i< statisticsList.length; i++){
					queryValue.push(statisticsList[i].count);
					queryDate.push(statisticsList[i].dtorderdate);
                }
			}
			if(queryValue.length != 0 && queryDate.length != 0){
                initEchart(queryValue,queryDate);
            }
		},
		//调用出错执行的函数
//		error:function(){ }
	});
}
function initEchart(queryValue,queryDate){
	require.config({
                paths: {
                    echarts: '../api/Echart/dist'
                }
           });
    require(
            [
                'echarts',
                'echarts/chart/line', // 使用柱状图就加载bar模块，按需加载
            ],
            function(ec){
            	console.info("value",queryValue);
				console.info("date",queryDate);
            	// 基于准备好的dom，初始化echarts图表
	            var myChart = ec.init(document.getElementById('main'));
	            var option = {
	                tooltip: {
	                    trigger: 'axis'
	                },
	                legend: {
	                    data: ['已入住订单']
	                },
	                toolbox: {
	                    show: false,
	                    feature: {
	                        mark: { show: false },
	                        dataView: { show: true, readOnly: false },
	                        magicType: { show: true, type: ['line', 'bar'] },
	                        restore: { show: true },
	                        saveAsImage: { show: true }
	                    }
	                },
	                calculable: true,
	                xAxis: [
						{
				            type: 'category',
				            boundaryGap: false,
				            data: queryDate
						}
					],
	                yAxis: [
				        {
				            type: 'value',
				            axisLabel: {
				                formatter: 0 //不写死报错
				            }
				        }
					],
	                series: [
				        {
				            name: '已入住订单',
				            type: 'line',
				            data: queryValue,
				            markPoint: {
				                data: [
				                    { type: 'max', name: '最大值' },
				                    { type: 'min', name: '最小值' }
				                ]
				            },
				            markLine: {
				                data: [
				                    { type: 'average', name: '平均值' }
				                ]
				            }
				        },
					]
	            };
	            // 为echarts对象加载数据 
	            myChart.setOption(option);
            }
           	
    );
}
function onclick_btnDate_7(){
	console.info("点击7天");
}
function onclick_btnDate_14(){
	console.info("点击14天");
}
function onclick_btnDate_30(){
	console.info("点击30天");
}
function onclick_btnArrive(){
	console.info("选择已到达");
}
function onclick_btnCancel(){
	console.info("选择取消");
}
function onclick_btnNoArrive(){
	console.info("选择未到达");
}

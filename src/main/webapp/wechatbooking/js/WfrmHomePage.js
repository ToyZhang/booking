window.onload =function(){
	init();
}
function init(){
	document.getElementById('finishOrderCount').innerHTML = 23;
	document.getElementById('allOrderCount').innerHTML = 123;
	document.getElementById('cancelOrderCount').innerHTML = 12;
	initEchart();
}
/*
 * Description:初始化历史数据图表
 */
function initEchart(){
	require.config({
        paths: {
            echarts: '../api/Echart/dist'
        }
    });
    require(
            [
				'echarts',
                'echarts/chart/pie',
                'echarts/chart/line',
                'echarts/chart/bar',// 使用柱状图就加载bar模块，按需加载
            ],
            function (ec) {
                // 基于准备好的dom，初始化echarts图表
                var myChart = ec.init(document.getElementById('historyInfo'));
                var idx = 1;
 
                var option = {
                    tooltip: {
                    	trigger: 'axis',
						axisPointer: {
                            type: 'shadow'
                        }
                    },
                    legend: {
						data: ['未到店', '已入住', '取消']
                    },
                    toolbox: {
                        show: true,
                        orient: 'vertical',
                        y: 'center',
                        feature: {
                            mark: { show: false },
                            magicType: { show: true, type: ['line', 'bar', 'stack', 'tiled'] },
                            restore: { show: true },
                            saveAsImage: { show: true }
                        }
                    },
                    xAxis: [
                        {
                            type: 'category',
                            data: [
                            	"2016-01-06",
								"2016-02-18",
								"2016-02-19",
								"2016-04-11",
								"2016-04-12",
								"2016-04-14",
								"2016-04-15",
								"2016-04-18"
                            ]
                        }
                    ],
                    yAxis: [
						{
				            type: 'value',
				            splitArea: { show: true }
				        }
                    ],
                    series: [
                        {
                        	"name":"未到店",
                        	"type":"bar",
                        	"stack":"总量",
                        	"data":[0,1,5,6,3,5,2,10]
                        },
                        {
                        	"name":"已入住",
                        	"type":"bar",
                        	"stack":"总量",
                        	"data":[1,2,3,4,5,6,7,8]
                        },
                        {
                        	"name":"取消",
                        	"type":"bar",
                        	"stack":"总量",
                        	"data":[1,2,3,4,5,6,7,8]
                        }
                    ]
                };
 
                // 为echarts对象加载数据 
                myChart.setOption(option);
            }
        );
}
/**
 * Description:重写格式化时间方法
 * Example:
 * 		var now = new Date();
 * 		var nowFmt = now.Format("yyyy-MM-dd hh:mm:ss");
 * 		console.info("格式化当前时间",nowFmt);
 */
Date.prototype.Format = function (fmt) {
            //author: meizz 
            var o =
            	{
				    "M+": this.getMonth() + 1, //月份 
				    "d+": this.getDate(), //日 
				    "h+": this.getHours(), //小时 
				    "m+": this.getMinutes(), //分 
				    "s+": this.getSeconds(), //秒 
				    "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
				    "S": this.getMilliseconds() //毫秒 
				};
            if (/(y+)/.test(fmt))
                fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
            for (var k in o)
                if (new RegExp("(" + k + ")").test(fmt))
                    fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + 						o[k]).substr(("" + o[k]).length)));
            return fmt;
        }
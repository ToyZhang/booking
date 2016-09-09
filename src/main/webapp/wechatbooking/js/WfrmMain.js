window.onload=function(){
	init();
}
function init(){
	//1.查询后台获取数据
	//2.商户名称赋值
	$("#shopTitle").html("teset");
	//3.完成订单  预约订单 取消订单 三个选项赋值个数
	
	//4.给历史数据图表赋值
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
                var myChart = ec.init(document.getElementById('main'));
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
 * 首页 点击事件
 */
function onclick_topPage() {
	console.info("点击首页");
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
function logout() {
	window.location.href='WfrmLogin.html';
}

          
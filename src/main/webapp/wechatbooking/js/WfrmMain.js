function logout() {

                $.get("Logout.ashx", {}, function (msg) {

                    if (msg == "ok") {

                        window.location.reload();

                    }
                    else {
                        alert(msg);
                    }

                }, "text");

            }

     

    
        </script>
        <script src="http://echarts.baidu.com/build/dist/echarts.js"></script>
        <script type="text/javascript">

        // 路径配置
        require.config({
            paths: {
                echarts: 'http://echarts.baidu.com/build/dist'
            }
        });
        // 使用
        require(
            [
                'echarts',
                'echarts/chart/pie',
                'echarts/chart/line',
                'echarts/chart/bar', // 使用柱状图就加载bar模块，按需加载
            ],
            function (ec) {
                // 基于准备好的dom，初始化echarts图表
                var myChart = ec.init(document.getElementById('main'));
                var idx = 1;

              var  option = {
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
                    calculable: true,
                    xAxis: [
        {
            type: 'category',
            data: [<% = dateHtml %>]
        }
    ],
                    yAxis: [
        {
            type: 'value',
            splitArea: { show: true }
        }
    ],
                    grid: {
                        x2: 40
                    },
                  
                  
                   <% = valueHtml %>
                };


                // 为echarts对象加载数据 
                myChart.setOption(option);
            });

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
                    fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
            return fmt;
        }
          
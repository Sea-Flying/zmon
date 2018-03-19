var api_url = "http://10.1.62.243/zabbix/api_jsonrpc.php";
var api_admin = "admin";
var api_pass = "zabbix";
var selectedhost = "";
var selecteditem_1 = "";
var selecteditem_2 = "";
var params_host_get = {"output":["hostid","host"]};
var params_item_get = {"hostids":"","output":["itemid","key_","name"],"application":"Wonders","search":{"key_":""}};
var params_history_get = {"history":0,"itemids":"","time_form":"","time_till":"","sortfield":"clock"};
var item2_list = {
 'system.cpu.' :
    '<option value="load[all,avg1]">使用率</option>',
 'vm.memory.':
    '<option value="size[pused]">占用率</option>' +
    '<option value="size[used]">占用量</option>',
 'vfs.fs.':
    '<option value="size[C:,pused]">C盘使用百分比</option>'+
    '<option value="size[D:,pused]">D盘使用百分比</option>',
 'net.if.total':
    '<option value="[Realtek PCIe FE Family Controller]">流量</option>',
 'perf_counter':
    '<option value="[~\\Process(chrome)\\Elapsed Time~]"> Chrome使用时长</option>'
};

function wrap_item_params(origin,host,item_1,item_2) {
    origin.hostids = host;
    item_2= item_2.replace(/\~/g,'"');
    origin.search.key_ = item_1 + item_2;
    return origin;
}

function wrap_histroy_params(origin,itemid,type,time_from,time_till){
    origin.itemids = itemid;
    origin.history = type;
    origin.time_from = time_from;
    origin.time_till = time_till;
    return origin;
}

function range(start, stop, step) {
    if (typeof stop == 'undefined') {
        // one param defined
        stop = start;
        start = 0;
    }

    if (typeof step == 'undefined') {
        step = 1;
    }

    if ((step > 0 && start >= stop) || (step < 0 && start <= stop)) {
        return [];
    }

    var result = [];
    for (var i = start; step > 0 ? i < stop : i > stop; i += step) {
        result.push(i);
    }
    return result;

};

function timestampToTime(timestamp) {
    var date = new Date(timestamp * 1000);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
    Y = date.getFullYear() + '/';
    M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '/';
    D = date.getDate() + ' ';
    h = date.getHours() + ':';
    m = date.getMinutes() + ':';
    s = date.getSeconds();
    return Y+M+D+h+m+s;
}


var c_line_data = {
    labels: [],
    datasets: [
        {
            label: "",
            fillColor: "rgba(220,220,220,0.2)",
            strokeColor: "rgba(220,220,220,1)",
            pointColor: "rgba(220,220,220,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(220,220,220,1)",
            data: []
        }
    ]
};

var c_line_options = {

    ///Boolean - Whether grid lines are shown across the chart
    scaleShowGridLines : true,

    //String - Colour of the grid lines
    scaleGridLineColor : "rgba(0,0,0,.05)",

    //Number - Width of the grid lines
    scaleGridLineWidth : 1,

    //Boolean - Whether to show horizontal lines (except X axis)
    scaleShowHorizontalLines: true,

    //Boolean - Whether to show vertical lines (except Y axis)
    scaleShowVerticalLines: true,

    //Boolean - Whether the line is curved between points
    bezierCurve : true,

    //Number - Tension of the bezier curve between points
    bezierCurveTension : 0.4,

    //Boolean - Whether to show a dot for each point
    pointDot : true,

    //Number - Radius of each point dot in pixels
    pointDotRadius : 4,

    //Number - Pixel width of point dot stroke
    pointDotStrokeWidth : 1,

    //Number - amount extra to add to the radius to cater for hit detection outside the drawn point
    pointHitDetectionRadius : 20,

    //Boolean - Whether to show a stroke for datasets
    datasetStroke : true,

    //Number - Pixel width of dataset stroke
    datasetStrokeWidth : 2,

    //Boolean - Whether to fill the dataset with a colour
    datasetFill : true,

    //String - A legend template
    legendTemplate : "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].strokeColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>"

};

var c_data_0 = {
    labels: ["January", "February", "March", "April", "May", "June", "July", "Aug" ,"Sept"],
    datasets: [
        {
            label: "My First dataset",
            fillColor: "rgba(220,220,220,0.2)",
            strokeColor: "rgba(220,220,220,1)",
            pointColor: "rgba(220,220,220,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(220,220,220,1)",
            data: [65, 59, 80, 81, 56, 55, 11, 40, 44 ,12]
        }
    ]
};
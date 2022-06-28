var baseUrl = 'http://IP:51980/';
var token = 'token';
var dashboardId = '3eebe0d5-42d6-4341-9d70-03ba39abe228';


function dashboardb(dashboardId,divId,scenario,dp) {

    const viewerLiteInstance = WynBi.createViewerLite({
        token: token,
        baseUrl: baseUrl,
        dashboardId: dashboardId,
        "scenario": scenario,
        "size": "fitToScreen",
        "openfulldashboardmode": "newwindow",
        dp: dp
    });

    viewerLiteInstance.initialize({
        container: document.querySelector('#viewerlite-container'),
    }).then((dash) => {
        document.title = dash.getName();
        $(divId).html('');
        const dashboardDom = document.querySelector(divId);

        dash.connect(dashboardDom);

        //点击事件
        dash.on('selectionChange', (dashboardId, sourceId, filter) => {
            var dp={
                dq:[]
            };
            filter.forEach((x)=>{
                dp.dq.push(x['客户地区']);
            })
            if (divId == '#dashboard-1') {
                dashboardb(dashboardId, '#dashboard-2', 'column-1', JSON.stringify(dp))
                dashboardb(dashboardId, '#dashboard-3', 'line', JSON.stringify(dp))
            }else
            if (divId == '#dashboard-2') {
                dashboardb(dashboardId, '#dashboard-1', 'column-1', JSON.stringify(dp))
                dashboardb(dashboardId, '#dashboard-3', 'line', JSON.stringify(dp))
            }
        });
        dash.refresh();
    });
    window.addEventListener('beforeunload', (e) => {
        viewerLiteInstance.destroy();
    });
}



appenddp('{"dq":[]}');

$('#btn_cx').click(function (){
    var dp='{"dq":["'+$('#diqu').val()+'"]}';
    if ($('#diqu').val()==""){
        dp='{"dq":[]}';
    }
    appenddp(dp);
});

function appenddp(dp){
    dashboardb(dashboardId,'#dashboard-1','column',dp)
    dashboardb(dashboardId,'#dashboard-2','column-1',dp)
    dashboardb(dashboardId,'#dashboard-3','line',dp)
}

$('.nav-link').click(function (){
    if ($(this).attr('class').indexOf('active')==-1){

        $('.nav-item').find('a').attr('class','nav-link');
        $(this).attr('class','nav-link active');

        var dp='{"dq":["'+$(this).text()+'"]}';
        appenddp(dp)
    }
});

function onset(){
    var dp='{"dq":["'+$('select option:selected').val()+'"]}';
    dashboardb(dashboardId,'#dashboard-1','column',dp)
};


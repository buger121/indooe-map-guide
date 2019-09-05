
const $ = function(selector){
    return document.querySelector(selector)
}

var startNavi = false
var clickCount = 0;
var lastCoord = null;
var curfnum = null;
var mapCoord = null;
var h = 1;

map.on('mapClickNode', function(e){
    mapCoord = e.hitCoord;
    if (e.nodeType == 4) {
        curfnum = e.floor;
        h = 1;
    }
    if (e.nodeType == 5 && startNavi == true) {
        h = e.data_.RoomHigh;
        curfnum = e.FloorNum;
        var starter = $('#startText');
        var ender = $('#endText');
        if (clickCount == 0) {
            starter.value = e.name;
            startPoint.x = e.hitCoord.x;
            startPoint.y = e.hitCoord.y;
            startPoint.fnum = e.FloorNum;
            clickCount++;
        } else if (clickCount == 1) {
            ender.value = e.name;
            endPoint.x = e.hitCoord.x;
            endPoint.y = e.hitCoord.y;
            endPoint.fnum = e.FloorNum;
            navi = drawRoutes(startPoint, endPoint);
            clickCount++;
        } else {
            //第三次点击的时候进行下一个循环
            starter.value = e.name;
            startPoint.x = e.hitCoord.x;
            startPoint.y = e.hitCoord.y;
            startPoint.fnum = e.FloorNum;
            ender.value = '';
            navi.clearAll();
            clickCount = 1;
            lastCoord = null;
        }
    }
})
var startnav = $('#startnav');
startnav.addEventListener('click', function(){
    startNavi = !startNavi;
    if(navi != null){
        navi.clearAll();
    }
    if (startNavi) {
        var router = $('#router');
        router.style.display = "block";
        startnav.innerText = "清除路径"
    } else {
        var router = $('#router');
        router.style.display = "none";
        $('#startText').value = '';
        $('#endText').value = '';
        startnav.innerText = "查找路径"
    }
})

function drawRoutes(startPoint, endPoint) {
    //1.创建导航对象实例
    navi = new esmap.ESNavigation({
        map: map,
        ladderType:1,  //跨层方案选择。1:距离最近(默认),2:电梯 3.楼梯 4.扶梯
        lineStyle: {   //路径规划线样式配置
            color: '#33cc61',
            //设置线为导航线样式
            lineType: esmap.ESLineType.ESARROW,
            // lineType: esmap.ESLineType.FULL,            
            lineWidth: 6,
            offsetHeight: 0.5,
            smooth: true,
            seeThrough: false,
            noAnimate: false
            //设置边线的颜色   
            // godEdgeColor: '#920000'
            //设置箭头颜色
            // godArrowColor: "#ff0000"
        },
    });
    //2.确定起点和终点
    //确定起点
    var center = map.center
    navi.setStartPoint({
        x: startPoint.x,
        y: startPoint.y,
        fnum: startPoint.fnum,
        height: 2,
        url: 'image/start.png',
        size: 64
    });
    //确定终点
    navi.setEndPoint({
        x: endPoint.x,
        y: endPoint.y,
        fnum: endPoint.fnum,
        height: 2,
        url: 'image/end.png',
        size: 64
    });
    //3.调用导航对象画线函数，显示路径规划
    navi.drawNaviLine();

    return navi;
}

// var guideBtn = $('#guide')
// guideBtn.addEventListener('click', function(){
//     navi = guide(startPoint, endPoint)
    
// })
//语音导航
function guide(startPoint, endPoint){
    //1.创建导航对象实例
    navi = new esmap.ESNavigation({
        map: map,
        ladderType:1,  //跨层方案选择。1:距离最近(默认),2:电梯 3.楼梯 4.扶梯
        lineStyle: {   //路径规划线样式配置
            color: '#33cc61',
            //设置线为导航线样式
            lineType: esmap.ESLineType.ESARROW,
            // lineType: esmap.ESLineType.FULL,            
            lineWidth: 6,
            offsetHeight: 0.5,
            smooth: true,
            seeThrough: false,
            noAnimate: false
            //设置边线的颜色   
            // godEdgeColor: '#920000'
            //设置箭头颜色
            // godArrowColor: "#ff0000"
        },
        locationMarkerUrl: 'image/pointer.png',   //定位标注图片地址
        locationMarkerSize: 150,    //定位标注尺寸大小
        speed: 5,   //模拟导航速度
        followAngle: true,  //地图是否跟随旋转
        followPosition: true,  //地图视角是否跟随位置
        followGap:3,      //导航视角跟随间隔(单位:/s)
        tiltAngle: 30,   //模拟导航时的倾斜角
        audioPlay:true,  //是否开启语音播报
        // scaleLevel:0,   //模拟导航时的放大等级
        // mode:2,         //mode=1:人行(默认),mode=2：车行
        offsetHeight: 1,    //定位标注的高度
        // scaleAnimate: true,        //导航开始后地图放大的过渡效果
        // isMultiFloors: false           //跨楼层导航时是否自动切换、改变聚焦楼层
    });
    //2.确定起点和终点
    //确定起点
    var center = map.center
    navi.setStartPoint({
        x: startPoint.x,
        y: startPoint.y,
        fnum: startPoint.fnum,
        height: 2,
        url: 'image/start.png',
        size: 64
    });
    //确定终点
    navi.setEndPoint({
        x: endPoint.x,
        y: endPoint.y,
        fnum: endPoint.fnum,
        height: 2,
        url: 'image/end.png',
        size: 64
    });
    //导航开始
    navi.simulate();
    navi.on("complete",function(){
        console.log("模拟导航结束")
        navi.clearAll()
    })
    return navi
}




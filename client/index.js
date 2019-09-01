var map = new esmap.ESMap({
    container:document.getElementById('map-container'), //地图显示容器
    token:"100701",  //打开地图对应的token
    mapDataSrc: "data/", //地图数据位置，与推荐目录相同可省略
    mapThemeSrc: "data/theme/", //地图主题位置，与推荐目录相同可省略 
    visibleFloors: [1,2],             //初始显示楼层
    focusFloor: 1,                      //初始聚焦楼层
});
map.openMapById(472653);                 //根据ID打开地图
var center = map.center;  //取地图的中心墨卡托坐标

//声明楼层控件配置参数
var ctlOpt = new esmap.ESControlOptions({
    position: esmap.ESControlPositon.RIGHT_TOP, 
    imgURL: "image/wedgets/"
});
//声明放大缩小控制控件
var ctlOpt1 = new esmap.ESControlOptions({
    position: esmap.ESControlPositon.LEFT_TOP,
    //位置x,y的偏移量
    offset: {
        x: -2,
        y: 28
    },
    imgURL: "image/wedgets/"
});

//2.在地图加载完成事件中新建控件对象
map.on('loadComplete', function () {
    //创建楼层控件
    var floorControl = new esmap.ESScrollFloorsControl(map, ctlOpt);
    var zoomControl = new esmap.ESZoomControl(map, ctlOpt1)
    //单层多层切换按钮
    var toolControl = new esmap.ESToolControl(map);

    map.rotateAngle = 0;    //设置地图的旋转角度
    map.tiltAngle = 50;      //设置地图的倾斜角(最大72°)
    map.scaleLevelTo(20);   //缩放到第10等级，共24等级
    
    map.focusFloorNum = 1;//切换聚焦楼层方法1,如果是多楼层同时显示了,其它楼层不隐藏  
    map.changeFocusFloor(2);//切换聚焦楼层方法2,如果是多楼层同时显示了,其它楼层隐藏不显示  
    map.visibleFloorNums=[1,2]; //切换可见楼层

});
map.showScaler = false;
map.showCompass = false;

//2维模式
$('#btn2D').on('click', function () {
    map.viewMode = esmap.ESViewMode.MODE_2D;//2维模式
});
//3维模式
$('#btn3D').on('click', function () {
    map.viewMode = esmap.ESViewMode.MODE_3D;; //3维模式
});

map.on('mapClickNode', function(event) {
    console.log(event.hitCoord)
})

//图片标注
map.on('loadComplete',function(){
    //新建一个图片标注图层
    var layer = new esmap.ESLayer(esmap.ESLayerType.IMAGE_MARKER);
    //创建一个图片标注实例
    im = new esmap.ESImageMarker({
		x: center.x - 1,
		y: center.y - 1,   //如果不添加x和y，则默认坐标在地图中心。
		url: 'image/user.png',  //图片标注的图片地址
		size: 64,   			//图片大小 或者 size:{w:32,h:64},
		spritify:true,			//跟随地图缩放变化大小，默认为true，可选参数
		height:6,    			//距离地面高度
		showLevel: 20,  		//地图缩放等级达到多少时隐藏,可选参数
		seeThrough: true,		//是否可以穿透楼层一直显示,可选参数
		//angle:30,  	//如果设置了就是固定marker角度，与地图一起旋转。(size需要重新设置)
		id: 2017,   			//id，可自定义
		name: 'myMarker'   		//name可自定义
    });
    //添加到楼层对象
    layer.addMarker(im);              //将imageMarker添加到图层
	var floorLayer = map.getFloor(1)  //获取第一层的楼层对象
    floorLayer.addLayer(layer);       //将图层添加到楼层对象
    
    // layer.remove(im);   //删除某一个标注
})

//线标注
map.on('loadComplete', function(){
    //1.确定坐标点
    var center = map.center;  //取地图的中心墨卡托坐标
    //定义两个点
    var v1 = {
        x: center.x + 5,   
        y: center.y + 5,
        fnum: 2,           //楼层
        offset: 0          //偏移量
    }
    var v2 = {
        x: center.x - 10,
        y: center.y - 10,
        fnum: 2,
        offset: 0
    }
    var v3 = {
        x: center.x + 5,
        y: center.y ,
        fnum: 2,
        offset: 0
    }
    //2.创建线标注对象
    //点集合
    var points = [v1, v2, v3];
    //配置线标注样式
    var lineStyle = {
        lineWidth: 3,
        alpha: 0.8,
        offsetHeight: 0,
        lineType: esmap.ESLineType.FULL
    }
    //创建线标注对象
    var linemark = new esmap.ESLineMarker(1, points, lineStyle)
    //如果要让线标注支持点击，并在点击时返回一定的信息，请绑定datas对象
    linemark.datas = {
        name: 'myMarker'
    }
    //3.画线
    map.drawLineMark(linemark)
    //4.删除
    map.clearLineMarkById(1)
})

//定位标注绘制
map.on('loadComplete', function(){
    //获取位置信息
    var str = '';
    var xhr = new XMLHttpRequest();
    // xhr.open('get', 'https://indoor-map-guide-9527.herokuapp.com/lastline', false);
    xhr.open('get', 'http://indoor-map-guide-9527.herokuapp.com/lastline', false);
    xhr.send(null);
    if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
        console.log(xhr.responseText)
        str = xhr.responseText
    } else {
        console.log('获取位置信息失败')
    }

    var diffX = parseInt(str.split(",")[0].split(":")[1]);
    var diffY = parseInt(str.split(",")[1].split(":")[1]);
    
    //1.新建一个定位标注实例
    var lm = new esmap.ESLocationMarker({
        url: 'image/pointer.png',
        size: 100,
        height: 30  
    });
    //2.添加到地图
    map.addLocationMarker(lm);
    //3.设置位置
    var center = map.center;
    lm.setPosition({
        x: center.x + diffX,
        y: center.y + diffY,
        fnum: 2,  
        height: 1      //离地面的偏移量
    })
    //更新地图标注
    // lm.rotateTo(-40);//有过渡效果的更新定位标注方向
    // lm.direction = -40; //改变定位标注的方向
    // lm.moveTo({
    //     x: map.center.x + 10,
    //     y: map.center.y + 10,
    //     fnum: 2,  
    //     height: 1,      //离地面的偏移量
    //     time: 3
    // });

    //4.删除定位标注
    // map.removeLocationMarker(lm)
})

//地图数据信息检索
map.on('loadComplete', function(){
    //1.配置检索范围
    var queryFloors = "all"   //全楼层检索。也可以传入某个楼层，或者一组楼层(数组)
    //2.配置检索字段
    //根据id或者name精确查询。如查询ID为56的poi
    var queryParams = {
        nodeType: esmap.ESNodeType.FACILITY, //nodeType指定为poi类型
        ID: 56,
        //name: '出口'  或者根据name查询
    };
    //3.调用地图查询函数，并对查询结果进行操作
    //示例: 查询三，四，五楼所有poi:
    esmap.ESMapUtil.search(map,1,{nodeType:esmap.ESNodeType.FACILITY},function(e){
        // console.log(e)
    })
})

//地图路径规划
// map.on('loadComplete', function(){
//     //1.创建导航对象实例
//     var navi = new esmap.ESNavigation({
//         map: map,
//         ladderType:1,  //跨层方案选择。1:距离最近(默认),2:电梯 3.楼梯 4.扶梯
//         lineStyle: {   //路径规划线样式配置
//             color: '#33cc61',
//             //设置线为导航线样式
//             lineType: esmap.ESLineType.ESARROW,
//             // lineType: esmap.ESLineType.FULL,            
//             lineWidth: 6,
//             offsetHeight: 0.5,
//             smooth: true,
//             seeThrough: false,
//             noAnimate: false
//             //设置边线的颜色   
//             // godEdgeColor: '#920000'
//             //设置箭头颜色
//             // godArrowColor: "#ff0000"
//         },
//     });
//     //2.确定起点和终点
//     //确定起点
//     var center = map.center
//     navi.setStartPoint({
//         x: center.x,
//         y: center.y,
//         fnum: 1,
//         height: 2,
//         url: 'image/start.png',
//         size: 64
//     });
//     //确定终点
//     navi.setEndPoint({
//         x: center.x + 10,
//         y: center.y + 10,
//         fnum: 1,
//         height: 2,
//         url: 'image/end.png',
//         size: 64
//     });
//     //3.调用导航对象画线函数，显示路径规划
//     // navi.drawNaviLine();
//     console.log(center.x, center.y)
// })
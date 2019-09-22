class BaseComponent{
    constructor(){
        this.createLocation = this.createLocation.bind(this)
        this.searchModelByName = this.searchModelByName.bind(this)
        this.drawRoutes = this.drawRoutes.bind(this)
    }

    createLocation(map, diffX, diffY){
        //1.新建一个定位标注实例
       var lm = new esmap.ESLocationMarker({
           url: 'image/pointer.png',
           size: 150,
           height: 30  
       });
       //2.添加到地图
       map.addLocationMarker(lm);
       //3.设置位置
       var center = map.center
       lm.setPosition({
           x: center.x + diffX,
           y: center.y + diffY,
           fnum: 1,  
           height: 2
       })
   }

   searchModelByName(map, destination){
        let result = {};
        const queryParams = {
            nodeType: esmap.ESNodeType.MODEL, //nodeType指定为房间类型
            name: destination
        }
        esmap.ESMapUtil.search(map, 'all', queryParams, function (e) {
            result.x = e[0].mapCoord.x;
            result.y = e[0].mapCoord.y;
            result.fnum = e[0].FloorNum;
        })
        return result;
    }

    drawRoutes(map, navi, startPoint, endPoint){
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
         const center = map.center
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
}

export default BaseComponent
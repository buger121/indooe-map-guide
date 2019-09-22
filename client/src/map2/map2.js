import mapCtrl from '../component/map'
//引入css文件
import '../style.css'

var map = new esmap.ESMap({
    container:document.getElementById('map-container'), //地图显示容器
    token:"207415",  //打开地图对应的token
    mapDataSrc: "data/", //地图数据位置，与推荐目录相同可省略
    mapThemeSrc: "data/theme/", //地图主题位置，与推荐目录相同可省略 
    visibleFloors: [1,2],             //初始显示楼层
    focusFloor: 1,                      //初始聚焦楼层
});
map.openMapById(694733);                 //根据ID打开地图

mapCtrl.mapConfig(map)
mapCtrl.mapDraw(map)

const startnav = document.querySelector('#startnav')
startnav.addEventListener('click', function(){
    mapCtrl.search(map)
})
import baseComponent from "./baseComponent";

class MapCtrl extends baseComponent {
  constructor() {
    super();
    this.navi = null; //全局导航对象
    this.startNavi = false; //表示导航状态是否开启
    this.curfnum = 1; //当前楼层
    this.h = 0; //房间高度
    this.mapCoord = {};
    this.lastCoord = {};
    this.clickCount = 0;
    this.startPoint = {};
    this.endPoint = {};
  }

  //地图组件配置
  mapConfig(map) {
    const that = this;
    //声明楼层控件配置参数
    const ctlOpt = new esmap.ESControlOptions({
      position: esmap.ESControlPositon.RIGHT_TOP,
      imgURL: "image/wedgets/"
    });
    map.on("loadComplete", function() {
      //创建楼层控件
      var floorControl = new esmap.ESScrollFloorsControl(map, ctlOpt);
      //单层多层切换按钮
      var toolControl = new esmap.ESToolControl(map);
      map.rotateAngle = 330; //设置地图的旋转角度
      map.tiltAngle = 70; //设置地图的倾斜角(最大72°)
      map.scaleLevelTo(15); //缩放到第10等级，共24等级

      map.focusFloorNum = 1; //切换聚焦楼层方法1,如果是多楼层同时显示了,其它楼层不隐藏
      map.changeFocusFloor(2); //切换聚焦楼层方法2,如果是多楼层同时显示了,其它楼层隐藏不显示
      map.visibleFloorNums = [1, 2]; //切换可见楼层

      map.showScaler = false;
      map.showCompass = true;

      //2维模式
      $("#btn2D").on("click", function() {
        map.viewMode = esmap.ESViewMode.MODE_2D; //2维模式
      });
      //3维模式
      $("#btn3D").on("click", function() {
        map.viewMode = esmap.ESViewMode.MODE_3D; //3维模式
      });
    });
    // 初始化点击事件
    map.on("mapClickNode", function(e) {
      that.mapCoord = e.hitCoord;
      if (e.nodeType == 4) {
        that.curfnum = e.floor;
        that.h = 1;
      }
      if (e.nodeType == 5 && that.startNavi == true) {
        that.h = e.data_.RoomHigh;
        that.curfnum = e.FloorNum;
        const starter = document.getElementById("startText");
        const ender = document.getElementById("endText");
        if (that.clickCount == 0) {
          starter.value = e.name;
        } else if (that.clickCount == 1) {
          ender.value = e.name;
        } else {
          starter.value = e.name;
          ender.value = "";
        }
      }
    });
    //为模型填充点击事件
    const mapModel = document.getElementById("map-container");
    mapModel.addEventListener("click", function() {
      if (!that.startNavi) return;
      const fnum = that.curfnum;
      if (!fnum) return;
      //获取地图视图的边框
      that.show(map, fnum, that.mapCoord);
    });
  }

  navigation(map) {
    this.startNavi = !this.startNavi;
    const router = document.getElementById("router");
    const btn = document.getElementById("startnav");
    if (this.startNavi) {
      router.style.display = "block";
      btn.innerText = "清除路径";
      this.createNavi(map);
    } else {
      router.style.display = "none";
      btn.innerText = "查找路径";
      document.getElementById("startText").value = "";
      document.getElementById("endText").value = "";
      if (this.navi) this.navi.clearAll();
    }
  }

  createNavi(map) {
    if (!this.navi) {
      this.navi = new esmap.ESNavigation({
        map: map,
        locationMarkerUrl: "image/pointer.png",
        locationMarkerSize: 150,
        speed: 1,
        followAngle: true,
        followPosition: true,
        followGap: 3,
        tiltAngle: 30,
        scaleLevel: 0,
        // 设置导航线的样式
        lineStyle: {
          color: "#33cc61",
          //设置线为导航线样式
          lineType: esmap.ESLineType.ESARROW,
          lineWidth: 6,
          //设置边线的颜色
          godEdgeColor: "#920000",
          //设置箭头颜色
          godArrowColor: "#ff0000"
        }
      });
    }
  }

  show(map, fnum, coord) {
    if (coord != null) {
      //第三次点击清楚路径，重新设置起点终点
      if (this.clickCount == 2) {
        this.navi.clearAll();
        this.clickCount = 0;
        this.lastCoord = {};
      }
      //第一次点击添加起点
      if (this.clickCount == 0) {
        this.lastCoord = coord;
        this.startPoint = {
          x: coord.x,
          y: coord.y,
          fnum: fnum
        };
      } else if (this.clickCount == 1) {
        //添加终点并画线
        //判断起点终点是否相同
        if (this.lastCoord.x == coord.x) {
          alert("起点和终点不能相同!,请重新选点");
          return;
        }
        this.endPoint = {
          x: coord.x,
          y: coord.y,
          fnum: fnum
        };
        this.navi = this.drawRoutes(
          map,
          this.navi,
          this.startPoint,
          this.endPoint
        );
      }
      this.clickCount++;
    }
  }

  //绘制初始路线，定位标记
  mapDraw(map) {
    let that = this;
    map.on("loadComplete", function() {
      let xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function() {
        let str, location, destination;
        let obj,
          endPoint = {},
          startPoint = {};
        if (xhr.readyState == 4) {
          if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
            str = xhr.responseText;
            obj = JSON.parse(str);
            location = obj.location;
            destination = obj.destination;
            var diffX = parseInt(location.split(",")[0].split(":")[1]);
            var diffY = parseInt(location.split(",")[1].split(":")[1]);
            that.createLocation(map, diffX, diffY);
            if (destination == "") return;
            endPoint = that.searchModelByName(map, destination);
            const center = map.center;
            startPoint.x = center.x + diffX;
            startPoint.y = center.y + diffY;
            startPoint.fnum = 1;
            that.navi = that.drawRoutes(map, that.navi, startPoint, endPoint);
          } else {
            console.log("请求失败");
          }
        }
      };
      xhr.open("get", "http://49.235.168.9:3000/info", true);
      // xhr.open("get", 'http://localhost:3000/info', true)
      xhr.send(null);
      // xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
      // xhr.send("location=" + 'x:17,y:-8' + "&destination=" + '眼科');
    });
  }
}

export default new MapCtrl();

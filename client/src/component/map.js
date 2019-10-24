import baseComponent from "./baseComponent";

class MapCtrl extends baseComponent {
  constructor() {
    super();
    this.navi = null; //全局导航对象
    this.startNavi = false; //表示导航状态是否开启
    this.curfnum = 1; //当前楼层
    this.h = 0; //房间高度
    this.clickCount = 0;
    this.startPoint = {};
    this.endPoint = {};
  }

  //地图组件配置
  mapConfig(map) {
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

  //搜索路径功能
  search(map) {
    const router = document.querySelector("#router");
    const starter = document.querySelector("#startText");
    const ender = document.querySelector("#endText");
    const startnav = document.querySelector("#startnav");
    this.startNavi = !this.startNavi;
    if (this.navi != null) {
      this.navi.clearAll();
    }
    if (this.startNavi) {
      router.style.display = "block";
      startnav.innerText = "清除路径";
    } else {
      router.style.display = "none";
      starter.value = "";
      ender.value = "";
      startnav.innerText = "查找路径";
      this.clickCount = 0;
      this.startPoint = {};
      this.endPoint = {};
      console.log(this);
    }

    const that = this;
    map.on("mapClickNode", function(e) {
      //   console.log("that: ");
      //   console.log(that);
      console.log(map);
      if (e.nodeType == 4) {
        that.curfnum = e.floor;
        that.h = 1;
      }
      if (e.nodeType == 5 && that.startNavi == true) {
        that.h = e.data_.RoomHigh;
        that.curfnum = e.FloorNum;
        if (that.clickCount == 0) {
          starter.value = e.name;
          that.startPoint = {
            x: e.hitCoord.x,
            y: e.hitCoord.y,
            fnum: e.FloorNum
          };
          that.clickCount++;
          console.log("count:", that.clickCount);
          console.log(that.startPoint, that.endPoint);
        } else if (that.clickCount == 1) {
          ender.value = e.name;
          that.endPoint = {
            x: e.hitCoord.x,
            y: e.hitCoord.y,
            fnum: e.FloorNum
          };
          that.navi = that.drawRoutes(
            map,
            that.navi,
            that.startPoint,
            that.endPoint
          );
          that.clickCount++;
          console.log("count:", that.clickCount);
          console.log(that.startPoint, that.endPoint);
        } else {
          //第三次点击的时候进行下一个循环
          starter.value = e.name;
          that.startPoint = {
            x: e.hitCoord.x,
            y: e.hitCoord.y,
            fnum: e.FloorNum
          };
          that.endPoint = {};
          ender.value = "";
          that.navi.clearAll();
          that.clickCount = 1;
          console.log("count:", that.clickCount);
          console.log(that.startPoint, that.endPoint);
        }
      }
    });
  }
}

export default new MapCtrl();

/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./server.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./dbBase.js":
/*!*******************!*\
  !*** ./dbBase.js ***!
  \*******************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ \"@babel/runtime/helpers/classCallCheck\");\n/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ \"@babel/runtime/helpers/createClass\");\n/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__);\n\n\n\nvar mongoose = __webpack_require__(/*! mongoose */ \"mongoose\");\n\nvar Schema = mongoose.Schema;\n\nvar DbBase =\n/*#__PURE__*/\nfunction () {\n  function DbBase() {\n    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, DbBase);\n\n    this.url = 'mongodb://49.235.168.9:27017/map';\n    this.connect = this.connect.bind(this);\n    this.infoSchema = new Schema({\n      destination: String,\n      location: String\n    });\n  }\n\n  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(DbBase, [{\n    key: \"connect\",\n    value: function connect() {\n      mongoose.connect(this.url, {\n        useNewUrlParser: true\n      });\n      var db = mongoose.connection;\n      db.on('error', console.error.bind(console, 'connection error:'));\n      db.once('open', function () {\n        console.log(\"数据库连接成功\");\n      });\n    }\n  }, {\n    key: \"insert\",\n    value: function insert(infoObj) {\n      var _this = this;\n\n      return new Promise(function (resolve) {\n        var Info = mongoose.model('Info', _this.infoSchema);\n        Info.create(infoObj, function (err, result) {\n          if (err) {\n            console.log(err);\n            return;\n          }\n\n          resolve(result);\n        });\n      });\n    }\n  }, {\n    key: \"find\",\n    value: function find() {\n      var _this2 = this;\n\n      return new Promise(function (resolve) {\n        var Info = mongoose.model('Info', _this2.infoSchema);\n        Info.find({}).sort({\n          _id: -1\n        }).limit(1).exec(function (err, result) {\n          resolve(result[0]);\n        });\n      });\n    }\n  }]);\n\n  return DbBase;\n}();\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (new DbBase());//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9kYkJhc2UuanM/OTQ4YSJdLCJuYW1lcyI6WyJtb25nb29zZSIsInJlcXVpcmUiLCJTY2hlbWEiLCJEYkJhc2UiLCJ1cmwiLCJjb25uZWN0IiwiYmluZCIsImluZm9TY2hlbWEiLCJkZXN0aW5hdGlvbiIsIlN0cmluZyIsImxvY2F0aW9uIiwidXNlTmV3VXJsUGFyc2VyIiwiZGIiLCJjb25uZWN0aW9uIiwib24iLCJjb25zb2xlIiwiZXJyb3IiLCJvbmNlIiwibG9nIiwiaW5mb09iaiIsIlByb21pc2UiLCJyZXNvbHZlIiwiSW5mbyIsIm1vZGVsIiwiY3JlYXRlIiwiZXJyIiwicmVzdWx0IiwiZmluZCIsInNvcnQiLCJfaWQiLCJsaW1pdCIsImV4ZWMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUEsSUFBTUEsUUFBUSxHQUFHQyxtQkFBTyxDQUFDLDBCQUFELENBQXhCOztBQUNBLElBQU1DLE1BQU0sR0FBR0YsUUFBUSxDQUFDRSxNQUF4Qjs7SUFFTUMsTTs7O0FBQ0Ysb0JBQWE7QUFBQTs7QUFDVCxTQUFLQyxHQUFMLEdBQVcsa0NBQVg7QUFDQSxTQUFLQyxPQUFMLEdBQWUsS0FBS0EsT0FBTCxDQUFhQyxJQUFiLENBQWtCLElBQWxCLENBQWY7QUFDQSxTQUFLQyxVQUFMLEdBQWtCLElBQUlMLE1BQUosQ0FBVztBQUN6Qk0saUJBQVcsRUFBRUMsTUFEWTtBQUV6QkMsY0FBUSxFQUFFRDtBQUZlLEtBQVgsQ0FBbEI7QUFJSDs7Ozs4QkFFUTtBQUNMVCxjQUFRLENBQUNLLE9BQVQsQ0FBaUIsS0FBS0QsR0FBdEIsRUFBMkI7QUFBQ08sdUJBQWUsRUFBRTtBQUFsQixPQUEzQjtBQUNBLFVBQU1DLEVBQUUsR0FBR1osUUFBUSxDQUFDYSxVQUFwQjtBQUNBRCxRQUFFLENBQUNFLEVBQUgsQ0FBTSxPQUFOLEVBQWVDLE9BQU8sQ0FBQ0MsS0FBUixDQUFjVixJQUFkLENBQW1CUyxPQUFuQixFQUE0QixtQkFBNUIsQ0FBZjtBQUNBSCxRQUFFLENBQUNLLElBQUgsQ0FBUSxNQUFSLEVBQWdCLFlBQVU7QUFDdEJGLGVBQU8sQ0FBQ0csR0FBUixDQUFZLFNBQVo7QUFDSCxPQUZEO0FBR0g7OzsyQkFFTUMsTyxFQUFRO0FBQUE7O0FBQ1gsYUFBTyxJQUFJQyxPQUFKLENBQVksVUFBQ0MsT0FBRCxFQUFhO0FBQ3hCLFlBQU1DLElBQUksR0FBR3RCLFFBQVEsQ0FBQ3VCLEtBQVQsQ0FBZSxNQUFmLEVBQXVCLEtBQUksQ0FBQ2hCLFVBQTVCLENBQWI7QUFDQWUsWUFBSSxDQUFDRSxNQUFMLENBQVlMLE9BQVosRUFBcUIsVUFBU00sR0FBVCxFQUFjQyxNQUFkLEVBQXNCO0FBQzNDLGNBQUdELEdBQUgsRUFBUTtBQUNKVixtQkFBTyxDQUFDRyxHQUFSLENBQVlPLEdBQVo7QUFDQTtBQUNIOztBQUNESixpQkFBTyxDQUFDSyxNQUFELENBQVA7QUFDSCxTQU5HO0FBT1AsT0FUTSxDQUFQO0FBVUg7OzsyQkFFSztBQUFBOztBQUNGLGFBQU8sSUFBSU4sT0FBSixDQUFZLFVBQUNDLE9BQUQsRUFBYTtBQUM1QixZQUFNQyxJQUFJLEdBQUd0QixRQUFRLENBQUN1QixLQUFULENBQWUsTUFBZixFQUF1QixNQUFJLENBQUNoQixVQUE1QixDQUFiO0FBQ0FlLFlBQUksQ0FBQ0ssSUFBTCxDQUFVLEVBQVYsRUFDQ0MsSUFERCxDQUNNO0FBQUNDLGFBQUcsRUFBRSxDQUFDO0FBQVAsU0FETixFQUVBQyxLQUZBLENBRU0sQ0FGTixFQUdDQyxJQUhELENBR00sVUFBU04sR0FBVCxFQUFjQyxNQUFkLEVBQXNCO0FBQ3hCTCxpQkFBTyxDQUFDSyxNQUFNLENBQUMsQ0FBRCxDQUFQLENBQVA7QUFDSCxTQUxEO0FBTUgsT0FSTSxDQUFQO0FBU0g7Ozs7OztBQUdVLG1FQUFJdkIsTUFBSixFQUFmIiwiZmlsZSI6Ii4vZGJCYXNlLmpzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgbW9uZ29vc2UgPSByZXF1aXJlKCdtb25nb29zZScpXHJcbmNvbnN0IFNjaGVtYSA9IG1vbmdvb3NlLlNjaGVtYVxyXG5cclxuY2xhc3MgRGJCYXNle1xyXG4gICAgY29uc3RydWN0b3IoKXtcclxuICAgICAgICB0aGlzLnVybCA9ICdtb25nb2RiOi8vNDkuMjM1LjE2OC45OjI3MDE3L21hcCdcclxuICAgICAgICB0aGlzLmNvbm5lY3QgPSB0aGlzLmNvbm5lY3QuYmluZCh0aGlzKVxyXG4gICAgICAgIHRoaXMuaW5mb1NjaGVtYSA9IG5ldyBTY2hlbWEoe1xyXG4gICAgICAgICAgICBkZXN0aW5hdGlvbjogU3RyaW5nLFxyXG4gICAgICAgICAgICBsb2NhdGlvbjogU3RyaW5nXHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICBjb25uZWN0KCl7XHJcbiAgICAgICAgbW9uZ29vc2UuY29ubmVjdCh0aGlzLnVybCwge3VzZU5ld1VybFBhcnNlcjogdHJ1ZX0pXHJcbiAgICAgICAgY29uc3QgZGIgPSBtb25nb29zZS5jb25uZWN0aW9uXHJcbiAgICAgICAgZGIub24oJ2Vycm9yJywgY29uc29sZS5lcnJvci5iaW5kKGNvbnNvbGUsICdjb25uZWN0aW9uIGVycm9yOicpKVxyXG4gICAgICAgIGRiLm9uY2UoJ29wZW4nLCBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIuaVsOaNruW6k+i/nuaOpeaIkOWKn1wiKVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgaW5zZXJ0KGluZm9PYmope1xyXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgSW5mbyA9IG1vbmdvb3NlLm1vZGVsKCdJbmZvJywgdGhpcy5pbmZvU2NoZW1hKVxyXG4gICAgICAgICAgICAgICAgSW5mby5jcmVhdGUoaW5mb09iaiwgZnVuY3Rpb24oZXJyLCByZXN1bHQpIHtcclxuICAgICAgICAgICAgICAgIGlmKGVycikge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycilcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm5cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJlc29sdmUocmVzdWx0KVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgZmluZCgpe1xyXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBJbmZvID0gbW9uZ29vc2UubW9kZWwoJ0luZm8nLCB0aGlzLmluZm9TY2hlbWEpXHJcbiAgICAgICAgICAgIEluZm8uZmluZCh7fSlcclxuICAgICAgICAgICAgLnNvcnQoe19pZDogLTF9KS5cclxuICAgICAgICAgICAgbGltaXQoMSlcclxuICAgICAgICAgICAgLmV4ZWMoZnVuY3Rpb24oZXJyLCByZXN1bHQpIHtcclxuICAgICAgICAgICAgICAgIHJlc29sdmUocmVzdWx0WzBdKVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IG5ldyBEYkJhc2UoKSJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./dbBase.js\n");

/***/ }),

/***/ "./server.js":
/*!*******************!*\
  !*** ./server.js ***!
  \*******************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* WEBPACK VAR INJECTION */(function(__dirname) {/* harmony import */ var _dbBase__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dbBase */ \"./dbBase.js\");\nvar express = __webpack_require__(/*! express */ \"express\");\n\nvar app = express();\nvar port = process.env.PORT || 3000;\n\nvar fs = __webpack_require__(/*! fs */ \"fs\");\n\nvar bodyParser = __webpack_require__(/*! body-parser */ \"body-parser\");\n\nvar path = __webpack_require__(/*! path */ \"path\");\n\n //连接数据库\n\n_dbBase__WEBPACK_IMPORTED_MODULE_0__[\"default\"].connect(); //解决跨域\n\napp.all('*', function (req, res, next) {\n  res.header('Access-Control-Allow-Origin', '*');\n  res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');\n  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');\n\n  if (req.method == 'OPTIONS') {\n    res.send(200);\n    /让options请求快速返回/;\n  } else {\n    next();\n  }\n}); //处理请求数据\n\napp.use(bodyParser.urlencoded({\n  extended: false\n}));\napp.use(bodyParser.json());\napp.use(express[\"static\"]('client')); //安卓发送定位信息，终点信息\n\napp.post('/info', function (req, res) {\n  _dbBase__WEBPACK_IMPORTED_MODULE_0__[\"default\"].insert(req.body).then(function (value) {\n    res.send(value);\n  });\n});\napp.get('/info', function (req, res) {\n  _dbBase__WEBPACK_IMPORTED_MODULE_0__[\"default\"].find().then(function (value) {\n    res.send(value);\n  });\n});\napp.get('/map1', function (req, res, next) {\n  var option = {\n    root: path.join(__dirname, 'client/build')\n  };\n  res.sendFile('map1.html', option);\n});\napp.get('/map2', function (req, res, next) {\n  var option = {\n    root: path.join(__dirname, 'client/build')\n  };\n  res.sendFile('map2.html', option);\n});\napp.get('/map3', function (req, res, next) {\n  var option = {\n    root: path.join(__dirname, 'client/build')\n  };\n  res.sendFile('map3.html', option);\n});\napp.listen(port, function () {\n  return console.log(\"app listening on port \".concat(port, \"!\"));\n});\n/* WEBPACK VAR INJECTION */}.call(this, \"\"))//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zZXJ2ZXIuanM/MWQ2OSJdLCJuYW1lcyI6WyJleHByZXNzIiwicmVxdWlyZSIsImFwcCIsInBvcnQiLCJwcm9jZXNzIiwiZW52IiwiUE9SVCIsImZzIiwiYm9keVBhcnNlciIsInBhdGgiLCJkYkJhc2UiLCJjb25uZWN0IiwiYWxsIiwicmVxIiwicmVzIiwibmV4dCIsImhlYWRlciIsIm1ldGhvZCIsInNlbmQiLCJ1c2UiLCJ1cmxlbmNvZGVkIiwiZXh0ZW5kZWQiLCJqc29uIiwicG9zdCIsImluc2VydCIsImJvZHkiLCJ0aGVuIiwidmFsdWUiLCJnZXQiLCJmaW5kIiwib3B0aW9uIiwicm9vdCIsImpvaW4iLCJfX2Rpcm5hbWUiLCJzZW5kRmlsZSIsImxpc3RlbiIsImNvbnNvbGUiLCJsb2ciXSwibWFwcGluZ3MiOiJBQUFBO0FBQUE7QUFBQSxJQUFNQSxPQUFPLEdBQUdDLG1CQUFPLENBQUMsd0JBQUQsQ0FBdkI7O0FBQ0EsSUFBTUMsR0FBRyxHQUFHRixPQUFPLEVBQW5CO0FBQ0EsSUFBTUcsSUFBSSxHQUFHQyxPQUFPLENBQUNDLEdBQVIsQ0FBWUMsSUFBWixJQUFvQixJQUFqQzs7QUFDQSxJQUFNQyxFQUFFLEdBQUdOLG1CQUFPLENBQUMsY0FBRCxDQUFsQjs7QUFDQSxJQUFNTyxVQUFVLEdBQUdQLG1CQUFPLENBQUMsZ0NBQUQsQ0FBMUI7O0FBQ0EsSUFBTVEsSUFBSSxHQUFHUixtQkFBTyxDQUFDLGtCQUFELENBQXBCOztDQUVBOztBQUNBUywrQ0FBTSxDQUFDQyxPQUFQLEcsQ0FFQTs7QUFDQVQsR0FBRyxDQUFDVSxHQUFKLENBQVEsR0FBUixFQUFhLFVBQVNDLEdBQVQsRUFBY0MsR0FBZCxFQUFtQkMsSUFBbkIsRUFBeUI7QUFDcENELEtBQUcsQ0FBQ0UsTUFBSixDQUFXLDZCQUFYLEVBQTBDLEdBQTFDO0FBQ0FGLEtBQUcsQ0FBQ0UsTUFBSixDQUNFLDhCQURGLEVBRUUseUZBRkY7QUFJQUYsS0FBRyxDQUFDRSxNQUFKLENBQVcsOEJBQVgsRUFBMkMsaUNBQTNDOztBQUVBLE1BQUlILEdBQUcsQ0FBQ0ksTUFBSixJQUFjLFNBQWxCLEVBQTZCO0FBQzNCSCxPQUFHLENBQUNJLElBQUosQ0FBUyxHQUFUO0FBQ0E7QUFDRCxHQUhELE1BR087QUFDTEgsUUFBSTtBQUNMO0FBQ0YsQ0FkRCxFLENBZ0JBOztBQUNBYixHQUFHLENBQUNpQixHQUFKLENBQVFYLFVBQVUsQ0FBQ1ksVUFBWCxDQUFzQjtBQUFFQyxVQUFRLEVBQUU7QUFBWixDQUF0QixDQUFSO0FBQ0FuQixHQUFHLENBQUNpQixHQUFKLENBQVFYLFVBQVUsQ0FBQ2MsSUFBWCxFQUFSO0FBRUFwQixHQUFHLENBQUNpQixHQUFKLENBQVFuQixPQUFPLFVBQVAsQ0FBZSxRQUFmLENBQVIsRSxDQUVBOztBQUNBRSxHQUFHLENBQUNxQixJQUFKLENBQVMsT0FBVCxFQUFrQixVQUFDVixHQUFELEVBQU1DLEdBQU4sRUFBYztBQUM5QkosaURBQU0sQ0FBQ2MsTUFBUCxDQUFjWCxHQUFHLENBQUNZLElBQWxCLEVBQXdCQyxJQUF4QixDQUE2QixVQUFTQyxLQUFULEVBQWdCO0FBQzNDYixPQUFHLENBQUNJLElBQUosQ0FBU1MsS0FBVDtBQUNELEdBRkQ7QUFHRCxDQUpEO0FBTUF6QixHQUFHLENBQUMwQixHQUFKLENBQVEsT0FBUixFQUFpQixVQUFDZixHQUFELEVBQU1DLEdBQU4sRUFBYztBQUM3QkosaURBQU0sQ0FBQ21CLElBQVAsR0FBY0gsSUFBZCxDQUFtQixVQUFTQyxLQUFULEVBQWdCO0FBQ2pDYixPQUFHLENBQUNJLElBQUosQ0FBU1MsS0FBVDtBQUNELEdBRkQ7QUFHRCxDQUpEO0FBTUF6QixHQUFHLENBQUMwQixHQUFKLENBQVEsT0FBUixFQUFpQixVQUFDZixHQUFELEVBQU1DLEdBQU4sRUFBV0MsSUFBWCxFQUFvQjtBQUNuQyxNQUFJZSxNQUFNLEdBQUc7QUFDWEMsUUFBSSxFQUFFdEIsSUFBSSxDQUFDdUIsSUFBTCxDQUFVQyxTQUFWLEVBQXFCLGNBQXJCO0FBREssR0FBYjtBQUdBbkIsS0FBRyxDQUFDb0IsUUFBSixDQUFhLFdBQWIsRUFBMEJKLE1BQTFCO0FBQ0QsQ0FMRDtBQU9BNUIsR0FBRyxDQUFDMEIsR0FBSixDQUFRLE9BQVIsRUFBaUIsVUFBQ2YsR0FBRCxFQUFNQyxHQUFOLEVBQVdDLElBQVgsRUFBb0I7QUFDbkMsTUFBSWUsTUFBTSxHQUFHO0FBQ1hDLFFBQUksRUFBRXRCLElBQUksQ0FBQ3VCLElBQUwsQ0FBVUMsU0FBVixFQUFxQixjQUFyQjtBQURLLEdBQWI7QUFHQW5CLEtBQUcsQ0FBQ29CLFFBQUosQ0FBYSxXQUFiLEVBQTBCSixNQUExQjtBQUNELENBTEQ7QUFPQTVCLEdBQUcsQ0FBQzBCLEdBQUosQ0FBUSxPQUFSLEVBQWlCLFVBQUNmLEdBQUQsRUFBTUMsR0FBTixFQUFXQyxJQUFYLEVBQW9CO0FBQ25DLE1BQUllLE1BQU0sR0FBRztBQUNYQyxRQUFJLEVBQUV0QixJQUFJLENBQUN1QixJQUFMLENBQVVDLFNBQVYsRUFBcUIsY0FBckI7QUFESyxHQUFiO0FBR0FuQixLQUFHLENBQUNvQixRQUFKLENBQWEsV0FBYixFQUEwQkosTUFBMUI7QUFDRCxDQUxEO0FBT0E1QixHQUFHLENBQUNpQyxNQUFKLENBQVdoQyxJQUFYLEVBQWlCO0FBQUEsU0FBTWlDLE9BQU8sQ0FBQ0MsR0FBUixpQ0FBcUNsQyxJQUFyQyxPQUFOO0FBQUEsQ0FBakIsRSIsImZpbGUiOiIuL3NlcnZlci5qcy5qcyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IGV4cHJlc3MgPSByZXF1aXJlKCdleHByZXNzJyk7XHJcbmNvbnN0IGFwcCA9IGV4cHJlc3MoKTtcclxuY29uc3QgcG9ydCA9IHByb2Nlc3MuZW52LlBPUlQgfHwgMzAwMDtcclxuY29uc3QgZnMgPSByZXF1aXJlKCdmcycpO1xyXG5jb25zdCBib2R5UGFyc2VyID0gcmVxdWlyZSgnYm9keS1wYXJzZXInKTtcclxuY29uc3QgcGF0aCA9IHJlcXVpcmUoJ3BhdGgnKTtcclxuaW1wb3J0IGRiQmFzZSBmcm9tICcuL2RiQmFzZSc7XHJcbi8v6L+e5o6l5pWw5o2u5bqTXHJcbmRiQmFzZS5jb25uZWN0KCk7XHJcblxyXG4vL+ino+WGs+i3qOWfn1xyXG5hcHAuYWxsKCcqJywgZnVuY3Rpb24ocmVxLCByZXMsIG5leHQpIHtcclxuICByZXMuaGVhZGVyKCdBY2Nlc3MtQ29udHJvbC1BbGxvdy1PcmlnaW4nLCAnKicpO1xyXG4gIHJlcy5oZWFkZXIoXHJcbiAgICAnQWNjZXNzLUNvbnRyb2wtQWxsb3ctSGVhZGVycycsXHJcbiAgICAnQ29udGVudC1UeXBlLCBDb250ZW50LUxlbmd0aCwgQXV0aG9yaXphdGlvbiwgQWNjZXB0LCBYLVJlcXVlc3RlZC1XaXRoICwgeW91ckhlYWRlckZlaWxkJ1xyXG4gICk7XHJcbiAgcmVzLmhlYWRlcignQWNjZXNzLUNvbnRyb2wtQWxsb3ctTWV0aG9kcycsICdQVVQsIFBPU1QsIEdFVCwgREVMRVRFLCBPUFRJT05TJyk7XHJcblxyXG4gIGlmIChyZXEubWV0aG9kID09ICdPUFRJT05TJykge1xyXG4gICAgcmVzLnNlbmQoMjAwKTtcclxuICAgIC/orqlvcHRpb25z6K+35rGC5b+r6YCf6L+U5ZueLztcclxuICB9IGVsc2Uge1xyXG4gICAgbmV4dCgpO1xyXG4gIH1cclxufSk7XHJcblxyXG4vL+WkhOeQhuivt+axguaVsOaNrlxyXG5hcHAudXNlKGJvZHlQYXJzZXIudXJsZW5jb2RlZCh7IGV4dGVuZGVkOiBmYWxzZSB9KSk7XHJcbmFwcC51c2UoYm9keVBhcnNlci5qc29uKCkpO1xyXG5cclxuYXBwLnVzZShleHByZXNzLnN0YXRpYygnY2xpZW50JykpO1xyXG5cclxuLy/lronljZPlj5HpgIHlrprkvY3kv6Hmga/vvIznu4jngrnkv6Hmga9cclxuYXBwLnBvc3QoJy9pbmZvJywgKHJlcSwgcmVzKSA9PiB7XHJcbiAgZGJCYXNlLmluc2VydChyZXEuYm9keSkudGhlbihmdW5jdGlvbih2YWx1ZSkge1xyXG4gICAgcmVzLnNlbmQodmFsdWUpO1xyXG4gIH0pO1xyXG59KTtcclxuXHJcbmFwcC5nZXQoJy9pbmZvJywgKHJlcSwgcmVzKSA9PiB7XHJcbiAgZGJCYXNlLmZpbmQoKS50aGVuKGZ1bmN0aW9uKHZhbHVlKSB7XHJcbiAgICByZXMuc2VuZCh2YWx1ZSk7XHJcbiAgfSk7XHJcbn0pO1xyXG5cclxuYXBwLmdldCgnL21hcDEnLCAocmVxLCByZXMsIG5leHQpID0+IHtcclxuICB2YXIgb3B0aW9uID0ge1xyXG4gICAgcm9vdDogcGF0aC5qb2luKF9fZGlybmFtZSwgJ2NsaWVudC9idWlsZCcpXHJcbiAgfTtcclxuICByZXMuc2VuZEZpbGUoJ21hcDEuaHRtbCcsIG9wdGlvbik7XHJcbn0pO1xyXG5cclxuYXBwLmdldCgnL21hcDInLCAocmVxLCByZXMsIG5leHQpID0+IHtcclxuICB2YXIgb3B0aW9uID0ge1xyXG4gICAgcm9vdDogcGF0aC5qb2luKF9fZGlybmFtZSwgJ2NsaWVudC9idWlsZCcpXHJcbiAgfTtcclxuICByZXMuc2VuZEZpbGUoJ21hcDIuaHRtbCcsIG9wdGlvbik7XHJcbn0pO1xyXG5cclxuYXBwLmdldCgnL21hcDMnLCAocmVxLCByZXMsIG5leHQpID0+IHtcclxuICB2YXIgb3B0aW9uID0ge1xyXG4gICAgcm9vdDogcGF0aC5qb2luKF9fZGlybmFtZSwgJ2NsaWVudC9idWlsZCcpXHJcbiAgfTtcclxuICByZXMuc2VuZEZpbGUoJ21hcDMuaHRtbCcsIG9wdGlvbik7XHJcbn0pO1xyXG5cclxuYXBwLmxpc3Rlbihwb3J0LCAoKSA9PiBjb25zb2xlLmxvZyhgYXBwIGxpc3RlbmluZyBvbiBwb3J0ICR7cG9ydH0hYCkpO1xyXG4iXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./server.js\n");

/***/ }),

/***/ "@babel/runtime/helpers/classCallCheck":
/*!********************************************************!*\
  !*** external "@babel/runtime/helpers/classCallCheck" ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"@babel/runtime/helpers/classCallCheck\");//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJAYmFiZWwvcnVudGltZS9oZWxwZXJzL2NsYXNzQ2FsbENoZWNrXCI/MjRiMyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSIsImZpbGUiOiJAYmFiZWwvcnVudGltZS9oZWxwZXJzL2NsYXNzQ2FsbENoZWNrLmpzIiwic291cmNlc0NvbnRlbnQiOlsibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiQGJhYmVsL3J1bnRpbWUvaGVscGVycy9jbGFzc0NhbGxDaGVja1wiKTsiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///@babel/runtime/helpers/classCallCheck\n");

/***/ }),

/***/ "@babel/runtime/helpers/createClass":
/*!*****************************************************!*\
  !*** external "@babel/runtime/helpers/createClass" ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"@babel/runtime/helpers/createClass\");//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJAYmFiZWwvcnVudGltZS9oZWxwZXJzL2NyZWF0ZUNsYXNzXCI/MzZhMSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSIsImZpbGUiOiJAYmFiZWwvcnVudGltZS9oZWxwZXJzL2NyZWF0ZUNsYXNzLmpzIiwic291cmNlc0NvbnRlbnQiOlsibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiQGJhYmVsL3J1bnRpbWUvaGVscGVycy9jcmVhdGVDbGFzc1wiKTsiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///@babel/runtime/helpers/createClass\n");

/***/ }),

/***/ "body-parser":
/*!******************************!*\
  !*** external "body-parser" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"body-parser\");//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJib2R5LXBhcnNlclwiPzgxODgiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEiLCJmaWxlIjoiYm9keS1wYXJzZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJib2R5LXBhcnNlclwiKTsiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///body-parser\n");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"express\");//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJleHByZXNzXCI/MjJmZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSIsImZpbGUiOiJleHByZXNzLmpzIiwic291cmNlc0NvbnRlbnQiOlsibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiZXhwcmVzc1wiKTsiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///express\n");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"fs\");//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJmc1wiP2E0MGQiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEiLCJmaWxlIjoiZnMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJmc1wiKTsiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///fs\n");

/***/ }),

/***/ "mongoose":
/*!***************************!*\
  !*** external "mongoose" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"mongoose\");//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJtb25nb29zZVwiP2ZmZDciXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEiLCJmaWxlIjoibW9uZ29vc2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJtb25nb29zZVwiKTsiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///mongoose\n");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"path\");//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJwYXRoXCI/NzRiYiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSIsImZpbGUiOiJwYXRoLmpzIiwic291cmNlc0NvbnRlbnQiOlsibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicGF0aFwiKTsiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///path\n");

/***/ })

/******/ });
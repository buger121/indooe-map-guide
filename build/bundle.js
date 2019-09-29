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
eval("__webpack_require__.r(__webpack_exports__);\n/* WEBPACK VAR INJECTION */(function(__dirname) {/* harmony import */ var _dbBase__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dbBase */ \"./dbBase.js\");\nvar express = __webpack_require__(/*! express */ \"express\");\n\nvar app = express();\nvar port = process.env.PORT || 3000;\n\nvar fs = __webpack_require__(/*! fs */ \"fs\");\n\nvar bodyParser = __webpack_require__(/*! body-parser */ \"body-parser\");\n\nvar path = __webpack_require__(/*! path */ \"path\");\n\n //连接数据库\n\n_dbBase__WEBPACK_IMPORTED_MODULE_0__[\"default\"].connect(); //解决跨域\n\napp.all('*', function (req, res, next) {\n  res.header('Access-Control-Allow-Origin', '*');\n  res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');\n  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');\n\n  if (req.method == 'OPTIONS') {\n    res.send(200);\n    /让options请求快速返回/;\n  } else {\n    next();\n  }\n}); //处理请求数据\n\napp.use(bodyParser.urlencoded({\n  extended: false\n}));\napp.use(bodyParser.json());\napp.use(express[\"static\"]('client')); //安卓发送定位信息，终点信息\n\napp.post('/info', function (req, res) {\n  _dbBase__WEBPACK_IMPORTED_MODULE_0__[\"default\"].insert(req.body).then(function (value) {\n    res.send(value);\n  });\n});\napp.get('/info', function (req, res) {\n  _dbBase__WEBPACK_IMPORTED_MODULE_0__[\"default\"].find().then(function (value) {\n    res.send(value);\n  });\n});\napp.get('/map1', function (req, res, next) {\n  var option = {\n    root: path.join(__dirname, 'client/build')\n  };\n  res.sendFile('map1.html', option);\n});\napp.get('/map2', function (req, res, next) {\n  var option = {\n    root: path.join(__dirname, 'client/build')\n  };\n  res.sendFile('map2.html', option);\n});\napp.listen(port, function () {\n  return console.log(\"app listening on port \".concat(port, \"!\"));\n});\n/* WEBPACK VAR INJECTION */}.call(this, \"\"))//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zZXJ2ZXIuanM/MWQ2OSJdLCJuYW1lcyI6WyJleHByZXNzIiwicmVxdWlyZSIsImFwcCIsInBvcnQiLCJwcm9jZXNzIiwiZW52IiwiUE9SVCIsImZzIiwiYm9keVBhcnNlciIsInBhdGgiLCJkYkJhc2UiLCJjb25uZWN0IiwiYWxsIiwicmVxIiwicmVzIiwibmV4dCIsImhlYWRlciIsIm1ldGhvZCIsInNlbmQiLCJ1c2UiLCJ1cmxlbmNvZGVkIiwiZXh0ZW5kZWQiLCJqc29uIiwicG9zdCIsImluc2VydCIsImJvZHkiLCJ0aGVuIiwidmFsdWUiLCJnZXQiLCJmaW5kIiwib3B0aW9uIiwicm9vdCIsImpvaW4iLCJfX2Rpcm5hbWUiLCJzZW5kRmlsZSIsImxpc3RlbiIsImNvbnNvbGUiLCJsb2ciXSwibWFwcGluZ3MiOiJBQUFBO0FBQUE7QUFBQSxJQUFNQSxPQUFPLEdBQUdDLG1CQUFPLENBQUMsd0JBQUQsQ0FBdkI7O0FBQ0EsSUFBTUMsR0FBRyxHQUFHRixPQUFPLEVBQW5CO0FBQ0EsSUFBTUcsSUFBSSxHQUFHQyxPQUFPLENBQUNDLEdBQVIsQ0FBWUMsSUFBWixJQUFvQixJQUFqQzs7QUFDQSxJQUFNQyxFQUFFLEdBQUdOLG1CQUFPLENBQUMsY0FBRCxDQUFsQjs7QUFDQSxJQUFNTyxVQUFVLEdBQUdQLG1CQUFPLENBQUMsZ0NBQUQsQ0FBMUI7O0FBQ0EsSUFBTVEsSUFBSSxHQUFHUixtQkFBTyxDQUFDLGtCQUFELENBQXBCOztDQUVBOztBQUNBUywrQ0FBTSxDQUFDQyxPQUFQLEcsQ0FHQTs7QUFDQVQsR0FBRyxDQUFDVSxHQUFKLENBQVEsR0FBUixFQUFZLFVBQVVDLEdBQVYsRUFBZUMsR0FBZixFQUFvQkMsSUFBcEIsRUFBMEI7QUFDbENELEtBQUcsQ0FBQ0UsTUFBSixDQUFXLDZCQUFYLEVBQTBDLEdBQTFDO0FBQ0FGLEtBQUcsQ0FBQ0UsTUFBSixDQUFXLDhCQUFYLEVBQTJDLHlGQUEzQztBQUNBRixLQUFHLENBQUNFLE1BQUosQ0FBVyw4QkFBWCxFQUEyQyxpQ0FBM0M7O0FBRUEsTUFBSUgsR0FBRyxDQUFDSSxNQUFKLElBQWMsU0FBbEIsRUFBNkI7QUFDM0JILE9BQUcsQ0FBQ0ksSUFBSixDQUFTLEdBQVQ7QUFBZTtBQUNoQixHQUZELE1BR0s7QUFDSEgsUUFBSTtBQUNMO0FBQ0YsQ0FYSCxFLENBYUE7O0FBQ0FiLEdBQUcsQ0FBQ2lCLEdBQUosQ0FBUVgsVUFBVSxDQUFDWSxVQUFYLENBQXNCO0FBQUNDLFVBQVEsRUFBRTtBQUFYLENBQXRCLENBQVI7QUFDQW5CLEdBQUcsQ0FBQ2lCLEdBQUosQ0FBUVgsVUFBVSxDQUFDYyxJQUFYLEVBQVI7QUFFQXBCLEdBQUcsQ0FBQ2lCLEdBQUosQ0FBUW5CLE9BQU8sVUFBUCxDQUFlLFFBQWYsQ0FBUixFLENBRUE7O0FBQ0FFLEdBQUcsQ0FBQ3FCLElBQUosQ0FBUyxPQUFULEVBQWlCLFVBQUNWLEdBQUQsRUFBTUMsR0FBTixFQUFjO0FBQzdCSixpREFBTSxDQUFDYyxNQUFQLENBQWNYLEdBQUcsQ0FBQ1ksSUFBbEIsRUFBd0JDLElBQXhCLENBQTZCLFVBQVNDLEtBQVQsRUFBZTtBQUMxQ2IsT0FBRyxDQUFDSSxJQUFKLENBQVNTLEtBQVQ7QUFDRCxHQUZEO0FBR0QsQ0FKRDtBQU1BekIsR0FBRyxDQUFDMEIsR0FBSixDQUFRLE9BQVIsRUFBZ0IsVUFBQ2YsR0FBRCxFQUFNQyxHQUFOLEVBQWM7QUFDNUJKLGlEQUFNLENBQUNtQixJQUFQLEdBQWNILElBQWQsQ0FBbUIsVUFBU0MsS0FBVCxFQUFlO0FBQ2hDYixPQUFHLENBQUNJLElBQUosQ0FBU1MsS0FBVDtBQUNELEdBRkQ7QUFHRCxDQUpEO0FBTUF6QixHQUFHLENBQUMwQixHQUFKLENBQVEsT0FBUixFQUFpQixVQUFDZixHQUFELEVBQU1DLEdBQU4sRUFBV0MsSUFBWCxFQUFvQjtBQUNuQyxNQUFJZSxNQUFNLEdBQUc7QUFDWEMsUUFBSSxFQUFFdEIsSUFBSSxDQUFDdUIsSUFBTCxDQUFVQyxTQUFWLEVBQXFCLGNBQXJCO0FBREssR0FBYjtBQUdBbkIsS0FBRyxDQUFDb0IsUUFBSixDQUFhLFdBQWIsRUFBMEJKLE1BQTFCO0FBQ0QsQ0FMRDtBQU9BNUIsR0FBRyxDQUFDMEIsR0FBSixDQUFRLE9BQVIsRUFBaUIsVUFBQ2YsR0FBRCxFQUFNQyxHQUFOLEVBQVdDLElBQVgsRUFBb0I7QUFDbkMsTUFBSWUsTUFBTSxHQUFHO0FBQ1hDLFFBQUksRUFBRXRCLElBQUksQ0FBQ3VCLElBQUwsQ0FBVUMsU0FBVixFQUFxQixjQUFyQjtBQURLLEdBQWI7QUFHQW5CLEtBQUcsQ0FBQ29CLFFBQUosQ0FBYSxXQUFiLEVBQTBCSixNQUExQjtBQUNELENBTEQ7QUFPQTVCLEdBQUcsQ0FBQ2lDLE1BQUosQ0FBV2hDLElBQVgsRUFBaUI7QUFBQSxTQUFNaUMsT0FBTyxDQUFDQyxHQUFSLGlDQUFxQ2xDLElBQXJDLE9BQU47QUFBQSxDQUFqQixFIiwiZmlsZSI6Ii4vc2VydmVyLmpzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgZXhwcmVzcyA9IHJlcXVpcmUoJ2V4cHJlc3MnKVxyXG5jb25zdCBhcHAgPSBleHByZXNzKClcclxuY29uc3QgcG9ydCA9IHByb2Nlc3MuZW52LlBPUlQgfHwgMzAwMFxyXG5jb25zdCBmcyA9IHJlcXVpcmUoJ2ZzJylcclxuY29uc3QgYm9keVBhcnNlciA9IHJlcXVpcmUoJ2JvZHktcGFyc2VyJylcclxuY29uc3QgcGF0aCA9IHJlcXVpcmUoJ3BhdGgnKVxyXG5pbXBvcnQgZGJCYXNlIGZyb20gJy4vZGJCYXNlJ1xyXG4vL+i/nuaOpeaVsOaNruW6k1xyXG5kYkJhc2UuY29ubmVjdCgpXHJcblxyXG5cclxuLy/op6PlhrPot6jln59cclxuYXBwLmFsbCgnKicsZnVuY3Rpb24gKHJlcSwgcmVzLCBuZXh0KSB7XHJcbiAgICByZXMuaGVhZGVyKCdBY2Nlc3MtQ29udHJvbC1BbGxvdy1PcmlnaW4nLCAnKicpO1xyXG4gICAgcmVzLmhlYWRlcignQWNjZXNzLUNvbnRyb2wtQWxsb3ctSGVhZGVycycsICdDb250ZW50LVR5cGUsIENvbnRlbnQtTGVuZ3RoLCBBdXRob3JpemF0aW9uLCBBY2NlcHQsIFgtUmVxdWVzdGVkLVdpdGggLCB5b3VySGVhZGVyRmVpbGQnKTtcclxuICAgIHJlcy5oZWFkZXIoJ0FjY2Vzcy1Db250cm9sLUFsbG93LU1ldGhvZHMnLCAnUFVULCBQT1NULCBHRVQsIERFTEVURSwgT1BUSU9OUycpO1xyXG4gIFxyXG4gICAgaWYgKHJlcS5tZXRob2QgPT0gJ09QVElPTlMnKSB7XHJcbiAgICAgIHJlcy5zZW5kKDIwMCk7IC/orqlvcHRpb25z6K+35rGC5b+r6YCf6L+U5ZueL1xyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgIG5leHQoKTtcclxuICAgIH1cclxuICB9KTtcclxuXHJcbi8v5aSE55CG6K+35rGC5pWw5o2uXHJcbmFwcC51c2UoYm9keVBhcnNlci51cmxlbmNvZGVkKHtleHRlbmRlZDogZmFsc2V9KSlcclxuYXBwLnVzZShib2R5UGFyc2VyLmpzb24oKSlcclxuXHJcbmFwcC51c2UoZXhwcmVzcy5zdGF0aWMoJ2NsaWVudCcpKVxyXG5cclxuLy/lronljZPlj5HpgIHlrprkvY3kv6Hmga/vvIznu4jngrnkv6Hmga9cclxuYXBwLnBvc3QoJy9pbmZvJywocmVxLCByZXMpID0+IHtcclxuICBkYkJhc2UuaW5zZXJ0KHJlcS5ib2R5KS50aGVuKGZ1bmN0aW9uKHZhbHVlKXtcclxuICAgIHJlcy5zZW5kKHZhbHVlKVxyXG4gIH0pXHJcbn0pXHJcblxyXG5hcHAuZ2V0KCcvaW5mbycsKHJlcSwgcmVzKSA9PiB7XHJcbiAgZGJCYXNlLmZpbmQoKS50aGVuKGZ1bmN0aW9uKHZhbHVlKXtcclxuICAgIHJlcy5zZW5kKHZhbHVlKVxyXG4gIH0pXHJcbn0pXHJcblxyXG5hcHAuZ2V0KCcvbWFwMScsIChyZXEsIHJlcywgbmV4dCkgPT4ge1xyXG4gIHZhciBvcHRpb24gPSB7XHJcbiAgICByb290OiBwYXRoLmpvaW4oX19kaXJuYW1lLCAnY2xpZW50L2J1aWxkJylcclxuICB9XHJcbiAgcmVzLnNlbmRGaWxlKCdtYXAxLmh0bWwnLCBvcHRpb24pXHJcbn0pXHJcblxyXG5hcHAuZ2V0KCcvbWFwMicsIChyZXEsIHJlcywgbmV4dCkgPT4ge1xyXG4gIHZhciBvcHRpb24gPSB7XHJcbiAgICByb290OiBwYXRoLmpvaW4oX19kaXJuYW1lLCAnY2xpZW50L2J1aWxkJylcclxuICB9XHJcbiAgcmVzLnNlbmRGaWxlKCdtYXAyLmh0bWwnLCBvcHRpb24pXHJcbn0pXHJcblxyXG5hcHAubGlzdGVuKHBvcnQsICgpID0+IGNvbnNvbGUubG9nKGBhcHAgbGlzdGVuaW5nIG9uIHBvcnQgJHtwb3J0fSFgKSkiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./server.js\n");

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
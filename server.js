const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const fs = require('fs')
const bodyParser = require('body-parser')
const path = require('path')
import dbBase from './dbBase'
//连接数据库
dbBase.connect()


//解决跨域
app.all('*',function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  
    if (req.method == 'OPTIONS') {
      res.send(200); /让options请求快速返回/
    }
    else {
      next();
    }
  });

//处理请求数据
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.use(express.static('client'))

//安卓发送定位信息，终点信息
app.post('/info',(req, res) => {
  dbBase.insert(req.body).then(function(value){
    res.send(value)
  })
})

app.get('/info',(req, res) => {
  dbBase.find().then(function(value){
    res.send(value)
  })
})

app.get('/map1', (req, res, next) => {
  var option = {
    root: path.join(__dirname, 'client/build')
  }
  res.sendFile('map1.html', option)
})

app.get('/map2', (req, res, next) => {
  var option = {
    root: path.join(__dirname, 'client/build')
  }
  res.sendFile('map2.html', option)
})

app.listen(port, () => console.log(`app listening on port ${port}!`))
const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const fs = require('fs')
const bodyParser = require('body-parser')
const readline = require('readline')
const stream = require('stream')
const path = require('path')

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
var content;
app.post('/info', (req, res) => {
  res.set({
    Accept: 'application/json'
  })
  content = JSON.stringify(req.body);
  fs.writeFile('./client/info/infos.txt', content + '\n', function(err) {
    if (err) {
        return console.log(err);
    }
    const option = {
      root: path.join(__dirname, 'client/info')
    }
    res.sendFile('infos.txt', option)
    console.log('文件修改成功');
  });
})

app.get('/info', (req, res) => {
  // const input = fs.createReadStream('./client/info/infos.txt')
  // const output = new stream
  // const rl = readline.createInterface(input, output)
  // let lastLine = '';
  // rl.on('line', function (line) {
  //     if (line.length >= 1) {
  //         lastLine = line;
  //     }
  // });
  // rl.on('close', function(){
  //   res.send(lastLine)
  // })
  const option = {
    root: path.join(__dirname, 'client/info')
  }
  res.sendFile('infos.txt', option)
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
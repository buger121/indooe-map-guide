const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const fs = require('fs')
const readline = require('readline')
const stream = require('stream')

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

app.use(express.static('client'))

app.get('/', (req, res) => res.send('Connect!'))
//由安卓发送位置信息
app.get('/position/:coord', (req, res) => {
  var position = req.params;
  res.send(req.params)

  //将位置信息写入到文件
  fs.appendFile('./client/info.txt', position.coord + '\n', function(err){
    if (err) {
      return console.error(err)
    }
    console.log("文件写入成功")
  })
})
//web前端获取位置信息
app.get('/lastline', (req, res) => {
  const input = fs.createReadStream('./client/info.txt')
  const output = new stream
  const rl = readline.createInterface(input, output)
  let lastLine = '';
  rl.on('line', function (line) {
      if (line.length >= 1) {
          lastLine = line;
      }
  });
  rl.on('close', function(){
    // console.log(lastLine)
    res.send(lastLine)
  })
  
})

app.listen(port, () => console.log(`app listening on port ${port}!`))
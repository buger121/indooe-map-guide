const express = require('express')
const app = express()
const port = 3000

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

app.listen(process.env.PORT || 3000, () => console.log(`app listening on port ${port}!`))
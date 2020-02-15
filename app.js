const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
const port = process.env.PORT || 3000
const bodyParser = require("body-parser")

// 判別開發環境
if (process.env.NODE_ENV !== "production") {
  // 如果不是 production 模式，使用 dotenv 讀取 .env 檔案
  require("dotenv").config();
}

app.use(
  bodyParser.urlencoded({
    limit: "5mb",
    extended: true
  })
);
app.use(
  bodyParser.json({
    limit: "5mb"
  })
);

app.engine('handlebars', exphbs({
  defaultLayout: "main"
}))
app.set("view engine", "handlebars");

app.use(express.static("public"));


app.listen(port, () => {
  console.log(`express server listen on port : ${port}`)
})

require("./routes")(app);

module.exports = app;

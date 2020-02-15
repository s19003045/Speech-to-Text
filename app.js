const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
const port = 3000

// 判別開發環境
if (process.env.NODE_ENV !== "production") {
  // 如果不是 production 模式，使用 dotenv 讀取 .env 檔案
  require("dotenv").config();
}

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

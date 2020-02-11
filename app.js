const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
const port = 3000

app.engine('handlebars', exphbs({
  defaultLayout: "main"
}))
app.set("view engine", "handlebars");

app.use(express.static("public"));

app.use('/', (req, res) => {
  return res.render('index')
})

app.listen(port, () => {
  console.log(`express server listen on port : ${port}`)
})
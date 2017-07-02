var express = require('express')
var path = require('path')
var expressHandlebars = require('express-handlebars')
var app = express()
var server = require('http').createServer(app)

var root = path.join(__dirname, './src')

// app.locals.pretty = false
app.engine('.hbs', expressHandlebars({extname: '.hbs'}))
app.set('view engine', '.hbs')
app.set('views', root + '/views')

app.use(function(req, res, next){
  console.log(req.method + ":" + req.url)
  next()
})

app.use('/static', express.static(path.join(__dirname, 'src')))
app.use('/assets', express.static(path.join(__dirname, 'zeepin-bootstrap/dist')))

app.get('/', (req, res) => {
  res.render('index')
})

app.get('/:name', (req, res) => {
  res.render(req.params.name, (err, html) => {
    if(err){
      res.status(404).render('404')
    }else{
      res.send(html)
    }
  })
})

app.set('port', 9090)

server.listen(app.get('port'), '0.0.0.0', () => {
  console.log( 'Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.' )
})

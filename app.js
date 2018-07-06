//server + router
const express = require('express')
const app = express()

app.listen(3000, () => console.log('app listening on port 3000!'))

app.set('views', './views');
app.set('view engine','pug');
app.get('/',(req,res)=>{res.render('index')});

app.use(express.static('public'));
var request = require('request');
app.get('/searching',(req,res)=>{
  var val = req.query.search;
  var url = "http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20craigslist.search" +
"%20where%20location%3D%22sfbay%22%20and%20type%3D%22jjj%22%20and%20query%3D%22" + val + "%22&format=" +
"json&diagnostics=true&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys";
  request(url,(err,resp,body)=>{
    body = JSON.parse(body);
    if(!body.query.results.RDF.item){
      craig = "No result";
    }else{
      results = body.query.results.RDF.item['0']['about'];
      craig = '<a href = ' + results + ' target=\"_blank\">' + results + '</a>';
    }
    res.send(craig);
  });
});

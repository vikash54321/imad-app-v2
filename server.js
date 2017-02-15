var express = require('express');
var morgan = require('morgan');
var path = require('path');

var app = express();
app.use(morgan('combined'));


var articleOne ={
  title: 'Article one | Vikash kumar choudhary ',
  heading:'Article one'.
  `Date : "December 10, 1996"
  content:` 
          <p>
             `  This is  vikash first article and i am learning HTML.This is  vikash first article and i am learning HTML.This is  vikash first article and i am learning HTML.This is  vikash first article and i am learning HTML.This is  vikash first article and i am learning HTML.
            </p>
            <p>
                This is  vikash first article and i am learning HTML.This is  vikash first article and i am learning HTML.This is  vikash first article and i am learning HTML.This is  vikash first article and i am learning HTML.This is  vikash first article and i am learning HTML.This is  vikash first article and i am learning HTML.This is  vikash first article and i am learning HTML.This is  vikash first article and i am learning HTML.This is  vikash first article and i am learning HTML.
            </p>
            <p>
                This is  vikash first article and i am learning HTML.This is  vikash first article and i am learning HTML.This is  vikash first article and i am learning HTML.This is  vikash first article and i am learning HTML.
            </p> 
        
};`

function createTemplate (data) {
    var title = data.title;
    var date = data.data;
    var heading = data.heading;
    var content = data.content;
    
var htmlTemplate =
<!DOCTYPE html>
    <head>
        <title>
        ${title}
            Article One | Vikash kumar choudhary
        </title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link href="/ui/style.css" rel="stylesheet" />
    </head>
    <body>
        <div class="container">
            <div>
            <a href="/">Home</a>
        </div>
        <hr/>
        <h3>
            ${heading}
        </h3>
        <div>
        ${date}
            December 10,1996
        </div>
        <div>
        ${content}
        </div>
        </div>
    </body>
</html>
;
return  htmlTemplate;


app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

app.get('/article-one',function (req, res) {  
  res.send(createTemplate(articleOne));
});

app.get('/article-two',function (req, res) {  
  res.sendFile(path.join(__dirname, 'ui', 'article-two.html'));
});

app.get('/article-three',function (req, res) {  
  res.sendFile(path.join(__dirname, 'ui', 'article-three.html'))
;});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});


var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});

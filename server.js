var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool = require('pg').Pool;

var config = {
    user: 'vikash54321',
    database: 'vikash54321',
    host: 'db.imad.hasura-app.io',
    port: '5432',
    password: process.env.DB_PASSWORD
};

var app = express();
app.use(morgan('combined'));
			
var articles = {
'article-one':  {
			  title: 'Article one | Vikash kumar choudhary ',
			  heading:'Article one',
			  Date : 'December 10, 1996',
			  content:
			          `<p>
			              This is  vikash first article and i am learning HTML.This is  vikash first article and i am learning HTML.This is  vikash first article and i am learning HTML.This is  vikash first article and i am learning HTML.This is  vikash first article and i am learning HTML.
			            </p>
			            <p>
			                This is  vikash first article and i am learning HTML.This is  vikash first article and i am learning HTML.This is  vikash first article and i am learning HTML.This is  vikash first article and i am learning HTML.This is  vikash first article and i am learning HTML.This is  vikash first article and i am learning HTML.This is  vikash first article and i am learning HTML.This is  vikash first article and i am learning HTML.This is  vikash first article and i am learning HTML.
			            </p>
			            <p>
			                This is  vikash first article and i am learning HTML.This is  vikash first article and i am learning HTML.This is  vikash first article and i am learning HTML.This is  vikash first article and i am learning HTML.
			            </p>`
			       
			},
'article-two':  {
    title: 'Article Two | Vikash kumar choudhary ',
			  heading:'Article Two',
			  Date : 'December 1, 1996',
			  content:
			          `<p>
			              This is  vikash secondarticle and i am learning HTML.This is  vikash secondarticle and i am learning HTML.This is  vikash secondarticle and i am learning HTML.This is  vikashsecond article and i am learning HTML.This is  vikash secondarticle and i am learning HTML.
			            </p>
			            <p>
			                This is  vikash first article and i am learning HTML.This is  vikash first article and i am learning HTML.This is  vikash first article and i am learning HTML.This is  vikash first article and i am learning HTML.This is  vikash first article and i am learning HTML.This is  vikash first article and i am learning HTML.This is  vikash first article and i am learning HTML.This is  vikash first article and i am learning HTML.This is  vikash first article and i am learning HTML.
			            </p>
			            <p>
			                This is  vikash first article and i am learning HTML.This is  vikash first article and i am learning HTML.This is  vikash first article and i am learning HTML.This is  vikash first article and i am learning HTML.
			            </p>`
			       
			},
'article-three': {
    title: 'Article Three|Vikash kumar choudhary ',
			  heading:'Article Three',
			  Date : 'December 2, 1996',
			  content:
			          `<p>
			              This is  vikash third article and i am learning HTML.This is  vikash third article and i am learning HTML.This is  vikash third article and i am learning HTML.This is  vikash third article and i am learning HTML.This is  vikash third article and i am learning HTML.
			            </p>
			            <p>
			                This is  vikash first article and i am learning HTML.This is  vikash first article and i am learning HTML.This is  vikash first article and i am learning HTML.This is  vikash first article and i am learning HTML.This is  vikash first article and i am learning HTML.This is  vikash first article and i am learning HTML.This is  vikash first article and i am learning HTML.This is  vikash first article and i am learning HTML.This is  vikash first article and i am learning HTML.
			            </p>
			            <p>
			                This is  vikash first article and i am learning HTML.This is  vikash first article and i am learning HTML.This is  vikash first article and i am learning HTML.This is  vikash first article and i am learning HTML.
			            </p>`
			       
			} 
};

 function createTemplate (data) {
			    var title = data.title;
			    var date = data.Date;
			    var heading = data.heading;
			    var content = data.content;
			    
			var htmlTemplate = `
			<!DOCTYPE html>
			    <head>
			    <title>
			            ${title}
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
			        ${Date}
			        </div>
			        <div>
			        ${content}
			        </div>
			        </div>
			    </body>
			</html>
			`;
			return  htmlTemplate;
			}

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

var pool = new Pool(config);
app.get('/test-db', function (req, res) {
    // make a select request
    //return a response with the results
    pool.query('SELECT * FROM test', function(err, result) {
        if (err) {
            res.status(500).send(err.toString());
            } else {
                res.send(JSON.stringify(result.rows));
            }
    });
});

var counter = 0;
app.get('/counter', function (req, res) {
    counter = counter + 1;
    res.send(counter.toString());
});

var names = [];
app.get('/submit-name', function(req, res) { // URL: /submit-name?name=xxxxx
    // Get the name from the request
    var name = req.query.name;
    
    names.push(name);
    // JSON: Javascript Object Notation
    res.send(JSON.stringify(names));
});

app.get('/articles/:articleName', function (req, res) {
   // articleName == article-one
   // articles[articleName] == {} content object for article one
   
   // SELECT * FROM article WHERE title = '\'; DELETE WHERE a = \'asdf'
   pool.query("SELECT * FROM article WHERE title = $1", [req.params.articleName], function (err, result) {
    if (err) {
        res.status(500).send(err.toString());
    } else {
        if (result.rows.length === 0) {
            res.status(404).send('Article not found');
        } else {
            var articleData = result.rows[0]; 
            res.send(createTemplate(articleData));
        }
    }
  });
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});


var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});

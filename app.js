

var express = require("express");
var app = express();
var mysql = require('mysql');
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.set('views',__dirname+'/views');
app.set('view engine', 'html');
app.engine('html', require('hbs').__express);

app.use(express.static(__dirname + '/public'));

//app.listen('3000');

var port = Number(process.env.PORT || 3000);
app.listen(port, function() {
console.log("Listening on " + port);
});
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'pass',
  database: 'neversleephungry'
});


connection.connect(function(err){
	if(err) console.log("Error occured connecting the database:",err);
	else console.log("Database connected successfully");
});


app.get('/', function(req,res){	
	connection.query('select * from mob', function(err, data){		
		res.render('index',{users: data});
			
	})
});


app.post('/feedback', function(req,res){
	console.log('Calling POST');
	console.log('Request from form:',req.body);
	var name=req.body.name;
	var email=req.body.email;
	var phone=req.body.phone;
	var feedback = req.body.feedback;
	var id=req.body.uid;
	connection.query('insert into feedback values (?,?,?,?,?);',[id,name,email,phone,feedback],function(err){
		if(err) console.log("Error occured while inserting the data:",err);
		res.render('index');
	})
});



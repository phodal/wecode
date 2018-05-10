var express = require("express");
var bodyParser = require('body-parser');
var multer = require('multer');
var multerupload = multer({dest: 'fileprint/'});
var app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

var router = express.Router();
router.get('/', function (req, res) {
  res.json({message: 'welcome to our upload module apis'});
});

router.post('/upload', multerupload.any(), function(req, res){
  console.log(req);
  res.send({
    "code":"200",
    "success":"files printed successfully"
  })
});

app.use('/api', router);
app.listen(4000);

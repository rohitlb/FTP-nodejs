var express = require('express');
var bodyParser = require('body-parser');
var multer = require('multer');
var path = require('path');

var routes = require('./model/imagefile');
var app = express();
app.set('port',2000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');


//set all middleware
app.use(bodyParser.json());
//exteended false means it won't be accepting nested objects (accept only single)
// here security for session to be added like.... session validate
app.use(bodyParser.urlencoded({extended : false}));
app.use(express.static(path.join(__dirname,'public')));

app.use(routes);

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        // image name is set as number+orignal image name
        cb(null, req.dpname + file.originalname);
        //req.session.dpindbname = req.session.dpname + file.originalname;
    }
});

var upload = multer({
    storage: storage
});

app.get('/uploadimage', function (req,res) {
    res.render('rohitimage');
});

app.post('/uploadimage', upload.any(), function(req, res) {
    var path = req.files[0].path;
    //var imageName = req.session.dpindbname ;
    console.log(req.session.userID);
    User.update({_id : req.session.userID},{
        $set : {
            path : path
        }
    },function (err,result) {
        if(err){
            console.log(err);
        }
        else{
            console.log(result);
            //res.redirect('/health_care_provider?page=image');
            res.send({status: "success", message: "Image successfully registered"});
        }
    });
    routes.addImage(User, function(err) {
    });
});

app.listen(app.get('port'), function () {
    console.log('server connected to http:localhost:' + app.get('port'));
});
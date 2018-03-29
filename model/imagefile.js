var express = require('express');
var router = express.Router();
var multer = require('multer');
var bodyParser = require("body-parser")
var fs = require("fs");


router.getImages = function(callback, limit) {
 
 Image.find(callback).limit(limit);
};

router.getImageById = function(id, callback) {
  
 Image.findById(id, callback);
 
};
 
router.addImage = function(image, callback) {
 Image.create(image, callback);
};

// To get more info about 'multer'.. you can go through https://www.npmjs.com/package/multer..

var storage = multer.diskStorage({
 destination: function(req, file, cb) {
 cb(null, 'uploads/')
 },
 filename: function(req, file, cb) {
 cb(null, file.originalname);
 }
});
 
var upload = multer({
 storage: storage
});

	router.get('/picture/:id',function(req,res){
		Image.findById(req.params.id,function(err,file){
			if (err) {
				throw err;
			}
			console.log(file);
			console.log(file.path);
			res.render("profile.pug",{image: file.path});

		});
	});

//======================================================================================
 
module.exports = router;
var util = require('util')
    , fs = require('fs');

exports.get = function(req, res) {
	res.render('upload', {
		type:req.param('type')
	});
}

exports.post = function(req, res){
//    if(req.is('an image')){
        console.log('-> upload was called\n\n');
        console.log('-> ' + util.inspect(req.files));
        var images = [];
    
        req.addListener('data', function(chunk) {
            console.log('-> data ' + chunk);
        });
    
        if (Array.isArray(req.files.imgs)){
            req.files.imgs.forEach(function(image){
                var kb = image.size / 1024 | 0;

                images.push({name: image.name, size: kb});
                renameImg(image);
            });
        }else{
            var image = req.files.imgs;
            var kb = image.size / 1024 | 0;

            images.push({name: image.name, size: kb});
            renameImg(image);
        }
    
        console.log('->> render');
        res.render('uploadshow', { title: 'Show'
                            ,images: images
			    , type:req.param('type')
        });
//    }else{
//        res.render('error', { title: 'Error'
//                            ,msg: 'plz Upload only Image types'
//        });
//    }
};

function renameImg(image){
    var tmp_path = image.path;
    var target_path = './public/dongwon/upload/' + image.name;
    console.log('->> tmp_path: ' + tmp_path );
    console.log('->> target_path: ' + target_path );
            
    fs.rename(tmp_path, target_path, function(err){
        if(err) throw err;
        
        console.log('->> upload done');
    });
}

const express=require('express');

const app=express();

const multer=require('multer');

const imageModel=require('./models/database');

const imageData=imageModel.find({});

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.static("public/images"));

const Storage=multer.diskStorage({
    destination:function (req, file, cb){
        cb(null,"./public/images");
    },
    filename: function(req, file, cb){
        cb(null, Date.now()+"_"+file.originalname);
    }
});

var upload=multer({storage:Storage}).single("image");
// console.log(upload);
app.get('/',(req, res)=>{
    imageData.exec(function(err,data){
        if(err) throw err;
        // console.log(data); //to view contents of DB
        res.render('home',{records:data, success:false});
    })
});

app.post('/',(req,res)=>{
    upload(req,res,function (err){
        if(err){
            console.log(err);
            return res.end('Something went wrong!');
        } else {
            console.log(req.file.path);
            var imageName=req.file.filename;
            var imageDetails=new imageModel({
                imagename:imageName
            });
            imageDetails.save(function (err,doc){
                if(err) throw err;
                console.log("Image Saved");

                imageData.exec(function(err,data){
                    if(err) throw err;
                    res.render('home',{records:data, success:true})
                })
            });
        }
    });
});
app.listen(5000,()=>{
    console.log("Server is listening on port 5000")
});
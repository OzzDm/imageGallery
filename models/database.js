const mongoose=require('mongoose');

mongoose.connect('mongodb+srv://<username>:<password>@cluster0.ynmsx.mongodb.net/<databaseName>?retryWrites=true&w=majority',{
    useNewUrlParser:true,
    useUnifiedTopology:true
});

var db=mongoose.connection;

db.on('error',console.error.bind(console,'DB connection error!'));

db.once('open', result=>{
    console.log('DB connected!');
});

var uploadSchema= new mongoose.Schema({
    imagename:String
})

var uploadModel=mongoose.model('image',uploadSchema);

module.exports=uploadModel;

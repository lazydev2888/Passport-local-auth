const mongoose = require('mongoose');


mongoose.set('strictQuery', false);


exports.connectMongoose = () => {
    mongoose.connect("mongodb://localhost:27017/passport")
    .then((e)=> console.log(`Conneted to mongoDB:${e.connection.host}`))
    .catch((e)=> console.log(e)); 
};

const userSchema = new mongoose.Schema({
    name:String,

    username:{
        type:String,
        required:true,
        unique:true,
    },
    password: String,
});

exports.User = mongoose.model("User", userSchema);
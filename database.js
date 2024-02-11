const mongoose = require("mongoose")

exports.connectMongoose = () => {
    mongoose
    .connect("mongodb://127.0.0.1:27017/passport")
    .then((e)=> console.log(`connected to mongodb:${e.connect.host}`))
    .catch((e)=>console.log(e)) ;
}

const userSchema = new mongoose.Schema({
    username: {
        type:String,
        required:true,
        unique: true
    },
    password : {
       type: String,
    //    required:true
    },
    name:{
        type: String,
    //    required:true
    },
    googleId: String,
    secret: String
})

exports.User = mongoose.model("User", userSchema);

const callRequestSchema = new mongoose.Schema({
    phoneNumber: {
        type: String,
        required: true,
    },
    nameofuser: {
        type: String,
    required:true,
    }
    
});

exports.CallRequest = mongoose.model("CallRequest", callRequestSchema);
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    photo:{
        type:String,
        required:false
    },
    isadmin:{
        type:Boolean,
        required:false
    }
});

module.exports = mongoose.model("usersignup", userSchema);
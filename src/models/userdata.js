const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt=require("jsonwebtoken");
// const validator = require('validator');
const userdataSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    confirmpassword: {
        type: String,
        required: true
    },
    tokens:[{
        token:{
        type: String,
        required: true
        }
    }]
})
// token generate
userdataSchema.methods.generateAuthToken = async function(){
       try {
           const token = jwt.sign({_id:this._id.toString()},"mynameisshivavermareciansonbhadra");
           this.tokens = this.tokens.concat({token:token})
           await this.save();
           return token;
       } catch (error) {
           res.send("the error" + error);
       }
}
//password hashing
userdataSchema.pre("save", async function (next) {
    if(this.isModified("password")){
        // console.log('the current password is',this.password);
        this.password = await bcrypt.hash(this.password, 10);
        // console.log('the current password is',this.password);  
        this.confirmpassword=await bcrypt.hash(this.confirmpassword, 10);
    }
    next();
})
const Userdata = new mongoose.model("Userdata", userdataSchema);
module.exports = Userdata;
module.exports.logout_get=(req,res)=>{
    // res.cookie('jwt','',{maxAge:1});
    res.clearCookie('jwt');
    res.render('login');
}
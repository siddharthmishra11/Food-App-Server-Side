const mongoose = require('mongoose');
const validator = require("email-validator");
let bcrypt = require("bcrypt");
const saltRounds = 10;
const db_link = "";
const {randomBytes} = import('crypto');

mongoose.connect(db_link)
.then((db)=>{
 
 console.log("DB connected");
})
.catch((err)=>{
    console.log(err.message);
})

const userSchema = mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function() {
              return validator.validate(this.email);
              
            },
            message: props => `${props.value} is not a valid Email!`
          },
    },
    password:{
        type: String,
        required: true,
        minLength :[8,"Password Length Should be minimum 8"]
    },
    confirmPassword:{
        type: String,
        required: true,
        minLength :[8,"Password Length Should be minimum 8"],
        validate: {
            validator: function() {
              return  this.confirmPassword===this.password;
            },
            message: () => `Confirm Password doesn't match`
          },
    },
    role:{
        type: String,
        enum: {
            values: ['Admin', 'Restaurant Owner','Delivery Boy','user'],
            message: '{VALUE} is not authorized'
          },
          default: 'user'
    },
    profile_img:{
        type: String,
        default: 'img/user/default.png'
    },
    resetToken: String
});

userSchema.pre("save", async function(){
   
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(this.password, salt);
    this.password = hash;
    this.confirmPassword = undefined;
})

userSchema.post("save",function(doc){
    console.log(doc);
})

userSchema.methods.createResetToken = function(){
    let buf = randomBytes(256);
    this.resetToken = buf.toString("hex");
}

const userModel = mongoose.model("userModel",userSchema);

module.exports = userModel;

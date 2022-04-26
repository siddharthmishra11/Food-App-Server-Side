const userModel = require('../Models/userModel');
const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");
const JWT_KEY = require("../Secret");
//signup
async function signup(req,res){
    try{
        let obj =  req.body;
        let user = await userModel.create(obj);

        res.json({
            msg: "User created",
            obj: user
        })

    }
    catch(err){

        res.status("500").json({
            msg: err.message
        })

    }
}

//login
async function login(req,res){
    try{
        let data = req.body;
        if(!data.email){
            res.status("401").json({
                msg: "Please Input Email"
            })
        }
        let user = await userModel.findOne({email: data.email});
         
        if(user){
          
            const match = await bcrypt.compare(data.password, user.password);
            if(match){
                let jwt = JWT.sign(user._id.toJSON(),JWT_KEY);
                res.cookie("login",jwt,{httpOnly: true,expires: new Date(Date.now() + 1000*60*60*24)});
                res.json({
                    msg: "User Logged In",
                    uderDetails: data,
                   
                })
            }else{
                res.status("401").json({
                    msg: "Wrong Credentials"
                })
            }
        }
        else{
            res.status("401").json({
                msg: "Wrong Credentials"
            })
        }
    }
    catch(err){
        res.status("500").json({
            msg: err.message
        })
    }
}

//isAuthorised
function isAuthorised(roles){

    return function(req,res,next){
        let role = req.role;
        if(roles.includes(role)){
            next();
        }
        else{

            res.status("401").json({
                msg: "Unauthorized Access"
            })

        }
    }
}

//protect route
async function protectRoute(req,res,next){
    try{
     if(req.cookies.login){

         let payload = await JWT.verify(req.cookies.login,JWT_KEY);
          
         if(payload){
             let user = await userModel.findById(payload);
                 req.role = user.role;
                 req._id = user._id;
                  next();

             }
            else{
                if(req.headers["user-agent"].includes("Mozilla"))
                {
                    res.redirect("/login");
                }
                res.status("401").json({
                 msg: "Not Logged in User"
             })
         }
     }
     else{
        if(req.headers["user-agent"].includes("Mozilla"))
        {
            res.redirect("/login");
        }
         res.status("401").json({
             msg: "Not Logged in User"
         })

     }
    }
    catch(err){
     
        res.status("500").json({
         msg: err.message
     })

    }
     
 }

async function forgetPassword(req,res){
    try{
        let {email} = req.body;
        let user = await userModel.findOne({email: email});
        if(user){
            let resetToken = user.createResetToken();
            let url = `${req.protocol}://${req.hostname}/resetPassword/${resetToken}`;

        }else{
            res.status("401").json({
                msg: "Unauthorized Access"
            })
        }
    }
    catch(err){
        res.status("500").json({
            msg: err.message
        })
    }

}

async function resetPassword(req,res){
    try{
        let token = req.params.token;
        let {password,confrimPassword} = req.body;
        let user = await userModel.findOne({resetToken: token});
        if(user){
             await user.update({password: password,confrimPassword: confrimPassword});
             this.resetToken = undefined;
             res.json({
                 msg: "Password Updated"
             })
        }else{
            res.status("401").json({
                msg: "Unauthorized Access"
            })
        }
    }
    catch(err){
        res.status("500").json({
            msg: err.message
        })
    }
}

function logout(req,res){
    try{
            res.clearCookie("login");
            res.json({
                msg: "Logout sucessful"
            })
        
    }
    catch(err){
        res.status("500").json({
            msg: err.message
        })
    }
}

module.exports = {
    signup: signup,
    login: login,
    isAuthorised: isAuthorised,
    protectRoute: protectRoute,
    resetPassword: resetPassword,
    forgetPassword: forgetPassword,
    logout: logout
}
const express = require('express');;
const userRouter = express.Router();
const {getUser,getUserById,patchUser,deleteUser} = require("../Controller/userController");
const {signup,login,isAuthorised,protectRoute,resetPassword,forgetPassword,logout} = require("../Controller/authController");

userRouter
.route("/:id")
.patch(patchUser)
.delete(deleteUser)

userRouter
.route("/signup")
.post(signup);

userRouter
.route("/login")
.post(login)

userRouter
.route("/forgetPassword")
.post(forgetPassword)

userRouter
.route("/resetPassword/:token")
.post(resetPassword)

userRouter.use(protectRoute);
userRouter
.route('/userProfile')
.get(getUserById);

userRouter.use(protectRoute);
userRouter
.route('/logout')
.get(logout);

userRouter.use(isAuthorised(['Admin']));
userRouter
.route('/')
.get(getUser);

function setCookies(req,res){
    res.cookie("isLoggedInNot",true)
    res.send("Cookies set");
}

function getCookies(req,res){
    let cookies = req.cookies;
    
    console.log(cookies);
    res.send("Cookies Got")
}

module.exports = userRouter;
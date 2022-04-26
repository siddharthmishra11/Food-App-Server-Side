const userModel = require('../Models/userModel');

async function getUser(req,res){
    try{
        let allUsers = await userModel.find().exec();
        res.json({
            msg: "List of All Users",
            user: allUsers
        })
    }
    catch(err){
        res.status("500").json({
            msg: err.message
        })
    }
}

async function patchUser(req,res){
    try{
        let obj = req.body;
        let id = req.params.id;
        let user = await userModel.findByIdAndUpdate(id,{...obj},{upsert: true}).exec();
        if(user){
            res.json({
                msg: "User Updated",
                user: user
            })
        }
        else{
            res.status("404").json({
                msg: "User not found"
            })
        }
    }
    catch(err){
        res.status("500").json({
            msg: err.message
        })
    }
}

async function deleteUser(req,res){
    try{   
        let id = req.params.id;
        let user = await userModel.findByIdAndDelete(id).exec();
        if(user){
            res.json({
                msg: "User Updated",
                user: user
            })
        }else{
            res.status("404").json({
                msg: "User not found"
            })
        }
    }
     catch(err){
        res.status("500").json({
            msg: err.message
        })
     }
    
}

async function getUserById(req,res){
    try{
        let id = req._id;
        
        let user = await userModel.findById(id).exec();
        if(user){
           res.json({
              msg: "User Found",
              user: user
             })
        }
         else{
           res.status("404").json({
                msg: "User not found"
             })
        }
    }
    catch(err){
        res.status("500").json({
            msg: err.message
        })
    }
    
}

module.exports = {
    getUser: getUser,
    patchUser: patchUser,
    deleteUser: deleteUser,
    getUserById: getUserById
}
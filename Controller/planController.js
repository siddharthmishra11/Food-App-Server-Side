const planModel = require('../Models/planModel');

async function getAllPlans(req,res){
    try{
        let allPlans = await planModel.find().exec();
        res.json({
            msg: "List of All Plans",
            plan: allPlans
        })
    }
    catch(err){
        res.status("500").json({
            msg: err.message
        })
    }
}

async function getPlan(req,res){
    try{
        let id = req.params.id;
        let plan = await planModel.findById(id).exec();
        res.json({
            msg: "Plan",
            plan: plan
        })
    }
    catch(err){
        res.status("500").json({
            msg: err.message
        })
    }
}

async function createPlan(req,res){
    try{
        let plan = await planModel.create(req.body);
        res.json({
            msg: "Plan Created",
            plan: plan
        })
    }
    catch(err){
        res.status("500").json({
            msg: err.message
        })
    }
}

async function deletePlan(req,res){
    try{
        let id = req.params.id;
        let plan = await planModel.findByIdAndDelete(id);
        if(plan){
            res.json({
                msg: "Plan Deleted",
                plan : plan
            })
        }else{
            res.status("404").json({
                msg: "Plan Not Found",
            })
        }
    }
    catch(err){
        res.status("500").json({
            msg: err.message
        })
    }
}

async function updatePlan(req,res){
    try{
        let id = req.params.id;
        let plan = await planModel.findByIdAndUpdate(id,{...req.body});
        if(plan){
            res.json({
                msg: "Plan Updated",
                plan : plan
            })
        }else{
            res.status("404").json({
                msg: "Plan Not Found",
            })
        }
    }
    catch(err){
        res.status("500").json({
            msg: err.message
        })
    }
}

async function getTopPlans(req,res){
            try{
              const query = planModel.find();
              const lim = req.params.lim;
              let sortPlan =  await query.sort({averageRating: -1}).limit(lim);
                    res.json({
                        msg: "Plan",
                        plan: sortPlan
                    })
                 
            }
            catch(err){
                res.status("500").json({
                    msg: err.message
                })
            }
        }
module.exports = {
    getAllPlans: getAllPlans, 
    getPlan: getPlan,
    updatePlan: updatePlan,
    deletePlan: deletePlan,
    createPlan: createPlan,
    getTopPlans: getTopPlans
}

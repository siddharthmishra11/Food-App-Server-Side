const express = require('express');;
const planRouter = express.Router();
const {isAuthorised,protectRoute} = require("../Controller/authController");
const {getAllPlans,getPlan,createPlan,updatePlan,deletePlan,getTopPlans} = require("../Controller/planController");
planRouter.
route("/allPlans")
.get(getAllPlans);

planRouter.
route("/topPlans/:lim")
.get(getTopPlans);

planRouter.use(protectRoute);
planRouter.
route("/getPlan/:id")
.get(getPlan);

planRouter.use(isAuthorised(['Admin', 'Restaurant Owner']));
planRouter.
route("/createPlan")
.post(createPlan);

planRouter.
route("/:id")
.patch(updatePlan)
.delete(deletePlan);

module.exports = planRouter;
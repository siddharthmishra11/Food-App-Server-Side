const mongoose = require('mongoose');
const db_link = "mongodb+srv://admin:nFhOZtaH9GSZeqfM@cluster0.lsfyz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

mongoose.connect(db_link)
.then((db)=>{
 console.log("DB connected");
})

.catch(err=>console.log(err.message));

const planSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        maxLength: [20,"Plan Name Length should be less than 20"]
    },
    duration: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: [true,"Enter Price"]
    },
    averageRating: {
        type: Number,

    },
    discount: {
        type: Number,
        max: [99,"Discount can't be >=100"]
    }
});
const planModel = mongoose.model("planModel",planSchema);

// (()=>{
//     let plan = {
//         name: "SuperFood4",
//         duration: 60,
//         price: 500000,
//         averageRating: 3.8,
//         discount: 65
//     };
//     planModel.create(plan);
// })();

module.exports = planModel;
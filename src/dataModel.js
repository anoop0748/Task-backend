const mongoose = require('mongoose');

let todoSchema = new mongoose.Schema({
    title:{type:String, require:true},
    is_completed: {type:Boolean, require:true}
});

const todoModel = mongoose.model("Test_Todo",todoSchema);

module.exports = todoModel;

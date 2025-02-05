const mongoose = require('mongoose')
const DataSchema = mongoose.Schema({

        categoryName:{type:String,required:true,unique:true},
        categoryImg:{type:String,required:true},

    },{timestamps:true,versionKey:false}
)
const  CategoryModel = mongoose.model('categories',DataSchema);

module.exports = CategoryModel;
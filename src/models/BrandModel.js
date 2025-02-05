 const mongoose = require('mongoose')
  const DataSchema = mongoose.Schema({

      brandName:{type:String,required:true,unique:true},
      brandImg:{type:String,required:true},

      },{timestamps:true,versionKey:false}
  )
 const  BrandModel = mongoose.model('brands',DataSchema);

  module.exports = BrandModel;









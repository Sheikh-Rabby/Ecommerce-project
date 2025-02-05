
const  FeatureModel=require('../models/FeaturesModel')


const FeaturesListService =async (req,res)=>{
    try{
        let data= await FeatureModel.find()

        return {status:"success",data:data}
    }catch(err){

        return{status:500,message:"Failed to load Features"};
    }




}
module.exports=FeaturesListService

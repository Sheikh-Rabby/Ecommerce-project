 const FeaturesListService= require('../services/FeaturesServices')


 exports.Features= async (req,res)=>{

    let data =await FeaturesListService()
     return res.status(200).json(data)

 }
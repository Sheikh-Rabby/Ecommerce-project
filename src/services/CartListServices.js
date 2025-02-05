  const CartModel  =require('../models/CartModel')
  const mongoose=require('mongoose')
   const ObjectID=mongoose.Types.ObjectId


  const CartListService =async (req,res)=>{
      try{

          let user_id=new ObjectID(req.headers.user_id)
          let MatchStage={$match:{userID:user_id}}
          let JoinProductState={$lookup:{from:"products",localField:"productID",foreignField:"_id",as:"product"}}
          let UnwindStage ={$unwind:"$product"}
          let JoinBrandState={$lookup:{from:"brands",localField:"product.brandID",foreignField:"_id",as:"brand"}}
          let UnwindBrandStage ={$unwind:"$brand"}
          let JoinCaregoryState={$lookup:{from:"categories",localField:"product.categoryID",foreignField:"_id",as:"category"}}
          let UnwindCategoryStage ={$unwind:"$category"}


          let Projection={$project:{
                  '_id':0,'userID':0,'updatedAt':0,'product._id':0,'product.categoryID':0,'product.brandID':0,'product.createdAt':0,'product.updatedAt':0,
                  'brand._id':0,'category._id':0,'createdAt':0,'productID':0
              }}



          let  data=await CartModel.aggregate([
              MatchStage,
              JoinProductState,
              UnwindStage,
              JoinBrandState,
              UnwindBrandStage,
              JoinCaregoryState,
              UnwindCategoryStage,
              Projection
          ])
          return {status:"success",data:data}


      }catch(err){
          return {status:"fail",message:"something went wrong"};
      }


  }
  const SaveCartListService =async (req,res)=>{
      try{
          let user_id=req.headers.user_id;
          let reqBody=req.body;
          reqBody.userID=user_id;

          await CartModel.create(reqBody)

          return {status:"success",message:"Cartlist created successfully."};


      }catch(err){
          return {status:"fail",message:"something went wrong"};
      }

  }
  const UpdateCartListService =async (req,res)=>{
    try{
        let user_id=req.headers.user_id;
        let cartID=req.params.cartID
        let reqBody=req.body;
        await CartModel.updateOne({_id:cartID,userID:user_id},{$set:reqBody})
        return {status:"success",message:"Cartlist Update successfully."};




    }catch(err){
        return {status:"fail",message:"something went wrong"};
    }

  }
  const RemoveCartListService =async (req,res)=>{
      try{
          let user_id=req.headers.user_id;
          let product_id=req.body.productID;

          await CartModel.deleteOne({userID :user_id,productID:product_id})
          return {status:"success",message:"Cartlist Delete successfully."};


      }catch(err){
          return {status:"fail",message:"something went wrong"};
      }

  }



  module.exports={
    CartListService,
      SaveCartListService,
      UpdateCartListService,
      RemoveCartListService
  }
const BrandModel =require('../models/BrandModel');
const CategoryModel =require('../models/CategoryModel');
const ProductSliderModel =require('../models/ProductSliderModel');
const ProductModel =require('../models/ProductModel');
const ProductDetailModel =require('../models/ProductDetailModel');
const ReviewModel =require('../models/ReviewModel');
const mongoose=require('mongoose');
const ObjectId=mongoose.Types.ObjectId






const BrandListService= async (req,res)=>{
      try{
       let data= await BrandModel.find()
          return {status:"success",data:data}


    }catch(err){
        return{status:"fail",data:err}.toString()
      }


}

const CategoryListService= async (req,res)=>{
    try{
        let data= await CategoryModel.find()
        return {status:"success",data:data}


    }catch(err){
        return{status:"fail",data:err}.toString()
    }

}

const SliderListService= async (req,res)=>{
    try{
        let data= await ProductSliderModel.find()
        return {status:"success",data:data}


    }catch(err){
        return{status:"fail",data:err}.toString()
    }

}



const ListByBrandService= async (req)=>{
  try {
      let BrandID= new ObjectId(req.params.BrandID)
      let MatchStage={$match:{brandID:BrandID}};

      let JoinWithBrandStage={$lookup:{from:"brands",localField:"brandID",foreignField:"_id",as:"brand"}};
      let JoinWithCategoryStage={$lookup:{from:"categories",localField:"categoryID",foreignField:"_id",as:"category"}};
      let unwindBrandStage={$unwind:"$brand"}
      let unwindCategoryStage={$unwind:"$category"}

      let ProjectionStage={$project:{'brand._id':0,'category._id':0,'categoryID':0,'brandID':0}}

      let data= await ProductModel.aggregate([
          MatchStage,
          JoinWithBrandStage,
          JoinWithCategoryStage,
          unwindBrandStage,
          unwindCategoryStage,
          ProjectionStage


      ])

      return {status:"success",data:data}

  }catch (err){
      return{status:"fail",data:err}.toString()
  }

}

const ListByCategoryService= async (req,res)=>{
    try{
        let categoryID= new ObjectId(req.params.CategoryID)
        let MatchStage={$match:{categoryID:categoryID}};

        let JoinWithCategoryStage ={$lookup:{from:"categories",localField:"categoryID",foreignField:"_id",as:"category"}};
        let JoinWithBrandStage={$lookup:{from:"brands",localField:"brandID",foreignField:"_id",as:"brand"}};
        let unwindBrandStage={$unwind:"$brand"}
        let unwindCategoryStage={$unwind:"$category"}


        let ProjectionStage={$project:{'brand._id':0,'category._id':0,'categoryID':0,'brandID':0}}

        let data= await ProductModel.aggregate([
            MatchStage,
            JoinWithCategoryStage,
            JoinWithBrandStage,
            unwindCategoryStage,
            unwindBrandStage,
            ProjectionStage

        ])
        return {status:"success",data:data}
    }catch (err){
        return{status:"fail",data:err}.toString()
    }


}

const ListByRemarkService= async (req,res)=>{
    try {

        let Remark= req.params.Remark
        let MatchStage={$match:{remark:Remark}};

        let JoinWithBrandStage={$lookup:{from:"brands",localField:"brandID",foreignField:"_id",as:"brand"}};
        let JoinWithCategoryStage={$lookup:{from:"categories",localField:"categoryID",foreignField:"_id",as:"category"}};
        let unwindBrandStage={$unwind:"$brand"}
        let unwindCategoryStage={$unwind:"$category"}

        let ProjectionStage={$project:{'brand._id':0,'category._id':0,'categoryID':0,'brandID':0}}

        let data= await ProductModel.aggregate([
            MatchStage,
            JoinWithBrandStage,
            JoinWithCategoryStage,
            unwindBrandStage,
            unwindCategoryStage,
            ProjectionStage

        ])

        return {status:"success",data:data}


    }catch (err){
        return{status:"fail",data:err}.toString()
    }

}




const ListBySmilierService= async (req,res)=>{
  try {
      let categoryID= new ObjectId(req.params.CategoryID)
      let MatchStage={$match:{categoryID:categoryID}};
      let limitStage={$limit:20};

      let JoinWithCategoryStage ={$lookup:{from:"categories",localField:"categoryID",foreignField:"_id",as:"category"}};
      let JoinWithBrandStage={$lookup:{from:"brands",localField:"brandID",foreignField:"_id",as:"brand"}};
      let unwindBrandStage={$unwind:"$brand"}
      let unwindCategoryStage={$unwind:"$category"}


      let ProjectionStage={$project:{'brand._id':0,'category._id':0,'categoryID':0,'brandID':0}}

      let data= await ProductModel.aggregate([
          MatchStage,
          JoinWithCategoryStage,
          JoinWithBrandStage,
          unwindCategoryStage,
          unwindBrandStage,
          ProjectionStage,
          limitStage,

      ])
      return {status:"success",data:data}





  }catch (err){
      return{status:"fail",data:err}.toString()
  }

}
const ListByKeywordService= async (req,res)=>{
    try{

        let SearchRegex={"$regex":req.params.Keyword,"$options":"i"}
        let SearchParams =[{title:SearchRegex},{shortDes:SearchRegex}]
        let SearchQuery={$or:SearchParams};
        let MatchStage={$match:SearchQuery};
        let JoinWithCategoryStage ={$lookup:{from:"categories",localField:"categoryID",foreignField:"_id",as:"category"}};
        let JoinWithBrandStage={$lookup:{from:"brands",localField:"brandID",foreignField:"_id",as:"brand"}};
        let unwindBrandStage={$unwind:"$brand"}
        let unwindCategoryStage={$unwind:"$category"}


        const data= await ProductModel.aggregate([
            MatchStage,
            JoinWithCategoryStage,
            JoinWithBrandStage,
            unwindCategoryStage,
            unwindBrandStage,
        ])
        return {status:"success",data:data}


    }catch(err){
        return{status:"fail",data:err}.toString()
    }

}



const DetailsService= async (req,res)=>{
    try {
        let ProductID=new ObjectId(req.params.ProductID)
        let MatchStage={$match:{_id:ProductID}};

        let JoinWithCategoryStage ={$lookup:{from:"categories",localField:"categoryID",foreignField:"_id",as:"category"}};
        let JoinWithBrandStage={$lookup:{from:"brands",localField:"brandID",foreignField:"_id",as:"brand"}};
        let JoinWithDetailsStage={$lookup:{from:"productdetails",localField:"_id",foreignField:"productID",as:"productdetail"}};
        let unwindBrandStage={$unwind:"$brand"}
        let unwindCategoryStage={$unwind:"$category"}
        let unwindProductDetailsStage={$unwind:"$productdetail"}
        let ProjectionStage={$project:{'brand._id':0,'category._id':0}}



         const data= await ProductModel.aggregate([
             MatchStage,
             JoinWithCategoryStage,
             JoinWithBrandStage,
             unwindBrandStage,
             unwindCategoryStage,
             JoinWithDetailsStage,
             unwindProductDetailsStage,
             ProjectionStage,
         ])
        return {status:"success",data:data}





    }catch (err){
        return{status:"fail",data:err}.toString()
    }

}

const ReviewListService= async (req,res)=>{
try{
 let ProductID = new ObjectId(req.params.ProductID)
 let MatchStage={$match:{productID:ProductID}};
 let JoinWithUserProfile ={$lookup:{from:"profiles",localField:"userID",foreignField:"userID",as:"userprofile"}}
  let  unwindStage ={$unwind:"$userprofile"}

    let ProjectionStage={$project:{
            'des':1,
            'rating':1,
            'userprofile.cus_name':1
        }}




 let data= await ReviewModel.aggregate([
     MatchStage,
     JoinWithUserProfile,
     unwindStage,
     ProjectionStage

 ])
return {status:"success",data:data}


}catch(err){
    return{status:"fail",data:err}.toString()
}

}

const CreateReviewService= async (req,res)=>{

  try{
      let user_id=req.headers.user_id;

     let reqBody=req.body;

     let data= await ReviewModel.create({

         productID:reqBody['productID'],
         userID:user_id,
         des:reqBody['des'],
         rating:reqBody['rating'],

     })
      return {status:"success",data:data}



  }catch(err){
      return{status:"fail",data:err}.toString()
  }

}

module.exports={
    BrandListService,
    CategoryListService,
    SliderListService,
    ListByBrandService,
    ListByCategoryService,
    ListByRemarkService,
    ListBySmilierService,
    ListByKeywordService,
    DetailsService,
    ReviewListService,
    CreateReviewService,



}




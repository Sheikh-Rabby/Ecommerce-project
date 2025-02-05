  const {WishListService,SaveWishListService,RemoveWishListService}=require('../services/WishListServices');

exports.WishList=async (req,res)=>{
      let data=await WishListService(req)
      return res.status(200).json(data)


  }
  exports.SaveWishList=async (req,res)=>{

      let data=await SaveWishListService(req)
      return res.status(200).json(data)

  }
  exports.RemoveWishList=async (req,res)=>{
      let data=await RemoveWishListService(req)
      return res.status(200).json(data)


  }
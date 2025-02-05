  const {SaveCartListService,CartListService,UpdateCartListService,RemoveCartListService}=require('../services/CartListServices')


  exports.SaveCartList=async (req,res)=>{
      let data=await SaveCartListService(req)
      return res.status(200).json(data)

  }



  exports.UpdateCartList=async (req,res)=>{
      let data=await UpdateCartListService(req)
      return res.status(200).json(data)


  }
  exports.RemoveCartList=async (req,res)=>{
      let data=await RemoveCartListService(req)
      return res.status(200).json(data)


  }
  exports.CartList=async (req,res)=>{
      let data=await CartListService(req)
      return res.status(200).json(data)


  }






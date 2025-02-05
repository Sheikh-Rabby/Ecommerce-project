const {
    LoginService,
    CreateProfileService1,
    SaveProfileService,
    ReadProfileService
 }=require('../services/UserServices')


exports.CreateProfile= async (req,res)=>{

  let data=await CreateProfileService1(req)
    return res.status(200).json(data)

}
exports.Login= async (req,res)=>{

    let data=await LoginService(req,res)


    if(data['status']==="success"){
        //cookie option
         let cookieOption ={
             expires:new Date(Date.now()+24*60*60*1000), httpOnly:false}
        //set cookie with response
        res.cookie('token',data['token'],cookieOption)
        return res.status(200).json(data)
    }else {

    }

    return res.status(200).json(data)

}

exports.UserLogout= async (req,res)=>{


    let cookieOption ={expires:new Date(Date.now()-24*60*60*1000), httpOnly:false}
    res.cookie('token',"",cookieOption)
    return res.status(200).json({status:"success",message:"Logout successfully"})





}

exports.SaveProfile= async (req,res)=>{

    let data=await SaveProfileService(req)
    return res.status(200).json(data)

}
exports.UpdateProfile= async (req,res)=>{

    let data=await SaveProfileService(req)
    return res.status(200).json(data)

}



exports.ReadProfile= async (req,res)=>{
    let data=await ReadProfileService(req)
    return res.status(200).json(data)


}




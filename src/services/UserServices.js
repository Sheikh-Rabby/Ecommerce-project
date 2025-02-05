  const EmailSend = require("../utility/EmailHelper");
  const UserModel = require("../models/UserModel");
  const {EncodedToken} = require("../utility/TokenHelper");
  const e = require("express");
  const ProfileModel= require('../models/ProfileModel')



  const CreateProfileService1 = async (req, res) => {
      try {
          const {email,password} = req.body;

          // Use await to handle the creation asynchronously

          const user = await UserModel.findOne({ email });

          if(user){
              return {status:"fail",message:"Email already exists"};
          }
           await UserModel.create({email:email,password:password});
              return { status:"success",message:"Successfully created" };



          // Send success response


      } catch (err) {
          // Send error response if something goes wrong
          return {status:"fail",message:"something went wrong"};
      }
  };

  const LoginService= async (req,res)=>{

     try{
         const { email, password } = req.body;

         //User count
         const user = await UserModel.findOne({ email });

          //token
         let token = EncodedToken(user.email, user._id.toString());

         return {status:"success",message:"login success",token:token};

     }catch(err){
         return {status:"fail",message:"something went wrong"};
     }

}



const SaveProfileService= async (req,res)=>{

   try{
       let user_id= req.headers.user_id;
       let reqBody=req.body;
       reqBody.userID=user_id;

       await ProfileModel.updateOne({userID:user_id},{$set:reqBody},{upsert:true})
       return {status:"success",message:"Profile Save Success"};


   }catch(err){
       return {status:"fail",message:"something went wrong."};
   }
}


const ReadProfileService= async (req,res)=>{
    try{
        let user_id=req.headers.user_id;
        let data= await ProfileModel.find({userID:user_id})
        return {status:"success",data:data};


    }catch(err){
        return {status:"fail",message:"something went wrong."};
    }




}
module.exports={
    CreateProfileService1,
    LoginService,
    SaveProfileService,
    ReadProfileService,
}



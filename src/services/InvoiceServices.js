

 const InvoiceModel= require('../models/InvoiceModel')
 const InvoiceProductModel=      require('../models/InvoiceProductModel')
 const PaymentSettingModel=require('../models/PaymentSettingModel')
 const mongoose=require('mongoose')
 const ObjectID=mongoose.Types.ObjectId
 const FormData=require('form-data')
 const axios=require('axios')
 const CartModel = require("../models/CartModel");
 const ProfileModel = require("../models/ProfileModel");
 const e = require("express");


const CreateInvoiceService =async (req,res)=>{

   //total playable

    let user_id=new ObjectID(req.headers.user_id)
    let cus_email=req.headers.email

    let MatchStage={$match:{userID:user_id}}
    let JoinStageProduct={$lookup:{from:"products",localField:"productID",foreignField:"_id",as:"product"}}
    let UnwindStage ={$unwind:"$product"}


     let data = await CartModel.aggregate([
         MatchStage,
         JoinStageProduct,
         UnwindStage
     ])
    let totalAmount=0;
    data.forEach((element)=>{

        let price;
        if(element['product']['discount'])
        {
            price=parseFloat(element['product']['discountPrice']);
        }else {
            price=parseFloat(element['product']['price']);
        }
        totalAmount+=parseFloat(element['qty'])*price

    })
     let vat=totalAmount*0.05
    let payable=totalAmount+vat


    //prepare customer Details and shipping details

    let profile = await ProfileModel.aggregate([MatchStage])
    let cus_details=`Name:${profile[0]['cus_name']},Email:${cus_email},Address:${profile[0]['cus_add']},Phone:${profile[0]['cus_phone']}`
    let ship_details=`Name:${profile[0]['ship_name']},ShippingCity:${profile[0]['ship_city']},Address:${profile[0]['ship_add']},Phone:${profile[0]['ship_phone']}`

    //transaction $ other ID

    let tran_id=Math.floor(1000000+Math.random()*9000000)
    let val_id=0;
    let delivery_status="pending"
    let payment_status="pending"


    //create Invoice

    let createInvoice=await InvoiceModel.create({
        userID:user_id,
        payable:payable,
        cus_details:cus_details,
        ship_details:ship_details,
        tran_id:tran_id,
        val_id:val_id,
        payment_status:payment_status,
        delivery_status:delivery_status,
        total:totalAmount,
        vat:vat
    })

    //Create Invoice Product

      let invoice_id=createInvoice['_id']
    for (const element of data) {
        await InvoiceProductModel.create({
            userID: user_id,
            productID: element['productID'],
            invoiceID: invoice_id,
            qty: element['qty'],
            price: element['product']['discount'] ? element['product']['discountPrice'] : element['product']['price'],
            color: element['color'],
            size: element['size'],
        });
    }
    //remove carts

    await CartModel.deleteMany({userID:user_id})

    //prepare ssl payment
     let PaymentSetting =await PaymentSettingModel.find()

    const form = new FormData()
    form.append('store_id',PaymentSetting[0]['store_id'])
    form.append('store_passwd',PaymentSetting[0]['store_passwd'])
    form.append('total_amount',payable.toString())
    form.append('currency',PaymentSetting[0]['currency'])
    form.append('tran_id',tran_id)
    form.append('success_url',`${PaymentSetting[0]['success_url']}/${tran_id}`)
    form.append('fail_url',`${PaymentSetting[0]['fail_url']}/${tran_id}`)
    form.append('cancel_url',`${PaymentSetting[0]['cancel_url']}/${tran_id}`)
    form.append('ipn_url',`${PaymentSetting[0]['ipn_url']}/${tran_id}`)


    form.append('cus_name',profile[0]['cus_name'])
    form.append('cus_email',cus_email)
    form.append('cus_add1',profile[0]['cus_add'])
    form.append('cus_add2',profile[0]['cus_add'])
    form.append('cus_city',profile[0]['cus_city'])
    form.append('cus_state',profile[0]['cus_state'])
    form.append('cus_postcode',profile[0]['cus_postcode'])
    form.append('cus_country',profile[0]['cus_country'])
    form.append('cus_phone',profile[0]['cus_phone'])
    form.append('cus_fax',profile[0]['cus_phone'])

    form.append('shipping_method',"YES")
    form.append('ship_name',profile[0]['ship_name'])
    form.append('ship_add1',profile[0]['ship_add'])
    form.append('ship_add2',profile[0]['ship_add'])
    form.append('ship_city',profile[0]['ship_city'])
    form.append('ship_state',profile[0]['ship_state'])
    form.append('ship_country',profile[0]['ship_country'])
    form.append('ship_postcode',profile[0]['ship_postcode'])
    form.append('product_name',"mern shop products")
    form.append('product_category',"According Invoice")
    form.append('product_profile',"According Invoice")
    form.append('product_amount',"According Invoice")

    let SSlRes = await axios.post(PaymentSetting[0]['init_url'],form)













    return{status:"success",data:SSlRes.data}






     }
 const PaymentFailService =async (req,res)=>{
     try{
         let trxID=req.params.trxID
         await InvoiceModel.updateOne({tran_id:trxID},{payment_status:"Fail"})
         return {status:"Fail"}

     }catch (err){
         return {status:"fail",message:"Something went wrong"}

     }

 }
 const PaymentCancelService =async (req,res)=>{
     try{
         let trxID=req.params.trxID
         await InvoiceModel.updateOne({tran_id:trxID},{payment_status:"cancel"})
         return {status:"cancel"}

     }catch (err){
         return {status:"fail",message:"Something went wrong"}

     }

 }
 const PaymentIPNService =async (req,res)=>{
     try{
         let trxID=req.params.trxID
         let status= req.body['status']
         await InvoiceModel.updateOne({tran_id:trxID},{payment_status:status})
         return {status:"success"}

     }catch (err){
         return {status:"fail",message:"Something went wrong"}

     }

 }
 const PaymentSuccessService =async (req,res)=>{

    try{
        let trxID=req.params.trxID
        await InvoiceModel.updateOne({tran_id:trxID},{payment_status:"success"})
        return {status:"success"}

    }catch (err){
        return {status:"fail",message:"Something went wrong"}

    }


 }
 const InvoiceListService =async (req,res)=>{
     try{
         let user_id=req.headers.user_id;
         let invoice= await InvoiceModel.find({userID:user_id})

         return{status:"success",data:invoice}
     }catch (err){
         return {status:"fail",message:"Something went wrong"}
     }

 }
 const InvoiceProductListService =async (req,res)=> {
  try{
      let user_id= new ObjectID(req.headers.user_id);
      let invoice_id = new ObjectID(req.params.invoice_id)

      let MatchStage={$match:{userID:user_id,invoiceID:invoice_id}}
      let JoinStageProduct={$lookup:{from:"products",localField:"productID",foreignField:"_id",as:"product"}}
      let UnwindStage ={$unwind:"$product"}


      let data = await InvoiceProductModel.aggregate([
          MatchStage,
          JoinStageProduct,
          UnwindStage
      ]

      )
      return {status:"success",data:data}


  }catch (err){
      return {status:"fail",message:"Something went wrong"}
  }

 }

 module.exports={
    CreateInvoiceService,
     PaymentSuccessService,
     InvoiceListService,
     InvoiceProductListService,
     PaymentFailService,
     PaymentCancelService,
     PaymentIPNService,

 }


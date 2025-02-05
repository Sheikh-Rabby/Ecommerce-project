
const {
    CreateInvoiceService,PaymentFailService,PaymentCancelService,PaymentIPNService,PaymentSuccessService,InvoiceListService,InvoiceProductListService
}=require('../services/InvoiceServices')

exports.CreateInvoice=async (req,res)=>{
    let data=await CreateInvoiceService(req)
    return res.status(200).json(data)

}
exports.PaymentFail=async (req,res)=>{
    let data=await PaymentFailService(req)
    return res.status(200).json({data})

}
exports.PaymentCancel=async (req,res)=>{
    let data=await PaymentCancelService(req)
    return res.status(200).json({data})

}
exports.PaymentIPN=async (req,res)=>{
    let data=await PaymentIPNService(req)
    return res.status(200).json({data})

}
exports.PaymentSuccess=async (req,res)=>{
    let data=await PaymentSuccessService(req)
    return res.status(200).json({data})

}
exports.InvoiceList=async (req,res)=>{
    let data=await InvoiceListService(req)
    return res.status(200).json({data})

}
exports.InvoiceProductList=async (req,res)=>{
    let data=await InvoiceProductListService(req)
    return res.status(200).json({data})

}
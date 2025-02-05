const express = require('express');
const ProductController =require('../controllers/ProductController');
const UserController =require('../controllers/UserController');
const WishListController= require('../controllers/WishListController')
const CartListController= require('../controllers/CartListController')
 const InvoiceController= require('../controllers/InvoiceController')
const FeaturesController= require('../controllers/FeaturesController')

const AuthVerification=  require('../middlewares/AuthVerification')
const router = express.Router();


//Product
router.get('/ProductBrandList',ProductController.ProductBrandList)
router.get('/ProductCategoryList',ProductController.ProductCategoryList)
router.get('/ProductSliderList',ProductController.ProductSliderList)
router.get('/ProductListByBrand/:BrandID',ProductController.ProductListByBrand)
router.get('/ProductListByCategory/:CategoryID',ProductController.ProductListByCategory)
router.get('/ProductListBySmilier/:CategoryID',ProductController.ProductListBySmilier)
router.get('/ProductListByKeyword/:Keyword',ProductController.ProductListByKeyword)
router.get('/ProductListByRemark/:Remark',ProductController.ProductListByRemark)
router.get('/ProductDetails/:ProductID',ProductController.ProductDetails)
router.get('/ProductReviewList/:ProductID',ProductController.ProductReviewList)


//User
router.post('/CreateProfile',UserController.CreateProfile)
router.post('/Login',UserController.Login)
router.get('/UserLogout',AuthVerification,UserController.UserLogout)
router.post('/CreateProfile',AuthVerification,UserController.SaveProfile)
router.post('/UpdateProfile',AuthVerification,UserController.UpdateProfile)
router.get('/ReadProfile',AuthVerification,UserController.ReadProfile)

//WishList
router.post('/SaveWishList',AuthVerification,WishListController.SaveWishList)
router.post('/RemoveWishList',AuthVerification,WishListController.RemoveWishList)
router.post('/WishList',AuthVerification,WishListController.WishList)


//cart
router.post('/SaveCartList',AuthVerification,CartListController.SaveCartList)
router.get('/RemoveCartList',AuthVerification,CartListController.RemoveCartList)
router.get('/CartList',AuthVerification,CartListController.CartList)
router.get('/UpdateCartList/:cartID',AuthVerification,CartListController.UpdateCartList)

//Invoice
router.get('/CreateInvoice',AuthVerification,InvoiceController.CreateInvoice)
router.post('/PaymentSuccess/:trxID',InvoiceController.PaymentSuccess)
router.post('/PaymentFail/:trxID',InvoiceController.PaymentFail)
router.post('/PaymentCancel/:trxID',InvoiceController.PaymentSuccess)
router.post('/PaymentIPN/:trxID',InvoiceController.PaymentIPN)

router.get('/InvoiceList',AuthVerification,InvoiceController.InvoiceList)
router.get('/InvoiceProductList/:invoice_id',AuthVerification,InvoiceController.InvoiceProductList)

//features

router.get('/Features',FeaturesController.Features)

//createReview
router.post('/CreateReview',AuthVerification,ProductController.CreateReview)



















module.exports = router;
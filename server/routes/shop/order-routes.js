const express=require('express');
const router=express.Router();
const {capturePayment,createOrder}=require('../../controllers/shop/order-controller');

router.post('/capture',capturePayment);
router.post('/create',createOrder);

module.exports=router;
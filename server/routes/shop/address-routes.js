const express=require('express');
const {editAddress,addAddress,deleteAddress,fetchAllAddress}=require("../../controllers/shop/address-controller");
const router=express.Router();

router.post('/add',addAddress);
router.delete('/delete/:userId/:addressId',deleteAddress);
router.put('/update/:userId/:addressId',editAddress);
router.get('/get/:userId',fetchAllAddress);
module.exports=router;

const express=require("express");
const {handleImageUpload}=require("../../controllers/admin/products-controller");
const {upload}=require("../../helpers/cloudinary");
const router=express.Router();
router.post("/upload",handleImageUpload);

router.post("/upload-image",upload.single("my_file"),handleImageUpload); 

module.exports=router;
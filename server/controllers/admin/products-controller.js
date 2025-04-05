const { imageUploadUtil }=require("../../helpers/cloudinary");
const Product = require("../../models/Product");




const handleImageUpload=async(req,res)=>{
    try {
    const b64 = Buffer.from(req.file.buffer).toString("base64");
    const url = "data:" + req.file.mimetype + ";base64," + b64;
    const result = await imageUploadUtil(url);

    res.json({
      success: true,
      result,
    });
    } catch (error) {
        console.log(error);
        res.json({
            success:false,
            message:"Error occured"
        });
    }
};

const addProduct=async(req,res)=>{
    try {
        const {image,title,description,category,brand,price,salePrice,totalStock}=req.body;
        const newlyCreatedProduct=new Product({
            image,title,description,category,brand,price,salePrice,totalStock
        })
        await newlyCreatedProduct.save();
        res.status(200).json({success:true,message:"Successfully added"});
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success:false,
            message:"Error occured"
            });
    }
}

const fetchAllProducts=async(req,res)=>{
    try {
        const listOfProducts=await Product.find({});
        res.status(200).json({success:true,message:"Successfully fetched",data:listOfProducts});
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success:false,
            message:"Error occured"
            });
    }
}

const editProduct=async(req,res)=>{
    try {
        const {id}=req.params;
        const {image,title,description,category,brand,price,salePrice,totalStock}=req.body;
        const findProduct=await Product.findById(id);
        if(!findProduct){
            return res.status(404).json({
                success:false,
                message:"Product not found"
            });
        }
        findProduct.title=image || findProduct.image
        findProduct.title=title || findProduct.title
        findProduct.description=description || findProduct.description
        findProduct.category=category || findProduct.category
        findProduct.brand=brand || findProduct.brand
        findProduct.price=price || findProduct.price
        findProduct.salePrice=salePrice || findProduct.salePrice
        findProduct.totalStock=totalStock || findProduct.totalStock

        await findProduct.save();
        res.status(200).json({
            success:true,
            message:"Successfully updated",
            data:findProduct
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success:false,
            message:"Error occured"
            });
    }
}

const deleteProduct=async(req,res)=>{
    try {
        const {id}=req.params
        const Product=await Product.findByIdAndDelete(id);
        if(!Product){
            return res.status(404).json({
                success:false,
                message:"Product not found"
                });
                }
                res.status(200).json({
                    success:true,
                    message:"Product deleted successfully",
                    data:Product
                    })
                
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success:false,
            message:"Error occured"
            });
    }
}

module.exports = {
    handleImageUpload,
    addProduct,
    fetchAllProducts,
    editProduct,
    deleteProduct,
  };
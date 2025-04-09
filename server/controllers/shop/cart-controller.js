const Product=require("../../models/Product");
const Cart=require("../../models/Cart");

const addToCart=async(req,res)=>{
    try {
      const {userId,productId,quantity}=req.body;
      if(!userId || !productId || quantity<=0){
        return res.status(400).json({success:false,message:"Invalid data"});
      }
      const product=await Product.findById(productId);
      if(!product){
        return res.status(404).json({success:false,message:"Product not found"});
        }
        const cart=await Cart.findOne({userId});
        if(!cart){
           cart=new Cart({userId,items:[]});

        }


    } catch (error) {
        console.log(error);
        res.status(500).json({
            success:false,
            message:"Some error occured"
        })
    }
}

const updateCartItemQty=async(req,res)=>{
    try {
      
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success:false,
            message:"Some error occured"
        })
    }
}

const deleteCartItem=async(req,res)=>{
    try {
      
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success:false,
            message:"Some error occured"
        })
    }
}

const fetchCartItems=async(req,res)=>{
    try {
      
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success:false,
            message:"Some error occured"
        })
    }
}

module.exports={addToCart,updateCartItemQty,deleteCartItem,fetchCartItems};
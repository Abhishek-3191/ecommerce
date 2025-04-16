require('dotenv').config();
const express=require("express");
const mongoose=require("mongoose");
const cookieParser=require("cookie-parser");
const cors=require("cors");
const authRouter=require("./routes/auth/auth-routes");
const dburl=process.env.MONGODB_URL;
const adminProductsRouter=require("./routes/admin/products-routes");
const shopProductsRouter=require("./routes/shop/products-routes");
const shopCartRouter=require("./routes/shop/cart-routes")
const shopAddressRouter=require("./routes/shop/address-routes");

mongoose.connect(
    dburl
).then(()=>{
    console.log("Mongodb connected");
})
.catch((err)=>{
    console.log("Mongodb doesnt connected",err);
})
const app=express();
const PORT=process.env.PORT || 5000;

app.use(
    cors({
        origin:"http://localhost:5173",
        method:['GET','POST','PUT','DELETE'],
        allowedHeaders:[
            'Content-Type',
            'Authorization',
            'Cache-Control',
            'Expires',
            'Pragma',
        ],
        credentials:true,
    })
)

app.use(cookieParser());
app.use(express.json());
app.use('/api/auth',authRouter);
app.use('/api/admin/products',adminProductsRouter);
app.use('/api/shop/products',shopProductsRouter);
app.use('/api/shop/cart',shopCartRouter);
app.use('/api/shop/address',shopAddressRouter);

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})
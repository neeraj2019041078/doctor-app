const express=require("express");
const colors=require("colors");
const moragan=require("morgan");
const dotenv=require("dotenv");
const mongoose = require("mongoose");
 const connectDB=require("./config/db");
 const path=require("path");
dotenv.config();

const port=process.env.PORT || 8080;
const app=express();
connectDB();


app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(moragan('dev'));

app.use("/api/v1/user",require("./routes/userRoutes"));
app.use(express.static(path.join(__dirname,"./client/build")));
app.get('*',(req,res)=>{
    res.sendFile(path.join(__dirname,"./client/build/index.html"));
});



app.listen(port,()=>{
    console.log(`Server Running in  ${port}`)
})
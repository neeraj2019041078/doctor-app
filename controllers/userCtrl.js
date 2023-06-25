const userModel=require('../models/userModels');
const bcrypt=require("bcryptjs");
const jwt=require('jsonwebtoken');

const registerController=async(req,res)=>{
    try{

        const existingUser=await userModel.findOne({email:req.body.email})
        if(existingUser){
            return res.status(200).send({message:'User Already Exist',sucess:false})
        }
        const password=req.body.password;
        const salt=await bcrypt.genSalt(10);
        const hashedpassword=await bcrypt.hash(password,salt);
        req.body.password=hashedpassword;

        const newUser=new userModel(req.body);
        await newUser.save();
        res.status(201).send({message:"Register Sucessfull",sucess:true});

    }
    catch(error){
        console.log(error);
        res.status(500).send({sucess:false,message:`Register Controller ${error.message}`})
    }

}

const loginController=async(req,res)=>{
try{
    const user=await userModel.findOne({email:req.body.email});
    if(!user){
        return res.status(200).send({message:'user not found',sucess:false})
    }
    const isMatch=await bcrypt.compare(req.body.password,user.password);
    if(!isMatch){
        return res.status(200).send({message:'Invalid email or password',sucess:false})
    }
    const token=jwt.sign({id:user._id},process.env.JWT_SECRET,{
        expiresIn:'1d'
    });
    res.status(200).send({message:'Sucessfully Login',sucess:true,token});
}
catch(error){
    console.log(error);
    res.status(500).send({message:`Errror in Login Ctrl ${error.message}`});
}
}

const authController=async(req,res)=>{
    try{
        const user=await userModel.findById({_id:req.body.userId})
       user.password=undefined;
        if(!user){
            res.status(200).send({
                message:'user not found',
                sucess:false
            })
        }
        else{
            res.status(200).send({
                sucess:true,
                data:{
                    name:user.name,
                    email:user.email,
                    isAdmin:user.isAdmin
                }
            });
        }

    }catch(error){
        console.log(error);
        res.status(500).send({
            message:'auth error',
            sucess:false,
            error
        })
    }

}

module.exports={loginController,registerController,authController};
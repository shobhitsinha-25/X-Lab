var express = require('express');
var router = express.Router();
var userModel=require("../Models/userModel");
var bcrypt=require("bcryptjs");
var jwt =require("jsonwebtoken");
var projectModel=require("../Models/projectModel")

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

const secret="secret"

router.post("/signUp",async (req,res)=>{
  let {name,username,email,password}=req.body;

  let emailcondition=await userModel.findOne({email:email});

  if(emailcondition){
    return res.json({success:false,message:"Email already exist"});
  }
  else{

    bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(password, salt, function(err, hash) {
        let user=userModel.create({
        username:username,
        name:name,
        email:email,
        password:hash
    });
    return res.json({success:true,message:"User created successfully"});
    })});
    
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await userModel.findOne({ email: email });

  if (user) {
    bcrypt.compare(password, user.password, function (err, result) {
      if (result) {
        const token = jwt.sign({ email: user.email, userId: user._id }, secret);
        return res.json({ success: true, message: "User logged in successfully", token: token, userId: user._id });
      } else {
        return res.json({ success: false, message: "Invalid email or password" });
      }
    });
  } else {
    return res.json({ success: false, message: "User not found" });
  }
});

router.post("/getUserDetails", async (req, res) => {
  let { userId } = req.body;
  let user = await userModel.findOne({ _id: userId });
  if (user) {
    return res.json({ success: true, message: "User details fetched successfully", user: user });
  } else {
    return res.json({ success: false, message: "User not found!" });
  }
});


router.post("/createProject",async (req,res)=>{
  let {userId,title}=req.body;
  let user=await userModel.findOne({_id:userId});

  if(user)
  {
    let project=await projectModel.create({
      title:title,
      createdBy:userId
    });
    return res.json({success:true,message:"Project created successfully",projectId:project._id});

  }
  else{
    return res.json({success:false,message:"User not found"});
  }
});


router.post("/getProjects",async (req,res)=>{
  let {userId}=req.body;
  let user=await userModel.findOne({_id:userId});
  
  if(user){
    let projects=await projectModel.find({createdBy:userId});
    return res.json({success:true,message:"Project fechted successfully",projects:projects});
  }
  else{
    return res.json({success:false,message:"User not found"});
  }
});

router.post("/deleteProject",async (req,res)=>{
  let {userId,projectId}=req.body;
  let user=await userModel.findOne({_id:userId});

  if(user){
    let project=await projectModel.findOneAndDelete({_id:projectId});
    return res.json({success:true, message:"Project deleted successfully"});
  }
  else{
    return res.json({success:false,message:"User not found"});
  }
});

router.post("/getProject",async (req,res)=>{
  let {userId,projectId}=req.body;
  let user=await userModel.findOne({_id:userId});

  if(user){
    let project=await projectModel.findOne({_id:projectId});
    return res.json({success:true,message:"Project fetched successfully",project:project});
  }
  else{
    return res.json({success:false,message:"User not found"});
  }
});

router.post("/updateProject", async (req, res) => {
  let { userId, htmlCode, cssCode, jsCode, projectId } = req.body;
  let user = await userModel.findOne({ _id: userId });

  if (user) {
    let project = await projectModel.findOneAndUpdate(
      { _id: projectId },
      { htmlCode: htmlCode, cssCode: cssCode, jsCode: jsCode },
      { new: true } // This option returns the updated document
    );

    if (project) {
      return res.json({ success: true, message: "Project updated successfully" });
    } else {
      return res.json({ success: false, message: "Project not found!" });
    }
  } else {
    return res.json({ success: false, message: "User not found!" });
  }
});


module.exports = router;

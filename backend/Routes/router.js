const express = require("express");
const router = new express.Router();
const conn = require("../db/conn");



router.post("/create",(req,res)=>{
    // console.log(req.body);

    const{username,email,job,number} = req.body;
    if(!username || !email || !job || !number){
        res.status(422).json("please fill all data");
    }

    try{
      conn.query("select*from users where email = ?",email,(err,result)=>{
        if(result.length){
            res.status(422).json("This Data is Already Exist");
        }else{
            conn.query("INSERT INTO users SET ?",{username,email,job,number},(err,result)=>{
                if(err){
                    console.log("err",err)
                }else{
                    res.status(201).json(req.body);
                }
            })
        }
      })
    }catch(error){

    }
});

module.exports = router;
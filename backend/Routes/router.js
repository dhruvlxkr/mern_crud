const express = require("express");
const router = new express.Router();
const conn = require("../db/conn");



router.post("/create",async(req,res)=>{
    try{
        const{username,email,job,number} = req.body;

        if(!username || !email || !job || !number){
            return res.status(422).json("Please Fill all Data");
        }

        const[existingUser] = await conn.promise().query("select *from users where email = ?",[email]);

        if(existingUser.length > 0){
            return res.status(422).json("This Email Already Registered");
        }

        await conn.promise().query("INSERT INTO users SET ? ",{username,email,job,number});

        return res.status(201).json({message: "Users added Successfully!"});


    }catch(error){
    console.log("Database Error : ",error);
    return res.status(500).json("Internal Server Error");
    }
});

module.exports = router;
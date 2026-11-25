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

router.get("/getdata",async (req,res)=>{
 try{
   const[userData] = await conn.promise().query("Select * from users");
   return res.status(200).json(userData);
 }catch(error){
   console.error("Database Error : ", error);
   return res.status(500).json("internal Server Error");
 }
});


router.delete("/deleteUser/:id" , async(req,res)=>{
    try{

        const { id } = req.params;

        const[deleteUser] = await conn.promise().query("Delete From users where id = ?",[id]);

        if(deleteUser.affecedRows === 0){
            return res.status(404).json("User Not Found!");
        }

        return res.status(200).json({message: "User Delete Successfully!"});

    }catch(error){
 console.error("Database Error :", error);
 return res.status(500).json("Internal Server Error");
    }
});


router.put("/updateuser/:id", async(req,res)=>{
    try{
        const {id} = req.params;
        const {username, email, job, number } = req.body;

         if (!username || !email || !job || !number) {
            return res.status(422).json("Please fill all data");
        }
        
        const[updateResult] = await conn.promise().query("UPDATE users SET ? where id = ? ",[{username, email, job, number },id]);

        if(updateResult.affectedRows === 0){

            return res.status(404).json("User not found!");
        }
        return res.status(200).json({ message: "User update Successfully!"});

    }catch(error){
       console.error("Data Error: ", error);
       return res.status(500).json("internal Server Error");
    }
});

module.exports = router;
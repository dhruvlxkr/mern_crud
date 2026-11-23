const express = require("express");
const app = express();
const mysql = require("mysql2");
const cors = require("cors");
const router = require("./Routes/router");
require("./db/conn");
const port = 8001;




// app.get("/",(req,res)=>{
//   res.send("Server Start");
// });

app.use(express.json());
app.use(cors());

app.use(router);

app.listen(port,()=>{
    console.log("Server Starts at port no :" + port);
})
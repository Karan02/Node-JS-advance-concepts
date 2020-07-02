
const crypto = require("crypto")
const express = require("express")
const app = express()
const workerSupporter = require("./worker-supporter")
app.get("/", workerSupporter.multithreadFunction)
app.get("/fast",(req,res)=>{
        res.send("this is fast")
})
app.listen(3000)

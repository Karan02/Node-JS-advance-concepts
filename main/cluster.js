// telling cluster child that each child has two thread
process.env.UV_THREADPOOL_SIZE = 2
const cluster = require("cluster")
const crypto = require("crypto")
// console.log(cluster.isMaster)

//is file being executed in master mode ?
if(cluster.isMaster){
    //cause index.js to be executed again but
    // in child mode
    cluster.fork()
    cluster.fork()
    // cluster.fork()
    // cluster.fork()
    
}
else{
    //I am a child . I'm going to act like 
    //a server and do nothing else
    const express = require("express")
    const app = express()
    // function doWork(duration){
    //     const start = Date.now()
    //     //event loop hangs in this while loop
    //     while(Date.now()-start<duration){
    
    //     }
    // }

    app.get("/", (req,res)=>{
        crypto.pbkdf2("a","b",100000,512,"sha512",()=>{
            res.send("Hi")
        })
        // this doWork will work inside event loop
        // we are blocking event loop
        // doWork(5000)
        
    })
    app.get("/fast",(req,res)=>{
        res.send("this is fast")
    })
    app.listen(3000)
}
const https = require("https")

const start = Date.now()
function doRequest(){
https.request("https://www.google.com",res =>{
    res.on("data",()=>{ 
         

    })
    res.on("end",()=>{
        console.log(Date.now()-start)
    })
}).end()
}

//all doRequest makes request all together
// handled by OS async nature
doRequest()
doRequest()
doRequest()

doRequest()

doRequest()

doRequest()
doRequest()

doRequest()



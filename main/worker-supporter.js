const { Worker, isMainThread, parentPort, workerData } = require('worker_threads');
let count = 0
 
function getCount(){
    while(count<1e9){
        count++
    }
}
let start = Date.now()

exports.multithreadFunction = (req,res,next) => {
    if (isMainThread) {
        const worker = new Worker(__filename)
        worker.on("message",function(counter){
            res.send(counter)
            console.log("counter",counter,Date.now()- start)
        })
    } else{
        getCount()
        parentPort.postMessage(count);
    }
}


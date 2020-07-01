// node myFile.js
const pendingTimers = []
const pendingOStasks = []
const pendingOperations = []
//new timers, tasks, operations are recorded from myFile running
myFile.runContents()

function shouldContinue(){
 // check 1 : any pending: setTimeout,setInterval,setImmediate?
 // check 2: any pending OS tasks? (like server listening to port)
 // check 3: any pending long running operations ?(like fs module)
 return pendingTimers.length || pendingOStasks.length || pendingOperations.length
}
// entire body executes in one tick
while(shouldContinue()){
    // 1) Node looks at pendingTimers and sees if any functions 
    //are ready to be called. setTimeout, setInterval

    //2) node looks at pendingOStasks and pendingOperations

    //3) pause execution. continue when ...
    // a new pendingOStasks is done
    // a new pendingOperation is done
    // a timer is about to complete

    // 4) look at pendingTimers. Call any setImmediate

    // 5) handle any "close" events

}
//exit back to terminal
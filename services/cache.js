const mongoose = require("mongoose")
// const redis = require("redis")
const asyncRedis = require("async-redis");
const util = require("util")

const redisUrl = "redis://127.0.0.1:6379"
const client = asyncRedis.createClient(redisUrl)
const exec = mongoose.Query.prototype.exec

// client.hget = util.promisify(client.hget)


// this prototype(cache) already exist in mongoose query instance
mongoose.Query.prototype.cache = function(options={}){

  this.useCache = true
  
  this.hashKey = JSON.stringify(options.key || "")
  
  // we return this, so that we can call more query filters
  // in the chain
  return this
}

// this prototype(exec) already exist in mongoose query instance
//monkey patch the mongoose library
mongoose.Query.prototype.exec = async function(){
   
    if(!this.useCache){
       
      return exec.apply(this,arguments)
    } 
     
    const key = JSON.stringify(Object.assign({},this.getQuery(),{
        collection: this.mongooseCollection.name
    }))
    
    //see if we have a value for "key" in redis
    // const cacheValue = await client.get(key)
    const cacheValue = await client.hget(this.hashKey,key)
    
    // if yes, return that
    if(cacheValue){
      // below line is for attaching all mongoose functions and values
      // it is similar calling like "new Blog({title:"hi",content:"there"})"
    //  const doc =  new this.model(JSON.parse(cacheValue))
    
    const doc = JSON.parse(cacheValue)
     // check whether doc is an array or object (multiple entries or single entry)
    return Array.isArray(doc) 
    ? doc.map(d => new this.model(d))
    :new this.model(doc)  
    }
    //otherwise, issue a new query and store result in redis
    const result = await exec.apply(this,arguments)
     
    await client.hmset(this.hashKey,key,JSON.stringify(result),"EX",10)
    
    return result
}

module.exports = {
 clearHash(hashKey){
    client.del(JSON.stringify(hashKey))
 }
};
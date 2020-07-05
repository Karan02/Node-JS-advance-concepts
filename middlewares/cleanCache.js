const {clearHash} = require("../services/cache")

module.exports = async (req,res,next) =>{
    // let next route handler get finished
    await next()
    // after next middleware finishes
    // it comes back here
    clearHash(req.user.id)
}
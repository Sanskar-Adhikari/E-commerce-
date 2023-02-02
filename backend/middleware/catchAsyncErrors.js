module.exports= efunc => (req,res,next)=>{
    Promise.resolve(efunc(req,res,next)).catch(next);
};
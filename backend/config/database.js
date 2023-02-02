const mongoose= require("mongoose");


const connectDataBase = () =>
{
    mongoose.set('strictQuery', false);
    mongoose.connect(process.env.DB_URL, { useNewUrlParser: true })
.then((data)=>{
    console.log(`Mongodb connected with server:${data.connection.host}`);
});
};

module.exports=connectDataBase;
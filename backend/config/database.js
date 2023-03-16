const mongoose = require("mongoose");


/**/
/*
connectDataBase()
NAME
    connectDataBase - Establishes a connection to the MongoDB database using Mongoose library.
SYNOPSIS
    connectDataBase = () => {};
DESCRIPTION
    This function establishes a connection to the MongoDB database using the Mongoose library.
    The function uses the 'connect' method of the Mongoose library to connect to the database using the DB_URL specified in the 
    environment variables. If the connection is successful, it logs a message indicating that the database is connected along with 
    the host name to the console.
RETURNS
    This function does not return anything.
*/
/**/
const connectDataBase = () => {
    mongoose.set('strictQuery', false);
    mongoose.connect(process.env.DB_URL, {
            useNewUrlParser: true
        })
        .then((data) => {
            console.log(`Mongodb connected with server:${data.connection.host}`);
        });
};
/* connectDataBase = () => {}; */

module.exports = connectDataBase;


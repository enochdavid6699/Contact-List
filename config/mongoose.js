//Require the Library
const mongoose = require('mongoose');

//Connect to the Data Base
mongoose.connect('mongodb://127.0.0.1:27017/Contact_List');

//Acquiure the connection ( To check if it is Successful )
const db = mongoose.connection;

//If there is Error then Print Error
db.on('error' , console.error.bind(console , 'Error connecting to db'));

//If it is up and running then Print the message
db.once('open' , function(){
    console.log('Successfully connected to the Data Base');
});

module.exports=db;
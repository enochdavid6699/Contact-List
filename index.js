const e = require('express');
const express = require('express');
const path = require('path');
const port = 8000;

const db = require('./config/mongoose');
const Contact = require('./models/contact');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded());  //This is to use Parser

app.use(express.static('assets')) 

//Middleware 1
// app.use(function(req , res , next){
//     console.log("Middleware 1 Called");
//     next(); //it simplycalls the next middleware or the controller if no middleware present
// });

//Middleware 2
// app.use(function(req , res , next){ 
//     console.log("Middleware 2 Called");
//     req.body.name="Mr "+req.body.name;
//     next();
// });

// app.get('/practice' , function(req , res){
//     return res.render('practice' , { title: "Practice Ground" })
// });

// var contactList = [];
//     {
//         name:"Enoch David Lal",
//         phone:"1111111111"
//     },
//     {
//         name:"Steve Rogers",
//         phone:"7777777777"
//     },
//     {
//         name:"Peter Paker",
//         phone:"8888888888"
//     }
// ]

app.get('/', function(req, res){

    // return res.render('home' , { 
    //     title: "My Contacts List", 
    //     contact_list:contactList
    // });

    Contact.find({} , function(err , contacts){
        if(err){
            console.log('Error in fetching the contacts');
            return;
        }
    
        return res.render('home' , { 
            title: "My Contacts List", 
            contact_list: contacts
        });

    });

});

// app.get('/', function(req, res){

    // return res.render('home' , { 
    //     title: "My Contacts List", 
    //     contact_list:contactList
    // });

// });

app.get('/delete-contact' , function(req , res){
 
    //This is the Params way of doing it
    // let phone=req.params.phone; 

    //This is Query way of doing it
    // let phone =req.query.phone;

    // let contactIndex=contactList.findIndex( contact => contact.phone == phone );
    // if(contactIndex != -1){  //Simce it will return -1 if the number does not exist
    //     contactList.splice(contactIndex,1); //from the given index to 1 element(i.e. the element itself only)
    // }

    // return res.redirect('back');

    //----------------------------------------------------------------------

    //get the id from the query in the Parameters
    let id = req.query.id;

    //Find the contact in the data base using id and delete it
    Contact.findByIdAndDelete(id , function(err){

        if(err){
            console.log('Error in deleting the Contact');
            return;
        }

        return res.redirect('back');

    });

});

app.post('/create-contact' , function(req , res){
    // contactList.push({
    //     name:req.body.name,
    //     phone:req.body.phone
    // })

    //Or simply we can write

    // contactList.push(req.body);

    Contact.create({
        name: req.body.name,
        phone: req.body.phone
    }, function(err , newContact){
        if(err){
            console.log("Error in creating Contact!");
            return;
        }

        console.log('*************', newContact);
        return res.redirect('back');
    } );

    // return res.redirect('/');
    //Instead of this we can use back to go back on the same page when the url is longer etc
    // return res.redirect('back');
});

app.listen(port, function(err){
    if (err) {
        console.log("Error in running the server", err);
    }
    console.log('Yup! My Server is running on Port', port);
});
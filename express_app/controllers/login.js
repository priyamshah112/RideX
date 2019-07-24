const ethCrypto=require('eth-crypto');
//const abi=require("../family_tree_details").abi;
// const address=require("../family_tree_details").address;
const HDwalletprovider=require("truffle-hdwallet-provider");
const Web3=require("web3");
const session=require("express-session");
var mongoose=require('mongoose');

require("dotenv").config();
const Profiles = require('../models/Profiles');

module.exports=(app)=>{
    
    app.get("/login",(req,res)=>{
        res.render("index",{message:null});
    });

    app.post("/",async (req,res)=>{
        var email=req.body.email;
        var password=req.body.password;
        console.log(email,password);
        const docs = await Profiles.find({'email':email});
        console.log(docs,docs.length);
        if(docs.length == 1){
            check = true;
        }
        else{
            check = false;
        }
        if(check === true){

            req.session.email=docs[0]['email'];
            req.session.address=docs[0]['address'];
            req.session.user_type=docs[0]['user_type'];
            user_type = docs[0]['user_type'];
            console.log(req.session.email,req.session.address,req.session.user_type);
            console.log("successful");
            if (user_type == 'Rider'){
                res.redirect("/homer");
            }
            if (user_type == 'Driver'){
                res.redirect("/homed");
            }
        }
        else{           
            console.log("unsuccessful");
            res.render("index",{message:"ID does not exists"});
        }
        
    });
}
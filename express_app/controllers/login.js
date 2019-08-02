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
                
    });
}
const ethCrypto=require('eth-crypto');
const fs=require("fs");
const HDwalletprovider=require("truffle-hdwallet-provider");
const Web3=require("web3");
const session=require("express-session");


module.exports=(app)=>{
    app.get("/homer",(req,res)=>{
        
        if(req.session.username!==undefined){
            if(req.session.userType==="Rider")
            {
                res.render("homer");}
            else{
                res.render("homed");
            }
        }else{
            res.redirect("/");
        }
        
    }); 

 
}
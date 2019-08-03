const ethCrypto=require('eth-crypto');
const fs=require("fs");
const HDwalletprovider=require("truffle-hdwallet-provider");
const Web3=require("web3");
const session=require("express-session");
var mongoose=require('mongoose');

const abi=require("../user_contract").abi2;
const address=require("../user_contract").address2;

// const cookie=require("cookie-parser");

//const abi=require("../family_tree_details").abi;
//const address=require("../family_tree_details").address;
//const byteCode=require("../family_tree_details").bytecode;
const createIdentity=require("./create_identity");
const Profiles = require('../models/Profiles');

require("dotenv").config();

module.exports=(app)=>{

    app.get("/signupr",(req,res)=>{
        if(req.session.username!== undefined){
            res.redirect("/homer");
        }
        else{
        res.render("signupr",{message:null});
        }
    });

    app.post("/signupr",async (req,res)=>{
        const name=req.body.name;
        const phno=req.body.phno;
        const username=req.body.email;
        const password=req.body.password;
        const userType = 'Rider';
        const vehicle="";
        const vehicleNo="";
        // Creating identity
        var identity=createIdentity();

        console.log(identity);
        const publicKey=identity.publicKey;
        const privateKey=identity.privateKey;
        const newCompressed=ethCrypto.publicKey.compress(
            publicKey
        );
        identity.compressed=newCompressed;

        const provider=new HDwalletprovider(
            "6971A7AEFA1B6643311ADD7214B58CAC41E257FB17F47CD4D5C529902FAD00A7",
            'https://ropsten.infura.io/v3/da4d3f3021fd4ada9c1e70a4b607e74f'
         );
 
        const web=new Web3(provider);
 
        console.log("provider set");
 
        const contract=new web.eth.Contract(abi,address);
        const response= await contract.methods.set(name,username,phno,vehicle,vehicleNo,userType,password,privateKey).send({
             from:"0x2248d96D13198CC52274f30F029C241c87b5a23c"   
        });



        req.session.username=username;
        req.session.privateKey=privateKey;
        req.session.userType=userType;
        
        res.redirect("/homer");
        
});

}
const ethCrypto=require('eth-crypto');
const fs=require("fs");
const HDwalletprovider=require("truffle-hdwallet-provider");
const Web3=require("web3");
const session=require("express-session");
var mongoose=require('mongoose');
// const cookie=require("cookie-parser");

const abi=require("../user_contract").abi2;
const address=require("../user_contract").address2;


const createIdentity=require("./create_identity");
const Profiles = require('../models/Profiles');

require("dotenv").config();

module.exports=(app)=>{

    app.get("/signupd",(req,res)=>{
        if(req.session.identity!== undefined){
            res.redirect("/homed");
        }
        else{
            res.render("signupd",{message:null});
        }
    });

    app.post("/signupd",async (req,res)=>{
        var name=req.body.name;
        var phno=req.body.phno;
        var username=req.body.email;
        var password=req.body.password;
        var vehicle=req.body.vehicle;
        var vehicleNo=req.body.vehicle_num;
        var userType = 'Driver';

        // Creating identity
        var identity=createIdentity();

        console.log(identity);
        const publicKey=identity.publicKey;
        const privateKey=identity.privateKey;

        const newCompressed=ethCrypto.publicKey.compress(
            publicKey
        );
        identity.compressed=newCompressed;
        
        

        // Setting provider and web3
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





        // --------------------------------------------------------------------------------------------------

        req.session.username=username;
        req.session.privateKey=privateKey;
        req.session.userType=userType;
        res.redirect("/homed");
        //console.log("deployed --contract deployment left");
/*      Code to download keys    
        // Setting up sessions
        req.session.identity=identity;
        
        console.log(req.session);
        

        //writing to a file
        var path=__dirname+"/"+identity.compressed+".txt";
        
        var data={
            identity1:identity,
        };
    
        fs.writeFileSync(path,JSON.stringify(data),'utf8',(err)=>{
            console.log(err);
        });


        // download file
        // res.setHeader('Content-disposition', 'attachment; filename=' + identity.address+".txt");
        res.download(path,identity.compressed+'.txt',(err)=>{
            if(err){
                console.log(err);
            }else{
                
            }
        });
*/
});


}
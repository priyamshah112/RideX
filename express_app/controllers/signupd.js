const ethCrypto=require('eth-crypto');
const fs=require("fs");
const HDwalletprovider=require("truffle-hdwallet-provider");
const Web3=require("web3");
const session=require("express-session");
var mongoose=require('mongoose');
// const cookie=require("cookie-parser");

//const abi=require("../family_tree_details").abi;
//const address=require("../family_tree_details").address;
//const byteCode=require("../family_tree_details").bytecode;
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
        var email=req.body.email;
        var password=req.body.password;
        var vehicle=req.body.vehicle;
        var vehicle_num=req.body.vehicle_num;
        var user_type = 'Driver';
        console.log(name,phno,email,password,vehicle,vehicle_num,user_type);

        // Creating identity
        var identity=createIdentity();

        console.log(identity);
        var newPublicKey=identity.publicKey;
        var newCompressed=ethCrypto.publicKey.compress(
            newPublicKey
        );
        identity.compressed=newCompressed;
        //storing to mongo
        var newUser = new Profiles({'name':name,'phno':phno,'user_type':'Driver','email':email,'password':password,'lat':'19.137051','long':'72.855537','address':identity.address,'vehicle':vehicle,'vehicle_no':vehicle_num,'cpubkey':identity.compressed});
        newUser.save(function (err) {
          if (err) {
            console.log(err);
          } else {
            console.log('Driver saved to db');
            req.session.email=email;
            req.session.address=identity.address;
            req.session.user_type='Driver';
            res.redirect('/homed');
          }
        });
        // Setting provider and web3
        //const provider=new HDwalletprovider(
        //    process.env.PRIVATE_KEY,
        //    process.env.ROPSTEN_INFURA
        //);
        //const web3=new Web3(provider);
        //console.log("provider set");
        // Deploying smart contract
        //var contract=await new web3.eth.Contract(abi).deploy({data:byteCode,arguments:[newCompressed,first_name,last_name,dob,gender,marraigeStatus]}).send({
        //   from:"0x2248d96D13198CC52274f30F029C241c87b5a23c",
        //    gas:'4700000'
        //});
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

    app.get("/logout",(req,res)=>{
        req.session.destroy((err)=>{
            if(err){
                console.log(err);
            }        
        });
        res.redirect("/");
    });
}
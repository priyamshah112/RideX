const ethCrypto=require('eth-crypto');
const HDwalletprovider=require("truffle-hdwallet-provider");
const Web3=require("web3");
const session=require("express-session");
var mongoose=require('mongoose');

const abi=require("../payment_contract").abi2;
const address=require("../payment_contract").address2;
require("dotenv").config();

module.exports=(app)=>{

    app.get("/pay",(req,res)=>{
        if(req.session.email!== undefined){
            res.render("pay");
        }
        else{
        res.render("signupr",{message:"error in pay"});
        }
    });

    app.post("/pay",async (req,res)=>{
        var sender=req.body.from;
        var receiver=req.body.to;
        var fare=req.body.fare;

        console.log(sender,receiver,fare);

        //Get balance
        const web3 = new Web3(new Web3.providers.HttpProvider('https://ropsten.infura.io/'));
        var balance = web3.eth.getBalance(receiver); //Will give value in.
        balance = web3.toDecimal(balance);  
        console.log(balance," receiver my balance");      
        // Setting provider and web3
        const provider=new HDwalletprovider(
           sender,
            "https://ropsten.infura.io/"
        );
        web3=new Web3(provider);
        console.log("provider set");

        var pub_key = ethCrypto.publicKeyByPrivateKey(sender);
        var address = ethCrypto.publicKey.toAddress(pub_key);
        console.log(address,pub_key,receiver,"my addr");

        //Payment
        console.log(Web3.utils.toWei(fare,'wei'));
        var contract = new web3.eth.Contract(abi,address);
        console.log(contract,"I m contr");


        const pay1 = async () => {
            try{
                //const web3 = new Web3(new Web3.providers.HttpProvider(testnet));


                var transfer = await contract.methods.fpay(receiver).send({
                    "from":address,
                    "value": Web3.utils.toWei(fare,'wei')
                });
                console.log(transfer,"I m transfered");
                console.log("payment done");
                return "done";
            }
            catch(err){
                    console.log(err);
                    return "failed";
            }
        }
        console.log(pay1());

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
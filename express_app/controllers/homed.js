const ethCrypto=require('eth-crypto');
const fs=require("fs");
const HDwalletprovider=require("truffle-hdwallet-provider");
const Web3=require("web3");
const session=require("express-session");
const CurrentRide=require("../models/Auction");
const abi=require("../user_contract").abi2;
const address=require("../user_contract").address2;



module.exports=(app)=>{
    app.get("/homed",async (req,res)=>{
        
        if(req.session.username!==undefined){
            
            if(req.session.userType==="Driver"){
                const findExisting= await CurrentRide.find({'bids.bidder':req.session.username});
                console.log(findExisting);
                if(findExisting.length===0){
                const allRecords=await CurrentRide.find({});
                    res.render("homed",{rides:allRecords});
                }else{
                    const currentBid=findExisting[0];
                    res.render("dbid",{from:currentBid.from,to:currentBid.to,status:"pending"});
                }

                
            }else{
                res.render("homer",{});
            }
        }else{
            res.redirect("/");
        }
        
    });
    app.post("/homed",async(req,res)=>{
        const customerUsername=req.body.username;
        const value=req.body.value;
        const provider=new HDwalletprovider(
            "6971A7AEFA1B6643311ADD7214B58CAC41E257FB17F47CD4D5C529902FAD00A7",
            'https://ropsten.infura.io/v3/da4d3f3021fd4ada9c1e70a4b607e74f'
         );
    
        const web3=new Web3(provider);
    
        console.log("provider set");
    
        const contract=new web3.eth.Contract(abi,address);
    
        const response=await contract.methods.get(req.session.username).call();
        const bid={
            value:value,
            bidder:req.session.username,
            vehicle:response['2'],
            vehicaleNo:response['3']
        }
        const insertValue=await CurrentRide.findOneAndUpdate({username:customerUsername},{$push:{bids:bid}});
        console.log(insertValue);

    });  

 
}
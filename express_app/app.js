const express=require("express");
const Web3=require("web3");
const HDwalletprovider=require("truffle-hdwallet-provider");
const bparser=require("body-parser");
const session=require("express-session");
const mongoStore=require("connect-mongo")(session);
const mongoose=require('mongoose');

const signupr=require("./controllers/signupr");
const signupd=require("./controllers/signupd");
const login=require("./controllers/login");
const homer=require("./controllers/homer");
const homed=require("./controllers/homed");
const auction=require("./controllers/auction");

const abi=require("./user_contract").abi2;
const address=require("./user_contract").address2;

const CurrentRide=require("./models/Auction");

mongoose.connect('mongodb://admin:Priyam123@ds353457.mlab.com:53457/ridex', {useNewUrlParser: true});

const app=express();

app.set('view engine','ejs');
app.use(session({
    key:"user_sid",
    secret:"sometext",
    resave:false,
    saveUninitialized: false,
    // store:new mongoStore({
    //     url:'mongodb://localhost:27017/RideX',
    //     autoRemove:false
    // })

}));
app.use(express.static('./public'));
app.use(bparser.urlencoded({extended:true}));
app.use(bparser.json());

app.get("/",async (req,res)=>{
        
    if(req.session.username!==undefined)
    {
        console.log(req.session.userType);
        if(req.session.userType==="Driver"){
            res.redirect("/homed");
        }else{
            res.redirect("/homer");
        }

    }
    else{
        res.render("index",{message:null});
    }

});



app.get("/test", async (req,res)=>{
    const provider=new HDwalletprovider(
        "6971A7AEFA1B6643311ADD7214B58CAC41E257FB17F47CD4D5C529902FAD00A7",
        'https://ropsten.infura.io/v3/da4d3f3021fd4ada9c1e70a4b607e74f'
     );

     const web3=new Web3(provider);

     console.log("provider set");

     const contract=new web3.eth.Contract(abi,address);

     const response=await contract.methods.get("priyam").call();
     console.log(response);



   
})
app.listen(3000,()=>{
    console.log("listening to PORT 3000");
});


signupr(app);
signupd(app);
login(app);
homer(app);
homed(app);
auction(app);


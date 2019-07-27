const express=require("express");
const Web3=require("web3");
const HDwalletprovider=require("truffle-hdwallet-provider");
const bparser=require("body-parser");
const session=require("express-session");
const mongoStore=require("connect-mongo")(session);
var mongoose=require('mongoose');

const signupr=require("./controllers/signupr");
const signupd=require("./controllers/signupd");
const login=require("./controllers/login");
const homer=require("./controllers/homer");
const homed=require("./controllers/homed");
const auction=require("./controllers/auction");
const pay=require("./controllers/pay");

mongoose.connect('mongodb://localhost:27017/RideX', {useNewUrlParser: true});

const app=express();

app.set('view engine','ejs');
app.use(session({
    key:"user_sid",
    secret:"sometext",
    resave:false,
    saveUninitialized: false,
    store:new mongoStore({
        url:'mongodb://localhost:27017/RideX',
        autoRemove:false
    })

}));
app.use(express.static('./public'));
app.use(bparser.urlencoded({extended:true}));
app.use(bparser.json());


app.get('/',(req,res)=>{
    if(req.session.email===undefined){
    res.render("index",{message:null});
    }
});


app.listen(3000,()=>{
    console.log("listening to PORT 3000");
});


signupr(app);
signupd(app);
login(app);
homer(app);
homed(app);
auction(app);
pay(app);

const ethCrypto=require('eth-crypto');
const Web3=require("web3");
const Tx = require('ethereumjs-tx').Transaction

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
        var pub_key = ethCrypto.publicKeyByPrivateKey(sender);
        var address = ethCrypto.publicKey.toAddress(pub_key);
        console.log(address,receiver,"my addr");

        const testnet = 'https://ropsten.infura.io/v3/da4d3f3021fd4ada9c1e70a4b607e74f';

        const web3 = new Web3( new Web3.providers.HttpProvider(testnet) );

        web3.eth.defaultAccount = address;
        console.log( web3.utils.toWei(fare,"ether"),web3.utils.toHex(web3.utils.toWei(fare,"ether")));
        //signs trans

            const trans = await web3.eth.accounts.signTransaction({
            nonce : web3.eth.getTransactionCount(web3.eth.defaultAccount),
            to: receiver,
            value: web3.utils.toWei(fare,"ether"),
            gas: 2000000
            }, sender);        

            const rawTrans=trans['rawTransaction'];
            console.log(trans['rawTransaction']);
        //send sign transc

         var privateKey = new Buffer.from(sender, 'hex');

        // var nonce = web3.eth.getTransactionCount(web3.eth.defaultAccount);
        // var rawTx = {
        //   nonce: nonce,
        //   gasPrice: 21000,
        //   gasLimit: '0x2710',
        //   to: receiver,
        //   value:  web3.utils.toHex(web3.utils.toWei(fare,"ether")),
        //   //data: '0x7f7465737432000000000000000000000000000000000000000000000000000000600057'
        // }

        //with raw Transaction
        var tx = new Tx(rawTrans,{ chain:'ropsten',hardfork: 'petersburg'});
        tx.sign(privateKey);
        
        var serializedTx = tx.serialize();
        
        console.log(serializedTx.toString('hex'),"serialized");
        // 0xf889808609184e72a00082271094000000000000000000000000000000000000000080a47f74657374320000000000000000000000000000000000000000000000000000006000571ca08a8bbf888cfa37bbf0bb965423625641fc956967b81d12e23709cead01446075a01ce999b56a8a88504be365442ea61239198e23d1fce7d00fcfc5cd3b44b7215f
        
        var payment= await web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex')).on('receipt', console.log);
        console.log(payment,"payment");
        

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
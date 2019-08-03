const express=require("express");
const Web3=require("web3");
const HDwalletprovider=require("truffle-hdwallet-provider");
const bparser=require("body-parser");
const session=require("express-session");
const Tx = require('ethereumjs-tx').Transaction;
const fetch=require("node-fetch"); 
const BN = require("bignumber.js");

const abi=require("../user_contract").abi2;
const address=require("../user_contract").address2;



const testnet = 'https://ropsten.infura.io/v3/da4d3f3021fd4ada9c1e70a4b607e74f';

const web3 = new Web3( new Web3.providers.HttpProvider(testnet) );
const SRC_TOKEN = "ETH";
const DST_TOKEN = "ZIL";
const SRC_TOKEN_ADDRESS = "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee";
const DST_TOKEN_ADDRESS = "0xaD78AFbbE48bA7B670fbC54c65708cbc17450167";
const SRC_DECIMALS = 18;
const DST_DECIMALS = 12;


// KyberNetworkProxy Contract ABI
const KYBER_NETWORK_PROXY_ABI = [{"constant":false,"inputs":[{"name":"alerter","type":"address"}],"name":"removeAlerter","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"enabled","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"pendingAdmin","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getOperators","outputs":[{"name":"","type":"address[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"src","type":"address"},{"name":"srcAmount","type":"uint256"},{"name":"dest","type":"address"},{"name":"destAddress","type":"address"},{"name":"maxDestAmount","type":"uint256"},{"name":"minConversionRate","type":"uint256"},{"name":"walletId","type":"address"},{"name":"hint","type":"bytes"}],"name":"tradeWithHint","outputs":[{"name":"","type":"uint256"}],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"name":"token","type":"address"},{"name":"srcAmount","type":"uint256"},{"name":"minConversionRate","type":"uint256"}],"name":"swapTokenToEther","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"token","type":"address"},{"name":"amount","type":"uint256"},{"name":"sendTo","type":"address"}],"name":"withdrawToken","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"maxGasPrice","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"newAlerter","type":"address"}],"name":"addAlerter","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"kyberNetworkContract","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"user","type":"address"}],"name":"getUserCapInWei","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"src","type":"address"},{"name":"srcAmount","type":"uint256"},{"name":"dest","type":"address"},{"name":"minConversionRate","type":"uint256"}],"name":"swapTokenToToken","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"newAdmin","type":"address"}],"name":"transferAdmin","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"claimAdmin","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"token","type":"address"},{"name":"minConversionRate","type":"uint256"}],"name":"swapEtherToToken","outputs":[{"name":"","type":"uint256"}],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"name":"newAdmin","type":"address"}],"name":"transferAdminQuickly","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getAlerters","outputs":[{"name":"","type":"address[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"src","type":"address"},{"name":"dest","type":"address"},{"name":"srcQty","type":"uint256"}],"name":"getExpectedRate","outputs":[{"name":"expectedRate","type":"uint256"},{"name":"slippageRate","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"user","type":"address"},{"name":"token","type":"address"}],"name":"getUserCapInTokenWei","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"newOperator","type":"address"}],"name":"addOperator","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_kyberNetworkContract","type":"address"}],"name":"setKyberNetworkContract","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"operator","type":"address"}],"name":"removeOperator","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"field","type":"bytes32"}],"name":"info","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"src","type":"address"},{"name":"srcAmount","type":"uint256"},{"name":"dest","type":"address"},{"name":"destAddress","type":"address"},{"name":"maxDestAmount","type":"uint256"},{"name":"minConversionRate","type":"uint256"},{"name":"walletId","type":"address"}],"name":"trade","outputs":[{"name":"","type":"uint256"}],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"name":"amount","type":"uint256"},{"name":"sendTo","type":"address"}],"name":"withdrawEther","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"token","type":"address"},{"name":"user","type":"address"}],"name":"getBalance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"admin","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[{"name":"_admin","type":"address"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"trader","type":"address"},{"indexed":false,"name":"src","type":"address"},{"indexed":false,"name":"dest","type":"address"},{"indexed":false,"name":"actualSrcAmount","type":"uint256"},{"indexed":false,"name":"actualDestAmount","type":"uint256"}],"name":"ExecuteTrade","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"newNetworkContract","type":"address"},{"indexed":false,"name":"oldNetworkContract","type":"address"}],"name":"KyberNetworkSet","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"token","type":"address"},{"indexed":false,"name":"amount","type":"uint256"},{"indexed":false,"name":"sendTo","type":"address"}],"name":"TokenWithdraw","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"amount","type":"uint256"},{"indexed":false,"name":"sendTo","type":"address"}],"name":"EtherWithdraw","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"pendingAdmin","type":"address"}],"name":"TransferAdminPending","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"newAdmin","type":"address"},{"indexed":false,"name":"previousAdmin","type":"address"}],"name":"AdminClaimed","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"newAlerter","type":"address"},{"indexed":false,"name":"isAdd","type":"bool"}],"name":"AlerterAdded","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"newOperator","type":"address"},{"indexed":false,"name":"isAdd","type":"bool"}],"name":"OperatorAdded","type":"event"}];

// Kyber Network Proxy Contract Address
const KYBER_NETWORK_PROXY_ADDRESS = "0x818e6fecd516ecc3849daf6845e3ec868087b755";

const SRC_QTY = "1";
const SRC_QTY_WEI = (SRC_QTY * 10 ** SRC_DECIMALS).toString();
const MAX_DEST_AMOUNT = "115792089237316195423570985008687907853269984665640564039457584007913129639935";
const GAS_LIMIT = '5000000'

const addresss="0x2248d96D13198CC52274f30F029C241c87b5a23c";
const addressr="0x7Ed99FcCe0BE64c1519aBB90a2bB6CC75FEa8a3C";
// const addressr="0x2248d96D13198CC52274f30F029C241c87b5a23c";

const KYBER_NETWORK_PROXY_CONTRACT = new web3.eth.Contract(
   KYBER_NETWORK_PROXY_ABI,
   KYBER_NETWORK_PROXY_ADDRESS
);

const REF_ADDRESS = "0x483C5100C3E544Aef546f72dF4022c8934a6945E";;



module.exports=(app)=>{
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
  
  
  
     
  });
  app.get("/kyber",async (req,res)=>{
 
   

   // console.log(fetch);
   const addresss="0x2248d96D13198CC52274f30F029C241c87b5a23c";
   // const addressr="0x7Ed99FcCe0BE64c1519aBB90a2bB6CC75FEa8a3C";
   
   web3.eth.defaultAccount =addresss;
   const nonce=await web3.eth.getTransactionCount(web3.eth.defaultAccount);
   console.log(`https://api.kyber.network/transfer_data?from=${addresss}&to=${addressr}&value=1&gas_price=medium&gas_limit=200000&nonce=${nonce}`)
   const request=await fetch(`https://api.kyber.network/transfer_data?from=${addresss}&to=${addressr}&value=1.5&gas_price=medium&gas_limit=200000&nonce=${nonce}`);
   
   const requestData=await request.json();
   console.log(requestData);
   // console.log( web3.utils.toWei(fare,"ether"),web3.utils.toHex(web3.utils.toWei(fare,"ether")));
   //signs trans
      const sender="6971A7AEFA1B6643311ADD7214B58CAC41E257FB17F47CD4D5C529902FAD00A7";
       const trans = await web3.eth.accounts.signTransaction(
         requestData.data
       ,sender);        
     
       const rawTrans=trans['rawTransaction'];
      
       console.log(trans['rawTransaction']);
      //send sign transc

   var privateKey = new Buffer.from(sender, 'hex');

   //with raw Transaction
   var tx = new Tx(rawTrans,{ chain:'ropsten',hardfork: 'petersburg'});
   tx.sign(privateKey);
   
   var serializedTx = tx.serialize();
   
   console.log(serializedTx.toString('hex'),"serialized");
   // 0xf889808609184e72a00082271094000000000000000000000000000000000000000080a47f74657374320000000000000000000000000000000000000000000000000000006000571ca08a8bbf888cfa37bbf0bb965423625641fc956967b81d12e23709cead01446075a01ce999b56a8a88504be365442ea61239198e23d1fce7d00fcfc5cd3b44b7215f
   
   var payment= await web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex')).on('receipt', console.log);
   console.log(payment,"payment");

  });

  app.get("/kyber2",async(req,res)=>{
   const testnet = 'https://ropsten.infura.io/v3/da4d3f3021fd4ada9c1e70a4b607e74f';
   const web3 = new Web3( new Web3.providers.HttpProvider(testnet) );   
   
   let results = await getRates(SRC_TOKEN_ADDRESS, DST_TOKEN_ADDRESS, SRC_QTY_WEI);

  //Convert ETH to ZIL
   await trade(
    SRC_TOKEN_ADDRESS,
    SRC_QTY_WEI,
    DST_TOKEN_ADDRESS,
    addressr,
    MAX_DEST_AMOUNT,
    results.slippageRate,
    REF_ADDRESS
   );
      console.log("done");
   });


}

const broadcast=async (from, to, txData, value, gasLimit)=>{
   let txCount = await web3.eth.getTransactionCount(addresss);
   let gasPrice=2000000000;
   let maxGasPrice = await KYBER_NETWORK_PROXY_CONTRACT.methods
   .maxGasPrice()
   .call();

   if (gasPrice >= maxGasPrice) gasPrice = maxGasPrice;

   let rawTx = {
      from: from,
      to: to,
      data: txData,
      value: web3.utils.toHex(value),
      gasLimit: web3.utils.toHex(gasLimit),
      gasPrice: web3.utils.toHex(gasPrice),
      nonce: txCount
   };

   var tx = new Tx(rawTx,{ chain:'ropsten',hardfork: 'petersburg'});
   console.log(rawTx);
   const keyBuffer=Buffer.from("6971A7AEFA1B6643311ADD7214B58CAC41E257FB17F47CD4D5C529902FAD00A7","hex");
   tx.sign(keyBuffer);
   const serializedTx = tx.serialize();
   console.log(serializedTx);
   txReceipt = await web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex'))
   .catch(error => console.log(error));

   // Log the tx receipt
   console.log(txReceipt);
   return;

}

const trade=async (
   srcTokenAddress,
   srcQtyWei,
   dstTokenAddress,
   dstAddress,
   maxDstAmount,
   minConversionRate,
   walletId
 ) =>{
   console.log(`Converting ${SRC_TOKEN} to ${DST_TOKEN}`);
   console.log("debug",dstTokenAddress,srcTokenAddress);
   let txData = await KYBER_NETWORK_PROXY_CONTRACT.methods
     .trade(
       srcTokenAddress,
       srcQtyWei,
       dstTokenAddress,
       dstAddress,
       maxDstAmount,
       minConversionRate,
       walletId
     )
     
   console.log(txData);
   await broadcast(
     addresss,
     addressr,
     txData.encodeABI(),
     srcQtyWei, //Ether value to be included in the tx
     GAS_LIMIT //gasLimit
   );
 }

 async function getRates(SRC_TOKEN_ADDRESS,DST_TOKEN_ADDRESS,SRC_QTY_WEI) {
   return await KYBER_NETWORK_PROXY_CONTRACT.methods
     .getExpectedRate(SRC_TOKEN_ADDRESS, DST_TOKEN_ADDRESS, SRC_QTY_WEI)
     .call();
 }
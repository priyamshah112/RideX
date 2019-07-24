const ethCrypto=require('eth-crypto');
module.exports=()=>{
    var identity=ethCrypto.createIdentity();

    return identity;
}
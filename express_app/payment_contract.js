const abi2=[
	{
		"constant": false,
		"inputs": [
			{
				"name": "_addr",
				"type": "address"
			}
		],
		"name": "getEthBalance",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "beneficiary",
				"type": "address"
			}
		],
		"name": "fpay",
		"outputs": [],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	}
];

const address2="0x6828f756254349455e8cc4f8cbe8015a6b6afe11"; //payment contract address ropsten

module.exports.abi2=abi2;
module.exports.address2=address2;
//Testing
// Acc Dev 0x6142D7E5953683594e83c19e719D675bE9264a05
// Acc Pri 0x951DAdD1B309164e2f6AF43961242c7966A9576D
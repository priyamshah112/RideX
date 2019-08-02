const abi2=[
	{
		"constant": false,
		"inputs": [],
		"name": "deposit",
		"outputs": [],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "beneficiary",
				"type": "address"
			},
			{
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "withdraw",
		"outputs": [
			{
				"name": "success",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getBalance",
		"outputs": [
			{
				"name": "balance",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	}
];

const address2="0xe91c598e4a5d99d6fb54bc5eae5295846f25f443"; //payment contract address ropsten

module.exports.abi2=abi2;
module.exports.address2=address2;
//Testing
// Acc Dev 0x6142D7E5953683594e83c19e719D675bE9264a05
// Acc Pri 0x951DAdD1B309164e2f6AF43961242c7966A9576D
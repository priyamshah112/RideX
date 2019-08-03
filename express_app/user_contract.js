const abi2=[
	{
		"constant": false,
		"inputs": [
			{
				"name": "rider",
				"type": "string"
			}
		],
		"name": "getFinalBid",
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
				"name": "name",
				"type": "string"
			},
			{
				"name": "username",
				"type": "string"
			},
			{
				"name": "phoneNumber",
				"type": "string"
			},
			{
				"name": "vehicle",
				"type": "string"
			},
			{
				"name": "vehicleNo",
				"type": "string"
			},
			{
				"name": "category",
				"type": "string"
			},
			{
				"name": "password",
				"type": "string"
			},
			{
				"name": "key",
				"type": "string"
			}
		],
		"name": "set",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "driver",
				"type": "string"
			},
			{
				"name": "rider",
				"type": "string"
			}
		],
		"name": "setFinalBid",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "username",
				"type": "string"
			}
		],
		"name": "get",
		"outputs": [
			{
				"name": "",
				"type": "string"
			},
			{
				"name": "",
				"type": "string"
			},
			{
				"name": "",
				"type": "string"
			},
			{
				"name": "",
				"type": "string"
			},
			{
				"name": "",
				"type": "string"
			},
			{
				"name": "",
				"type": "string"
			},
			{
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	}
];

const address2="0xe4beb9e6a630f7d7c15e77468fb8047b6a902938"; //user contract address

module.exports.abi2=abi2;
module.exports.address2=address2;
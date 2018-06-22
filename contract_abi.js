var contract_abi = 
[
{
  "constant": false,
  "inputs": [],
  "name": "renounceOwnership",
  "outputs": [],
  "payable": false,
  "stateMutability": "nonpayable",
  "type": "function"
},
{
  "constant": true,
  "inputs": [],
  "name": "owner",
  "outputs": [
    {
      "name": "",
      "type": "address"
    }
  ],
  "payable": false,
  "stateMutability": "view",
  "type": "function"
},
{
  "constant": false,
  "inputs": [
    {
      "name": "_newOwner",
      "type": "address"
    }
  ],
  "name": "transferOwnership",
  "outputs": [],
  "payable": false,
  "stateMutability": "nonpayable",
  "type": "function"
},
{
  "inputs": [
    {
      "name": "lockPeriodInBlocks",
      "type": "uint256"
    }
  ],
  "payable": false,
  "stateMutability": "nonpayable",
  "type": "constructor"
},
{
  "anonymous": false,
  "inputs": [
    {
      "indexed": false,
      "name": "move",
      "type": "uint8"
    },
    {
      "indexed": false,
      "name": "block",
      "type": "uint256"
    },
    {
      "indexed": false,
      "name": "player",
      "type": "address"
    },
    {
      "indexed": false,
      "name": "value",
      "type": "uint256"
    }
  ],
  "name": "MoveMade",
  "type": "event"
},
{
  "anonymous": false,
  "inputs": [
    {
      "indexed": false,
      "name": "player",
      "type": "address"
    },
    {
      "indexed": false,
      "name": "name",
      "type": "string"
    },
    {
      "indexed": false,
      "name": "value",
      "type": "uint256"
    }
  ],
  "name": "PlayerNameChange",
  "type": "event"
},
{
  "anonymous": false,
  "inputs": [
    {
      "indexed": false,
      "name": "player",
      "type": "address"
    },
    {
      "indexed": false,
      "name": "name",
      "type": "string"
    },
    {
      "indexed": false,
      "name": "value",
      "type": "uint256"
    }
  ],
  "name": "RivalNameChange",
  "type": "event"
},
{
  "anonymous": false,
  "inputs": [
    {
      "indexed": false,
      "name": "player",
      "type": "address"
    },
    {
      "indexed": false,
      "name": "balance",
      "type": "uint256"
    }
  ],
  "name": "Deposit",
  "type": "event"
},
{
  "anonymous": false,
  "inputs": [
    {
      "indexed": false,
      "name": "player",
      "type": "address"
    },
    {
      "indexed": false,
      "name": "ownerAmount",
      "type": "uint256"
    },
    {
      "indexed": false,
      "name": "nonce",
      "type": "uint256"
    }
  ],
  "name": "Withdraw",
  "type": "event"
},
{
  "anonymous": false,
  "inputs": [
    {
      "indexed": true,
      "name": "previousOwner",
      "type": "address"
    }
  ],
  "name": "OwnershipRenounced",
  "type": "event"
},
{
  "anonymous": false,
  "inputs": [
    {
      "indexed": true,
      "name": "previousOwner",
      "type": "address"
    },
    {
      "indexed": true,
      "name": "newOwner",
      "type": "address"
    }
  ],
  "name": "OwnershipTransferred",
  "type": "event"
},
{
  "constant": false,
  "inputs": [
    {
      "name": "name",
      "type": "string"
    }
  ],
  "name": "changePlayerName",
  "outputs": [],
  "payable": true,
  "stateMutability": "payable",
  "type": "function"
},
{
  "constant": false,
  "inputs": [
    {
      "name": "name",
      "type": "string"
    }
  ],
  "name": "changeRivalName",
  "outputs": [],
  "payable": true,
  "stateMutability": "payable",
  "type": "function"
},
{
  "constant": false,
  "inputs": [
    {
      "name": "move",
      "type": "uint8"
    }
  ],
  "name": "makeMove",
  "outputs": [],
  "payable": true,
  "stateMutability": "payable",
  "type": "function"
},
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
      "name": "owner_amount",
      "type": "uint256"
    }
  ],
  "name": "initiateWithdrawal",
  "outputs": [],
  "payable": false,
  "stateMutability": "nonpayable",
  "type": "function"
},
{
  "constant": false,
  "inputs": [],
  "name": "withdraw",
  "outputs": [],
  "payable": false,
  "stateMutability": "nonpayable",
  "type": "function"
},
{
  "constant": false,
  "inputs": [
    {
      "name": "player",
      "type": "address"
    },
    {
      "name": "nonce",
      "type": "uint256"
    },
    {
      "name": "amount",
      "type": "uint256"
    },
    {
      "name": "move",
      "type": "uint8"
    },
    {
      "name": "r",
      "type": "bytes32"
    },
    {
      "name": "s",
      "type": "bytes32"
    },
    {
      "name": "v",
      "type": "uint8"
    }
  ],
  "name": "forceWithdrawal",
  "outputs": [],
  "payable": false,
  "stateMutability": "nonpayable",
  "type": "function"
},
{
  "constant": false,
  "inputs": [],
  "name": "ownerWithdraw",
  "outputs": [],
  "payable": false,
  "stateMutability": "nonpayable",
  "type": "function"
},
{
  "constant": true,
  "inputs": [
    {
      "name": "player",
      "type": "address"
    },
    {
      "name": "nonce",
      "type": "uint256"
    },
    {
      "name": "amount",
      "type": "uint256"
    },
    {
      "name": "move",
      "type": "uint8"
    },
    {
      "name": "r",
      "type": "bytes32"
    },
    {
      "name": "s",
      "type": "bytes32"
    },
    {
      "name": "v",
      "type": "uint8"
    }
  ],
  "name": "checkSignature",
  "outputs": [
    {
      "name": "",
      "type": "bool"
    }
  ],
  "payable": false,
  "stateMutability": "view",
  "type": "function"
},
{
  "constant": true,
  "inputs": [
    {
      "name": "player",
      "type": "address"
    },
    {
      "name": "nonce",
      "type": "uint256"
    },
    {
      "name": "amount",
      "type": "uint256"
    },
    {
      "name": "move",
      "type": "uint8"
    },
    {
      "name": "r",
      "type": "bytes32"
    },
    {
      "name": "s",
      "type": "bytes32"
    },
    {
      "name": "v",
      "type": "uint8"
    },
    {
      "name": "hasPrefix",
      "type": "bool"
    }
  ],
  "name": "checkSignatureInternal",
  "outputs": [
    {
      "name": "",
      "type": "bool"
    }
  ],
  "payable": false,
  "stateMutability": "view",
  "type": "function"
},
{
  "constant": true,
  "inputs": [
    {
      "name": "h",
      "type": "bytes32"
    },
    {
      "name": "r",
      "type": "bytes32"
    },
    {
      "name": "s",
      "type": "bytes32"
    },
    {
      "name": "v",
      "type": "uint8"
    }
  ],
  "name": "recoverAddress",
  "outputs": [
    {
      "name": "",
      "type": "address"
    }
  ],
  "payable": false,
  "stateMutability": "pure",
  "type": "function"
},
{
  "constant": true,
  "inputs": [
    {
      "name": "nonce",
      "type": "uint256"
    },
    {
      "name": "amount",
      "type": "uint256"
    },
    {
      "name": "move",
      "type": "uint8"
    }
  ],
  "name": "hashAuthorization",
  "outputs": [
    {
      "name": "",
      "type": "bytes32"
    }
  ],
  "payable": false,
  "stateMutability": "view",
  "type": "function"
},
{
  "constant": true,
  "inputs": [
    {
      "name": "player",
      "type": "address"
    }
  ],
  "name": "toOwnerOf",
  "outputs": [
    {
      "name": "",
      "type": "uint256"
    }
  ],
  "payable": false,
  "stateMutability": "view",
  "type": "function"
},
{
  "constant": true,
  "inputs": [
    {
      "name": "player",
      "type": "address"
    }
  ],
  "name": "nonceOf",
  "outputs": [
    {
      "name": "",
      "type": "uint256"
    }
  ],
  "payable": false,
  "stateMutability": "view",
  "type": "function"
},
{
  "constant": true,
  "inputs": [
    {
      "name": "player",
      "type": "address"
    }
  ],
  "name": "totalBalanceOf",
  "outputs": [
    {
      "name": "",
      "type": "uint256"
    }
  ],
  "payable": false,
  "stateMutability": "view",
  "type": "function"
},
{
  "constant": true,
  "inputs": [
    {
      "name": "player",
      "type": "address"
    }
  ],
  "name": "balanceOf",
  "outputs": [
    {
      "name": "",
      "type": "uint256"
    }
  ],
  "payable": false,
  "stateMutability": "view",
  "type": "function"
},
{
  "constant": true,
  "inputs": [
    {
      "name": "player",
      "type": "address"
    }
  ],
  "name": "lockedBalanceOf",
  "outputs": [
    {
      "name": "",
      "type": "uint256"
    }
  ],
  "payable": false,
  "stateMutability": "view",
  "type": "function"
},
{
  "constant": true,
  "inputs": [
    {
      "name": "player",
      "type": "address"
    }
  ],
  "name": "lockedAt",
  "outputs": [
    {
      "name": "",
      "type": "uint256"
    }
  ],
  "payable": false,
  "stateMutability": "view",
  "type": "function"
},
{
  "constant": true,
  "inputs": [
    {
      "name": "player",
      "type": "address"
    }
  ],
  "name": "isLocked",
  "outputs": [
    {
      "name": "",
      "type": "bool"
    }
  ],
  "payable": false,
  "stateMutability": "view",
  "type": "function"
},
{
  "constant": true,
  "inputs": [],
  "name": "getOwnerBalance",
  "outputs": [
    {
      "name": "",
      "type": "uint256"
    }
  ],
  "payable": false,
  "stateMutability": "view",
  "type": "function"
},
{
  "constant": true,
  "inputs": [],
  "name": "minimumPayment",
  "outputs": [
    {
      "name": "",
      "type": "uint256"
    }
  ],
  "payable": false,
  "stateMutability": "pure",
  "type": "function"
},
{
  "constant": true,
  "inputs": [],
  "name": "minimumPaymentPlayerName",
  "outputs": [
    {
      "name": "",
      "type": "uint256"
    }
  ],
  "payable": false,
  "stateMutability": "pure",
  "type": "function"
},
{
  "constant": true,
  "inputs": [],
  "name": "minimumPaymentRivalName",
  "outputs": [
    {
      "name": "",
      "type": "uint256"
    }
  ],
  "payable": false,
  "stateMutability": "pure",
  "type": "function"
},
{
  "constant": true,
  "inputs": [],
  "name": "lockupPeriod",
  "outputs": [
    {
      "name": "",
      "type": "uint256"
    }
  ],
  "payable": false,
  "stateMutability": "view",
  "type": "function"
}
]

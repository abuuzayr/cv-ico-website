const Web3 = require('web3');

const infura = 'https://rinkeby.infura.io/mew';
const web3 = new Web3(new Web3.providers.HttpProvider(infura));
const address = '0xCFD8F28E959AF51A224344371a39127B767e9526';

const abi = [{
  constant: true,
  inputs: [{
    name: '',
    type: 'address',
  }],
  name: 'tokensCollected',
  outputs: [{
    name: '',
    type: 'bool',
  }],
  payable: false,
  stateMutability: 'view',
  type: 'function',
}, {
  constant: true,
  inputs: [{
    name: '',
    type: 'address',
  }],
  name: 'owners',
  outputs: [{
    name: '',
    type: 'bool',
  }],
  payable: false,
  stateMutability: 'view',
  type: 'function',
}, {
  constant: true,
  inputs: [{
    name: '_contributor',
    type: 'address',
  }],
  name: 'isInWhitelist',
  outputs: [{
    name: '',
    type: 'bool',
  }],
  payable: false,
  stateMutability: 'view',
  type: 'function',
}, {
  constant: true,
  inputs: [],
  name: 'totalFund',
  outputs: [{
    name: '',
    type: 'uint256',
  }],
  payable: false,
  stateMutability: 'view',
  type: 'function',
}, {
  constant: false,
  inputs: [{
    name: '_address',
    type: 'address',
  }],
  name: 'removeOwner',
  outputs: [],
  payable: false,
  stateMutability: 'nonpayable',
  type: 'function',
}, {
  constant: true,
  inputs: [{
    name: '',
    type: 'uint256',
  }],
  name: 'contributionsPerStretchGoal',
  outputs: [{
    name: '',
    type: 'uint256',
  }],
  payable: false,
  stateMutability: 'view',
  type: 'function',
}, {
  constant: false,
  inputs: [],
  name: 'endTokenSale',
  outputs: [],
  payable: false,
  stateMutability: 'nonpayable',
  type: 'function',
}, {
  constant: true,
  inputs: [],
  name: 'mgmtFeePercentage',
  outputs: [{
    name: '',
    type: 'uint256',
  }],
  payable: false,
  stateMutability: 'view',
  type: 'function',
}, {
  constant: true,
  inputs: [],
  name: 'crvTokenAddr',
  outputs: [{
    name: '',
    type: 'address',
  }],
  payable: false,
  stateMutability: 'view',
  type: 'function',
}, {
  constant: true,
  inputs: [],
  name: 'saleEndBlock',
  outputs: [{
    name: '',
    type: 'uint256',
  }],
  payable: false,
  stateMutability: 'view',
  type: 'function',
}, {
  constant: true,
  inputs: [],
  name: 'reiPerEth',
  outputs: [{
    name: '',
    type: 'uint256',
  }],
  payable: false,
  stateMutability: 'view',
  type: 'function',
}, {
  constant: true,
  inputs: [{
    name: '',
    type: 'address',
  }, {
    name: '',
    type: 'uint256',
  }],
  name: 'contributions',
  outputs: [{
    name: '',
    type: 'uint256',
  }],
  payable: false,
  stateMutability: 'view',
  type: 'function',
}, {
  constant: true,
  inputs: [],
  name: 'crpTokenAddr',
  outputs: [{
    name: '',
    type: 'address',
  }],
  payable: false,
  stateMutability: 'view',
  type: 'function',
}, {
  constant: true,
  inputs: [{
    name: '',
    type: 'address',
  }],
  name: 'contributorIndex',
  outputs: [{
    name: '',
    type: 'uint256',
  }],
  payable: false,
  stateMutability: 'view',
  type: 'function',
}, {
  constant: true,
  inputs: [],
  name: 'totalReferralMultisig',
  outputs: [{
    name: '',
    type: 'uint256',
  }],
  payable: false,
  stateMutability: 'view',
  type: 'function',
}, {
  constant: true,
  inputs: [{
    name: '_contributor',
    type: 'address',
  }],
  name: 'getPromisedREITokenAmount',
  outputs: [{
    name: '',
    type: 'uint256',
  }],
  payable: false,
  stateMutability: 'view',
  type: 'function',
}, {
  constant: true,
  inputs: [{
    name: '_contributor',
    type: 'address',
  }],
  name: 'getPromisedCRVTokenAmount',
  outputs: [{
    name: '',
    type: 'uint256',
  }],
  payable: false,
  stateMutability: 'view',
  type: 'function',
}, {
  constant: true,
  inputs: [{
    name: '',
    type: 'bytes32',
  }],
  name: 'referralMultisig',
  outputs: [{
    name: '',
    type: 'address',
  }],
  payable: false,
  stateMutability: 'view',
  type: 'function',
}, {
  constant: false,
  inputs: [{
    name: '_address',
    type: 'address',
  }],
  name: 'addOwner',
  outputs: [],
  payable: false,
  stateMutability: 'nonpayable',
  type: 'function',
}, {
  constant: false,
  inputs: [{
    name: '_referralCode',
    type: 'bytes32',
  }, {
    name: '_multisigAddr',
    type: 'address',
  }],
  name: 'registerReferralMultisig',
  outputs: [],
  payable: false,
  stateMutability: 'nonpayable',
  type: 'function',
}, {
  constant: false,
  inputs: [{
    name: '_saleEndBlock',
    type: 'uint256',
  }],
  name: 'updateSaleEndBlock',
  outputs: [],
  payable: false,
  stateMutability: 'nonpayable',
  type: 'function',
}, {
  constant: true,
  inputs: [{
    name: '',
    type: 'uint256',
  }],
  name: 'reversedContributorIndex',
  outputs: [{
    name: '',
    type: 'address',
  }],
  payable: false,
  stateMutability: 'view',
  type: 'function',
}, {
  constant: true,
  inputs: [],
  name: 'currentStretchGoal',
  outputs: [{
    name: '',
    type: 'uint256',
  }],
  payable: false,
  stateMutability: 'view',
  type: 'function',
}, {
  constant: true,
  inputs: [{
    name: '',
    type: 'address',
  }],
  name: 'contributionsPerAddress',
  outputs: [{
    name: '',
    type: 'uint256',
  }],
  payable: false,
  stateMutability: 'view',
  type: 'function',
}, {
  constant: true,
  inputs: [],
  name: 'crvPerEth',
  outputs: [{
    name: '',
    type: 'uint256',
  }],
  payable: false,
  stateMutability: 'view',
  type: 'function',
}, {
  constant: true,
  inputs: [{
    name: '',
    type: 'address',
  }],
  name: 'whitelist',
  outputs: [{
    name: 'whitelisted',
    type: 'bool',
  }, {
    name: 'isEarlyRegistrant',
    type: 'bool',
  }, {
    name: 'referralCode',
    type: 'bytes32',
  }],
  payable: false,
  stateMutability: 'view',
  type: 'function',
}, {
  constant: false,
  inputs: [{
    name: '_contributor',
    type: 'address',
  }, {
    name: '_earlyRegistrant',
    type: 'bool',
  }, {
    name: '_referralCode',
    type: 'bytes32',
  }],
  name: 'addToWhitelist',
  outputs: [],
  payable: false,
  stateMutability: 'nonpayable',
  type: 'function',
}, {
  constant: true,
  inputs: [],
  name: 'minContribution',
  outputs: [{
    name: '',
    type: 'uint256',
  }],
  payable: false,
  stateMutability: 'view',
  type: 'function',
}, {
  constant: true,
  inputs: [],
  name: 'state',
  outputs: [{
    name: '',
    type: 'uint8',
  }],
  payable: false,
  stateMutability: 'view',
  type: 'function',
}, {
  constant: true,
  inputs: [],
  name: 'getMgmtFeeTokenAmount',
  outputs: [{
    name: '',
    type: 'uint256',
  }],
  payable: false,
  stateMutability: 'view',
  type: 'function',
}, {
  constant: true,
  inputs: [{
    name: '',
    type: 'uint256',
  }],
  name: 'stretchGoals',
  outputs: [{
    name: '',
    type: 'uint256',
  }],
  payable: false,
  stateMutability: 'view',
  type: 'function',
}, {
  constant: true,
  inputs: [],
  name: 'reiTokenAddr',
  outputs: [{
    name: '',
    type: 'address',
  }],
  payable: false,
  stateMutability: 'view',
  type: 'function',
}, {
  constant: true,
  inputs: [],
  name: 'uniqueContributors',
  outputs: [{
    name: '',
    type: 'uint256',
  }],
  payable: false,
  stateMutability: 'view',
  type: 'function',
}, {
  constant: true,
  inputs: [],
  name: 'deployer',
  outputs: [{
    name: '',
    type: 'address',
  }],
  payable: false,
  stateMutability: 'view',
  type: 'function',
}, {
  constant: true,
  inputs: [],
  name: 'crowdvillaWallet',
  outputs: [{
    name: '',
    type: 'address',
  }],
  payable: false,
  stateMutability: 'view',
  type: 'function',
}, {
  constant: false,
  inputs: [{
    name: '_old',
    type: 'address',
  }, {
    name: '_new',
    type: 'address',
  }],
  name: 'UpdateContributorAddress',
  outputs: [],
  payable: false,
  stateMutability: 'nonpayable',
  type: 'function',
}, {
  constant: true,
  inputs: [],
  name: 'opsAdmin',
  outputs: [{
    name: '',
    type: 'address',
  }],
  payable: false,
  stateMutability: 'view',
  type: 'function',
}, {
  constant: false,
  inputs: [{
    name: '_opsAdmin',
    type: 'address',
  }],
  name: 'updateOpsAdmin',
  outputs: [],
  payable: false,
  stateMutability: 'nonpayable',
  type: 'function',
}, {
  inputs: [{
    name: '_stretchGoal1',
    type: 'uint256',
  }, {
    name: '_stretchGoal2',
    type: 'uint256',
  }, {
    name: '_stretchGoal3',
    type: 'uint256',
  }, {
    name: '_opsAdmin',
    type: 'address',
  }, {
    name: '_wallet',
    type: 'address',
  }, {
    name: '_crvTokenAddr',
    type: 'address',
  }, {
    name: '_crpTokenAddr',
    type: 'address',
  }, {
    name: '_reiTokenAddr',
    type: 'address',
  }],
  payable: false,
  stateMutability: 'nonpayable',
  type: 'constructor',
}, {
  payable: true,
  stateMutability: 'payable',
  type: 'fallback',
}, {
  anonymous: false,
  inputs: [{
    indexed: false,
    name: 'blkNo',
    type: 'uint256',
  }, {
    indexed: false,
    name: 'blkTs',
    type: 'uint256',
  }, {
    indexed: true,
    name: 'contributor',
    type: 'address',
  }, {
    indexed: true,
    name: 'tokensale',
    type: 'address',
  }, {
    indexed: false,
    name: 'amount',
    type: 'uint256',
  }, {
    indexed: false,
    name: 'referralCode',
    type: 'bytes32',
  }],
  name: 'Contribute',
  type: 'event',
}, {
  anonymous: false,
  inputs: [{
    indexed: false,
    name: 'blkNo',
    type: 'uint256',
  }, {
    indexed: false,
    name: 'blkTs',
    type: 'uint256',
  }, {
    indexed: true,
    name: 'contributor',
    type: 'address',
  }, {
    indexed: false,
    name: 'isEarlyRegistrant',
    type: 'bool',
  }, {
    indexed: false,
    name: 'referralCode',
    type: 'bytes32',
  }],
  name: 'Whitelisted',
  type: 'event',
}, {
  anonymous: false,
  inputs: [{
    indexed: true,
    name: '_old',
    type: 'address',
  }, {
    indexed: true,
    name: '_new',
    type: 'address',
  }],
  name: 'WhitelistChanged',
  type: 'event',
}, {
  anonymous: false,
  inputs: [{
    indexed: true,
    name: 'owner',
    type: 'address',
  }],
  name: 'OwnerAdded',
  type: 'event',
}, {
  anonymous: false,
  inputs: [{
    indexed: true,
    name: 'owner',
    type: 'address',
  }],
  name: 'OwnerRemoved',
  type: 'event',
}];

const contract = new web3.eth.Contract(abi, address);

/* eslint no-param-reassign: ["error", { "props": false }] */
export default (ctx, inject) => {
  // Inject web3 to the context as $eth
  ctx.$eth = contract;
  inject('eth', contract);
};

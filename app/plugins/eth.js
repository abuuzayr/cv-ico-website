const Web3 = require('web3');

const infura = 'https://rinkeby.infura.io/mew';
const web3 = new Web3(new Web3.providers.HttpProvider(infura));
const address = '0xCFD8F28E959AF51A224344371a39127B767e9526';

const icoABI = [{
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
  constant: false,
  inputs: [],
  name: 'startCollection',
  outputs: [],
  payable: false,
  stateMutability: 'nonpayable',
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
  name: 'reidaoWallet',
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
  inputs: [{
    name: '',
    type: 'bytes32',
  }],
  name: 'referralContribution',
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
  inputs: [{
    name: '',
    type: 'uint256',
  }, {
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
  constant: false,
  inputs: [{
    name: '_old',
    type: 'address',
  }, {
    name: '_new',
    type: 'address',
  }],
  name: 'updateContributorAddress',
  outputs: [],
  payable: false,
  stateMutability: 'nonpayable',
  type: 'function',
}, {
  constant: true,
  inputs: [],
  name: 'getREIDAODistributionTokenAmount',
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
  constant: false,
  inputs: [],
  name: 'collectREIDAODistribution',
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
    name: '_crowdvillaWallet',
    type: 'address',
  }, {
    name: '_reidaoWallet',
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

const tokenABI = [{
  constant: false,
  inputs: [{
    name: '_wallet',
    type: 'address',
  }],
  name: 'addHostedWallet',
  outputs: [],
  payable: false,
  stateMutability: 'nonpayable',
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
  inputs: [],
  name: 'mintingFinished',
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
  name: 'name',
  outputs: [{
    name: '',
    type: 'string',
  }],
  payable: false,
  stateMutability: 'view',
  type: 'function',
}, {
  constant: false,
  inputs: [{
    name: '_spender',
    type: 'address',
  }, {
    name: '_value',
    type: 'uint256',
  }],
  name: 'approve',
  outputs: [{
    name: '',
    type: 'bool',
  }],
  payable: false,
  stateMutability: 'nonpayable',
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
  inputs: [],
  name: 'totalSupply',
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
    name: '_from',
    type: 'address',
  }, {
    name: '_to',
    type: 'address',
  }, {
    name: '_value',
    type: 'uint256',
  }],
  name: 'transferFrom',
  outputs: [{
    name: '',
    type: 'bool',
  }],
  payable: false,
  stateMutability: 'nonpayable',
  type: 'function',
}, {
  constant: false,
  inputs: [],
  name: 'startTrading',
  outputs: [],
  payable: false,
  stateMutability: 'nonpayable',
  type: 'function',
}, {
  constant: true,
  inputs: [],
  name: 'decimals',
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
    name: '_to',
    type: 'address',
  }, {
    name: '_amount',
    type: 'uint256',
  }],
  name: 'mint',
  outputs: [{
    name: '',
    type: 'bool',
  }],
  payable: false,
  stateMutability: 'nonpayable',
  type: 'function',
}, {
  constant: false,
  inputs: [{
    name: '_value',
    type: 'uint256',
  }],
  name: 'burn',
  outputs: [],
  payable: false,
  stateMutability: 'nonpayable',
  type: 'function',
}, {
  constant: true,
  inputs: [{
    name: '',
    type: 'address',
  }],
  name: 'hostedWallets',
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
  name: 'tradingStarted',
  outputs: [{
    name: '',
    type: 'bool',
  }],
  payable: false,
  stateMutability: 'view',
  type: 'function',
}, {
  constant: false,
  inputs: [{
    name: '_spender',
    type: 'address',
  }, {
    name: '_subtractedValue',
    type: 'uint256',
  }],
  name: 'decreaseApproval',
  outputs: [{
    name: '',
    type: 'bool',
  }],
  payable: false,
  stateMutability: 'nonpayable',
  type: 'function',
}, {
  constant: true,
  inputs: [{
    name: '_holder',
    type: 'address',
  }],
  name: 'getLockedTokens',
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
  name: 'addOwner',
  outputs: [],
  payable: false,
  stateMutability: 'nonpayable',
  type: 'function',
}, {
  constant: false,
  inputs: [{
    name: '_to',
    type: 'address',
  }, {
    name: '_value',
    type: 'uint256',
  }, {
    name: '_lockUntil',
    type: 'uint256',
  }],
  name: 'mintAndLockTokens',
  outputs: [],
  payable: false,
  stateMutability: 'nonpayable',
  type: 'function',
}, {
  constant: true,
  inputs: [{
    name: '_owner',
    type: 'address',
  }],
  name: 'balanceOf',
  outputs: [{
    name: 'balance',
    type: 'uint256',
  }],
  payable: false,
  stateMutability: 'view',
  type: 'function',
}, {
  constant: true,
  inputs: [{
    name: '_holder',
    type: 'address',
  }],
  name: 'transferableTokens',
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
  name: 'finishMinting',
  outputs: [{
    name: '',
    type: 'bool',
  }],
  payable: false,
  stateMutability: 'nonpayable',
  type: 'function',
}, {
  constant: true,
  inputs: [],
  name: 'symbol',
  outputs: [{
    name: '',
    type: 'string',
  }],
  payable: false,
  stateMutability: 'view',
  type: 'function',
}, {
  constant: false,
  inputs: [],
  name: 'startMinting',
  outputs: [{
    name: '',
    type: 'bool',
  }],
  payable: false,
  stateMutability: 'nonpayable',
  type: 'function',
}, {
  constant: false,
  inputs: [{
    name: '_to',
    type: 'address',
  }, {
    name: '_value',
    type: 'uint256',
  }, {
    name: '_lockUntil',
    type: 'uint256',
  }],
  name: 'lockTokens',
  outputs: [],
  payable: false,
  stateMutability: 'nonpayable',
  type: 'function',
}, {
  constant: false,
  inputs: [{
    name: '_to',
    type: 'address',
  }, {
    name: '_value',
    type: 'uint256',
  }],
  name: 'transfer',
  outputs: [{
    name: '',
    type: 'bool',
  }],
  payable: false,
  stateMutability: 'nonpayable',
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
  name: 'locks',
  outputs: [{
    name: 'value',
    type: 'uint256',
  }, {
    name: 'lockedUntil',
    type: 'uint256',
  }],
  payable: false,
  stateMutability: 'view',
  type: 'function',
}, {
  constant: false,
  inputs: [{
    name: '_spender',
    type: 'address',
  }, {
    name: '_addedValue',
    type: 'uint256',
  }],
  name: 'increaseApproval',
  outputs: [{
    name: '',
    type: 'bool',
  }],
  payable: false,
  stateMutability: 'nonpayable',
  type: 'function',
}, {
  constant: true,
  inputs: [{
    name: '_owner',
    type: 'address',
  }, {
    name: '_spender',
    type: 'address',
  }],
  name: 'allowance',
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
    name: '_wallet',
    type: 'address',
  }],
  name: 'removeHostedWallet',
  outputs: [],
  payable: false,
  stateMutability: 'nonpayable',
  type: 'function',
}, {
  anonymous: false,
  inputs: [{
    indexed: true,
    name: 'burner',
    type: 'address',
  }, {
    indexed: false,
    name: 'value',
    type: 'uint256',
  }],
  name: 'Burn',
  type: 'event',
}, {
  anonymous: false,
  inputs: [{
    indexed: true,
    name: 'to',
    type: 'address',
  }, {
    indexed: false,
    name: 'amount',
    type: 'uint256',
  }],
  name: 'Mint',
  type: 'event',
}, {
  anonymous: false,
  inputs: [],
  name: 'MintFinished',
  type: 'event',
}, {
  anonymous: false,
  inputs: [],
  name: 'MintStarted',
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
}, {
  anonymous: false,
  inputs: [{
    indexed: true,
    name: 'owner',
    type: 'address',
  }, {
    indexed: true,
    name: 'spender',
    type: 'address',
  }, {
    indexed: false,
    name: 'value',
    type: 'uint256',
  }],
  name: 'Approval',
  type: 'event',
}, {
  anonymous: false,
  inputs: [{
    indexed: true,
    name: 'from',
    type: 'address',
  }, {
    indexed: true,
    name: 'to',
    type: 'address',
  }, {
    indexed: false,
    name: 'value',
    type: 'uint256',
  }],
  name: 'Transfer',
  type: 'event',
}];

const reiABI = [{
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
  inputs: [],
  name: 'mintingFinished',
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
  name: 'name',
  outputs: [{
    name: '',
    type: 'string',
  }],
  payable: false,
  stateMutability: 'view',
  type: 'function',
}, {
  constant: false,
  inputs: [{
    name: '_spender',
    type: 'address',
  }, {
    name: '_value',
    type: 'uint256',
  }],
  name: 'approve',
  outputs: [{
    name: '',
    type: 'bool',
  }],
  payable: false,
  stateMutability: 'nonpayable',
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
  inputs: [],
  name: 'totalSupply',
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
    name: '_from',
    type: 'address',
  }, {
    name: '_to',
    type: 'address',
  }, {
    name: '_value',
    type: 'uint256',
  }],
  name: 'transferFrom',
  outputs: [{
    name: '',
    type: 'bool',
  }],
  payable: false,
  stateMutability: 'nonpayable',
  type: 'function',
}, {
  constant: false,
  inputs: [],
  name: 'startTrading',
  outputs: [],
  payable: false,
  stateMutability: 'nonpayable',
  type: 'function',
}, {
  constant: true,
  inputs: [],
  name: 'decimals',
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
    name: '_to',
    type: 'address',
  }, {
    name: '_amount',
    type: 'uint256',
  }],
  name: 'mint',
  outputs: [{
    name: '',
    type: 'bool',
  }],
  payable: false,
  stateMutability: 'nonpayable',
  type: 'function',
}, {
  constant: true,
  inputs: [],
  name: 'wallet',
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
  name: 'tradingStarted',
  outputs: [{
    name: '',
    type: 'bool',
  }],
  payable: false,
  stateMutability: 'view',
  type: 'function',
}, {
  constant: false,
  inputs: [{
    name: '_spender',
    type: 'address',
  }, {
    name: '_subtractedValue',
    type: 'uint256',
  }],
  name: 'decreaseApproval',
  outputs: [{
    name: '',
    type: 'bool',
  }],
  payable: false,
  stateMutability: 'nonpayable',
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
  constant: true,
  inputs: [{
    name: '_owner',
    type: 'address',
  }],
  name: 'balanceOf',
  outputs: [{
    name: 'balance',
    type: 'uint256',
  }],
  payable: false,
  stateMutability: 'view',
  type: 'function',
}, {
  constant: false,
  inputs: [],
  name: 'finishMinting',
  outputs: [{
    name: '',
    type: 'bool',
  }],
  payable: false,
  stateMutability: 'nonpayable',
  type: 'function',
}, {
  constant: true,
  inputs: [],
  name: 'symbol',
  outputs: [{
    name: '',
    type: 'string',
  }],
  payable: false,
  stateMutability: 'view',
  type: 'function',
}, {
  constant: false,
  inputs: [{
    name: '_wallet',
    type: 'address',
  }],
  name: 'changeWallet',
  outputs: [],
  payable: false,
  stateMutability: 'nonpayable',
  type: 'function',
}, {
  constant: false,
  inputs: [],
  name: 'startMinting',
  outputs: [{
    name: '',
    type: 'bool',
  }],
  payable: false,
  stateMutability: 'nonpayable',
  type: 'function',
}, {
  constant: false,
  inputs: [{
    name: '_to',
    type: 'address',
  }, {
    name: '_value',
    type: 'uint256',
  }],
  name: 'transfer',
  outputs: [{
    name: '',
    type: 'bool',
  }],
  payable: false,
  stateMutability: 'nonpayable',
  type: 'function',
}, {
  constant: false,
  inputs: [],
  name: 'disburseToREIDAO',
  outputs: [],
  payable: false,
  stateMutability: 'nonpayable',
  type: 'function',
}, {
  constant: false,
  inputs: [{
    name: '_spender',
    type: 'address',
  }, {
    name: '_addedValue',
    type: 'uint256',
  }],
  name: 'increaseApproval',
  outputs: [{
    name: '',
    type: 'bool',
  }],
  payable: false,
  stateMutability: 'nonpayable',
  type: 'function',
}, {
  constant: true,
  inputs: [{
    name: '_owner',
    type: 'address',
  }, {
    name: '_spender',
    type: 'address',
  }],
  name: 'allowance',
  outputs: [{
    name: '',
    type: 'uint256',
  }],
  payable: false,
  stateMutability: 'view',
  type: 'function',
}, {
  inputs: [{
    name: '_wallet',
    type: 'address',
  }],
  payable: false,
  stateMutability: 'nonpayable',
  type: 'constructor',
}, {
  anonymous: false,
  inputs: [{
    indexed: false,
    name: 'wave',
    type: 'uint256',
  }, {
    indexed: false,
    name: 'amount',
    type: 'uint256',
  }],
  name: 'WaveReleased',
  type: 'event',
}, {
  anonymous: false,
  inputs: [{
    indexed: true,
    name: 'to',
    type: 'address',
  }, {
    indexed: false,
    name: 'amount',
    type: 'uint256',
  }],
  name: 'Mint',
  type: 'event',
}, {
  anonymous: false,
  inputs: [],
  name: 'MintFinished',
  type: 'event',
}, {
  anonymous: false,
  inputs: [],
  name: 'MintStarted',
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
}, {
  anonymous: false,
  inputs: [{
    indexed: true,
    name: 'owner',
    type: 'address',
  }, {
    indexed: true,
    name: 'spender',
    type: 'address',
  }, {
    indexed: false,
    name: 'value',
    type: 'uint256',
  }],
  name: 'Approval',
  type: 'event',
}, {
  anonymous: false,
  inputs: [{
    indexed: true,
    name: 'from',
    type: 'address',
  }, {
    indexed: true,
    name: 'to',
    type: 'address',
  }, {
    indexed: false,
    name: 'value',
    type: 'uint256',
  }],
  name: 'Transfer',
  type: 'event',
}];

const icoContract = new web3.eth.Contract(icoABI, address);
const tokenContract = new web3.eth.Contract(tokenABI, address);
const reiContract = new web3.eth.Contract(reiABI, address);

/* eslint no-param-reassign: ["error", { "props": false }] */
export default(ctx, inject) => {
  // Inject web3 to the context as $eth
  ctx.$eth = web3.eth;
  ctx.$eth.ico = icoContract;
  ctx.$eth.token = tokenContract;
  ctx.$eth.rei = reiContract;
  inject('eth', ctx.$eth);
};

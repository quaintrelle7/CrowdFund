// const HDWalletProvider = require('@truffle/hdwallet-provider');
// const Web3 = require('web3');
// const compiledFactory = require('./build/CampaignFactory.json');

// const provider = new HDWalletProvider(
//   'work choose wasp gravity simple lobster report spring position people lonely diesel',
//   // remember to change this to your own phrase!
//   'https://goerli.infura.io/v3/b3b0f06164064cc6b9c2811fd0ea2f60'
//   // remember to change this to your own endpoint!
// );
// const web3 = new Web3(provider);

// const deploy = async () => {
//   const accounts = await web3.eth.getAccounts();

//   console.log('Attempting to deploy from account', accounts[0]);

//   const result = await new web3.eth.Contract(JSON.parse(compiledFactory.interface))

//   //abi
//     .deploy({ data: compiledFactory.bytecode })
//     .send({ gas: '1000000', from: accounts[0] });

//   console.log('Contract deployed to', result.options.address);
// };
// deploy();


const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');
const compiledFactory = require('./build/CampaignFactory.json');

const provider = new HDWalletProvider(
    // process.env.NEXT_PUBLIC_META_MASK,
    // process.env.NEXT_PUBLIC_INFURA_API

     'work choose wasp gravity simple lobster report spring position people lonely diesel',
//   // remember to change this to your own phrase!
    'https://goerli.infura.io/v3/b3b0f06164064cc6b9c2811fd0ea2f60'
//   // remember to change this to your own endpoint!
);

const web3 = new Web3(provider);

const deploy = async () => {
    const accounts = await web3.eth.getAccounts();
    console.log('attempting to deploy from account: ', accounts[0]);

    const result = await new web3.eth.Contract(compiledFactory.abi)
    .deploy({data: compiledFactory.evm.bytecode.object})
    .send( {from:accounts[0], gas:'3000000'});

    console.log('Contract deployed to: ', result.options.address);
    provider.engine.stop();
};

deploy();

// Contract deployed to:  0xF56Ca5A918a8a3132537c3217f2D7eFEF5726521
    // "test": "echo \"Error: no test specified\" && exit 1",

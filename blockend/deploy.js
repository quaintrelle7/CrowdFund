
const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');
const compiledFactory = require('./build/CampaignFactory.json');

const provider = new HDWalletProvider(
    process.env.METAMASK_PHRASE,
    process.env.INFURA_API_KEY
// remember to change this to your own phrase!

     
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

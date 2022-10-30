const assert = require('assert');
const Web3 = require('web3')
const ganache = require('ganache-cli')

const web3 = new Web3(ganache.currentProvider());

const compiledFactory = require('../blockend/build/CampaignFactory.json');
const compiledCampaign= require('../blockend/build/Campaign.json');

let accounts;
let factory;
let campaignAddress;
let campaigns;

beforeEach(async()=>{
    accounts = await web3.eth.getAccounts();
    factory = await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
    .deploy({data: compiledFactory.bytecode})
    .send({from:accounts[0], gas:'1000000'});

    await factory.methods.createCampaign('100').send({
        from: accounts[0],
        gas: '1000000'
    });

    const addresses = await factory.methods.getDeployedContracts().call();
    campaignAddress = addresses[0];

    campaign = web3.eth.Contract(JSON.parse(compiledCampaign.interface), campaignAddress);

});
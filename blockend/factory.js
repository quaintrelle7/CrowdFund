import web3 from './web3'
import CampaignFactory from 'F:/Open-Source/My-Projects/CrowdFunding/blockend/build/CampaignFactory.json'

// console.log(CampaignFactory);
//  New keyword in JavaScript is used to create an instance of an object that has a constructor function. 

// JSON.parse to convert the simple string to Javascript Object
const instance = new web3.eth.Contract(
    JSON.parse(CampaignFactory.abi), 
    '0x089985fC9BDA282Ad5A99ef3C9ba75d5FFe9a5Fc'
);

export default instance;
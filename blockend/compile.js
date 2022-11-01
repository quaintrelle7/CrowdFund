const path = require('path');
const solc = require('solc');
const fs = require('fs-extra');

const buildPath = path.resolve(__dirname, 'build');
fs.removeSync(buildPath);

const campaignPath = path.resolve(__dirname, 'contracts', 'Campaign.sol');
const source = fs.readFileSync(campaignPath, 'UTF-8');

var input = {
    language: 'Solidity',
    sources: {
        'Campaign.sol' : {
            content: source
        }
    },
    settings: {
        outputSelection: {
            '*': {
                '*': [ '*' ]
            }
        }
    }
};

var output = JSON.parse(solc.compile(JSON.stringify(input)));
fs.ensureDirSync(buildPath);

for(contractName in output.contracts['Campaign.sol']){
    fs.outputJSONSync(
        path.resolve(buildPath, contractName + '.json'),
        output.contracts['Campaign.sol'][contractName]
    );
}

// const buildPath = path.resolve(__dirname, 'build');
// const output = JSON.parse(solc.compile(JSON.stringify(input)));

// if(output.errors) {
//     output.errors.forEach(err => {
//         console.log(err.formattedMessage);
//     });
// } else {
//     const contracts = output.contracts["Campaign.sol"];
//     for (let contractName in contracts) {
//         const contract = contracts[contractName];
//         fs.writeFileSync(path.resolve(buildPath, `${contractName}.json`), JSON.stringify(contract.abi, null, 2), 'utf8');
//     }
// }
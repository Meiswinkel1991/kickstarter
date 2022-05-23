const path = require('path');
const fs = require('fs-extra');


// Solidity Compiler
const solc = require('solc');

// Delete the complete build folder
const buildPath = path.resolve(__dirname,'build');
fs.removeSync(buildPath);

// Read the smart contracts in the contracts folder
const campaignPath = path.resolve(__dirname,'contracts','Campaign.sol');
const source = fs.readFileSync(campaignPath,'utf-8');


//compile the smart contracts
const input = {
    language: "Solidity",
    sources: {
        "Campaign.sol": {
        content: source,
        },
    },
    settings: {
        outputSelection: {
            "*": {
            "*": ["*"],
            },
        },
        },
    };

const output = JSON.parse(solc.compile(JSON.stringify(input)));

// Check if dir exists. If not, create the folder
fs.ensureDirSync(buildPath);

for (let contract in output.contracts["Campaign.sol"]) {
    fs.outputJSONSync(
        path.resolve(buildPath, contract + ".json"),
        output.contracts["Campaign.sol"][contract]
    );
} 
console.log("Compiling finished")
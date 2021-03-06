const dotenv = require("dotenv")
const HDWalletProvider = require("@truffle/hdwallet-provider");
const { interfaces } = require("mocha");
const Web3 = require("web3");

dotenv.config({path: '../.env'});


// Getting the compiled contracts
const compiledFactory = require('../ethereum/build/CampaignFactory.json');


// Rinkbey API Infura
const INFURA_RINKBEY_URL = process.env.INFURA_API


const provider = new HDWalletProvider(
    process.env.WALLET_SEED,
    INFURA_RINKBEY_URL
);

const web3 = new Web3(provider);
    
const deploy = async () => {
    const accounts = await web3.eth.getAccounts();
    
    console.log('Attempting to deploy from account', accounts[0]);
    
    const result = await new web3.eth.Contract(compiledFactory.abi)
        .deploy({ data: compiledFactory.evm.bytecode.object })
        .send({ gas: '3000000', from: accounts[0] });
    
    
    console.log('Contract deployed to', result.options.address);
    provider.engine.stop();
};
deploy();
import web3 from './web3';
import compiledFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(compiledFactory.abi,'0x6C853C4F4DC066cA1745290e0f72b2934F1d5595');

export default instance;
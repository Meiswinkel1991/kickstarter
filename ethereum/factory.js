import web3 from './web3';
import compiledFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(compiledFactory.abi,'0xa701363a618146ffDC9f41412E00144e635F6358');

export default instance;
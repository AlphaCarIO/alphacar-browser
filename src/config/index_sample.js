/* eslint-disable import/prefer-default-export */

export const network = {
  "1": {
    default: true,
    name: 'Main Ethereum Network',
    contract: '',
    rpc: '',
    apikey: '',
    baseURL: 'http://api.etherscan.io',
    getabi: 'api?module=contract&action=getabi&address='
  },
  "2": {
    name: 'Morden Test Network',
    contract: '',
    rpc: '',
    apikey: '',
    baseURL: 'http://api.etherscan.io',
    getabi: 'api?module=contract&action=getabi&address='
  },
  "3": {
    // default: true, // It will be used when no metaMask
    name: 'Ropsten Test Network',
    contract: '',
    rpc: '',
    apikey: '',
    baseURL: 'http://api-ropsten.etherscan.io',
    getabi: 'api?module=contract&action=getabi&address='
  },
  "4": {
    name: 'Rinkeby Test Network',
    contract: '',
    rpc: '',
    apikey: '',
    getabi: 'api?module=contract&action=getabi&address='
  },
  "42": {
    // default: true,
    name: 'Kovan Test Network',
    contract: '',
    rpc: '',
    apikey: '',
    baseURL: 'http://api.etherscan.io',
    getabi: 'api?module=contract&action=getabi&address='
  },
  "1111": {
    // default: true,
    name: 'Private Network',
    contract: '',
    rpc: '',
    apikey: '',
    baseURL: 'http://api.etherscan.io',
    getabi: 'api?module=contract&action=getabi&address='
  }
};

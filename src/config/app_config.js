let ipfs_server_addr = 'http://127.0.0.1:8080';

if (process.env.IPFS_URL != undefined) {
    ipfs_server_addr = process.env.IPFS_URL
}

let base_url = 'http://127.0.0.1:3000';

if (process.env.BASE_URL != undefined) {
    base_url = process.env.BASE_URL
}

const axios_conf = {
    baseURL: base_url,
    headers:{
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Type': 'application/json',
        "Access-Control-Allow-Headers": "Authorization,Origin, X-Requested-With, Content-Type, Accept"
    },
    timeout: 20000,
};

module.exports = {
    ipfs_server_addr,
    axios_conf,
}

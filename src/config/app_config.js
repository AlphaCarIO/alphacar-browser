let ipfs_server_addr = process.env.IPFS_URL;

let axios_conf = {
    baseURL: process.env.BASE_URL,
    headers:{
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Type': 'application/json',
        "Access-Control-Allow-Headers": "Authorization,Origin, X-Requested-With, Content-Type, Accept"
    },
    timeout: 10000,
};

module.exports = {
    ipfs_server_addr,
    axios_conf,
}

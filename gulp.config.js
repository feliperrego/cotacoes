function gulpConfig() {
    var server 		= 'server/';
    var client 		= 'client/';
    var	nodeApp 	= server + 'index.js';

    return {
        server: server,
        client: client,
        nodeApp: nodeApp,
        buildFolder: './dist/'
    };
}

module.exports = gulpConfig;
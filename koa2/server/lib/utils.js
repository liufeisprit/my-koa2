const os=require('os')
/*
获取本机IP
*/
function getIPAdress() {
    var localIp
    if(localIp) return localIp;
    let localIPAddress = "";
    let interfaces = os.networkInterfaces();
    for (let devName in interfaces) {
        let iface = interfaces[devName];
        for (let i = 0; i < iface.length; i++) {
            let alias = iface[i];
            if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
                localIPAddress = alias.address;
            }
        }
    }
    localIp = localIPAddress;
    return localIPAddress;
    
}

/**
* 获取用户ip
*/
function getClientIp(req) {
	try{
		return req.headers['x-wq-realip'] ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress;
	}catch(e){
		logger.info("getClientIp error");
		return "";
	}
}

module.exports={
    getIPAdress,
    getClientIp
}
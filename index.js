const crypto = require('crypto');

module.exports = {
    generate(method, pathInfo, params, secret) {
        // 1、字典序排序
        // 2、排序后的参数格式化为 query 格式，形如：key1=value1&key2=value2
        // 3、拼接成 `${method}\n${pathInfo}\n${query}\n${secret}`
        // 4、计算拼接后字符串的 MD5 值
        const keys = Object.keys(params).sort();
        const segments = [];
        for (let key of keys) {
            segments.push(params[key]);
        }
        const str = segments.join('&');
        method = method.toUpperCase();

        return crypto
            .createHash('md5')
            .update(`${method}\n${pathInfo}\n${str}\n${secret}`)
            .digest('hex');
    },
};

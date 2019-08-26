const crypto = require('crypto');

module.exports = {
    generate(method, pathInfo, params, secret) {
        // 1、params 参数格式化为字符串：
        //     a. 若参数是一个字典对象，则进行字典序排序，排序后的参数格式化为 query 格式，形如：key1=value1&key2=value2
        //     b. 若参数是一个字符串，则无需格式化
        // 2、拼接成 `${method}\n${pathInfo}\n${query}\n${secret}`
        // 3、计算拼接后字符串的 MD5 值
        if (method) {
            method = method.toUpperCase();
        } else {
            method = '';
        }
        if (!pathInfo) {
            pathInfo = '';
        }
        if (!params) {
            params = {};
        }
        if (!secret) {
            secret = '';
        }
        let str;
        if (typeof params === 'string') {
            str = params;
        } else {
            const keys = Object.keys(params).sort();
            const segments = [];
            for (let key of keys) {
                segments.push(params[key]);
            }
            str = segments.join('&');
        }

        return crypto
            .createHash('md5')
            .update(`${method}\n${pathInfo}\n${str}\n${secret}`)
            .digest('hex');
    },
};

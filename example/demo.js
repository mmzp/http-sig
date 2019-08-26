const httpSig = require('../index');

const params = { a: 11, c: 22, b: 33, '10': 10, '2': 2, user: { id: 1 } };
const r = httpSig.generate('get', '/user/info', params, 'SECRET');

console.log(r);

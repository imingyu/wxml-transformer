var wt = require('../dist/index.js');
var obj = wt.toObject('<view id="box">{{123}}</view>');

console.log(obj);
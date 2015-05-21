var svgPathify = require('../lib/index.js');
var fs = require('fs');
var svgstr = fs.readFileSync('./test/test.svg').toString();


var a = svgPathify(svgstr);


fs.writeFileSync('./test/result.svg',a);

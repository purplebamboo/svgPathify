# svgPathify

a node lib to turn svg shape elements into path svg elements

#install

```
npm install svgPathify

```

# usage

```
var svgPathify = require(svgPathify);

var result = svgPathify('<circle cx="500" cy="500" r="20" fill="red"/>');

//<path d="M500,500,m-20,0,a20,20,0,1,0,40,0,a20,20,0,1,0,-40,0,Z" fill="red"/>

```

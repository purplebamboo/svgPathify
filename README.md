# svgPathify

a node lib to turn svg shape elements into path svg elements

#install

```js
npm install svg_pathify
```

# usage

```js
var svgPathify = require('svg_pathify');

var result = svgPathify('<circle cx="500" cy="500" r="20" fill="red"/>');

/*
<path d="M500,500,m-20,0,a20,20,0,1,0,40,0,a20,20,0,1,0,-40,0,Z" fill="red"/>
*/


result = svgPathify('<svg xmlns="http://www.w3.org/2000/svg" width="1000" height="1000" viewBox="10 10 1000 1000"><circle cx="500" cy="500" r="20" fill="red"/><circle cx="500" cy="500" r="20" fill="red"/></svg>');

/*
<svg xmlns="http://www.w3.org/2000/svg" width="1000" height="1000" viewBox="10 10 1000 1000">
  <path d="M500,500,m-20,0,a20,20,0,1,0,40,0,a20,20,0,1,0,-40,0,Z" fill="red"/>
  <path d="M500,500,m-20,0,a20,20,0,1,0,40,0,a20,20,0,1,0,-40,0,Z" fill="red"/>
</svg>
*/
```

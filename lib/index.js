var DOMParser = require('xmldom').DOMParser;
var XMLSerializer = require('xmldom').XMLSerializer;
var _ = require('lodash');


var shape = {
  _translatePath:function(convertObj,attributes){
    var data = {}
    _.each(attributes,function(attribute){
      data[attribute.name] = attribute.value;
    })

    var fn = _.isFunction(convertObj.template) ? convertObj.template :
      function(data) {
        return _.template(convertObj.template)(data);
      }

    return fn(data);
  },
  generatePathNode:function(document,node){
    var convertObj,attributes,path,tagName;

    tagName = String(node.tagName).toLowerCase();
    //polyline与polygon是同一个东西
    if (tagName === 'polyline') tagName = 'polygon';

    convertObj = shape[tagName];
    if (!convertObj) return;

    path = shape._translatePath(convertObj,node.attributes);
    if (!path) return;

    newPathNode = document.createElement('path');
    //赋值d属性
    newPathNode.setAttribute('d',path);
    //保留其他属性
    _.each(node.attributes,function(attribute){
      if (!_.includes(convertObj.attrs,attribute.name)) {
        newPathNode.setAttribute(attribute.name,attribute.value);
      }
    })

    return newPathNode;

  },
  rect:{
    attrs:['x','y','width','height'],
    template:"M<%=x%>,<%=y%>l<%=width%>,0l0,<%=height%>l<%=-width%>,0l0,<%=-height%>Z"
  },
  circle:{
    attrs:['cx','cy','r'],
    template:[
      "M<%=cx%>,<%=cy%>",
      "m<%=-r%>,0",
      "a<%=r%>,<%=r%>,0,1,0,<%=r * 2%>,0",
      "a<%=r%>,<%=r%>,0,1,0,-<%=r * 2%>,0",
      "Z"
    ].join('')
  },
  line:{
    attrs:['x1','y1','x2','y2'],
    template:[
      "M<%=x1%>,<%=y1%>",
      "L<%=x2%>,<%=y2%>",
      "L<%=x1%>,<%=y1%>",
      "Z"
    ].join('')
  },
  ellipse:{
    attrs:['cx', 'cy', 'rx', 'ry'],
    template:[
      "M<%=cx-rx%>,<%=cy%>",
      "a<%=rx%>,<%=ry%>,0,1,0,<%=rx * 2%>,0",
      "a<%=rx%>,<%=ry%>,0,1,0,-<%=rx * 2%>,0",
      "Z"
    ].join('')
  },
  polygon:{
    attrs:['points'],
    template:function(data){
      var points = data.points.split(' ');
      var p = '';
      _.each(points,function(point,index){
        if (index === 0) {
          p += 'M' + point
        }else{
          p += 'L' + point
        }
      })
      p += 'Z';

      return p;
    }
  }
}

var transNode = function(document,node){
  var convertObj,newPathNode;

  //基本的图形都是没有子结点的
  if (!node.hasChildNodes() && node.nodeName !== 'path') {

    newPathNode = shape.generatePathNode(document,node);
    newPathNode && node.parentNode.replaceChild(newPathNode,node);
    return;
  }

  _.each(node.childNodes,function(child){
    transNode(document,child);
  })

}

module.exports = function(svgString) {
  if (!svgString) return;

  var doc = new DOMParser().parseFromString(svgString,'application/xml');
  transNode(doc,doc);

  return new XMLSerializer().serializeToString(doc);

}
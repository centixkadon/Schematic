/* 预期目标1
// 将以下代码复制到 js/test/test.js 中，应在 #test 画出一个电源，一个地。
$('#test').appendComponent('vcc');
$('#test').appendComponent('gnd');

*/
//可在绘画前设置缩放系数。缩放系数为1.0时，电阻、电容等元器件尺寸尽量为40*40 (-20 ~ 20)

let schComponents = {
  'vcc': [
    { mark: 'line', attr: { x1: -10, y1: -10, x2: 10, y2: -10, }, },
    { mark: 'line', attr: { x1: 0, y1: -10, x2: 0, y2: 0, }, },
  ],
  'gnd': [
    { mark: 'line', attr: { x1: 0, y1: 0, x2: 0, y2: 10, }, },
    { mark: 'line', attr: { x1: -15, y1: 10, x2: 15, y2: 10, }, },
    { mark: 'line', attr: { x1: -10, y1: 15, x2: 10, y2: 15, }, },
    { mark: 'line', attr: { x1: -5, y1: 20, x2: 5, y2: 20, }, },
  ],
};

function createObj(objAttr) {
  let obj = $s(objAttr.mark);
  for (let attrId in objAttr.attr) {
    obj.attr(attrId, objAttr.attr[attrId]);
  }
  obj.attr('stroke', '#A00000').attr('stroke-width', '2');
  return obj;
}

jQuery.prototype.appendComponent = function (componentName) {
  svgGroup = $s('g');
  for (let i = 0; i < schComponents[componentName].length; ++i) {
    svgGroup.append(createObj(schComponents[componentName][i]));
  }
  return this.append(svgGroup);
}

function setComponentsScale(s) {
  $('#svgAll').attr('transform', 'scale(' + s + ')');
}
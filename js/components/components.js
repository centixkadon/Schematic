let schComponents = new  Object();

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

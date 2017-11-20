
jQuery.prototype.appendComponent = function (componentName) {
  let createObj = function (objAttr) {
    let obj = $s(objAttr.mark);
    for (let attrId in objAttr.attr) {
      obj.attr(attrId, objAttr.attr[attrId]);
    }
    obj.attr('stroke', '#A00000').attr('stroke-width', '2');
    return obj;
  }

  svgGroup = $s('g');
  for (let i = 0; i < schComponents[componentName].length; ++i) {
    svgGroup.append(createObj(schComponents[componentName][i]));
  }
  return this.append(svgGroup);
}

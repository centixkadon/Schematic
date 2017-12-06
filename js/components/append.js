
$.fn.extend({
  appendComponent: function (componentName) {
    let createObj = function (objAttr) {
      let obj = $s(objAttr.mark);
      for (let attrId in objAttr.attr) {
        obj.attr(attrId, objAttr.attr[attrId]);
      }
      return obj;
    }

    for (let i = 0; i < schComponents[componentName].length; ++i) {
      this.append(createObj(schComponents[componentName][i]));
    }
    return this;
  },
});

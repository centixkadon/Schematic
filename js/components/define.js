/* 预期目标
*/

function defineComponent(componentName) {
  component = [];
  schComponents[componentName] = component;
  return component;
}

Array.prototype.has = function (name) {
  switch (name) {
    case 'line':
      for (let i = 1; i < arguments.length; ++i) {
        if (!((arguments[i] instanceof Array) && (arguments[i].length === 4))) {
          throw ".has('line', [x1, y1, x2, y2]) 使用出错，例子参照 https://github.com/centixkadon/Schematic/blob/master/js/README.md";
        }
        this.push({
          mark: name,
          attr: { x1: arguments[i][0], y1: arguments[i][1], x2: arguments[i][2], y2: arguments[i][3], },
        });
      }
      break;
    /*
    case "line":
      for (i = 0; i < count; i++) {
        var temp = new Object();
        temp.mark = name;
        temp.attr = new Object();
        temp.attr.x1 = arguments[4 * i + 1];
        temp.attr.y1 = arguments[4 * i + 2];
        temp.attr.x2 = arguments[4 * i + 3];
        temp.attr.y2 = arguments[4 * i + 4];
        this.push(temp);
      }
      break;
    */
    case "polyline":
      var temp = new Object();
      temp.mark = name;
      temp.attr = new Object();
      temp.attr.points = arguments[1];
      temp.attr.style = arguments[2];
      this.push(temp);
      break;
    case "circle":
      var temp = new Object();
      temp.mark = name;
      temp.attr = new Object();
      temp.attr.cx = arguments[1];
      temp.attr.cy = arguments[2];
      temp.attr.r = arguments[3];
      this.push(temp);
      break;
    case "polygon":
      var temp = new Object();
      temp.mark = name;
      temp.attr = new Object();
      temp.attr.points = arguments[1];
      temp.attr.style = arguments[2];
      this.push(temp);
      break;
    case "rect":
      var temp = new Object();
      temp.mark = name;
      temp.attr = new Object();
      temp.attr.width = arguments[1];
      temp.attr.height = arguments[2];
      temp.attr.style = arguments[3];
      this.push(temp);
      break;
      case "points":
      for (let i = 1; i < arguments.length; ++i) {
        this.push({
          mark: "circle",
          attr: { cx: arguments[i][0], cy: arguments[i][1], r: 1,},//点的默认半径为1
        });
      }
      break;
  }
  return this;
}
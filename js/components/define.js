/* 预期目标
*/

function defineComponent(componentName) {
  component = [];
  schComponents[componentName] = component;
  return component;
}

Array.prototype.has = function (componentName) {
  switch (componentName) {
    case 'line':
      for (let i = 1; i < arguments.length; ++i) {
        if (!((arguments[i] instanceof Array) && (arguments[i].length === 4))) {
          throw ".has('line', [x1, y1, x2, y2], ...) 使用出错，例子参照 https://github.com/centixkadon/Schematic/blob/master/js/README.md";
        }
        this.push({
          mark: 'line',
          attr: { x1: arguments[i][0], y1: arguments[i][1], x2: arguments[i][2], y2: arguments[i][3], },
        });
      }
      break;
    case 'point':
      for (let i = 1; i < arguments.length; ++i) {
        if (!((arguments[i] instanceof Array) && (arguments[i].length === 2))) {
          throw ".has('point', [x, y], ...) 使用出错，例子参照 https://github.com/centixkadon/Schematic/blob/master/js/README.md";
        }
        this.push({
          mark: 'circle',
          attr: { cx: arguments[i][0], cy: arguments[i][1], r: 1, },//点的默认半径为1
        });
      }
      break;
    case 'circle':
      for (let i = 1; i < arguments.length; ++i) {
        if (!((arguments[i] instanceof Array) && (arguments[i].length === 3))) {
          throw ".has('circle', [cx, cy, r], ...) 使用出错，例子参照 https://github.com/centixkadon/Schematic/blob/master/js/README.md";
        }
        let [cx, cy, r] = arguments[i];
        let rx, ry;
        if (r instanceof Array) {
          [rx, ry] = r;
        } else {
          rx = r;
        }
        if (ry === undefined) ry = rx;
        this.push({
          mark: 'ellipse',
          attr: { cx: cx, cy: cy, rx: rx, ry: ry, },
        });
      }
      break;
    case 'rect':
      for (let i = 1; i < arguments.length; ++i) {
        if (!((arguments[i] instanceof Array) && (arguments[i].length === 4))) {
          throw ".has('rect', [x, y, width, height], ...) 使用出错，例子参照 https://github.com/centixkadon/Schematic/blob/master/js/README.md";
        }
        this.push({
          mark: 'rect',
          attr: { x: arguments[i][0], y: arguments[i][1], width: arguments[i][2], height: arguments[i][3], },
        });
      }
      break;
    case 'arc':
      for (let i = 1; i < arguments.length; ++i) {
        if (!((arguments[i] instanceof Array) && (arguments[i].length % 3 === 2))) {
          throw ".has('arc', [x1, y1, [isClockwise1, r1, isLargeArc1], ..., xn, yn ], ...) 使用出错，例子参照 https://github.com/centixkadon/Schematic/blob/master/js/README.md";
        }
        let [x, y] = arguments[i].slice(0, 2);
        let d = 'M ' + x + ' ' + y;
        for (let j = 2; j < arguments[i].length; j += 3) {
          let [[isClockwise, r, isLargeArc], x, y] = arguments[i].slice(j, j + 3);
          if (r === undefined) r = 1;
          if (isClockwise === undefined) isClockwise = 1;
          if (isLargeArc === undefined) isLargeArc = 0;
          let rx, ry, t;
          if (r instanceof Array)
            [rx, ry, t] = r;
          else
            rx = r;
          if (ry === undefined) ry = rx;
          if (t === undefined) t = 0;
          d += ' A ' + rx + ' ' + ry + ' ' + t + ' ' + isLargeArc + ' ' + isClockwise + ' ' + x + ' ' + y;
        }
        this.push({
          mark: 'path',
          attr: { d: d, },
        });
      }
      break;
    case 'polyline':
    case 'polygon':
      for (let i = 1; i < arguments.length; ++i) {
        if (!((arguments[i] instanceof Array) && (arguments[i].length % 2 === 0))) {
          throw ".has('" + componentName + "', [x1, y1, x2, y2, ..., xn, yn], ...) 使用出错，例子参照 https://github.com/centixkadon/Schematic/blob/master/js/README.md";
        }
        let points = '';
        for (let j = 0; j < arguments[i].length; j += 2) {
          points += arguments[i][j] + ' ' + arguments[i][j + 1] + ' ';
        }
        this.push({
          mark: componentName,
          attr: { points: points, },
        });
      }
      break;
    default:
      throw ".has(componentName, ...) 使用出错，例子参照 https://github.com/centixkadon/Schematic/blob/master/js/README.md"
      break;
  }
  return this;
}

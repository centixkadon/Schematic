
/* schComponents 结构体示例如下，完善该结构体的各元器件定义已迁移到 js/main.js
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
*/

let schComponents = {};



/*使用如下方法对schComponents进行添加
  defineComponent('vcc').has('line', [-10, -10, 10, -10]).has('line', [0, -10, 0, 0]);
  defineComponent('gnd').has('line', [0, 0, 0, 10], [-15, 10, 15, 10], [-10, 15, 10, 15], [-5, 20, 5, 20]);
*/
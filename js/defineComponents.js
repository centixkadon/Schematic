
// schComponents 定义
defineComponent('vcc').has('line', [-10, -10, 10, -10], [0, -10, 0, 0]).has('point', [0, 0]);
defineComponent('gnd').has('line', [0, 0, 0, 10], [-15, 10, 15, 10], [-10, 15, 10, 15], [-5, 20, 5, 20]).has('point', [0, 0]);

// 以下测试用
defineComponent('电压源').has('line', [0, -20, 0, 20]).has('circle', [0, 0, 13]).has('point', [0, -20], [0, 20]);
defineComponent('电流源').has('line', [0, -13, 0, -20], [-13, 0, 13, 0], [0, 13, 0, 20]).has('circle', [0, 0, 13]).has('point', [0, -20], [0, 20]);
defineComponent('测试用大杂烩元器件')
  .has('line', [20, -20, 20, 20], [-20, -20, -20, 20])
  .has('circle', [0, -13, 3], [0, 13, 3])
  .has('rect', [10, 10, 5, 10], [-15, -20, 5, 10])
  .has('polyline', [15, -20, 10, -10, 15, -10], [-15, 20, -10, 10, -15, 10])
  .has('polygon', [-2, 0, -6, 6, -10, 3, -14, 6, -17, -6, -12, -3, -7, -6], [2, 0, 6, -6, 10, -3, 14, -6, 17, 6, 12, 3, 7, 6], )
  .has('point', [0, -20], [0, 20], [-20, -20], [-20, 20], [20, -20], [20, 20]);
//add by liming 0.0
defineComponent('resistance').has('rect', [-10, -6, 20, 12]).has('line', [-20, 0, -10, 0], [10, 0, 20, 0]).has('point', [-20, 0], [20, 0]);
defineComponent('capacitance').has('line', [-4, -10, -4, 10], [4, -10, 4, 10], [-14, 0, -4, 0], [4, 0, 14, 0]).has('point', [-14, 0], [14, 0]);
defineComponent('hongZhong').has('rect', [-20, -35, 40, 70]).has('polygon', [-13, 0, 13, 0, 15, -18, -15, -18]).has('line', [0,-30, 0,33]);
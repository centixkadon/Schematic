
// schComponents 定义
defineComponent('vcc').has('line', [-10, -10, 10, -10], [0, -10, 0, 0]).has('point', [0, 0]);
defineComponent('gnd').has('line', [0, 0, 0, 10], [-15, 10, 15, 10], [-10, 15, 10, 15], [-5, 20, 5, 20]).has('point', [0, 0]);
defineComponent('resistance').has('line', [-10, 5, 10, 5], [-10, -5, 10, -5], [-10, -5, -10, 5], [10, -5, 10, 5], [10, 0, 20, 0], [-10, 0, -20, 0]).has('point', [20, 0], [-20, 0]);
defineComponent('potentiometer').has('line', [-10, 5, 10, 5], [-10, -5, 10, -5], [-10, -5, -10, 5], [10, -5, 10, 5], [10, 0, 20, 0], [-10, 0, -20, 0], [0, -5, 0, -13], [0, -13, 20, -13]).has('point', [20, 0], [-20, 0], [18, -13]).has('polyline', [4, -9, 0, -5, -4, -9]);
defineComponent('capacity').has('line', [-4, -13, -4, 13], [4, 13, 4, -13], [4, 0, 20, 0], [-20, 0, -4, 0]).has('point', [20, 0], [-20, 0]);
defineComponent('inductor').has('polyline', [-10, 0, -7.5, -5, -5, 0, -2.5, -5, 0, 0, 2.5, -5, 5, 0, 7.5, -5, 10, 0]).has('line', [10, 0, 20, 0], [-10, 0, -20, 0], [-10, -10, 10, -10]).has('point', [20, 0], [-20, 0]);
defineComponent('diode').has('polygon', [-10, 8, -10, -8, 10, 0]).has('line', [10, 10, 10, -10], [-20, 0, 20, 0]).has('point', [-20, 0], [20, 0]);
defineComponent('triode1').has('line', [0, -10, 0, 10], [0, 0, 10, 10], [0, 0, 10, -10], [10, 10, 10, 20], [10, -10, 10, -20], [-10, 0, 0, 0]).has('polyline', [2, 8, 8, 8, 9, 3]).has('point', [-10, 0], [10, 20], [10, -20]);
defineComponent('triode2').has('line', [0, -10, 0, 10], [0, 0, 10, 10], [0, 0, 10, -10], [10, 10, 10, 20], [10, -10, 10, -20], [-10, 0, 0, 0]).has('polyline', [5, 10, 2, 2, 10, 5]).has('point', [-10, 0], [10, 20], [10, -20]);
defineComponent('MOS1').has('line', [0, -10, 0, 10], [0, 8, 10, 8], [0, -8, 10, -8], [10, 8, 10, 20], [10, -8, 10, -20], [-15, 0, 0, 0]).has('polyline', [-4, 4, 0, 0, -4, -4]).has('point', [-15, 0], [10, 20], [10, -20]);
defineComponent('MOS2').has('line', [0, -10, 0, 10], [0, 8, 10, 8], [0, -8, 10, -8], [10, 8, 10, 20], [10, -8, 10, -20], [-15, 0, 0, 0]).has('polyline', [-3, 4, -7, 0, -3, -4]).has('point', [-15, 0], [10, 20], [10, -20]);
defineComponent('MOS3').has('line', [-15, 0, 0, 0], [0, 0, 0, 7], [5, 3, 5, -3], [5, 6, 5, 12], [5, -6, 5, -12], [5, -9, 15, -9], [15, -9, 15, -20], [5, 9, 15, 9], [15, 9, 15, 20], [5, 0, 15, 0], [15, 0, 15, 9]).has('polyline', [9, 4, 5, 0, 9, -4]).has('point', [15, 20], [15, -20], [-15, 0]);
defineComponent('MOS4').has('line', [-15, 0, 0, 0], [0, 0, 0, 7], [5, 3, 5, -3], [5, 6, 5, 12], [5, -6, 5, -12], [5, -9, 15, -9], [15, -9, 15, -20], [5, 9, 15, 9], [15, 9, 15, 20], [5, 0, 15, 0], [15, 0, 15, 9]).has('polyline', [11, 4, 15, 0, 11, -4]).has('point', [15, 20], [15, -20], [-15, 0]);

defineComponent('OPAMP').has('line',[-20,10,-10,10], [-20,-10,-10,-10], [-10,20,-10,-20], [-10,20,10,0], [-10,-20,10,0], [0,10,0,20], [0,-10,0,-20], [10,0,20,0], [-9,10,-5,10], [-7,-13,-7,-7], [-9,-10,-5,-10]).has('point',[-20,10],[-20,-10],[0,20],[0,-20],[20,0]);
defineComponent('mul').has('circle', [0, 0, 14]).has('line',[9.9, 9.9, -9.9, -9.9], [9.9, -9.9, -9.9, 9.9],[-20, 0 ,-14, 0],[20, 0, 14, 0]).has('point',[-20,0],[20,0]);
defineComponent('plus').has('circle', [0, 0, 14]).has('line',[0, 14, 0, -14], [14, 0, -14, 0],[-20, 0 ,-14, 0],[20, 0, 14, 0]).has('point',[-20,0],[20,0]);

//qmy
defineComponent('反向放大器').has('line', [-20, 0, -10, 0], [-10, 20, -10, -20], [-10, 20, 10, 0], [-10, -20, 10, 0], [10, 0, 20, 0]).has('point', [-10, 0], [10, 0]);

defineComponent('Voltage regulator diode').has('polygon', [-10, 8, -10, -8, 10, 0]).has('line', [10, 10, 10, -10], [-20, 0, 20, 0], [10, 10, 5, 10]).has('point', [-20, 0], [20, 0]);
defineComponent('Voltmeter').has('line', [13, 0, 20, 0], [-13, 0, -20, 0]).has('polyline', [-5, -7, 0, 7, 5, -7]).has('circle', [0, 0, 13]).has('point', [-20, 0], [20, 0]);
defineComponent('Ammeter').has('line', [13, 0, 20, 0], [-13, 0, -20, 0], [-3, 0, 3, 0]).has('polyline', [-6, 7, 0, -7, 6, 7]).has('circle', [0, 0, 13]).has('point', [-20, 0], [20, 0]);
defineComponent('light-emitting diode').has('polygon', [-10, 8, -10, -8, 10, 0]).has('line', [10, 10, 10, -10], [-20, 0, 20, 0], [-2, -10, 6, -18], [5, -10, 13, -18]).has('polyline', [6, -14, 6, -18, 2, -18], [13, -14, 13, -18, 9, -18]).has('point', [-20, 0], [20, 0]);
defineComponent('Varactor diode').has('polygon', [-10, 8, -10, -8, 10, 0]).has('line', [10, 10, 10, -10], [14, 10, 14, -10], [-20, 0, 10, 0], [14, 0, 20, 0]).has('point', [-20, 0], [20, 0]);

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
defineComponent('hongZhong').has('rect', [-18, -20, 36, 40]).has('polygon', [-11, 0, 11, 0, 13, -10, -13, -10]).has('line', [0, -18, 0, 18]);
defineComponent('beiFeng').has('rect', [-18, -20, 36, 40]).has('line', [-4, -10, -4, 10], [4, -10, 4, 10], [-10, 0, -4, 0], [4, 0, 10, 0], [-18, 10, -4, 10], [4, 10, 18, 10]);
defineComponent('huaji').has('circle', [0, 0, 20]).has('line', [-15, -6, -10, -12], [-10, -12, -5, -6], [5, -6, 10, -12], [10, -12, 15, -6], [-8, 6, 0, 12], [0, 12, 8, 6]).has('point', [-15, -6], [5, -6]);
defineComponent('weixiao').has('circle', [0, 0, 20],[-10,-8,3],[10,-8,3]).has('line', [-8, 6, 0, 12], [0, 12, 8, 6]).has('point', [-10, -8], [10, -8]);
defineComponent('Benz').has('circle', [0, 0, 20]).has('line', [0, 0, 0, -20], [0, 0, 20 * Math.sin(Math.PI / 3), 20 * Math.cos(Math.PI / 3)], [0, 0, 20 * Math.sin(-Math.PI / 3), 20 * Math.cos(-Math.PI / 3)]);
//add by Seki =.=
defineComponent('Facai').has('line', [-16, -16, -2, -16], [-2, -16, -18, -4], [-16, -12, -10, -8], [2, -16, 17, -5], [5, -11, 10, -18], [9, -9, 14, -16]).has('polyline', [-16, 0, -2, 0, -2, 5, -16, 5, -16, 10, -2, 10, -2, 18, -16, 18]).has('polyline', [2, 5, 5, 5, 5, 0, 12, 0, 12, 5, 16, 5]).has('polyline', [16, 18, 2, 10, 15, 10, 4, 18]).has('line', [16, 18, 18, 18]).has('rect', [-20, -20, 40, 40]);
defineComponent('Taichi').has('circle', [0, 0, 20], [0, 10, 3], [0, -10, 3]).has('arc', [0, -20, 10, 0, 1, 0, 0, 10, 0, 0, 0, 20]);

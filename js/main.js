
/***** 元器件库结构体 *****/
/* 说明
主要任务：
1.设计一个结构体
2.提供调用接口
2.1.添加jQuery对象成员函数。画出指定种类的元器件
2.2.添加全局函数。在结构体中添加一种元器件
3.可在绘画前设置缩放值。缩放系数为1.0时，电阻、电容等元器件尺寸为100px*100px

其他人并不关心如何实现，所以不能体现在接口调用方式上。

*/
/* 预期目标1
// 将以下代码复制到 js/test/test.js 中，应画出一个电源，一个地。
$('#svgTestAppendComponent1').appendComponent('vcc');
$('#svgTestAppendComponent2').appendComponent('gnd');

*/

/***** 电路原理图结构体 *****/
/* 预期目标1
// 将以下代码复制到 js/test/test.js 中，应在 #sch 左上角画出一个电源，电源下方画出一个地。
drawComponent('vcc', 0, 0);
drawComponent('gnd', 0, 200);

*/

/***** 以上均为注释，从这里开始运行 *****/
// 保持电路原理图大小合适
let windowResize = function () {
  let w = $('h1').innerWidth();
  $('#svg').attr('width', w);
  $('#svg').attr('height', w * 400 / 1000);
}
$(window).resize(ev => windowResize());
windowResize();

setComponentsScale(1);

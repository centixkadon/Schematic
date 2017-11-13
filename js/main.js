
/***** 具体任务移至 js/README.md，可到Github上查看 *****/

// 保持电路原理图大小合适
let windowResize = function () {
  let w = $('h1').innerWidth();
  $('#svg').attr('width', w);
  $('#svg').attr('height', w * 400 / 1000);
}
$(window).resize(ev => windowResize());
windowResize();

setComponentsScale(1);

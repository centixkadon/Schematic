
/***** 具体任务移至 js/README.md，可到Github上查看 *****/

// 保持电路原理图大小合适
let windowResize = function () {
  setWindowScale($('h1').innerWidth() / schConfig.svgInnerSize.width);
}

$(window).resize(ev => windowResize());

$(document).ready(ev => {
  windowResize();

  setComponentsScale(schConfig.componentsScale);

  $('#svg').mousemove(function (ev) {
    let [x, y] = getSvgPos(ev);
    if ((x < 100) || (y < 0)) return;
    $('#svgSch').children('text').html('#svgSch mousePos: (' + (x - 100) + ', ' + (y) + ')');
  });

});

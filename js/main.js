
/***** 具体任务移至 js/README.md，可到Github上查看 *****/

// 保持电路原理图大小合适
let windowResize = function () {
  setWindowScale($('h1').innerWidth() / schConfig.svg.innerSize.width);
}

$(window).resize(ev => windowResize());

$(document).ready(ev => {
  windowResize();

  $('body')
    .bind('contextmenu selectstart dragstart beforecopy', false)
    .bind('copy select', ev => document.selection.empty());

  setComponentsScale(schConfig.componentsScale);

  schEvents();


  $('#svg').mousemove(function (ev) {
    let [x, y] = getSchPos(ev);
    if ((x < 0) || (y < 0)) return;
    $('#svgSch').children('text').html('#svgSch mousePos: (' + x + ', ' + y + ')');
  });

});

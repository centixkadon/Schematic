
let componentsScale = 1, windowScale = 1, allScale = 1;

$('#svgAll').attr('transform', 'scale(' + allScale + ')');

function setComponentsScale(s) {
  componentsScale = s;

  allScale = windowScale * componentsScale;
  $('#svgAll').attr('transform', 'scale(' + allScale + ')');
}

function setWindowScale(s) {
  windowScale = s;
  $('#svg').attr('width', windowScale * schConfig.svgInnerSize.width);
  $('#svg').attr('height', windowScale * schConfig.svgInnerSize.height);

  allScale = windowScale * componentsScale;
  $('#svgAll').attr('transform', 'scale(' + allScale + ')');

  $('#svgButton').children('text').attr('y', schConfig.componentsScale * schConfig.svgInnerSize.height - 10);
  $('#svgSch').children('text').attr('y', schConfig.componentsScale * schConfig.svgInnerSize.height - 10);
}

function getSvgPos(ev) {
  let offset = $('#svg').offset();
  return [parseInt((ev.pageX - offset.left) / allScale), parseInt((ev.pageY - offset.top) / allScale)];
}

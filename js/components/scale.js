
let componentsScale = 1, windowScale = 1, allScale = 1;

$('#svgAll').attr('transform', 'scale(' + allScale + ')');

function setComponentsScale(s) {
  componentsScale = s;
  allScale = windowScale * componentsScale;
  $('#svgAll').attr('transform', 'scale(' + allScale + ')');
}

function setWindowScale(s) {
  windowScale = s;
  $('#svg').attr('width', windowScale * 1100);
  $('#svg').attr('height', windowScale * 400);
  allScale = windowScale * componentsScale;
  $('#svgAll').attr('transform', 'scale(' + allScale + ')');
}

function getSvgPos(ev) {
  let offset = $('#svg').offset();
  return [parseInt((ev.pageX - offset.left) / allScale), parseInt((ev.pageY - offset.top) / allScale)];
}

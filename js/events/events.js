comp = '';
state = 0;
compModel;
function initEvents() {
  //init button for vcc
  let vccButton = drawButton('vcc');
  vccButton.mousedown(function (ev) {
    comp = 'vcc';
    state = 1;
    compModel = drawComponent(comp, 0, 0);
  });

  //init button for gnd
  let gndButton = drawButton('gnd');
  gndButton.mousedown(function () {
    drawComponent('gnd', 50, 200);
  });

  $('#svg').mousemove(function)
  while (state == 1) {

    [x, y] = positionBody(ev);
    compModel.moveTo(x, y);
  }

  $('#svg').mouseup(function (ev) {
    if (state == 1) {
      [x, y] = positionBody(ev);
      drawComponent(comp, x, y);
      state = 0;
      comp = '';
    }
  });

}


//get coordinates of mouse
function positionBody(event) {
  let x = getSvgPos(ev.offsetX), y = getSvgPos(ev.offsetY);
  return [x-100, y];
}
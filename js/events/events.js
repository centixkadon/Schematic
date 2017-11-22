comp = '';
state = 0;
compModel;
function initEvents() {
  //init button for vcc
  let vccButton = drawButton('vcc');
  vccButton.mousedown(function (ev) {
    comp = 'vcc';
    state = 1;
    compModel = drawComponent(comp, 10, 10);
    addEvents(compModel, ev);
  });

  //init button for gnd
  let gndButton = drawButton('gnd');
  gndButton.mousedown(function () {
    comp = 'gnd';
    compModel = drawComponent(comp, 10, 10);
    state = 1;
  });


  //components move with mouse
  $('#svg').mousemove(function (ev) {
    if (state == 1) {
      [x, y] = getMousePosition(ev);
      //compModel.moveTo(x, y);
      compModel.moveTo(x, y);
    }
    else if (state == 2) {
      [x, y] = getMousePosition(ev);
      //compModel.moveBy(x, y);
      compModel.moveTo(x, y);
    }
  });


  //components embedded
  $('#svg').mouseup(function (ev) {
    [x, y] = getMousePosition(ev);
    if ((state == 1 || state == 2) && x>0) {
      state = 0;
      comp = '';
    }
  });
  $('#svg').keydown(function(ev) {
  if (ev.keyCode == 27) {
    drawComponent('vcc', 50, 50);
  }
  });
}


/*private functions for this modulw*/
//get coordinates of mouse
function getMousePosition(ev) {
  let x = getSvgPos(ev.offsetX) - 100, y = getSvgPos(ev.offsetY);
  return [x, y];
}
//events for compModel
function addEvents(compModel, ev) {
  compModel.mousedown(function () {
    if (state == 0 || moveAllow == 1) {
      state = 2;
    }
  });
  $('#svg').keydown(function () {
    state = 0;
  });
}
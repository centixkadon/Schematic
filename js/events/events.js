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
  /*let gndButton = drawButton('gnd');
  gndButton.mousedown(function (ev) {
    comp = 'gnd';
    state = 1;
    compModel = drawComponent(comp, 10, 10);
    addEvents(compModel, ev);
  });*/

  //components move with mouse
  $('#svg').mousemove(function (ev) {
    if (state == 1) {
      [x, y] = getSchPos(ev);
      compModel.moveTo(x, y);
    }
    else if (state == 2) {
      [x, y] = getSchPos(ev);
      //compModel.moveBy(x, y);
      compModel.moveTo(x, y);
    }
  });

  //components embedded
  $('#svg').mouseup(function (ev) {
    [x, y] = getSchPos(ev);
    if ((state == 1 || state == 2) && x>0) {
      state = 0;
      comp = '';
    }
  });

  
}


/*private functions for this modulw*/
//events for compModel
function addEvents(compModel, ev) {
  compModel.mousedown(function () {
    if (state == 0) {
      state = 2;
    }
  });
  $('body').keydown(function (ev) {
    if (state == 2) {
      switch (ev.which){
        case 27:
          state = 0;
          break;
        case 46:
          state = 0;
          compModel.removeIt();
          break;

      }
    }
  });
}
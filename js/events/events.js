let schCompModel = undefined;//storage selected components
let schState = {
  none: 0,
  placing: 1,
  moving: 2,
};//statement structure
let schCurrent = schState.none;//current state of sch
let schPrevX = 0;
let schPrevY = 0;
/* function initEvents: bind events with buttons and components*/
function initEvents() {
  //init button for vcc
  let vccButton = drawButton('vcc');
  vccButton.mousedown(function (ev) {
    switch (schCurrent) {
      case schState.none:
        comp = 'vcc';
        schCurrent = schState.placing;
        // [x, y] = getSchPos(ev);
        schCompModel = [
          drawComponent(comp, schPrevX, schPrevY)
            .mousedown(function (ev) {
              switch (schCurrent) {
                case schState.none:
                  schCurrent = schState.moving;
                  if (ev.ctrlKey) {
                    schCompModel.push($(this));
                  }
                  else{
                    schCompModel = [$(this)];
                  }
                  break;
              }
              console.log(schCompModel.length);
              return false;
            })
        ];
        break;
    }
    return false;  
  });

  //keydown events of body
  $('body').keydown(function (ev) {
    //switch (schCurrent){
      //case schState.moving:
        switch (ev.which) {
          case 27://esc
            switch(schCurrent){
              case schState.placing:
                schCurrent = schState.none;
                for (var i = 0; i < schCompModel.length; i++) {
                  schCompModel[i].removeIt();
                }
                schCompModel = undefined;
                break;
              case schState.moving:
                schCurrent = schState.none;
                schCompModel = undefined;
                break;
            }
            break;
          case 46://delete
            schCurrent = schState.none;
            for (var i = 0; i < schCompModel.length; i++) {
              schCompModel[i].removeIt();
            }
            break;
        }

  });
  //keyup events of body
  //$('body').key
  //mousemove events
  $('#svg').mousemove(function (ev) {
    [x, y] = getSchPos(ev);
    if (x < 0) return;
    switch(schCurrent){
      case schState.placing:
        //[x, y] = getSchPos(ev);
        schCompModel[0].moveTo(schPrevX, schPrevY);
        break;
      case schState.moving:
        //[x, y] = getSchPos(ev);
        for (var i = 0; i < schCompModel.length; i++) {
          schCompModel[i].moveBy(x - schPrevX, y - schPrevY);
          //schCompModel[0].moveTo(x, y);
        }
        break;
    }
    schPrevX = x;
    schPrevY = y;
  });
  //
  $('#svg').mousedown(function (ev) {
    schCompModel = undefined;
  });
  //components embedded
  $('#svg').mouseup(function (ev) {
    [x, y] = getSchPos(ev);
    if (x > 0) {
      switch (schCurrent) {
        case schState.placing:
          schCurrent = schState.none;
          break;
        case schState.moving:
          schCurrent = schState.none;
          break;
      }
    }
  });
}



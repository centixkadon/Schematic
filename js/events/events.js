let schCompModel = undefined;//storage selected components
let schCompModelCopy = undefined;//storage copy
let schState = {
  none: 0,
  placing: 1,
  moving: 2,
};//statement structure
let schCurrent = schState.none;//current state of sch
let schPrevX = 0;
let schPrevY = 0;//storage mouse coordinates of last position

/* function initEvents: bind events with buttons and components*/
function initEvents() {
  //init button for vcc
  let vccButton = drawButton('vcc');
  vccButton.mousedown(function (ev) {
    switch (schCurrent) {
      case schState.none://in theory, only in state none allow to draw components
        if (schCompModel != undefined){
          for (var i = 0; i < schCompModel.length; i++) {
            schCompModel[i].setProps('events', { selected: false });
          }
            schCompModel = undefined;
        }//cancel all seleted when try to draw a new one
        comp = 'vcc';//name
        schCurrent = schState.placing;
        schCompModel = [
          drawComponent(comp, schPrevX, schPrevY)//draw a component and select into schCompModel
            .mousedown(function (ev) {
              switch (schCurrent) {
                case schState.none://in theory, only in state none allow to select comp
                  schCurrent = schState.moving;
                  if ($(this).getProps('events').selected == false) {//unselected, using ctrl to select multi-comp
                    if (schCompModel != undefined) {//list exist
                        if (ev.ctrlKey) {
                          $(this).setProps('events', { selected: true });
                          schCompModel.push($(this));//multi select
                        }
                        else {
                          $(this).setProps('events', { selected: true });
                          schCompModel = [$(this)];//single select
                        }
                      }
                      else {//list does not exist
                        $(this).setProps('events', { selected: true });
                        schCompModel = [$(this)];//single select
                      }
                  }
                  else {//selected, using strl to cancel
                    if (ev.ctrlKey) {
                      $(this).setProps('events', { selected: false });
                      if(schCompModel != undefined){
                        for (var i = 0; i < schCompModel.length; i++) {
                          if (schCompModel[i].getProps('events').selected === false)//cancel select
                            schCompModel.splice(i, 1);
                        }
                      }
                    }
                  }
                  break;
              }
              //console.log($(this).getProps('events').selected);
              return false;
            })
            .setProps('events', {selected: true})
        ];
        break;
    }
    return false;
  });

  //keydown events of body
  $('body').keydown(function (ev) {
        switch (ev.which) {
          case 27://esc
            switch(schCurrent){
              case schState.placing://esc in placing state
                schCurrent = schState.none;//cancel placing
                if(schCompModel != undefined){
                  for (var i = 0; i < schCompModel.length; i++) {
                    schCompModel[i].setProps('events', { selected: false });
                    schCompModel[i].removeIt();//remove models
                  }
                    schCompModel = undefined;
                }
                break;
              case schState.moving://esc in moving state
                schCurrent = schState.none;//cancle moving
                if(schCompModel != undefined){
                  for (var i = 0; i < schCompModel.length; i++) {
                    schCompModel[i].setProps('events', {selected:false});//cancel all selected
                  }
                    schCompModel = undefined;
                }
                break;
            }
            break;
          case 46://delete
            schCurrent = schState.none;//return to state none
            if (schCompModel != undefined){
              for (var i = 0; i < schCompModel.length; i++) {
                schCompModel[i].setProps('events', { selected: false });
                schCompModel[i].removeIt();//remove all selected models
              }
            }
            break;
          case 81://Q
            //turn 90 deg counter clockwise
            break;
          case 69://E
            //turn 90 deg clockwise
            break;
          case 67://C
            if (ev.ctrlKey) {//ctrl+c
              if(schCompModel != undefined){
                schCompModelCopy = schCompModel;
              }
            }
            break;
          case 86://V
            if (ev.ctrlKey) {//ctrl+v
              switch (schCurrent) {
                case schState.none:
                  if (schCompModelCopy != undefined) {
                    if (schCompModel != undefined) {
                      for (var i = 0; i < schCompModel.length; i++) {
                        schCompModel[i].setProps('events', { selected: false });//cancel all selected
                      }
                      schCompModel = undefined;
                    }//clear schModelComp, cancel all selected
                    for (var i = 0; i < schCompModelCopy.length; i++) {
                      tempComp = drawComponent(schCompModelCopy[i].getProps('pose').name, schCompModelCopy[i].getProps('pose').x, schCompModelCopy[i].getProps('pose').y)
                      tempComp.mousedown(function (ev) {
                        switch (schCurrent) {
                          case schState.none://in theory, only in state none allow to select comp
                            schCurrent = schState.moving;
                            if ($(this).getProps('events').selected == false) {//unselected, using ctrl to select multi-comp
                              if (schCompModel != undefined) {//list exist
                                if (ev.ctrlKey) {
                                  $(this).setProps('events', { selected: true });
                                  schCompModel.push($(this));//multi select
                                }
                                else {
                                  $(this).setProps('events', { selected: true });
                                  schCompModel = [$(this)];//single select
                                }
                              }
                              else {//list does not exist
                                $(this).setProps('events', { selected: true });
                                schCompModel = [$(this)];//single select
                              }
                            }
                            else {//selected, using strl to cancel
                              if (ev.ctrlKey) {
                                $(this).setProps('events', { selected: false });
                                if (schCompModel != undefined) {
                                  for (var i = 0; i < schCompModel.length; i++) {
                                    if (schCompModel[i].getProps('events').selected === false)//cancel select
                                      schCompModel.splice(i, 1);
                                  }
                                }
                              }
                            }
                            break;
                        }
                        //console.log($(this).getProps('events').selected);
                        return false;
                      });
                      tempComp.setProps('events', { selected: true });
                      if (schCompModel != undefined) {
                        schCompModel.push($(tempComp));
                      }
                      else { schCompModel = [$(tempComp)]; }
                    }
                    centerX = 0, centerY = 0;
                    for (var i = 0; i < schCompModel.length; i++) {
                      centerX = centerX + schCompModel[i].getProps('pose').x;
                      centerY = centerY + schCompModel[i].getProps('pose').y;
                    }
                    centerX = centerX / schCompModel.length;
                    centerY = centerY / schCompModel.length;
                    for (var i = 0; i < schCompModel.length; i++) {
                      schCompModel[i].moveBy(x - centerX, y - centerY);
                    }
                    schCurrent = schState.moving;
                  }
                  break;
            }
        }
            break;
        }
  });
  //keyup events of body
  //$('body').keyup(function(ev){})

  //mousemove events
  $('#svg').mousemove(function (ev) {
    [x, y] = getSchPos(ev);//get coordinates
    if (x < 0) return;
    switch(schCurrent){
      case schState.placing://state placing
        if (schCompModel != undefined) {
          for (var i = 0; i < schCompModel.length; i++) {
            schCompModel[i].moveTo(schPrevX, schPrevY);
          }  
        }
        break;
      case schState.moving://state moving
        if(schCompModel != undefined){
          for (var i = 0; i < schCompModel.length; i++) {
            schCompModel[i].moveBy(x - schPrevX, y - schPrevY);
          }
        }
        break;
    }
    schPrevX = x;
    schPrevY = y;
  });
  //mousedown events for svg (click in the blank)
  $('#svg').mousedown(function (ev) {
    if(schCompModel != undefined){
      for (var i = 0; i < schCompModel.length; i++) {
        schCompModel[i].setProps('events', { selected: false });
      }
        schCompModel = undefined;
    }
    schCurrent = schState.none;//cancel all selected and change state to none
  });
  //components embedded
  $('#svg').mouseup(function (ev) {//mouse up means not moving comp
    [x, y] = getSchPos(ev);
    if (x > 0) {//can only embed in the area where x > 0
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
/***********************************************************************************/


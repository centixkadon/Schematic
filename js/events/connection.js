let connectionState = {
  notconnecting : 0,
  connecting : 1,
};
let curConnection = connectionState.notconnecting;
 

//let pointsList = [];
//let lineList = [];

function schEvents() {

	initEvents();
  
	//切换摆放元器件对象和连线状态
	$('body').keydown(function (ev) {
		switch(ev.which) {
			case 32://空格
			curConnection = !curConnection;
      
        for(let key in pointsList) {//切换模式之后清空数组
              pointsList.pop();
            }
      
			schCurrent = schState.none;
			console.log(curConnection );
			break;
		}
	});

  $('#svg').mousedown(function (ev) {
      if(!curConnection) {
        for(let key in pointsList) {//当得到两个点坐标之后清空存储点的数组
            pointsList.pop();
          }
      }
      else if(curConnection) {
        [x, y] = getSchPos(ev);
        if (x > 0) {
        	let point = [];
        	point._x = x;
        	point._y = y;
        	pointsList.push(point);//将每次点击的坐标存储到pointsList里 
          
      		if(pointsList.length>=2) {
      			defineComponent('line').has('line', [pointsList[0]._x, pointsList[0]._y,pointsList[1]._x,pointsList[0]._y])
            .has('line', [pointsList[1]._x, pointsList[0]._y,pointsList[1]._x,pointsList[1]._y]);
      			lineList.push(drawComponent('line', 0, 0).moveTo(x-pointsList[1]._x, y-pointsList[1]._y).mousedown(function(ev)
            {
              $(this).setProps('events', { selected: true });
            }));//将画出的连接线加到lineList里
      			for(let key in pointsList) {//当得到两个点坐标之后清空存储点的数组
      				pointsList.pop();
      			}
      		}
        }
      }  
  });

  $('body').keydown(function (ev) {
  	switch (ev.which){
  		case 46://del
		  	for(let i = 0; i < lineList.length; i++) {
          if(lineList[i].getProps('events').selected == true) {
            lineList[i].removeIt();
          }
		  	} 
		  	break;
  	} 
  });
}
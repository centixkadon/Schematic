//////////////////////////////////////////////////////////////////////////////////////////////////
//1.drawSchComponent()函数画出一个元器件、drawSchematic()画出所有已保存在schSchematic中的元器件。
//2.因为涉及到成员函数，在这里用函数的方法定义元器件结构体。
//3.drawComponent的返回值不是<g>对象，而是对应的元器件结构体。
//4.this.rotateIt(deg)为旋转器件函数。
/////////////////////////////////////////////////////////////////////////////////////////////////


//用来存放电路图中所有元器件的数组
let schSchematic = [];

$.fn.extend({
  updateTransform: function () {
    let props = this.getProps('pose');
    return this.attr('transform', 'translate(' + props.x + ' ' + props.y + ')');
  },
  moveTo: function (toX, toY) {
    let props = this.getProps('pose');
    [props.x, props.y] = [toX, toY];
    return this.updateTransform();
  },
  moveBy: function (byX, byY) {
    let props = this.getProps('pose');
    props.x += byX; props.y += byY;
    return this.updateTransform();
  },
  removeIt: function () {
    schSchematic[this.getProps('pose').index] = undefined;
    return this.remove();
  },
  /////旋转器件，deg为旋转角度
  rotateIt: function (deg) {
    let props = this.getProps('pose');
    return this.css('transform','translate(' + props.x + 'px,' + props.y + 'px) rotate(' + deg%360 + 'deg)');
  }
});

function createComponent(componentName, componentX, componentY) {
  let component = $s('g').appendComponent(componentName);
  let props = component.getProps('pose');
  [props.index, props.name] = [schSchematic.length, componentName];
  return component.moveTo(componentX, componentY);
}

//在 #svgSch 画出对应的元器件并返回创建的jQuery对象
function drawComponent(componentName, componentX, componentY) {
  let component = createComponent(componentName, componentX, componentY);

  $('#svgSch').append(component);
  schSchematic.push(component);
  return component;
}

let schButtonIndex = 0;

//在 #svgButton 画出对应的元器件并返回创建的jQuery对象
function drawButton(componentName) {
  let component = createComponent(
    componentName,
    ((schButtonIndex % schConfig.svg.button.col) + 0.5) * schConfig.svg.button.size,
    (parseInt(schButtonIndex / schConfig.svg.button.col) + 0.5) * schConfig.svg.button.size
  );
  ++schButtonIndex;

  $('#svgButton').append(component);
  return component;
}


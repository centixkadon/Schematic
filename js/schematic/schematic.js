//////////////////////////////////////////////////////////////////////////////////////////////////
//1.drawSchComponent()函数画出一个元器件、drawSchematic()画出所有已保存在schSchematic中的元器件。
//2.因为涉及到成员函数，在这里用函数的方法定义元器件结构体。
//3.drawComponent的返回值不是<g>对象，而是对应的元器件结构体。
/////////////////////////////////////////////////////////////////////////////////////////////////

//用来存放电路图中所有元器件的数组
let schSchematic = [];

jQuery.prototype.moveTo = function (X, Y) {
  this.attr('transform', 'translate(' + X + ' ' + Y + ')');
  this.schX = X;
  this.schY = Y;
  return this;
}

jQuery.prototype.moveBy = function (X, Y) {
  X = X + this.schX;
  Y = Y + this.schY;
  this.attr('transform', 'translate(' + X + ' ' + Y + ')');
  this.schX = X;
  this.schY = Y;
  return this;
}

jQuery.prototype.removeIt = function () {
  schSchematic[this.schIdx] = undefined;
  this.remove();
  return this;
}

function createComponent(componentName, componentX, componentY) {
  return $s('g').appendComponent(componentName).attr('transform', 'translate(' + componentX + ' ' + componentY + ')');
}

//在 #svgSch 画出对应的元器件并返回创建的jQuery对象
function drawComponent(componentName, componentX, componentY) {
  let component = createComponent(componentName, componentX, componentY);
  component.schIdx = schSchematic.length;
  component.schName = componentName;
  component.schX = componentX;
  component.schY = componentY;

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

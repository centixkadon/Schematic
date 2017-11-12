/* 预期目标1
// 将以下代码复制到 js/test/test.js 中，应在 #test 画出一个电源，一个地。
$('#test').appendComponent('vcc');
$('#test').appendComponent('gnd');

*/
//可在绘画前设置缩放值。缩放系数为1.0时，电阻、电容等元器件尺寸为40px*40px

let Component_scale = 1;//整体缩放尺寸

function createObj(objAttr) {
  let obj = $s(objAttr.mark); 
  for (let attrId in objAttr.attr) {
    obj.attr(attrId, objAttr.attr[attrId]*Component_scale);
  }
  obj.attr('stroke', 'black').attr( 'stroke-width', '2');
  return obj;
}

jQuery.prototype.appendComponent = function (name){
	svgObj = $s('svg');
	svgObj.attr('width',40*Component_scale).attr('height',40*Component_scale);
	for (let i = 0; i < Components[name].length; ++i)
		{
			svgObj.append(createObj(Components[name][i]));
		}
	this.append(svgObj);
}
/////////以上不修改//////////////////////////////////////////////////////////



let Components = {
	'vcc': [ 
			{
				mark: 'line',
				attr: { x1: 10, y1:  5, x2: 30, y2:  5, },
			},
			{
				mark: 'line',  
				attr: { x1: 20, y1:  5, x2: 20, y2: 30, },
		  
			},	  
		],
	'gnd': [ 
			{
				mark: 'line',
				attr: { x1: 20, y1:  0, x2: 20, y2: 20, },
			},
			{
				mark: 'line',
				attr: { x1:  5, y1: 20, x2: 35, y2: 20, },
			},
			{
				mark: 'line',
				attr: { x1: 10, y1: 25, x2: 30, y2: 25, },
			},
			{
				mark: 'line',
				attr: { x1: 15, y1: 30, x2: 25, y2: 30, },
			},
		],
};

$('#test').appendComponent('vcc');
$('#test').appendComponent('gnd');


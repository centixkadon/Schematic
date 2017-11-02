
// 方括号 [a, b, c] 为数组，用 obj[数字] 来索引；
// 花括号 {a: 'aa', b: 'bb', c: 'cc'} 为对象，
// 等价于 {'a': 'aa', 'b': 'bb', 'c': 'cc'}，用 obj[键名] 来索引。
let objAttrs = [
  {
    mark: 'circle',
    attr: { cx: 200, cy: 300, r: 40, fill: 'red', stroke: 'black', 'stroke-width': '2', },
  },
  {
    mark: 'line',
    attr: { x1: 30, y1: 40, x2: 270, y2: 360, stroke: 'black', 'stroke-width': '5', },
  },
];

function createObj(objAttr) {
  let obj = $s(objAttr.mark); // jQuery中的$函数不支持直接创建svg图形，新定义$s函数仅负责创建svg图像。
  for (let attrId in objAttr.attr) {
    obj.attr(attrId, objAttr.attr[attrId]);
  }
  return obj;
}

$('#svg1').append(
  $s('rect').attr('x', '100').attr('y', '100').attr('width', '50').attr('height', '50').attr('fill', 'blue').attr('stroke', 'black').attr('stroke-width', '2')
);

let svgObj = $('#svg1');
for (let i = 0; i < objAttrs.length; ++i){
  svgObj.append(createObj(objAttrs[i]));
}

// 如下函数不是jQuery中的函数，而是jQuery-UI中的函数。
$('#svg1').draggable({      // .draggable() 为设置成可拖动，不支持矢量图内的图形。
  containment: "body",    // containment成员可设置约束，此项为设置成svg1只能在父框架中拖动。
});


// $()是jquery中的选择器。
// #前缀表示通过id属性来筛选，返回一个jQuery对象；
// .前缀表示通过class属性来筛选，与CSS中的表示方法一样。
// <>表示新建一个对应的jQuery对象。
$('#div1').html('js添加的字体'); // .html('...')修改<></>标记中夹着的文本。

// 添加新<div>标记如下：
$('#div2').append($('<div>').html('js添加的标记')); // .append(...)表示添加jQuery对象

// 添加新<button>标记如下：
$('#div2').append($('<button>').html('js添加的按钮').addClass('btn btn-success')); // .addClass()表示添加class属性

// 操作HTML文本，添加新标记：
$('#div3').html('<button class="btn btn-info">直接修改HTML添加的按钮</button>');


// 因为jQuery对象的成员函数都会返回对象本身，所以可以像这样用：
// $().a().b().c().d()...z();

// ES5的写法
function Point(x, y) {
  this.x = x
  this.y = y
}
Point.prototype.toString = function() {
  return '(' + this.x +', ' + this.y + ')'
}
var p = new Point(1, 2)



// ES6的写法
class Point {
  // 构造方法 this关键字代表实例对象
  // 也就是ES5的构造函数point对应了 es6的point类的构造方法
  constructor(x, y) {
    this.x = x
    this.y = y
  }
  // 方法之间不能用逗号分隔 否则会报错
  toString() {
    return `${this.x}~${this.y}`
  }
}
// 使用的时候还是和ES5的构造函数的用法完全一致
const conPoint = new Point()
conPoint.toString()

// es5构造函数的prototype属性 在es6的类上面继续存在着
// 事实上 类的所有方法都是定义在类的prototype属性上面
class Point {
  constructor() {}
  toString() {}
  toValue() {}
}
完全等同于
Point.prototype = {
  constructor() {},
  toString() {},
  toValue() {},
}
// # 由于类的方法都定义在prototype对象上面 所以类的新方法可以添加在prototype对象上面
// 所以我们可以通过Object.assign来对point类添加多个方法
Object.assign(Point.prototype, {
  toString() {},
  toValue() {}
})
// 另外需要注意的是 类的内部所有定义的方法 都是不可枚举的
// 但是在es5中prototype属性上面的方法是可枚举的

// 类的属性名 可以直接采用表达式
let methodName = 'getArea'
class Square {
  constructor(length) {
    this.length = length
  }
  [methodName]() {
    return `这是一个表达式属性名${this.legnth}`
  }
}

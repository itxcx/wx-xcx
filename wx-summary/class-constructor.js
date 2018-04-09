// constructor方法是类的默认方法 通过new命令生成对象实例的时候 自动调用该方法
// 一个类必须有constructor方法 如果没有显式定义 一个空的constructor方法会被默认添加
class Point {
  // js引擎会自动添加一个空的constructor
}
// 等同于
class Point {
  constructor() {}
}
// constructor方法默认返回实例对象 this 完全可以指定返回另外一个对象
class Foo {
  constructor() {
    return Object.create(null)
  }
}
new Foo() instanceof Foo // false
// 类必须使用new调用 否则会报错如果是普通构造函数的话 不用new也是可以执行的



// 类的实例对象
// 生成类的实例对象的写法 与ES5一样 也是使用new命令
class Point {
  // ...
}
var point = Point(2, 3) // 错误
var point = new Point(2, 3)  // 正确

// 与es5一样 实例的属性除非显式的定义在本身【this】 否则都会默认定义在原型class上
class Point1 {
  // x, y 定义在实例本身上面 this
  constructor(x, y) {
    this.x = x
    this.y = y
  }
  // toString方法定义在class 类上面
  toString() {
    return `(${this.x}~${this.y})`
  }
}
var point = new Point1(2, 3)

point.hasOwnProperty('x') // true
point.hasOwnProperty('y')
point.hasOwnProperty('toString') // false
point.__proto__.hasOwnProperty('toString') // true

// 与ES5一样 类的所有实例共享一个原型对象
var p1 = new Point(2, 3)
var p2 = new Point(3, 2)
// 当然我们也可以通过 __proto__来对类添加方法
p1.__proto__.printName = function() {
  return 'Oop'
}
p1.printName() // Oop
// 因为p2和p1是同一个原型类
p2.printName() // oop
var p3 = new Point(4, 2)
p3.printName() // oop 这个方法其实是添加到了类上面 所以新实例上面也是有这个方法的
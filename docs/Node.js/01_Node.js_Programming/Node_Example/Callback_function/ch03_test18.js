// 프로토타입 객체 만들기

function Person(name, age) {
  this.name = name;
  this.age = age;
}

Person.prototype.walk = function(speed) {
  console.log(speed + "km 속도로 걸어갑니다.");
};

let person01 = new Person("윳홍이", 28);
let person02 = new Person("뀨", 7);

console.log(person01.name + "객체의 walk(10)을 호출합니다.");
person01.walk(10);

let Person = {};

Person["age"] = 28;
Person["name"] = "윳홍이";

let oper = function(a, b) {
  return a + b;
};

Person["add"] = oper;
console.log("더하기 : %d", Person.add(10, 10));

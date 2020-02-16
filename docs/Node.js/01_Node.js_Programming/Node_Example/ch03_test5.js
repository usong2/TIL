let Person = {};

Person["age"] = 28;
Person["name"] = "윳홍이";
Person.add = function(a, b) {
  return a + b;
};

console.log("더하기 : %d", Person.add(10, 10));

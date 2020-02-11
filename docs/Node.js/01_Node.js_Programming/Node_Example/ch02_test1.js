var result = 0;

console.time("duration_sum");

for (var i = 1; i <= 1000; i++) {
  result += i;
}

console.timeEnd("duration_sum");
console.log("1 부터 1000 까지 더한 결과물 : %d", result); // 500500

console.log("현재 실행한 파일의 이름 : %s", __filename); // Node_Example\ch02_test1.js
console.log("현재 실행한 파일의 패스 : %s", __dirname); // Node_Example

var Person = { name: "usong", age: 28 };
console.dir(Person); // { name: 'usong', age: 28 }

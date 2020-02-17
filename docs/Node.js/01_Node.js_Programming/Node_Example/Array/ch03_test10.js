let Users = [
  { name: "윳홍이", age: 28 },
  { name: "뀨", age: 7 },
  { name: "구찌", age: 10 }
];

console.log("배열 요소의 수 : %d", Users.length);
for (var i = 0; i < Users.length; i++) {
  console.log("배열 요소 #" + i + " : %s", Users[i].name);
}

console.log("\nforEach 구문 사용하기");
Users.forEach(function(item, index) {
  console.log("배열 요소 #" + index + " : %s", item.name);
});

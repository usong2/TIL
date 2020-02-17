let Users = [
  { name: "윳홍이", age: 28 },
  { name: "뀨", age: 7 }
];
console.log("unshift() 호출 전 배열 요소의 수 : %d", Users.length);

Users.unshift({ name: "구찌", age: 10 });
console.log("unshift() 호출 후 배열 요소의 수 : %d", Users.length);

Users.shift();
console.log("shift() 호출 후 배열 요소의 수 : %d", Users.length);

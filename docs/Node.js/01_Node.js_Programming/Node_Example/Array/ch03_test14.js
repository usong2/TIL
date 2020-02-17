let Users = [
  { name: "윳홍이", age: 28 },
  { name: "뀨", age: 7 },
  { name: "구찌", age: 10 },
  { name: "자몽", age: 12 }
];

console.log("배열 요소의 수 : %d", Users.length);
console.log("원본 Users");
console.dir(Users);

let Users2 = Users.slice(1, 3);

console.log("slice()로 잘라낸 후 Users2");
console.dir(Users2);

let Users3 = Users2.slice(1);
console.log("slice()로 잘라낸 후 Users3");
console.dir(Users3);

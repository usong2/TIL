let Users = [
  { name: "윳홍이", age: 28 },
  { name: "뀨", age: 7 },
  { name: "구찌", age: 10 }
];
console.log(
  "delete 키워드로 배열 요소 삭제 전 배열 요소의 수 : %d",
  Users.length
);
console.dir(Users);

delete Users[1];
console.log("delete 키워드로 배열 요소 삭제 후 ");
console.dir(Users);

Users.splice(1, 0, { name: "자몽", age: 12 });
console.log("splice()로 요소를 인덱스 1에 추가한 후");
console.dir(Users);

Users.splice(2, 1);
console.log("splice()로 인덱스 1의 요소를 1개 삭제한 후");
console.dir(Users);

// push(object) : 배열의 끝에 있는 요소를 추가
// pop() : 배열의 끝에 있는 요소를 삭제
// unshift() : 배열의 앞에 있는 요소를 추가
// shift() : 배열의 앞에 있는 요소를 삭제
// splice(index, removeCount [,object]) : 여러 개의 객체를 요소로 추가하거나 삭제
// slice(index, copyCount) : 여러 개의 요소를 잘라내어 새로운 배열 객체 생성

let Users = [
  { name: "윳홍이", age: 28 },
  { name: "뀨", age: 7 }
];
console.log("push() 호출 전 배열 요소의 수 : %d", Users.length);

Users.push({ name: "구찌", age: 10 });
console.log("push() 호출 후 배열 요소의 수 : %d", Users.length);

Users.pop();
console.log("pop() 호출 후 배열 요소의 수 : %d", Users.length);

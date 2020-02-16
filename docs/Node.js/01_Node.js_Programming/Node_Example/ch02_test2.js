console.log("argv 속성의 파라미터 수 : " + process.argv.length); // 2
console.dir("process.argv"); // node.exe 파일의 이름, 자바스크립트 파일의 패스

if (process.argv.length > 2) {
  console.log("세 번째 파라미터의 값 : %s", process.argv[2]);
}

process.argv.forEach(function(item, index) {
  console.log(index + " : ", item);
});

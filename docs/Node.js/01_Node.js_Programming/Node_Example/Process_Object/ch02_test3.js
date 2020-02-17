console.dir(process.env);

console.log("OS 환경 변수의 값 : " + process.env[OS]);
// ReferenceError: OS is not defined
// process.env 속성에는 '사용자 정의 환경 변수(user variables)만 들어 있음.
// process.env 객체에 들어 있는 속성만으로는 OS와 같은 '시스템 환경 변수(system variables)에 접근 불가

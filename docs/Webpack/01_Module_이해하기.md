# 01. Module 이해하기

## Module의 정의

+ 프로그램을 구성하는 내부의 코드가 기능별로 나뉘어져 있는 형태
+ 즉, 한 파일에 쓰여진 큰 코드 덩어리를 여러 파일로 쪼개어 관리 가능

> File A [ 함수 A, 함수 B ] ---> File B [ 함수 A ]

> Module A [함수 A, 함수 B ] --- ? --->  Module B [함수 A]

## Module의 표준

Module을 사용하기 위해서는

Module을 인식하는 **Module System**과

Module을 다루는 **키워드**가 제공되어야 한다.

1. CommonJS (Node.js)
2. ESM (ECMA Script 2015 ~)

## Module을 다루는 키워드

1. 내보내기
2. 가져오기

### Module 내보내기

> Module A [ 함수 A, 함수 B ]  --- ? --->

1. 한 곳으로 내보내기
2. 개별적으로 내보내기

### Module 가져오기

> --- ? ---> File B [ 함수 A, 함수 B ]

+ { 함수 A } { ... }
+ 모듈 객체를 참조하는 형태

#### Module Keyword : 가져오기

##### CommonJS

+ require (모듈의 경로)
+ module.exports
  + 전역으로 접근할 수 있는 module 객체를 사용

#### Module Keyword: 내보내기

##### CommonJS

+ module.exports = { ... }
  + 모두 한 객체 안에 할당하는 방식
+ module.exports = 값
  + 하나의 상속 값이나 한 함수를 바로 할당하는 방식
+ module.exports.키_이름 = 값
  + 키를 지정 후 각각의 값을 할당
+ exports.키_이름 = 값
  + module.exports의 축약형

## 예제

### 모듈 사용 전

```js
/* index.js */

/**
 * 1. 원의 넓이를 구하는 공식
 * 2. PI 정의
 * 3. 공식을 통해 결과 얻기
 */

const PI = 3.14;
const getCircleArea = (r) => r * r * PI;

const result = getCircleArea(2);
console.log(result);
```

```bash
$ node index.js
# 12.56
```

이렇게 한 파일 안에 여러 코드를 작성하게 되면 많은 코드를 작성할 경우 코드의 내용을 전체적으로 파악하기 어렵고 요구사항이 바뀌거나 버그 발생으로 수정하는 상황에 많은 코드를 위부터 아래로 순차적으로 읽어야 하는 불편함이 있음

### 모듈 사용 후

#### 모듈 객체 사용 방법

```js
/* mathUtil.js */

const PI = 3.14;
const getCircleArea = (r) => r * r * PI;

module.exports = {
  PI,
  getCircleArea,
};
```

기능 별로 코드를 나누는 모듈을 통해 좀 더 코드를 해석하는 시간이 단축되고 어떤 부분을 수정해야 하는지 빨리 파악 가능함

```js
/* index.js */

/**
 * 1. 원의 넓이를 구하는 공식
 * 2. PI 정의
 * 3. 공식을 통해 결과 얻기
 */

const { getCircleArea } = require("./mathUril");

const result = getCircleArea(2);
console.log(result);
```

```bash
$ node index.js
# 12.56
```

#### exports 키워드 사용 방법

모듈 객체를 이용해서 기능을 내보낼 수 있지만 exports라는 키워드를 통해 개별적으로 기능을 내보낼 수도 있음

```js
const PI = 3.14;
const getCircleArea = (r) => r * r * PI;

// module.exports = {
//   PI,
//   getCircleArea,
// };

exports.PI = PI;
exports.getCircleArea = getCircleArea;
```

여러 가지 방법을 혼용해서 사용하면 중간에 내보내는 코드들이 상실될 수 있는 위험이 있으므로 두 가지 중에 한 가지로 표현을 하는 것이 좋음. 
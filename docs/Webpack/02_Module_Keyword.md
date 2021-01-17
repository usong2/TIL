# 02. Module Keyword

## Module Keyword : 가져오기

### ESM

+ `import 모듈_이름 from 모듈_위치`
+ import와 from이라는 키워드로 모듈에 있는 기능들을 참조

## Module Keyword : 내보내기

### ESM

+ `import`
+ `export default`

<br />

## 예제로 이해하기

+ ESM 모듈 설치

  ```bash
  $ npm install esm
  ```

+ 변화된 명령문 

  ```bash
  $ node -r esm index.js
  ```

  + `-r` : node 명령어로 실행 시 실행하는 파일의 모듈 중 CommonJS 뿐만 아니라 다른 모듈의 표준도 해석 가능하도록 설정

### CommonJS -> ESM 변경

```js
/* index.js */
/**
 * 1. 원의 넓이를 구하는 공식
 * 2. PI 정의
 * 3. 공식을 통해 결과 얻기
 */

// const { getCircleArea } = require("./mathUtil");
import { getCircleArea } from './mathUtil';

const result = getCircleArea(2);
console.log(result);
```

```js
/* mathUtil.js */

const PI = 3.14;
const getCircleArea = (r) => r * r * PI;

// module.exports = {
//   PI,
//   getCircleArea,
// };

// exports.PI = PI;
// exports.getCircleArea = getCircleArea;

export { PI, getCircleArea };
```

+ ESM 명령어 실행

  ```bash
  $ node -r esm index.js
  ```

<br />

### default

+ default를 추가할 경우 아래와 같이 객체 이름을 따로 지정하고 그 이름을 통해서 내보내는 기능들을 접근해야 함

  ```js
  export default { PI, getCircleArea };
  ```

  ```js
  import mathUtil from './mathUtil';
  
  const result = mathUtil.getCircleArea(2);
  ```
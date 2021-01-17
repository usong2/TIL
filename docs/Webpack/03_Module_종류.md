# 03. Module의 종류

## 1. Built-in Core Module

+ 실행 환경에서 바로 사용할 수 있게 제공되는 모듈들을 의미
+ 예: Node.js module

### Write Your Code

+ src/index.js

  ```js
  import bar from './bar';
  
  bar();
  ```

+ src/bar.js

  ```js
  export default function bar() {
      //
  }
  ```

### Bundle It

+ **Without config** or provide custom **webpack.config.js**

  ```js
  const path = require('path'); // 파일의 경로를 자유롭게 다룰 수 있도록 도와주는 역할
  
  module.exports = {
      entry: './src/index.js',
      output: {
          path: path.resolve(__dirname, 'dist'),
          filename: 'bundle.js'
      }
  };
  ```

+ page.html

  ```html
  <!doctype html>
  <html>
      <head>
          ...
      </head>
      <body>
          ...
          <script src="dist/bundle.js"></script>
      </body>
  </html>
  ```

## 2. Community-based Module

+ 커뮤니티 기반 모듈로 이전에 ESM이라는 외부 모듈을 사용한 것과 같음
+ 예: npm
+ node 환경에서는 NPM이라는 패키지 매니저를 통해 외부 모듈들을 다루는데 NPM을 통해 외부 모듈을 가져와 활용할 수 있음
+ 개인이 만든 모듈을 외부에 공개하는 역할
  + npm CLI를 사용하여 접근해야 함
  + 예: `npm install ModuleName`

## 3. Local Module

+ 로컬 환경에서 만들어진 모듈을 의미
+ 특정 프로젝트에 정의된 모듈

> 모듈에 사용되는 방식, 위치되어 있는 공간을 기준으로도 모듈을 구분할 수 있음

## 예제

### 도형의 넓이는 구하는 코드를 기능별로 모듈화하기

+ readline.js

  ```js
  /* readline.js */
  
  const readline = require("readline");
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  ```

  readline 모듈은 nodejs에서 제공하는 내장 모듈로 사용자에게 입력을 받을 수 있도록 여러 기능을 제공해주는 역할을 함

  ```js
  const readline = require("readline");
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  
  rl.question("원하는 도형을 작성해주세요 : ", (input) => {
    console.log(input);
    rl.close();
  });
  ```

  파일을 실행하면 question이라는 메소드는 사용자에게 입력을 받기 전 입력과 관련된 정보를 전달하고 입력된 데이터를 콜백함수로 다룰 수 있도록 함

  ```bash
  $ node readline.js
  ```

#### 한 파일에 구현한 코드

```js
const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question(
  "넓이를 구하고자 하는 도형의 종류를 입력해주세요, ( 정사각형, 원 ) : ",
  (figure) => {
    console.log(`선택된 도형: ${figure}`);

    switch (figure) {
      case "정사각형":
        rl.question("변의 길이를 입력해주세요 : ", (input) => {
          console.log(`입력받은 값 : ${input}`);
          console.log(`정사각형의 넓이는 : ${input * input} 입니다.`);
          rl.close();
        });
        break;
      case "원":
        rl.question("반지름의 길이를 입력해주세요 : ", (input) => {
          console.log(`입력받은 값 : ${input}`);
          console.log(`원의 넓이는 : ${input * input * 3.14} 입니다.`);
          rl.close();
        });
        break;
      default:
        console.log(
          "지원되지 않는 도형입니다. '정사각형' 또는 '원'을 입력해주세요. \n커멘드 라인을 종료합니다."
        );
        rl.close();
    }
  }
);
```

```bash
$ node index.js
```

### 모듈로 나누기

+ mathUtil.js

  ```js
  const PI = 3.14;
  const getCircleArea = (r) => r * r * PI;
  const getSqureArea = (d) => d * d;
  
  module.exports = {
    PI,
    getCircleArea,
    getSqureArea,
  };
  
  // exports.PI = PI;
  // exports.getCircleArea = getCircleArea;
  
  // export { PI, getCircleArea, getSqureArea };
  ```

+ index.js

  ```js
  const readline = require("readline");
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  
  const { getCircleArea, getSqureArea } =  require('./mathUtil');
  
  rl.question(
    "넓이를 구하고자 하는 도형의 종류를 입력해주세요, ( 정사각형, 원 ) : ",
    (figure) => {
      console.log(`선택된 도형: ${figure}`);
  
      switch (figure) {
        case "정사각형":
          rl.question("변의 길이를 입력해주세요 : ", (input) => {
            console.log(`입력받은 값 : ${input}`);
            console.log(`정사각형의 넓이는 : ${getSqureArea(input)} 입니다.`);
            rl.close();
          });
          break;
        case "원":
          rl.question("반지름의 길이를 입력해주세요 : ", (input) => {
            console.log(`입력받은 값 : ${input}`);
            console.log(`원의 넓이는 : ${getCircleArea(input)} 입니다.`);
            rl.close();
          });
          break;
        default:
          console.log(
            "지원되지 않는 도형입니다. '정사각형' 또는 '원'을 입력해주세요. \n커멘드 라인을 종료합니다."
          );
          rl.close();
      }
    }
  );
  ```

  수학 공식과 관련된 내용이 수정이 되었을 때 mathUtil만 참고를 하면 됨

  결과를 출력하는 내용들을 보면 입력 받은 데이터를 갖고 문자열을 완성시키는데 이 부분도 모듈로 분리 가능

  + log.js

    ```js
    const logInput = (input) => `입력받은 값 : ${input}`;
    const logResult = (figure, result) => `${figure}의 넓이는 ${result} 입니다.`;
    const logFigureError =
      "지원되지 않는 도형입니다. '정사각형' 또는 '원'을 입력해주세요. \n커맨드 라인을 종료합니다.";
    
    module.exports = {
      logInput,
      logResult,
      logFigureError,
    };
    ```

  + index.js

    ```js
    const readline = require("readline");
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    
    const { getCircleArea, getSqureArea } = require("./mathUtil");
    const { logInput, logResult, logFigureError } = require("./log");
    
    rl.question(
      "넓이를 구하고자 하는 도형의 종류를 입력해주세요, ( 정사각형, 원 ) : ",
      (figure) => {
        console.log(`선택된 도형: ${figure}`);
    
        switch (figure) {
          case "정사각형":
            rl.question("변의 길이를 입력해주세요 : ", (input) => {
              console.log(logInput(input));
              console.log(logResult(figure, getSqureArea(input)));
              rl.close();
            });
            break;
          case "원":
            rl.question("반지름의 길이를 입력해주세요 : ", (input) => {
              console.log(logInput(input));
              console.log(logResult(figure, getCircleArea(input)));
              rl.close();
            });
            break;
          default:
            console.log(logFigureError);
            rl.close();
        }
      }
    );
    ```


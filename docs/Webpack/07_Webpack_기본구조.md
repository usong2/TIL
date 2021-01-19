# 07. Webpack의 기본 구조

![Webpack](https://miro.medium.com/max/1077/1*e5p_wA5dNab4fZx5lk1dSA.png)

왼쪽에는 다양한 확장자를 갖고 있는 파일들이 서로 연결되어 있는데 아래의 설명에는 의존성을 갖는 모듈들이라는 설명들이 있음. Webpack을 통해 웹 어플리케이션을 개발할 때 사용하는 다양한 파일들이 모듈로 불리고 있음.

## Webpack이 바라보는 Module

1. js
2. sass
3. hbs
   + handlebars라는 기술 이름의 약자
   + 템플릿 엔진이라 불리는데 이것은 데이터를 특정한 양식에 따라 출력해주는 기술로 서버사이드 개발 시 서버에 갖고 있는 데이터를 문서에 바로 출력해주는 역할
4. jpg, png

​      ...

자바스크립트 파일을 포함해 여러 가지 파일들을 모듈이라 부르고 Webpack은 모듈들을 다루고 있음.

오른쪽은 모듈들이 Webpack으로 들어가는 과정이며 Webpack을 통해 확장자별로 하나의 파일이 나오고 있는데 이렇게 여러 파일들을 하나로 묶어주는 과정을 Bundle이라 함.

<br />

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

위의 두 자바스크립트 파일의 관계를 보면 아래와 같이 표현할 수 있음.

index.js `[ bar() ]` ← bar.js `[function bar() {...}]`

화살표로 표현되는 관계를 의존성이라고 하는데 index.js는 bar.js에 의존성을 갖는다라고 표현할 수 있음.

맨 위의 Webpack이 사용되는 그림을 보면 첫 단계에서 파일과 파일들이 서로 연결되어 있는 것을 볼 수 있음. index.js와 bar.js가 갖는 관계처럼 이 파일들은 의존성을 갖는 파일들이라고 이해할 수 있음.

아래의 **Bundle It** 에서는 왼쪽에는 웹팩의 설정 파일이 보이고 오른쪽에는 자바스크립트 파일 하나만 로드하는 index.html 문서가 보이는데 Webpack 문서에 나온 것처럼 두 개의 자바스크립트 파일을 bundle.js라는 하나의 파일로 만들어 사용하고 있는 것을 확인할 수 있음.

이 과정을 그림으로 표현하면 아래와 같이 표현할 수 있음

index.js `[ bar() ]` ← bar.js `[function bar() {...}]`

​                                     ↓

​                       webpack.config.js

​									↓

​						  dist/bundle.js

bundle.js 파일을 하나만 사용한다고 하지만 bundle.js는 내부를 보면 두 파일을 갖고 있는 하나의 파일이라고 할 수 있음.

dist/bundle.js `[ [index.js] ← [bar.js] ]`

두 파일이 하나의 파일로 합쳐졌지만 내부의 내용을 보면 파일이 갖고 있는 의존성은 안전하게 유지되고 있음.

즉, Bundle이라는 과정을 좀 더 정확하게 설명하자면, Module들의 의존성을 안전하게 유지시키면서 하나의 파일로 만드는 과정이라고 할 수 있음.

<br />

## Entry & Output

### Entry

+ 모듈의 의존 관계를 이해하기 위한 시작점을 설정
+ 복잡한 참조 관계를 갖고 있는 모듈 중 어떤 모듈에 시작점을 두고 해석해야 하는지 웹팩에게 알려주는 것을 의미
+ 예를 들어 모듈 A가 있으면 모듈 B, C에 있는 기능을 참조하고 있는 상황인데 이런 상황일 때 모듈 A와 B, C는 의존 관계를 갖고 있음
+ 웹팩은 모듈들의 의존 관계를 해석한 후 의존성 그래프를 만들어 모듈들을 해석하고 번들링하는 과정을 하는데 이 과정은 파일별로 쪼개진 모듈들의 내용을 번들 파일 내에 모두 담는 과정을 의미
+ 참조 관계에서 가장 상위에 있는 모듈 A의 위치를 entry 요소에 작성해 주면 웹팩이 모듈 A를 시작점으로 모듈 A가 갖고 있는 다른 모듈들과의 의존 관계를 해석해서 번들 파일을 만들게 됨

### Output

+ 웹팩이 모듈을 모두 읽어 의존성 그래프를 만든 후에 번들 파일을 만드는데 Output은 **Webpack이 생성하는 번들 파일에 대한 정보를 설정**
+ 번들 파일이 생성되는 위치나 파일의 이름과 같은 내용들을 설정

<br />

## 예제

+ package.json 파일 생성

  ```bash
  $ npm init -y
  ```

  package.json 파일은 작업하는 프로젝트에 대한 정보를 나타내고 프로젝트가 사용하는 패키지를 관리해주는 역할을 하며
  npm 명령어를 통해 복잡한 스크립트를 쉽게 다룰 수 있도록 도와주는 역할을 함

+ package.json 확인

  ```json
  {
    "name": "Module",
    "version": "1.0.0",
    "description": "",
    "main": "index.js",
    "dependencies": {
      "esm": "3.2.25"
    },
    "devDependencies": {},
    "scripts": {
      "test": "echo \"Error: no test specified\" && exit 1"
    },
    "keywords": [],
    "author": "",
    "license": "ISC"
  }
  ```

  name의 기본 값은 프로젝트의 폴더 이름으로 만들어지는데 만약 외부 패키지를 설치하게 되면 어떤 패키지들을 이 프로젝트가 사용하는지 파일 안에 기록하게 됨

+ webpack 설치

  ```bash
  $ npm install webpack webpack-cli --save-dev
  ```

  webpack-cli는 웹팩을 실행할 수 있는 명령어를 지원하는 패키지를 의미하며 설치가 끝나면 node_modules라는 폴더가 생성되며 이 안에는 webpack과 webpack-cli 패키지, 두 패키지가 의존하고 있는 다른 패키지들이 모두 설치된 것을 확인 가능

+ package.json 확인

  ```json
  {
    "name": "Module",
    "version": "1.0.0",
    "description": "",
    "main": "index.js",
    "dependencies": {
      "esm": "3.2.25"
    },
    "devDependencies": {
      "webpack": "5.15.0",
      "webpack-cli": "4.4.0"
    },
    "scripts": {
      "test": "echo \"Error: no test specified\" && exit 1"
    },
    "keywords": [],
    "author": "",
    "license": "ISC"
  }
  ```

  devDependencies라는 키가 추가되고 설치한 패키지의 이름과 버전을 확인 가능

+ webpack 명령어 실행하여 bundle 파일 만들기

  ```bash
  $ npx webpack
  ```

  설치된 패키지를 기준으로 node_modules 안에서 실행 파일을 찾아 실행하게 해주는 역할을 하는데 node_modules 폴더 내에 .bin폴더에 있는 모듈들이 패키지를 실행시키는 역할을 함

  이 경로로 직접 접근하여 직접 웹팩을 실행할 수도 있지만 npx라는 간단한 명령어를 사용하는 것이 유용

  ```bash
  assets by status 0 bytes [cached] 1 asset
  
  WARNING in configuration
  The 'mode' option has not been set, webpack will fallback to 'production' for this value. Set 'mode' option to 'development' or 'production' to enable defaults for each environment.
  You can also set it to 'none' to disable any default behavior. Learn more: https://webpack.js.org/configuration/mode/
  
  ERROR in main
  Module not found: Error: Can't resolve './src' in 'C:\Users\dbthd\Documents\TIL\docs\Webpack\Sample\Module'
  
  webpack 5.15.0 compiled with 1 error and 1 warning in 144 ms
  ```

  명령어 실행 후 에러가 발생하는데 이전에 설정해야 하는 entry와 output에 대한 정보가 누락되었기 때문

  웹팩이 4 버전으로 올라가면서 zero configuration이라는 설정을 업데이트 했는데 말 그대로 설정에 대한 정보를 입력하지 않아도 여러 가지 설정을 한다는 의미인데 웹팩 명령어만 실행해도 일반적으로 자주 사용되는 웹팩 설정들을 기본적으로 설정해주는 편리함을 제공

  대신 zero configuration을 하기 위해서는 entry의 경로를 src라는 폴더에 index.js라는 파일 이름으로 준비해주어야 동작을 하고 bundle 파일이 위치해 있는 장소도 dist라는 폴더 안쪽에 나오도록 되어 있고 bundle 파일의 경우에는 name.js라는 파일 이름으로 미리 결정되어 있음

  즉, entry와 output 설정을 따로 하지 않아도 번들링이 된다는 것을 의미

  src와 dist 폴더를 만들고 index.js와 index.js가 사용하는 모듈들을 모두 src 폴더로 옮기고 실행하면 됨

+ root에 dist와 src 폴더 생성 후 src에 index.js, log.js, mathUtil.js를 이동

  ```bash
  WARNING in configuration
  The 'mode' option has not been set, webpack will fallback to 'production' for this value. Set 'mode' option to 'development' or 'production' to enable defaults for each environment.
  You can also set it to 'none' to disable any default behavior. Learn more: https://webpack.js.org/configuration/mode/
  
  ERROR in main
  Module not found: Error: Can't resolve './src' in 'C:\Users\dbthd\Documents\TIL\docs\Webpack\Sample\Module'
  
  webpack 5.15.0 compiled with 1 error and 1 warning in 144 ms
  PS C:\Users\dbthd\Documents\TIL\docs\Webpack\Sample\Module> npx webpack
  assets by status 1.17 KiB [cached] 1 asset
  ./src/index.js 1.06 KiB [built] [code generated]
  ./src/mathUtil.js 280 bytes [built] [code generated]
  ./src/log.js 375 bytes [built] [code generated]
  
  WARNING in configuration
  The 'mode' option has not been set, webpack will fallback to 'production' for this value. Set 'mode' option to 'development' or 'production' to enable defaults for each environment.
  You can also set it to 'none' to disable any default behavior. Learn more: https://webpack.js.org/configuration/mode/
  
  ERROR in ./src/index.js 1:17-36
  Module not found: Error: Can't resolve 'readline' in 'C:\Users\dbthd\Documents\TIL\docs\Webpack\Sample\Module\src'
  
  webpack 5.15.0 compiled with 1 error and 1 warning in 241 ms
  ```

  에러 메세지가 달라졌는데 readline이라는 node의 외장 모듈을 인식하지 못하여 발생하는 에러

  웹팩이 모듈의 의존 관계를 해석할 때 index.js 파일에 있는 readline 모듈이 node 환경에서 제공해주는 내장 모듈이라고 인식하고 있지 않기에 발생하였음

  웹팩이 실행되고 있는 환경이 node라고 인식시켜주는 문제 해결 가능

  그러기 위해서는 target이라는 키를 설정해야 하는데 target은 웹팩이 어떤 환경에서 실행되는지 웹팩에게 알려주는 역할을 하는데 readline을 내장 모듈로 사용하는 환경인 node라는 값을 target에 적용해주면 에러메세지가 나타나지 않고 실행이 잘 됨

+ command line에서 키를 추가하기

  ```bash
  $ npx webpack --target=node
  ```

+ dist 폴더 내에 main.js 파일 생성 확인

  ```js
  (()=>{var e={151:e=>{e.exports={logInput:e=>`입력받은 값 : ${e}`,logResult:(e,o)=>`${e}의 넓이는 ${o} 입니다.`,logFigureError:"지원되지 않는 도형입니다. '정사각형' 또는 '원'을 입력해주세요. \n커맨드 라인을 종료합니다."}},786:e=>{e.exports={PI:3.14,getCircleArea:e=>e*e*3.14,getSqureArea:e=>e*e}},58:e=>{"use strict";e.exports=require("readline")}},o={};function r(t){if(o[t])return o[t].exports;var s=o[t]={exports:{}};return e[t](s,s.exports,r),s.exports}(()=>{const e=r(58).createInterface({input:process.stdin,output:process.stdout}),{getCircleArea:o,getSqureArea:t}=r(786),{logInput:s,logResult:l,logFigureError:c}=r(151);e.question("넓이를 구하고자 하는 도형의 종류를 입력해주세요, ( 정사각형, 원 ) : ",(r=>{switch(console.log(`선택된 도형: ${r}`),r){case"정사각형":e.question("변의 길이를 입력해주세요 : ",(o=>{console.log(s(o)),console.log(l(r,t(o))),e.close()}));break;case"원":e.question("반지름의 길이를 입력해주세요 : ",(t=>{console.log(s(t)),console.log(l(r,o(t))),e.close()}));break;default:console.log(c),e.close()}}))})()})();
  ```

  이런 설정으로 번들링을 하게 되면 소스코드를 최적화하는 과정이 기본적으로 들어가 있어 파일을 보면 알아보기가 힘듦

+ bundle 파일이 잘 만들어졌는지 직접 실행

  ```bash
  $ node ./dist/main.js
  ```

  명령어로 웹팩을 실행하는 것도 좋지만 웹팩 설정 파일을 통해 이용하는 방법도 있음

### 설정 파일 안에서 웹팩을 직접 관리

+ webpack.config.js 파일 생성

  ```js
  // __dirname, path module
  
  module.exports = {
      entry: './src/index.js',
  }
  ```

  entry를 설정하고 output을 설정해야 하는데 bundle 파일의 이름과 bundle이 생성되는 파일 경로를 작성하면 됨

  파일이 생성되는 path 경로는 절대 경로로 설정해 주어야 하므로 node 환경에서 제공되는 `__dirname`이라는 변수를 이용해 파일 경로를 만들 것인데 `__dirname`은 변수를 사용하는 파일의 절대 경로를 담고 있음

  node에서 제공해주는 path 모듈도 함께 이용하는데 output을 위해 사용하는 내장 모듈과 변수를 test 파일에서 먼저 확인

+ pathTest.js 생성

  ```js
  const path = require('path');
  
  console.log(__dirname);
  
  const pathTest = path.resolve(__dirname, 'abc');
  console.log(pathTest);
  ```

  path 모듈은 파일 경로를 쉽게 조작할 수 있도록 도와주는 기능이 있는데 path 모듈을 이용해 `__dirname`과 함께 bundle 파일의 경로를 설정 파일에서 조합할 예정

+ 경로 확인

  ```bash
  $ node ./pathTest.js
  ```

  ```bash
  C:\Webpack\Sample\Module
  C:\Webpack\Sample\Module\abc
  ```

  첫 번째 dirname은 Module 폴더 까지의 절대 경로가 확인되며 두 번째 파라미터로 'abc'를 넘겨주어 /와 함께 'abc'라는 문자열이 dirname 경로와 조합되서 출력되는 것을 확인 가능

+ webpack 설정 파일에 모듈을 이용해 적용

  ```js
  // __dirname, path module
  
  const path = require('path');
  
  module.exports = {
      entry: './src/index.js',
      output: {
          path: path.resolve(__dirname, 'dist'),
          filename: 'bundle.js'
      }
  }
  ```

  그 다음 노드 환경을 인식시켜야 하기 때문에 target이라는 키를 추가한 다음 node라는 target의 키 값을 할당해야 함

+ target 추가

  ```js
  // __dirname, path module
  
  const path = require('path');
  
  module.exports = {
      entry: './src/index.js',
      output: {
          path: path.resolve(__dirname, 'dist'),
          filename: 'bundle.js'
      },
      target: 'node'
  }
  ```

  설정 파일이 완성되었고 cli를 통해 진행된 것과의 차이점 중 하나는 cli에서는 bundle 파일의 이름이 name.js 였는데 현재 만든 파일은 bundle.js로 main.js라는 이름과 다르다는 것을 알 수 있는데 잘 진행이 된다면 dist 폴더 안에 bundle.js라는 파일이 생성된 것을 확인 가능

+ 웹팩 실행

  ```bash
  $ npx webpack
  ```

+ dist 폴더 내에 bundle.js 확인

  ```js
  (()=>{var e={151:e=>{e.exports={logInput:e=>`입력받은 값 : ${e}`,logResult:(e,o)=>`${e}의 넓이는 ${o} 입니다.`,logFigureError:"지원되지 않는 도형입니다. '정사각형' 또는 '원'을 입력해주세요. \n커맨드 라인을 종료합니다."}},786:e=>{e.exports={PI:3.14,getCircleArea:e=>e*e*3.14,getSqureArea:e=>e*e}},58:e=>{"use strict";e.exports=require("readline")}},o={};function r(t){if(o[t])return o[t].exports;var s=o[t]={exports:{}};return e[t](s,s.exports,r),s.exports}(()=>{const e=r(58).createInterface({input:process.stdin,output:process.stdout}),{getCircleArea:o,getSqureArea:t}=r(786),{logInput:s,logResult:l,logFigureError:c}=r(151);e.question("넓이를 구하고자 하는 도형의 종류를 입력해주세요, ( 정사각형, 원 ) : ",(r=>{switch(console.log(`선택된 도형: ${r}`),r){case"정사각형":e.question("변의 길이를 입력해주세요 : ",(o=>{console.log(s(o)),console.log(l(r,t(o))),e.close()}));break;case"원":e.question("반지름의 길이를 입력해주세요 : ",(t=>{console.log(s(t)),console.log(l(r,o(t))),e.close()}));break;default:console.log(c),e.close()}}))})()})();
  ```
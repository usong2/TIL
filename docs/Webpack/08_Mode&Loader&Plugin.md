# 08. Mode & Loader & Plugin

## Mode

### Mode를 공부하기 전...

1. Package.json --save-dev, --save
   + 프로젝트에서 사용하는 외부 모듈을 관리할 때 package.json 파일이 module들을 어떻게 기록하는지 
2. 개발 환경과 프로덕션 환경
3. Mode & Webpack-merge

### package.json

+ 이전에 웹팩을 설치하면서 package.json을 npm 명령어를 통해 만들었음
+ 외부에서 받은 모듈을 package.json에서는 크게 두 가지로 나누고 있음
  1. 프로젝트의 어플리케이션 내부에 직접 포함되는 모듈
     + 예)  jQuery
     + DOM 선택을 쉽게 하기 위해 jQuery를 npm을 통해 설치하면 이 모듈은 어플리케이션이 동작하기 위해 직접적으로 영향을 주는 모듈이 됨
  2. 개발 과정에 필요한 모듈
     + 개발 효율을 높이거나 코드의 컨벤션을 검사하거나 개발자가 작성한 코드의 품질을 높이는 등 개발하는 과정 자체에 영향을 주는 모듈들

#### 위에서 언급한 두 가지 모듈을 구분짓는 key

1. dependencies
   + 어플리케이션 내부에 직접 포함되는 모듈들을 의미
2. devDependencies
   + 개발 과정에 관여하는 모듈들을 의미

따라서 package.json 파일을 봤을 때 dependencies 키의 모듈들을 보면 어플리케이션 내부에 포함된 모듈들을 의미하며 devDependencies 키의 모듈들은 개발 과정에서 어떤 일들이 진행되는지 알 수 있게 됨

#### --save와 --save-dev

현재 npm을 통해 설치하는 모듈이 **devDependencies에 기록되어야 한다**라고 알려주는 것을 의미

1. dependencies: --save
2. devDependencies: --save-dev

이렇게 package.json에 모듈들을 기록하게 되면 다른 환경에서 다시 프로젝트를 셋팅할 때 뒤에 따로 package 명을 일일이 하나씩 붙여서 설치할 필요가 없음

package.json 파일이 있으면 이 파일을 npm 명령어가 읽어 이 파일에 적혀진 모든 모듈들을 설치하게 됨

처음 프로젝트를 셋팅할 때 웹팩과 웹팩 CLI를 직접 작성했었는데 이번엔 node_modules 폴더를 지우고 package.json 파일을 읽어서 모듈들을 설치할 수 있음

### 예제

> package.json 파일을 읽어 모듈을 설치하기

+ 이전 작업 프로젝트에서 node_modules 폴더를 삭제

+ package.json에서 devDependencies 키 확인

  ```json
    "devDependencies": {
      "webpack": "5.15.0",
      "webpack-cli": "4.4.0"
    },
  ```

  webpack과 webpack-cli 외부 모듈들이 있는 지 확인

+ 명령어 실행

  ```bash
  $ npm install
  ```

  node_modules 폴더 생성 확인 및 폴더 내에 webpack과 webpack-cli가 포함되어 정상적으로 설치되있는지 확인

<br />

## Loader

웹팩은 entry를 시작점으로 다양한 파일들을 모듈로 다루는데 Loader는 웹팩의 의존성 그래프를 완성시키는 과정에서 의존 관계를 갖는 **다양한 타입의 모듈들을 입력받아 처리하는 역할**을 함

+ 웹팩이 기본적으로 인식하는 모듈 형태는 js, json 파일이기 때문에 다른 타입의 모듈들은 개별적으로 loader를 준비해 웹팩에 연결시켜주어야 함

### Loader 설정

+ 로더를 설정할 때는 module이라는 키를 웹팩 설정 파일에 추가하는 것으로 시작

  ```js
  module.exports = {
      module: {
          rules: [loader1, loader2]
      }
  }
  ```

  다양한 모듈들을 입력받고 처리하는 점과 연결해보면 키의 이름들을 쉽게 이해할 수 있음

  rules라는 이름의 키를 모듈에 추가하는데 rules는 지원해야 하는 모듈 타입들을 위해 필요한 loader들을 설정하는 공간이므로 rules는 배열 타입을 받고 배열 안에는 사용하고자 하는 loader들을 넣음

  배열 안에 loader에 대한 정보를 넣을 때는 loader 내에 설정된 기본 동작이 적용되도록 loader의 이름을 문자열로 넣는 방법이 있고 loader가 어떻게 동작할지 개발자가 자세하게 설정할 수 있는 객체 형태로 넣는 방법이 있음

### 예제

> css 파일을 모듈로 읽어보는 설정

+ webpack-practice 폴더 생성

+ package.json 생성

  ```bash
  $ npm init -y
  ```

+ webpack과 webpack-cli 설치

  ```bash
  $ npm install webpack webpack-cli --save-dev
  ```

+ 브라우저에서 확인할 수 있도록 index 파일 생성

  ```html
  <!-- index.html -->
  
  <!DOCTYPE html>
  <html>
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Webpack Practice</title>
  </head>
  <body>
      <script src="./dist/bundle.js"></script>
  </body>
  </html>
  ```

  ```js
  /* index.js */
  
  function component() {
    const element = document.createElement("div");
    element.innerHTML = "Hello Webpack";
  
    return element;
  }
  
  document.body.appendChild(component());
  ```

+ 웹팩 설정 파일을 다시 작성

  + 이전에 작업한 예제 환경에서 target key만 제거하는 웹팩 설정 파일을 만들 것인데 target key를 지정하지 않으면 브라우저 환경을 의미하는 web이라는 값이 기본적으로 적용
  + mode는 none 값으로 적용

+ webpack.config.js 생성

  ```js
  const path = require("path");
  
  module.exports = {
    entry: "./index.js",
    output: {
      filename: "bundle.js",
      path: path.resolve(__dirname, "dist"),
    },
    mode: "none",
  };
  ```

+ package.json의 scripts key에 build 키를 만들고 웹팩을 실행하는 명령어를 넣은 다음 웹팩에 번들링 실행

  ```json
  {
    "name": "webpack-practice",
    "version": "1.0.0",
    "description": "",
    "main": "index.js",
    "scripts": {
      "build": "webpack"
    },
    "keywords": [],
    "author": "",
    "license": "ISC",
    "devDependencies": {
      "webpack": "5.16.0",
      "webpack-cli": "4.4.0"
    }
  }
  ```

  ```bash
  $ npm run build
  ```

  bundle 파일이 잘 생성된 것을 확인할 수 있음

  실제로 index.html 파일에서 "Hello Webpack"이라는 텍스트가 잘 나오는 지 확인

  이제 css loader와 style loader를 사용할 것인데 css loader는 css를 모듈로 다루기 위해 사용되는 loader이고, style loader는 css loader를 통해 가져온 css 내용을 style 태그로 생성해서 head 태그 안에 주입하는 역할을 함

  loader들은 외부에서 가져와야 하는 패키지들이기 때문에 npm 명령어로 설치해주어야 하는데 두 loader를 devDependencies를 통해 설치를 해보도록 함

+ style loader와 css loader 설치

  ```bash
  $ npm install style-loader css-loader --save-dev
  ```

+ webpack에 loader를 설정

  module key와 rules 안에 loader를 만들어야 함

  ```js
  const path = require("path");
  
  module.exports = {
    entry: "./index.js",
    output: {
      filename: "bundle.js",
      path: path.resolve(__dirname, "dist"),
    },
    module: {
      rules: [
        {
          test: /\.css$/i,
          use: [
            "style-loader",
            {
              loader: "css-loader",
            },
          ],
        },
      ],
    },
    mode: "none",
  };
  ```

  test는 어떤 파일들이 loader에 대상이 되는지 정규표현식을 통해 패턴 매칭 식으로 설정할 수 있고 use는 사용하는 loader를 지정하는 loader key와 loader의 동작을 변경할 수 있는 options라는 key를 사용하는데 options key는 이후에 다룰 예정

+ 스타일 통일

  브라우저 별로 적용되는 userAgent 스타일을 통일시킬 필요가 있으므로 normalize.css 파일을 불러와 스타일 적용

  style 작업 시 개별적으로 우선 적용되는 스타일 때문에 제 각기 다른 모습으로 보일 수 있기 때문

  **userAgent 스타일을 표준화 시키는 방법 두 가지**

  1. reset.css
     + 적용된 스타일을 대부분 제거해주는 역할
  2. normalize.css
     + 적용된 스타일 중 다르게 적용되는 스타일 부분들만 같게 만들어주는 역할

+ normalize.css 설치

  ```bash
  $ npm install normalize.css --save
  ```

  node_modules 폴더 내에 css 파일 저장 확인

+ CSS 파일을 불러오기

  ```js
  /* index.js */
  
  import "normalize.css";
  
  function component() {
    const element = document.createElement("div");
    element.innerHTML = "Hello Webpack";
  
    return element;
  }
  
  document.body.appendChild(component());
  ```

+ CSS 파일 만들어 불러오기

  ```css
  /* index.css */
  
  div {
    color: red;
  }
  ```

  ```js
  /* index.js */
  
  import "normalize.css";
  import "./index.css";
  
  function component() {
    const element = document.createElement("div");
    element.innerHTML = "Hello Webpack";
  
    return element;
  }
  
  document.body.appendChild(component());
  ```

+ bundle 과정 진행

  ```bash
  $ npm run build
  ```

  브라우저의 개발자 도구를 확인하면 head 태그 안에 style 태그가 추가된 것을 확인 가능

+ css 모듈 설정

  ```js
  const path = require("path");
  
  module.exports = {
    entry: "./index.js",
    output: {
      filename: "bundle.js",
      path: path.resolve(__dirname, "dist"),
    },
    module: {
      rules: [
        {
          test: /\.css$/i,
          use: [
            "style-loader",
            {
              loader: "css-loader",
              options: {
                modules: true,
              },
            },
          ],
        },
      ],
    },
    mode: "none",
  };
  ```

  css 모듈을 설정하는 내용은 css loader의 저장소에서 찾아볼 수 있음

  loader의 자세한 내용들은 각각 저장소에 따로 있기 때문에 github에서 검색한 후 README 파일을 확인하면 됨

  + [https://github.com/webpack-contrib/css-loader](https://github.com/webpack-contrib/css-loader)
  + README에서 options 파트의 내용을 읽어보면 modules라는 키를 찾을 수 있는데 이 키가 css modules 키에 대한 사용 여부를 설정한다는 내용을 확인 가능
  + css loader에서 options 키를 추가하고 그 안에 modules라는 키의 값을 true로 설정하면 됨

  ```css
  /* index.css */
  
  div {
    color: red;
  }
  
  .hellowebpack {
    color: blue;
  }
  ```

  ```js
  /* index.js */
  
  import "normalize.css";
  import styles from "./index.css";
  
  function component() {
    const element = document.createElement("div");
    element.innerHTML = "Hello Webpack";
  
    console.log(styles);
  
    element.classList = styles.helloWebpack;
  
    return element;
  }
  
  document.body.appendChild(component());
  ```

  css는 선택자의 이름이 전역 환경으로 적용되기 때문에 어플리케이션 규모가 커졌을 때도 선택자 이름에 충돌이 없도록 신경써주어야 함

  css modules라는 설정을 해주면 css 파일을 module로 불러오고 클래스 이름들을 자바스크립트 파일에 직접 불러와서 사용할 수 있음

  그래서 css modules 설정을 하면 css 파일별로 클래스의 이름이 같아도 겹치지 않는다는 장점이 있음

  위에서 작성한 내용은 css 파일을 모듈로 불러와서 div Element에 적용하고 모듈 안에서 어떻게 css 내용이 불러와지는지 확인할 수 있도록 console로 출력하도록 함

+ 실행

  ```bash
  $ npm run build
  ```

  console에 가보면 style 파일에 있는 클래스 이름이 객체 키로 전달되고 키의 값은 변형된 해시값이 할당되는 것을 확인할 수 있음

+ style loader의 옵션 설정

  style loader는 처리하는 css 파일별로 스타일 태그를 만듦

  스타일 태그 하나에서 한 번에 스타일 정보들을 읽어올 수 있도록 옵션 적용

  ```js
  const path = require("path");
  
  module.exports = {
    entry: "./index.js",
    output: {
      filename: "bundle.js",
      path: path.resolve(__dirname, "dist"),
    },
    module: {
      rules: [
        {
          test: /\.css$/i,
          use: [
            {
              loader: "style-loader",
              options: {
                injectType: "singletonStyleTag",
              },
            },
            {
              loader: "css-loader",
              options: {
                modules: true,
              },
            },
          ],
        },
      ],
    },
    mode: "none",
  };
  ```

+ 실행

  ```bash
  $ npm run build
  ```

  index.html 파일을 새로고침하면 style 태그가 두개로 쪼개져 있던 것이 style 태그가 하나만 보이는 것을 확인 가능


<br />

## Plugin

+ 플러그인은 웹팩이 동작하는 자체적인 과정에 개입할 수 있어 웹팩이 동작하는 과정 전반적으로 여러 가지 역할을 함

  + Bundle 파일에 변화를 줌
  + 개발 모드에서 개발 편의성을 제공
  + 프로덕션 모드에서 코드 최적화 진행

+ 플러그인 설정

  ```js
  module.exports = {
      plugins: [ new Plugin({ ...option }), ... ]
  }
  ```

### 예제

#### html-webpack-plugin

bundler를 위한 html 파일을 자동으로 만들어주고 설정

플러그인은 로더와 다르게 웹팩 패키지 내부에 있는 플러그인과 외부 저장소에서 관리되는 플러그인으로 나뉘는데 이번에 사용할 플러그인은 외부 저장소에서 관리되는 플러그인

+ 설치

  ```bash
  $ npm i html-webpack-plugin -D
  # npm install html-webpack-plugin --save-dev
  ```

+ 모듈을 불러와 적용

  ```js
  const path = require("path");
  const HtmlWebpackPlugin = require("html-webpack-plugin");
  
  module.exports = {
    entry: "./index.js",
    output: {
      filename: "bundle.js",
      path: path.resolve(__dirname, "dist"),
    },
    module: {
      rules: [
        {
          test: /\.css$/i,
          use: [
            {
              loader: "style-loader",
              options: {
                injectType: "singletonStyleTag",
              },
            },
            {
              loader: "css-loader",
              options: {
                modules: true,
              },
            },
          ],
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: "./template.html",
      }),
    ],
    mode: "none",
  };
  ```

  설치한 플러그인을 불러오고 plugins key에 설치한 플러그인에 대한 객체를 추가했는데 외부 저장소에서 관리되는 플러그인은 loader와 마찬가지로 각각의 저장소의 README에서 어떤 옵션을 설정할 수 있는지 기록이 되어 있기 때문에 자세히 확인 가능

  template이라는 key를 먼저 사용할 예정인데 이는 자동으로 생성되는 html 문서가 특정 파일을 기준으로 만들어지게끔 파일을 지정해주는 역할을 함

  template key에 지정된 파일을 이용해서 html 문서가 자동으로 생성되는 것인데 template을 설정하기 위해 기존에 만들어진 index.html 파일을 template.html 파일로 변경하여 플러그인 객체에 template.html 파일 경로를 지정함

+ index.html -> template.html

  ```html
  <!DOCTYPE html>
  <html>
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Webpack Practice</title>
  </head>
  <body>
  </body>
  </html>
  ```

+ html 파일 생성 확인

  ```bash
  $ npm run build
  ```

  dist 폴더 내에 index.html 파일 생성을 확인 가능

  이전에 웹팩 설정 파일에서 output key에 bundle 파일에 어디에 위치해 있고 파일 이름을 무엇으로 할 지에 대해서 설정했었는데 생성된 html 파일은 output의 정보들을 이용해서 bundle된 리소스들을 불러올 수 있도록 script 태그나 link 태그를 추가해 줌 

  그러므로 **직접 script 파일을 사용해서 bundle 파일의 경로를 지정할 필요가 없어짐**

  template.html에서 기존의 bundle 파일을 불러오는 script를 제거해주었지만 새로 생성된 html 파일에서는 script가 자동으로 추가된 것을 확인 할 수 있음

  또 웹팩의 설정 내용이 바뀌면 그대로 html 파일도 업데이트가 되기 때문에 개발 중에 신경써야 하는 부분들이 조금 줄게 됨


# 04. Vue CLI로 생성된 파일 살펴보기

Vue CLI 옵션 중 webpack 옵션을 이용하여 프로젝트를 세팅하고 나면 프로젝트 제목에 해당하는 디렉터리가 하나 생성된다. webpack 옵션의 기본값으로 설정을 원한다면 모든 옵션에 'Y' 혹은 엔터를 치면 된다. 

```bash
$ vue init webpack hello-world
```

프로젝트의 내부를 살펴보면 Vue CLI가 자동으로 생성해놓은 여러 가지 디렉터리와 파일들을 볼 수 있다. 파일 이름 앞에 마침표(.)가 붙은 파일들은 Linux나 Unix 기반의 운영체제에서 숨김 파일 의미하므로 보이지 않을 수도 있지만, IDE로 해당하는 프로젝트를 불러오면 모두 노출된다. 생성된 파일과 디렉터리들은 표와 같은 구조를 가진다. 

```
├─ .babelrc
├─ .editorconfig
├─ .eslintignore
├─ .eslintrc.js
├─ .gitignore
├─ .idea
├─ .postcssrc.js
├─ README.md
├─ build
├─ config
├─ index.html
├─ node_modules
├─ package.json
├─ src
├─ static
├─ test
```

초기 생성된 파일과 디렉터리들에 대해 하나씩 살펴보도록 하자.

<br>

## 4.1 .babelrc

많은 모던 웹 브라우저들이 JavaScript ECMAScript 2015(이하 ES6) 문법을 어느 정도 지원해주긴 하지만 아직 지원이 부족한 상황이기 때문에 크로스 브라우징(Cross Browsing)을 위해 코드를 ES5로 변환해주어야 한다. 이때 주로 바벨(babel)이라는 도구를 사용하여 ES6 문법을 ES5 문법으로 트랜스파일링(Transpiling)하게 되는데 .babelrc에는 바벨에 대한 세팅이 정의되어 있다. 

```json
{
  "presets": [
    ["env", {
      "modules": false,
      "targets": {
        "browsers": ["> 1%", "last 2 versions", "not ie <= 8"]
      }
    }],
    "stage-2"
  ],
  "plugins": ["transform-vue-jsx", "transform-runtime"],
  "env": {
    "test": {
      "presets": ["env", "stage-2"],
      "plugins": ["transform-vue-jsx", "transform-es2015-modules-commonjs", "dynamic-import-node"]
    }
  }
}

```

가장 중요한 presets 속성만 우선 짚고 넘어가자면 이 속성에는 바벨이 어떤 문법까지 트랜스파일링을 해줄 수 있느냐가 정의되어 있다. Vue CLI는 기본적으로 env와 stage-2 프리셋을 세팅해주는데, 이 중 env는 바벨(babel)의 가장 기본적인 프리셋이다. env 프리셋은 기본적인 설정 외에도 추가적으로 다른 옵션들을 사용할 수 있다. modules는 ES6의 module문법을 다른 문법으로 변경해주도록 지정하는 역할을 하지만 Vue CLI에서는 webpack을 사용하여 모듈링(moduling)을 진행하기 때문에 굳이 문법을 변경할 필요는 없어서 false로 선언되어 있다. 그리고 targets는 이 프로젝트가 어느 브라우저까지 지원할 것인지를 정의해놓은 속성이다. Stage-2라는 것은 JavaScript의 표준 명세를 정의하는 단계 중 하나인데, Stage-0부터 Stage-4까지 있으며 숫자가 작을수록 미승인에 가깝다고 볼 수 있고 이 중 Stage-4는 우리가 지금 사용하는 자바스크립트의 표준을 의미한다. 즉, 바벨은 아직 논의가 끝나지 않아 표준이 되지는 않았지만 편리한 기능들을 사용할 수 있도록 도와주는 것이다. 

<br>

## 4.2 .editorconfig

.editorconfig 파일은 코드에 영향을 미치는 것이 아닌 여러 가지 IDE에서 통일된 코딩 스타일을 유지할 수 있게 도와주는 파일이다. indent나 파일의 인코딩 형식 등 코딩 스타일에 대한 설정이 정의되어 있다. WebStorm과 intelliJ와 같이 .editorconfig 플러그인이 기본적으로 내장되어 있기도 하지만 별도의 플러그인으로 설치해줘야 하는 경우도 있다. 실습에서 주로 이용하게 될 VSCode에서는 과거에는 별도로 관련 플러그인 설치를 해줘야 .editorconfig 파일이 적용되었지만, 현재는 내장 기능으로 포함되어 별도의 플러그인이 없어도 설정을 적용할 수 있다. 

<br>

## 4.3 .eslintrc.js

린터(Linter)란 코딩 컨벤션(Coding convention)과 관련된 에러(Error)를 체크해주는 작은 프로그램이다. 코딩 컨벤션이란 읽기 쉽고 관리하기 쉬운 코드를 작성하기 위한 일종의 코딩 스타일에 대한 약속이라고 할 수 있다. 간단하게 if문을 통해 알아보자. 

```javascript
// 첫 번째 스타일
if (isTrue) {
    // ...
} else {
    // ...
}

// 두 번째 스타일
if (isTrue)
{
    // ...
}
else
{
    // ...
}
```

위에서 보는 것과 같이 첫 번째 스타일과 두 번째 스타일 동작에는 아무런 문제가 없지만, 코드 스타일이 다른 것을 볼 수 있다. 특히 자바스크립트는 다른 언어에 비해 유연한 문법 구조를 가지고 있기 때문에 이런 현상이 다른 언어에 비해 좀 더 두드러진다. 어떻게 보면 사소한 이런 문제는 많은 사람이 동시에 작업하는 프로젝트에서 코드를 읽기 힘들게 만들고, 개발자의 의도치 않은 실수를 발생시키는 원인이 되기도 하므로 보통 코딩 컨벤션을 정하고 린터를 통해서 이 컨벤션을 지키도록 강제하는 것이다. 

자바스크립트를 사용할 때는 ESLint라는 도구를 주로 사용하여 이 과정을 진행하는데, 따로 설치 후 실행시켜서 사용할 수도 있고 IDE의 플러그인으로 들어있는 경우도 있다. Vue CLI를 사용할 때는 프로젝트를 생성할 때 Webpack이 빌드를 진행할 때 린터를 통한 코딩 컨벤션 검사도 같이 수행하도록 설정할 수 있다. 물론 컨벤션을 지키지 않았다면 빌드는 실패한다. .eslintrc.js는 이런 코딩 컨벤션에 대한 설정 파일이다. 
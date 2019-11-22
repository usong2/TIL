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




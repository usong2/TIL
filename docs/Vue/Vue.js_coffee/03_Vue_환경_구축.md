# 03. Vue 환경 구축하기

NodeJS 환경까지 구축을 마쳤다면 이제 본격적으로 개발을 시작할 준비가 거의 끝났다. 이제 필요한 것은 개발 시 유용하게 사용할 수 있는 몇 가지 도구를 설치하면 된다. 

<br>

## 3.1 Vue Devtools

Vue Devtools는 웹 브라우저인 Google Chrome과 Mozila Firefox에서 사용할 수 있는 확장애플리케이션이다. Vue를 사용한 애플리케이션을 개발할 때 도움을 주는 유용한 툴로서, 애플리케이션의 구조 및 데이터 흐름을 디버깅할 때 유용하다. 별도로 설정을 변경하지 않으면 개발용 빌드에서는 사용할 수 있지만 배포용 빌드에서는 사용할 수 없다. 만약 상용 환경에서 해당 기능을 사용하려고 했을 때는 아래와 같이 나오는 것을 확인할 수 있다. 

`Vue.js is detected on this page. Devtools inspection is not avilable because it's in production mode or explicitly disabled by the author.`

<br>

> Vue 프로젝트를 빌드할 시, Vue.config.devtools가 개발용은 true로 설정되어 있고, 배포용 빌드에서는 false로 설정되어 있다. 배포용 빌드에서 해당 값을 true로 설정하면 상용환경에서도 Vue Devtools를 사용할 수 있다. 그러나 Vue Devtools를 사용하여 누구든지 애플리케이션의 구조와 데이터 흐름을 파악할 수 있으므로 특별한 경우가 아니라면 추천하지 않는다. 

<br>

Vue Devtools는 간단하게 설치할 수 있는데, 첫 번째 방법은 Google에 접속하여 vue devtools라고 검색한 후 제일 상단에 노출되는 링크를 클릭하면 된다. 그러면 Google Chrome의 웹 스토어로 이동된다. Firefox 사용자는 vue devtools firefox로 검색하면 마찬가지로 제일 상단에 Firefox Add-ons로 이동할 수 있는 링크가 나온다. 이 페이지에서 Chrome에 추가를 클릭함으로써 간단하게 설치할 수 있다. 

두 번째 방법으로는 크롬 확장 프로그램에서 직접 검색해서 설치하는 방법이다. 크롬 브라우저의 오른쪽 상단의 툴바에서 접근하는 법을 찾을 수 있다. 오른쪽 상단의 더보기 버튼을 누른 후  도구 더보기 탭 안에 확장 프로그램 링크를 클릭하면 된다. 확장 프로그램 페이지의 왼쪽 상단 버튼을 누르면 하단에 Chrome 웹 스토어 열기라는 버튼을 볼 수 있다. 왼쪽 상단 메뉴에서 vue devtools를 검색하면 첫 번째로 Vue.js devtools라는 항목이 노출된다. 설치하려는 프로그램 항목의 Chrome에 추가 버튼을 누르면 Vue.js devtools'을(를) 추가하시겠습니까? 팝업창이 뜨면서 설치를 완료할 수 있다. 

<br>

## 3.2 Vue CLI

### 설치방법 

Vue 프레임워크는 애플리케이션 환경을 쉽고 바르게 구출 할 수 있는 CLI(Command Line Interface)를 제공해준다. 

> **CLI**는 Command Line Interface의 약자로서, 텍스트 터미널을 통한 사용자와 컴퓨터의 상호 작용 방식 의미Vue CLI를 이용하기 위해서는 NodeJS 6.x 버전 이상, npm3 버전 이상의 환경이 설치되어 있어야 한다. 

<br>

Vue CLI의 설치를 위해서 먼저 터미널 혹은 CMD에 설치 명령어를 입력한다. 

```bash
$ npm install vue-cli -g
```

> npm install은 명령어 그대로 NodeJS Package를 설치하겠다는 명령어다. 이 명령어에 -g 옵션을 이용하면 해당 모듈을 해당 디렉터에서뿐 아니라 어디서든 사용할 수 있도록 전역 설치하게 된다. -g 옵션을 주지 않았을 경우에는 모듈이 설치될 때 명령어를 입력한 디렉터리 안에서만 지역적으로 사용할 수 있게 된다. Vue CLI는 이 실습에서 진행하는 프로젝트뿐 아니라 다른 프로젝트를 진행할 때도 설치없이 바로 사용할 수 있도록 전역 설치를 하도록 한다. 

<br>

@vue/cli-servce를 설치하면 CLI 3.x 버전으로 이용할 수 있다. 하지만 이 실습에서의 예제 및 설명은 Vue CLI 2.x 버전을 기준으로 다루기 때문에 vue-cli 모듈을 설치한다. 

> Vue CLI 3.x 버전과 Vue CLI 2.x 버전은 프로젝트를 생성할 때 기본적으로 생성되는 디렉터리 구성이 다르다. 이 실습에서는 Vue CLI 2.x 버전을 사용하여 진행할 예정인데, 이는 Vue CLI 2.x 버전의 경우 개발자가 직접 설정 파일을 확인할 수 있다는 점 때문이다. Vue CLI 3.x 버전은 따로 옵션을 지정하지 않는다면 간단하게 프로젝트를 시작할 수 있도록 설정 파일을 감춰둔다. Vue CLI 2.x 버전을 이용함으로써 웹팩(Webpack) 같은 빌드 도구나 린터(linter) 혹은 바벨(babel)과 같은 트랜스파일러에 대한 설정이 익숙해질 수 있다.  

<br>

Vue CLI의 설치가 완료되었다면 마찬가지로 터미널에서 명령어를 이용하여 설치 유무 및 버전 정보를 확인한다. 정상적으로 설치가 완료되었다면 설치한 버전이 노출된다. 

```bash
$ vue -V # 혹은 vue --version
```

<br>

만약 Vue CLI 3.x 버전을 사용하고 있다고 하더라도 Vue CLI 2.x 버전을 사용하는데 문제는 없다. 만약 이미 Vue CLI의 버전이 3.x 버전이 설치되어 있다면 @vue/cli-init을 글로벌로 설치한 후 실습을 진행하도록 한다. 

```bash
$ npm install @vue/cli-init -g
```

<br>

### 각 옵션 살펴보기

Vue CLI를 이용해서 프로젝트를 초기화하는 기본 명령어는 다음과 같다. 

```bash
$ vue init <template-name> <project-name>
```

홑화살괄호 안쪽은 직접 입력하면 된다. 그중에서 눈여겨봐야 할 것은 template-name 영역이다. 이 영역에는 Vue CLI에서 정의하는 옵션 6개 중 하나를 입력해야 한다. 그 옵션 6개는 다음과 같다. 

+ **webpack** : webpack 빌드 도구와 vue-loader를 이용하는 풀옵션으로서, 선택에 따라 linter, router, css 전처리, 테스팅 도구들을  사용할 수 있다. 
+ **webpack-simple** : webpack 빌드 도구와 vue-loader를 이용하는 옵션으로서, 작은 애플리케이션을 구축하는 데 용이하다. 
+ **browserify** : browserify와 vueifty를 이용하는 풀옵션으로서, 선택에 따라 linter와 단위 테스팅 도구를 사용할 수 있다. 
+ **browserify-simple** : browserify와 bueify를 이용하는 간단한 옵션으로서, 작은 애플리케이션을 구축하는 데 용이하다. 
+ **pwa-webpack** : 빌드 도구를 이용하는 PWA 기반의 애플리케이션을 만드는 데 용이하다. 
+ **simple** : 하나의 HTML 파일 안에서 Vue 컴포넌트로 개발하기에 용이하다. 

<br>

이 리스트는 아래의 명령어를 통해서도 살펴볼 수 있다. 

```bash
$ vue list
```


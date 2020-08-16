## create-react-app

create-react-app은 리액트로 웹 애플리케이션을 만들기 위한 환경을 제공한다. 
앞에서 다룬 바벨과 웹팩도 create-react-app에 포함되어 있다. 그 밖에 테스트 시스템, HMR(hot-module-replacement), ES6+ 문법, CSS 후처리 등 거의 필수라고 할 수 있는 개발 환경도 구축해 준다. 이러한 개발 환경을 직접 구축할 경우 시간이 오래 걸릴 뿐 아니라 유지 보수도 해야 한다. create-react-app를 이용하면 기존 기능을 개선하거나 새로운 기능을 추가했을 때 패키지 버전만 올리면 된다. 

또 다른 장점은 어떤 문제를 해결하기 위한 선택지가 여러 개일 때 create-react-app에서 가장 합리적인 선택을 해 준다는 점이다. 현재 자바스크립트 생태계는 춘추전국 시대라 할 만하다. 지금 이 순간에도 새로운 패키지가 엄청나게 쏟아져 나온다. 기존에 가장 좋은 방법이라 여겨졌던 것이 새로운 방법으로 대체되는 경우도 있다. 그만큼 우리에게는 하나의 문제를 해결하기 위한 다양한 선택지가 있고, 이들 가운데 하나를 선택해야 하는 상황을 자주 맞딱뜨리게 된다. 여러 선택지 가운데 하나를 고르기 위해서는 각각의 장단점을 공부해야 하므로 시간이 많이 든다. create-react-app을 사용하면 이 시간을 좀 더 아낄 수 있다. 

### create-react-app 사용해 보기

다음 명령어를 입력하면 create-react-app을 이용한 개발 환경이 설치된다. 

```bash
$ npx create-react-app cra-test
```

create-react-app 패키지가 설치되어 있지 않더라도 npx가 자동으로 가져와서 실행한다. 만약 npm 버전이 낮아서 실행이 안 된다면 다음과 같이 입력한다. 

```bash
$ npm install -g create-react-app
$ create-react-app cra-test
```

실행 후에는 cra-test 폴더가 생성되고 그 안에 몇 개의 폴더와 파일이 들어 있다. 

```bash
$ cd cra-test
$ npm start
```

빌드가 끝나면 자동으로 브라우저에서 새 탭이 열리고 렌더링된 페이지를 볼 수 있다. 이렇게 자동으로 브라우저를 띄워 주는 소소한 기능이 create-react-app의 매력 포인트 중 하나다. 

이 상태로 App.js 파일에서 Learn React 부분을 다른 텍스트로 수정해 보자. 브라우저의 화면이 자동으로 업데이트되는 것을 확인할 수 있다. 이번에는 App.css 파일에서 .App-link의 색상을 red로 변경해 보자. 마찬가지로 변경된 색상을 바로 확인할 수 있다. 이는 HMR이라는 이름의 기능 덕분인데, npm start 실행 시 create-react-app이 로컬 서버를 띄워 주기 때문에 가능한 일이다. 참고로 npm start는 개발 모드에서 동작하므로 배포할 때 사용하면 안 된다. 

create-react-app에서 자동으로 생성한 파일을 살펴보자. 다음은 자동으로 생성된 cra-test 폴더의 내부 구조이다. 

```bash
cra-test
├── README.md
├── node_modules
├── package.json
├── public
│   └── favicon.ico
│   └── index.html
└── src
    └── App.css
    └── App.js
    └── App.test.js
    └── index.css
    └── index.js
    └── logo.svg
    └── serviceWorker.js
```

index.html, index.js 파일은 빌드 시 예약된 파일 이름이므로 지우면 안 된다. index.html, index.js, package.json 파일을 제외한 나머지 파일은 데모 앱을 위한 파일이기 때문에 마음대로 수정하거나 삭제해도 괜찮다. index.js로부터 연결된 모든 자바스크립트 파일과 CSS 파일은 src 폴더 밑에 있어야 한다. src 폴더 바깥에 있는 파일을 import 키워드를 이용해서 가져오려고 하면 실패한다. 

index.html에서 참조하는 파일은 public 폴더 밑에 있어야 한다. public 폴더 밑에 있는 자바스크립트 파일이나 CSS 파일을 link나 script 태그를 이용해서 index.html에 포함시킬 수 있다. 하지만 특별한 이유가 없다면 index.html에 직접 연결하는 것보다는 src 폴더 밑에서 import 키워드를 사용해서 포함시키는 게 좋다. 그래야 자바스크립트 파일이나 CSS 파일의 경우 빌드 시 자동으로 압축된다. 

이미지 파일이나 폰트 파일도 마찬가지로 src 폴더 밑에서 import 키워드를 사용해서 포함시키는 게 좋다. 웹팩에서 해시값을 이용해서 url을 생성해주기 때문에 파일의 내용이 변경되지 않으면 브라우저 캐싱 효과를 볼 수 있다. 

파일을 참조하는 경우 외에도 index.html 내용을 직접 수정해도 괜찮다. 대표적으로 title 태그에서 제목을 직접 입력하는 경우를 예로 들 수 있다. 그런데 제목을 페이지별로 다르게 줘야 한다면 문제가 될 수 있다. 만약 사내에서만 쓰는 웹사이트라면 react-helmet과 같은 패키지를 사용하면 된다. 반대로 일반 사용자를 대상으로 하는 웹사이트라서 검색 엔진 최적화를 해야 한다면 문제는 복잡해진다. 검색 엔진 최적화가 중요하다면 create-react-app보다는 서버사이드 렌더링에 특화된 넥스트(next.js)를 사용하는 게 좋다. 

serviceWorker.js 파일에는 PWA(progressive web app)와 관련된 코드가 들어 있다. PWA는 오프라인에서도 잘 동작하는 웹 애플리케이션을 만들기 위한 기술이다. create-react-app으로 프로젝트를 생성하면 PWA 기능은 기본적으로 꺼져 있는 상태이다. PWA 기능을 원한다면 index.js 파일에 serviceWorker.register(); 코드를 넣으면 된다. 

### 주요 명령어 알아보기

package.json 파일을 열어보면 네 가지 npm 스크립트 명령어를 확인할 수 있다. 

1. 개발 모드로 실행하기

   ```bash
   $ npm start
   ```

   npm start는 개발 모드로 프로그램을 실행하는 명령어이다. 개발 모드로 실행하면 HMR이 동작하기 때문에 코드를 수정하면 화면에 즉시 반영된다. HMR이 없다면 코드를 수정하고 브라우저에서 수동으로 새로고침을 해야 하므로 번거롭다. 개발 모드에서 코드에 에러가 있을 때는 브라우저에 에러 메시지가 출력된다. 

   에러 메시지가 출력된 영역을 클릭하면 에러가 발생한 파일이 에디터에서 열린다. 이는 create-react-app의 섬세함을 느낄 수 있는 기능이다. 

   때에 따라 API 호출을 위해서 https로 실행해야 할 수도 있다. https 환경을 직접 구축하기란 여간 귀찮은 일이 아닌데, 고맙게도 create-react-app에서는 https로 실행하는 옵션을 제공한다. 

   + 맥: HTTPS=true npm start
   + 윈도우: set HTTPS=true && npm start

   이 명령어를 입력하면 실행 자체 서명된 인증서(self-signed certificate)와 함께 https 사이트로 접속한다. 자체 서명된 인증서이기 때문에 안전하지 않다는 경고 문구가 뜨지만 무시하고 진행하면 된다. 

   
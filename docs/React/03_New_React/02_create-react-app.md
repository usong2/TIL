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

2. 빌드하기

   ```bash
   $ npm run build
   ```

   npm run build 명령어는 배포 환경에서 사용할 파일을 만들어 준다. 빌드 후 생성된 자바스크립트 파일과 CSS 파일을 열어 보면 사람이 읽기 힘든 형식으로 압축된 것을 확인할 수 있다. 이렇게 생성된 정적 파일을 웹 서버를 통해서 사용자가 내려받을 수 있게 하면 된다. 로컬에서 웹 서버를 띄워서 확인해 보자. 

   ```bash
   $ npm serve -s build
   ```

   serve 패키지는 노드(node.js) 환경에서 동작하는 웹 서버 애플리케이션이다. 정적 파일을 서비스할 때 간단하게 사용하기 좋다. build/static 폴더 밑에 생성된 파일의 이름에 해시값이 포함되어 있다. 파일의 내용이 변경되지 않으면 해시값은 항상 같다. 새로 빌드를 하더라도 변경되지 않은 파일은 브라우저에 캐싱되어 있는 파일이 사용된다. 따라서 재방문의 경우 빠르게 페이지가 렌더링되는 효과를 볼 수 있다. 

   자바스크립트 파일에서 import 키워드를 이용해서 가져온 CSS 파일은 다음 경로에 저장된다. 

   ```bash
   build/static/css/main.{해시값}.chunk.css
   ```

   여러 개의 CSS 파일을 임포트하더라도 모두 앞의 파일에 저장된다. 자바스크립트 파일에서 import 키워드를 이용해서 가져온 폰트, 이미지 등의 리소스 파일은 build/static/media 폴더 밑에 저장된다. 이미지 파일의 크기가 10킬로바이트 보다 작은 경우에는 별도의 파일로 생성되지 않고 data url 형식으로 자바스크립트 파일에 포함된다. 파일의 크기가 작다면 한 번의 요청으로 처리하는 게 효율적이기 때문이다. 

   이미지 파일의 크기가 10킬로바이트보다 작은 파일(small.jpeg)과 큰 파일(big.jpeg)을 하나씩 준비해서 src 폴더 밑에 저장해 보자. 그리고 App.js 파일에서 두 개의 이미지 파일을 불러오는 코드를 작성해 보자. 

   ```jsx
   // App.js
   
   // ...
   import smallImage from './small.jpeg';
   import bigImage from './big.jpeg';
   
   function App() {
       return (
       	<div className="App">
           	<img src={bigImage} alt="big" />
           	<img src={smallImage} alt="small" />
   // ...
   ```

   지금까지 작업한 내용을 빌드해 보면 media 폴더에는 big.{해시값}.jpeg 파일이 생성된다. 그러나 small.{해시값}.jpeg 파일은 생성되지 않는다. small.jpeg 파일의 내용은 어디에 있을까? main.{해시값}.js 파일에서 data:image를 키워드로 검색해 보면 이미지 파일이 문자열 형태로 자바스크립트 파일에 포함되어 있다는 사실을 확인할 수 있다. 

3. 테스트 코드 실행하기

   ```bash
   $ npm test
   ```

   npm test를 입력하면 테스트 코드가 실행된다. create-react-app에는 제스트(jest)라는 테스트 프레임워크를 기반으로 테스트 시스템 구축되어 있다. create-react-app으로 프로젝트를 생성하면 App.test.js 파일이 생성된다. create-react-app에서는 자바스크립트 파일이 다음 조건을 만족하면 테스트 파일로 인식한다. 

   + `__test__` 폴더 밑에 있는 모든 자바스크립트 파일
   + 파일 이름이 .test.js로 끝나는 파일
   + 파일 이름이 .spec.js로 끝나는 파일

   util.js 파일을 생성해서 간단한 함수를 작성해 보자. 

   ```jsx
   // util.js
   
   export function addNumber(a, b) {
       return a;
   }
   ```

   코드에 버그가 있기 때문에 테스트 코드를 작성하면 실패할 것이다.
   이번에는 util.test.js 파일을 생성해서 addNumber 함수를 테스트하는 코드를 작성해 보자. 

   ```jsx
   // util.test.js
   
   import { addNumber } from './util';
   
   if('add two numbers', () => {
       const result = addNumber(1, 2);
       expect(result).toBe(3);
   });
   ```

   it, expect는 제스트에서 테스트 코드를 작성할 때 사용되는 함수이다. 
   제스트를 실행해서 테스트 결과를 확인해 보자. 

   ```bash
   $ npm test
   ```

   App.test.js 파일은 성공하고 util.test.js 파일은 실패한다. util.js 파일의 버그를 수정해서 저장해 보자. 테스트 프로그램이 watch 모드로 동작하고 있기 때문에 util.test.js 테스트가 성공하는 것을 바로 확인할 수 있다. 

   CI(continuous integration)와 같이 watch 모드가 필요 없는 환경에서는 다음 명령어로 테스트 코드를 실행한다. 

   + 맥: CI=true npm testtj윈도우: set "CI=true" && npm test
   
4. 설정 파일 추출하기

   ```bash
   $ npm run eject
   ```

   npm run eject를 실행하면 숨겨져 있던 create-react-app의 내부 설정 파일이 밖으로 노출된다. 이 기능을 사용하면 바벨이나 웹팩의 설정을 변경할 수 있다. 이 기능의 단점은 create-react-app에서 개선하거나 추가된 기능이 단순히 패키지 버전을 올리는 식으로 적용되지 않는다는 점이다. 이 기능은 리액트 툴체인에 익숙한 사람이 아니라면 추천하지 않는다. npm run eject 외에도 create-react-app의 설정을 변경할 방법이 있다. 

   > 1. react.scripts 프로젝트를 포크(fork)해서 나만의 스크립트를 만든다. 
   > 2. react-app-rewired 패키지를 사용한다. 

   첫 번째 방법은 자유도가 높기 때문에 원하는 부분을 얼마든지 수정할 수 있다. 이렇게 수정된 내용을 여러 프로젝트에서 공통으로 사용할 수 있다는 장점도 있다. 두 번째 방법은 자유도는 낮지만 비교적 쉽게 설정을 변경할 수 있다는 장점이 있다. 하지만 두 가지 방법 모두 create-react-app의 이후 버전에 변경된 내용을 쉽게 적용할 수 없다는 단점이 있다. 

### 자바스크립트 지원 범위

create-react-app에서는 ES6의 모든 기능을 지원한다. ES6 이후에 추가되거나 제안된 기능 중에서 create-react-app(v3.2.0)에서 지원하는 기능은 다음과 같다. 

+ 지수 연산자(exponentiation operator)
+ async await 함수
+ 나머지 연산자(rest operator), 전개 연산자(spread operator)
+ 동적 임포트(dynamic import)
+ 클래스 필드(class field)
+ JSX 문법
+ 타입스크립트(typescript), 플로(flow) 타입 시스템

create-react-app에서는 타입스크립트와 플로 타입 시스템을 지원한다. 정적 타입 사용을 추천한다. 자바스크립트에서 정적 타입 시스템을 적용할 수 있는 방법은 여러 가지가 있지만, 현재로서는 타입스크립트가 가장 괜찮은 선택이다. 

create-react-app의 기본 설정에서는 아무런 폴리필(polyfill)도 포함되지 않는다. ES6+에서 추가된 객체나 함수를 사용하고 싶다면 직접 폴리필을 넣도록 하자. ES8에 추가된 String.padStart 함수를 사용하고 싶다고 가정해보자. core-js 패키지를 사용하면 다양한 폴리필을 선택적으로 사용할 수 있다. 우선 core-js 패키지를 설치해 보자. 

```bash
$ npm install core-js
```

그리고 다음과 같이 작성하면 폴리필이 추가된다. 

```jsx
// index.js
import 'core-js/features/string/pad-start';

// someFile.js
const value = '123'.padStart(5, '0'); // '00123'
```

index.js 파일에서 한 번만 가져오면 모든 곳에서 자유롭게 사용할 수 있다. 바벨에서도 @babel/polyfill 혹은 @babel/presetn-env 프리셋을 이용하면 폴리필을 추가할 수 있다. @babel/polyfill은 사용하지 않는 기능의 폴리필까지 모두 포함하기 때문에 번들(bundle) 크기가 커지는 단점이 있다. @babel/preset-env 프리셋을 이용하면 필요한 폴리필만 추가할 수 있지만 동적 타입 언어의 한계 때문에 core-js로 직접 추가하는 것보다는 몇 가지 불필요한 폴리필이 포함되는 단점이 있다. 

> #### 폴리필
>
> 새로운 자바스크립트 표준이 나와도 대다수 사용자의 브라우저에서 지원하지 않으면 사용할 수 없다. 언어 표준에는 새로운 문법도 추가되고 새로운 객체나 함수도 추가된다. 새로운 문법은 대부분의 브라우저에서 지원하지 않더라도 바벨을 이용하면 어느 정도 사용이 가능하다. 바벨을 사용하면 빌드 시점에 코드가 변환된다. 
>
> 새로운 객체나 함수는 성격이 조금 다르다. 물론 새로운 객체나 함수로 작성한 코드도 빌드 시점에 변환할 수 있다. 하지만 이들은 실행 시점에 주입할 수 있다는 장점이 있다. 따라서 실행 시점에 주입하고자 하는 객체나 함수가 현재 환경에 존재하는지 검사해서 존재하지 않는 경우에만 주입하는 게 좋다. 이렇게 기능이 존재하는지 검사해서 그 기능이 없을 때만 주입하는 것을 폴리필이라고 한다. 
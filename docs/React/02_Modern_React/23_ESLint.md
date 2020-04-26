# ESLint

자바스크립트의 문법을 확인해주는 도구로 CRA로 만든 프로젝트에는 이미 적용되어 있어서 자바스크립트 문법 실수 시에 터미널에 오류 또는 경고가 나타나게 됨

예를 들어 `a`라는 값을 선언 후 사용하지 않으면 터미널에서 아래와 같은 결과물이 나타남 

```bash
Compiled with warnings.

./src/App.js
  Line 5:  'a' is assigned a value but never used  no-unused-vars

Search for the keywords to learn more about each warning.
To ignore, add // eslint-disable-next-line to the line before.
```

참고: [https://eslint.org/docs/rules/](https://eslint.org/docs/rules/)

VSCode와 연동하여 `useEffect` 같은 Hook 사용 시에 유용

+ ./src/App.js 수정

  ```jsx
  // ./src/App.js
  
  import React, { useState, useEffect } from 'react';
  import './App.css';
  
  function App() {
    const [value, setValue] = useState('');
    useEffect(() => {
      console.log(value);
    }, []);
  
    return (
      <div>
        <p>와우</p>
      </div>
    );
  }
  ```

  경고가 발생하면 노란색 줄로 표시

<br>

## ESLint 설정 커스터마이징

```json
...
  "eslintConfig": {
    "extends": "react-app"
  },
...
```

이 부분에 ESLint의 react-app에 필요한 대부분의 규칙들이 적용되어 있음
다양한 ESLint 설정 묶음을 라이브러리로 제공하기도 함

+ [eslint-config-airbnb](https://www.npmjs.com/package/eslint-config-airbnb)
+ [eslint-config-google](https://www.npmjs.com/package/eslint-config-google)
+ [eslint-config-standard](https://www.npmjs.com/package/eslint-config-standard)

### eslint-config-airbnb 설정

+ 라이브러리 설치

  ```bash
  $ yarn add eslint-config-airbnb
  ```

+ ./package.json 수정

  ```json
  ...
    "eslintConfig": {
      "extends": [
        "react-app",
        "airbnb"
      ]
    },
  ...
  ```

+ ./App.js를 열면 빨간줄 확인 

+ esling-config-prettier 설치

  ```bash
  $ yarn add eslint-config-prettier
  ```

+ prettier를 사용하는 경우 prettier 관리 옵션은 규칙을 꺼주는 방법

  ```bash
  $ yarn add eslint-config-prettier
  ```

  ```json
  ...
    "eslintConfig": {
      "extends": [
        "react-app",
        "airbnb",
        "prettier"
      ]
    },
  ...
  ```

+ 해당 규칙만 따로 관리(0-설정X, 1-노란줄, 2-빨간줄)

  ```json
  ...
    "eslintConfig": {
      "extends": [
        "react-app",
        "airbnb"
      ],
      "rules": {
        "no-unused-vars": 1,
        "no-console": 0,
        "react/jsx-filename-extension": 0
      }
    },
  ...
  ```

+ 특정 파일에 ESLint를 구동하고 싶지 않은 경우 맨 상단에 `/* eslint-disable */` 추가

  ```jsx
  /* eslint-disable */
  // This optional code is used to register a service worker.
  // register() is not called by default.
  
  // This lets the app load faster on subsequent visits in production, and gives
  // it offline capabilities. However, it also means that developers (and users)
  // will only see deployed updates on subsequent visits to a page, after all the
  // existing tabs open on the page have been closed, since previously cached
  // resources are updated in the background.
  
  // To learn more about the benefits of this model and instructions on how to
  // opt-in, read https://bit.ly/CRA-PWA
  
  const isLocalhost = Boolean(
    window.location.hostname === 'localhost' ||
      // [::1] is the IPv6 localhost address.
      window.location.hostname === '[::1]' ||
      // 127.0.0.0/8 are considered localhost for IPv4.
      window.location.hostname.match(
        /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
      )
  );
  
  ...
  ```

  


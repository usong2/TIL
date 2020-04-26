# Prettier

Prettier는 자동으로 코드의 스타일을 관리해주는 도구이며 가령, 문자열을 사용할 때 '를 쓸지 "를 쓸지, 또는 세미콜론(;)을 코드 뒤에 붙일지 말지, 들여쓰기는 얼마나 할지, 이런 것들을 관리해줄 수 있음

CLI를 통해 명령어를 사용할 수도 있고, 다양한 에디터와 연동해서 사용할 수도 있음

자바스크립트 뿐만 아니라 HTML, CSS 코드의 코드 스타일을 관리할 수도 있고 React, Angular, Vue 등의 라이브러리도 지원해주고 플러그인을 통하여 다른 언어도 관리해줄 수 있음

참고: [https://prettier.io/docs/en/options.html](https://prettier.io/docs/en/options.html)

+ 새 프로젝트 만들기

  ```bash
  $ npx create-react-app useful-tools
  ```

+ 최상위 디렉터리에 .prettierrc 생성

  ```json
  // ./.prettierrc
  
  {
    "trailingComma": "es5",
    "tabWidth": 2,
    "semi": true,
    "singleQuote": true
  }
  ```

  + **trailingComma**: `none`, `es5`, `all` 로 설정 가능하며 객체 또는 배열이 여러 줄로 구성되어 있는 경우 맨 마지막 줄에 쉼표를 붙여줌
  + **tabWidth**: 들여쓰기의 크기를 정함
  + **semi**: 세미콜론(;)을 쓸지 말지 정함
  + **singleQuote**: 문자열 입력 시에 `"`을 쓸지 `'`을 쓸지 정함
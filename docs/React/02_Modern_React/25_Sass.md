# Sass

Sass(Syntactically Awesome Style Sheets: 문법적으로 짱 멋진 스타일시트)는 CSS pre-processor로서, 복잡한 작업을 쉽게 할 수 있게 해주고, 코드의 재활용성을 높여줄 뿐만 아니라 코드의 가독성을 높여주어 유지보수를 쉽게 해줌

참고: [https://velopert.com/1712](https://velopert.com/1712) / [https://sass-guidelin.es/ko/](https://sass-guidelin.es/ko/)

Sass에서는 두 가지 확장자 (.scss/sass)를 지원하며 Sass가 처음 나왔을 땐 sass만 지원되었고 sass는 문법이 아주 다름

**sass**

```css
$font-stack: Helvetica, sans-serif
$primary-color: #333

body
  font: 100% $font-stack
  color: $primary-color
```

**scss**

```body 
$font-stack: Helvetica, sans-serif;
$primary-color: #333;

body {
  font: 100% $font-stack;
  color: $primary-color;
}
```

문법의 차이 비교: [https://sass-lang.com/guide](https://sass-lang.com/guide)

<br>

## 시작하기

+ 새 프로젝트 만들기

  ```bash
  $ npx create-react-app styling-with-sass
  ```

+ 해당 프로젝트 디렉터리에 `node-sass` 라이브러리 설치
  Sass를 CSS로 변환해주는 역할

  ```bash
  $ cd styling-with-sass
  $ yarn add node-sass
  ```

<br>

## 버튼 컴포넌트 만들기

+ ./src/components/Button.js 생성

  ```jsx
  // ./src/components/Button.js
  
  import React from "react";
  import "./Button.scss";
  
  function Button({ children }) {
    return <div className="Button">{children}</div>;
  }
  
  export default Button;
  ```

+ ./src/components/Button.scss 생성

  ```scss
  // ./src/components/Button.scss
  
  $blue: #228be6; // 주석!
  
  .Button {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    color: white;
    font-weight: bold;
    outline: none;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  
    height: 2.25rem;
    padding: 0 1rem;
    font-size: 1rem;
    background: $blue;
  
    &:hover {
      background: lighten($blue, 10%);
    }
    &:active {
      background: darken($blue, 10%);
    }
  }
  
  ```

  flex 참고: [https://flexboxfroggy.com/#ko](https://flexboxfroggy.com/#ko)

+ ./src/App.css 삭제

+ ./src/App.scss 생성

  ```scss
  // ./src/App.scss
  
  .App {
    width: 512px;
    margin: 0 auto;
    margin-top: 4rem;
    border: 1px solid black;
    padding: 1rem;
  }
  ```

+ ./src/App.js 수정

  ```jsx
  // ./src/App.js
  
  import React from "react";
  import Button from "./components/Button";
  import './App.scss';
  
  function App() {
    return (
      <div className="App">
        <div className="buttons">
          <Button>BUTTON</Button>
        </div>
      </div>
    );
  }
  
  export default App;
  ```

<br>

## 버튼 컴포넌트에 다양한 옵션 주기

+ "Button medium" 형태

  ```jsx
  <div className={["Button", size].join(" ")}>{children}</div>;
  ```

+ 템플릿 리터럴 형태

  ```jsx
  <div className={`Button ${size}`}>{children}</div>;
  ```

하지만 size, color, outline 등 다양한 클래스를 일일이 넣어주는 것은 불편



### classnames 라이브러리

조건부 스타일링 시에 함수의 인자에 문자열, 배열, 객체 등을 전달하여 손쉽게 문자열 조합 가능

+ 설치

  ```bash
  $ yarn add classnames
  ```

+ 참고

  ```jsx
  classNames('foo', 'bar'); // => 'foo bar'
  classNames('foo', { bar: true }); // => 'foo bar'
  classNames({ 'foo-bar': true }); // => 'foo-bar'
  classNames({ 'foo-bar': false }); // => ''
  classNames({ foo: true }, { bar: true }); // => 'foo bar'
  classNames({ foo: true, bar: true }); // => 'foo bar'
  classNames(['foo', 'bar']); // => 'foo bar'
  
  // 동시에 여러개의 타입으로 받아올 수 도 있습니다.
  classNames('foo', { bar: true, duck: false }, 'baz', { quux: true }); // => 'foo bar baz quux'
  
  // false, null, 0, undefined 는 무시됩니다.
  classNames(null, false, 'bar', undefined, 0, 1, { baz: null }, ''); // => 'bar 1'
  ```

+ 설정 방법

  ```jsx
  // 1.
  function Button({ children, size }) {
    return (
      <div className={classNames("Button", size)}>{children}</div>
    );
  }
  
  Button.defaultProps = {
    size: "medium",
  };
  
  // 2.
  function Button({ children, size='medium' }) {
    return (
      <div className={classNames("Button", size)}>{children}</div>
    );
  }
  
  // 3.
  function Button({ children, size }) {
    return (
      <div className={classNames("Button", size || 'medium')}>{children}</div>
    );
  }
  ```

+ ./src/components/Button.js 수정

  ```jsx
  // ./src/components/Button.js
  
  import React from "react";
  import classNames from "classnames";
  import "./Button.scss";
  
  // size: largie, medium, small
  function Button({ children, size }) {
    return <div className={classNames("Button", size)}>{children}</div>;
  }
  
  Button.defaultProps = {
    size: "medium",
  };
  
  export default Button;
  ```

+ ./src/components/Button.scss 수정

  ```scss
  // ./src/components/Button.scss
  
  $blue: #228be6; // 주석!
  
  .Button {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    color: white;
    font-weight: bold;
    outline: none;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    padding: 0 1rem;
    background: $blue;
  
    &.large {
      height: 3rem;
      font-size: 1.25rem;
    }
  
    &.medium {
      height: 2.25rem;
      font-size: 1rem;
    }
  
    &.small {
      height: 1.75rem;
      font-size: 0.875rem;
    }
  
    &:hover {
      background: lighten($blue, 10%);
    }
    &:active {
      background: darken($blue, 10%);
    }
  }
  ```

+ ./src/App.js 수정

  ```jsx
  // ./src/App.js
  
  import React from "react";
  import Button from "./components/Button";
  import "./App.scss";
  
  function App() {
    return (
      <div className="App">
        <div className="buttons">
          <Button size="large">BUTTON</Button>
          <Button>BUTTON</Button>
          <Button size="small">BUTTON</Button>
        </div>
      </div>
    );
  }
  
  export default App;
  ```

+ ./src/components/Button.scss 수정 (버튼과 버튼 간격 띄우기)

  ```scss
  $blue: #228be6; // 주석!
  
  .Button {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    color: white;
    font-weight: bold;
    outline: none;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    padding: 0 1rem;
    background: $blue;
  
    &.large {
      height: 3rem;
      font-size: 1.25rem;
    }
  
    &.medium {
      height: 2.25rem;
      font-size: 1rem;
    }
  
    &.small {
      height: 1.75rem;
      font-size: 0.875rem;
    }
  
    &:hover {
      background: lighten($blue, 10%);
    }
    &:active {
      background: darken($blue, 10%);
    }
  
    // 아래의 .Button + .Button과 동일
    //   & + & {
    //     margin-left: 1rem;
    //   }
  }
  
  .Button + .Button {
    margin-left: 1rem;
  }
  ```

<br>

## 버튼 색상 설정하기

색상 참조: [https://yeun.github.io/open-color/](https://yeun.github.io/open-color/)

+ ./src/components/Button.js 수정

  ```jsx
  // ./src/components/Button.js
  
  import React from "react";
  import classNames from "classnames";
  import "./Button.scss";
  
  // size: largie, medium, small
  // color: blue, pink, gray
  function Button({ children, size, color }) {
    return <div className={classNames("Button", size, color)}>{children}</div>;
  }
  
  Button.defaultProps = {
    size: "medium",
    color: "blue",
  };
  
  export default Button;
  ```

+ ./src/components/Button.scss 수정

  ```jsx
  // ./src/components/Button.scss
  
  $blue: #228be6; // 주석!
  $gray: #495057;
  $pink: #f06595;
  
  .Button {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    color: white;
    font-weight: bold;
    outline: none;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    padding: 0 1rem;
  
    &.blue {
      background: $blue;
      &:hover {
        background: lighten($blue, 10%);
      }
      &:active {
        background: darken($blue, 10%);
      }
    }
  
    &.gray {
      background: $gray;
      &:hover {
        background: lighten($gray, 10%);
      }
      &:active {
        background: darken($gray, 10%);
      }
    }
  
    &.pink {
      background: $pink;
      &:hover {
        background: lighten($pink, 10%);
      }
      &:active {
        background: darken($pink, 10%);
      }
    }
  
    &.large {
      height: 3rem;
      font-size: 1.25rem;
    }
  
    &.medium {
      height: 2.25rem;
      font-size: 1rem;
    }
  
    &.small {
      height: 1.75rem;
      font-size: 0.875rem;
    }
  
  }
  
  .Button + .Button {
    margin-left: 1rem;
  }
  ```

+ 반복되는 코드 수정(@mixin)

  ```scss
  // ./src/components/Button.scss
  
  $blue: #228be6; // 주석!
  $gray: #495057;
  $pink: #f06595;
  
  @mixin button-color($color) {
    background: $color;
    &:hover {
      background: lighten($color, 10%);
    }
    &:active {
      background: darken($color, 10%);
    }
  }
  
  .Button {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    color: white;
    font-weight: bold;
    outline: none;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    padding: 0 1rem;
  
    &.blue {
      @include button-color($blue);
    }
  
    &.gray {
      @include button-color($gray);
    }
  
    &.pink {
      @include button-color($pink);
    }
  
    &.large {
      height: 3rem;
      font-size: 1.25rem;
    }
  
    &.medium {
      height: 2.25rem;
      font-size: 1rem;
    }
  
    &.small {
      height: 1.75rem;
      font-size: 0.875rem;
    }
  
    //   & + & {
    //     margin-left: 1rem;
    //   }
  }
  
  .Button + .Button {
    margin-left: 1rem;
  }
  ```

+ ./src/App.js 수정

  ```jsx
  // ./src/App.js
  
  import React from "react";
  import Button from "./components/Button";
  import "./App.scss";
  
  function App() {
    return (
      <div className="App">
        <div className="buttons">
          <Button size="large">BUTTON</Button>
          <Button>BUTTON</Button>
          <Button size="small">BUTTON</Button>
        </div>
  
        <div className="buttons">
          <Button color="gray" size="large">
            BUTTON
          </Button>
          <Button color="gray">BUTTON</Button>
          <Button color="gray" size="small">
            BUTTON
          </Button>
        </div>
  
        <div className="buttons">
          <Button color="pink" size="large">
            BUTTON
          </Button>
          <Button color="pink">BUTTON</Button>
          <Button color="pink" size="small">
            BUTTON
          </Button>
        </div>
      </div>
    );
  }
  
  export default App;
  ```

+ ./src/App.scss 수정

  ```scss
  // ./src/App.scss
  
  .App {
    width: 512px;
    margin: 0 auto;
    margin-top: 4rem;
    border: 1px solid black;
    padding: 1rem;
  
    .buttons + .buttons {
      margin-top: 1rem;
    }
  }
  ```

<br>

## outline 옵션 만들기

+ ./src/components/Buttons.js 수정

  ```jsx
  // ./src/components/Button.js
  
  import React from "react";
  import classNames from "classnames";
  import "./Button.scss";
  
  // size: largie, medium, small
  // color: blue, pink, gray
  function Button({ children, size, color, outline, fullWidth }) {
    return (
      <div className={classNames("Button", size, color, { outline, fullWidth })}>
        {children}
      </div>
    );
  }
  
  Button.defaultProps = {
    size: "medium",
    color: "blue",
  };
  
  export default Button;
  ```

+ ./src/components/Button.scss 수정

  ```scss
  // ./src/components/Button.scss
  
  $blue: #228be6; // 주석!
  $gray: #495057;
  $pink: #f06595;
  
  @mixin button-color($color) {
    background: $color;
    &:hover {
      background: lighten($color, 10%);
    }
    &:active {
      background: darken($color, 10%);
    }
  
    &.outline {
      color: $color;
      background: none;
      border: 1px solid $color;
      &:hover {
        background: $color;
        color: white;
      }
    }
  }
  
  .Button {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    color: white;
    font-weight: bold;
    outline: none;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    padding: 0 1rem;
  
    &.large {
      height: 3rem;
      font-size: 1.25rem;
    }
  
    &.medium {
      height: 2.25rem;
      font-size: 1rem;
    }
  
    &.small {
      height: 1.75rem;
      font-size: 0.875rem;
    }
  
    &.blue {
      @include button-color($blue);
    }
  
    &.gray {
      @include button-color($gray);
    }
  
    &.pink {
      @include button-color($pink);
    }
  
    &.fullWidth {
      width: 100%;
      justify-content: center;
      & + & {
        margin-left: 0;
        margin-top: 1rem;
      }
    }
  }
  
  .Button + .Button {
    margin-left: 1rem;
  }
  ```

+ ./src/App.js 수정

  ```jsx
  // ./src/App.js
  
  import React from "react";
  import Button from "./components/Button";
  import "./App.scss";
  
  function App() {
    return (
      <div className="App">
        <div className="buttons">
          <Button size="large">BUTTON</Button>
          <Button>BUTTON</Button>
          <Button size="small">BUTTON</Button>
        </div>
  
        <div className="buttons">
          <Button color="gray" size="large">
            BUTTON
          </Button>
          <Button color="gray">BUTTON</Button>
          <Button color="gray" size="small">
            BUTTON
          </Button>
        </div>
  
        <div className="buttons">
          <Button color="pink" size="large">
            BUTTON
          </Button>
          <Button color="pink">BUTTON</Button>
          <Button color="pink" size="small">
            BUTTON
          </Button>
        </div>
  
        <div className="buttons">
          <Button size="large" outline>
            BUTTON
          </Button>
          <Button color="gray" outline>
            BUTTON
          </Button>
          <Button color="pink" outline size="small">
            BUTTON
          </Button>
        </div>
  
        <div className="buttons">
          <Button size="large" fullWidth>
            BUTTON
          </Button>
          <Button size="large" fullWidth color="gray">
            BUTTON
          </Button>
          <Button size="large" fullWidth color="pink">
            BUTTON
          </Button>
        </div>
      </div>
    );
  }
  
  export default App;
  ```

  <br>

## 버튼에 ...rest props 전달하기

+ ./src/components/Button.js 수정

  ```jsx
  // ./src/components/Button.js
  
  import React from "react";
  import classNames from "classnames";
  import "./Button.scss";
  
  // size: largie, medium, small
  // color: blue, pink, gray
  function Button({
    children,
    size,
    color,
    outline,
    fullWidth,
    className,
    ...rest
  }) {
    return (
      <div
        className={classNames(
          "Button",
          size,
          color,
          { outline, fullWidth },
          className
        )}
        {...rest}
      >
        {children}
      </div>
    );
  }
  
  Button.defaultProps = {
    size: "medium",
    color: "blue",
  };
  
  export default Button;
  ```

+ ./src/App.js 수정

  ```jsx
  // ./src/App.js
  
  import React from "react";
  import Button from "./components/Button";
  import "./App.scss";
  
  function App() {
    return (
      <div className="App">
        <div className="buttons">
          <Button size="large">BUTTON</Button>
          <Button>BUTTON</Button>
          <Button size="small">BUTTON</Button>
        </div>
  
        <div className="buttons">
          <Button color="gray" size="large">
            BUTTON
          </Button>
          <Button color="gray">BUTTON</Button>
          <Button color="gray" size="small">
            BUTTON
          </Button>
        </div>
  
        <div className="buttons">
          <Button color="pink" size="large">
            BUTTON
          </Button>
          <Button color="pink">BUTTON</Button>
          <Button color="pink" size="small">
            BUTTON
          </Button>
        </div>
  
        <div className="buttons">
          <Button size="large" outline>
            BUTTON
          </Button>
          <Button color="gray" outline>
            BUTTON
          </Button>
          <Button color="pink" outline size="small">
            BUTTON
          </Button>
        </div>
  
        <div className="buttons">
          <Button size="large" fullWidth className="customized-button">
            BUTTON
          </Button>
          <Button size="large" fullWidth color="gray">
            BUTTON
          </Button>
          <Button
            size="large"
            fullWidth
            color="pink"
            onClick={() => {
              console.log("클릭");
            }}
            onMouseMove={() => {
              console.log("마우스무브!");
            }}
          >
            BUTTON
          </Button>
        </div>
      </div>
    );
  }
  
  export default App;
  ```

+ ./src/App.scss 수정

  ```scss
  // ./src/App.scss
  
  .App {
    width: 512px;
    margin: 0 auto;
    margin-top: 4rem;
    border: 1px solid black;
    padding: 1rem;
  
    .buttons + .buttons {
      margin-top: 1rem;
    }
  
    .customized-button {
      background: black;
    }
  }
  ```

<br>

## className이 겹치지 않게 작성하는 팁

1. 컴포넌트의 이름을 고유하게 지정

2. 최상위 엘리먼트의 클래스이름을 컴포넌트 이름과 똑같게 

3. 그 내부에서 셀렉터 사용

   ```scss
   .UserProfile {
       .user {
           img {
               
           }   
           .username {
               
           }
       }
       .about {
           
       }
   }
   ```

   
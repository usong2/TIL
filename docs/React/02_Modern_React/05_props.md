# props

## props를 통해 컴포넌트에게 값 전달하기

props는 properties의 줄임말로 어떠한 값을 컴포넌트에게 전달해줘야 할 때 사용

### props의 기본 사용법

Hello 컴포넌트를 사용할 때 `name`이라는 값을 전달해주고 싶다면

+ ./src/App.js 수정

  ```jsx
  // ./src/App.js 
  
  import React from 'react';
  import Hello from './Hello';
  
  function App() {
    return (
      <Hello name="react" />
    );
  }
  
  export default App;
  ```

+ ./src/Hello.js 수정

  ```jsx
  // ./src/Hello.js
  
  import React from 'react';
  
  function Hello(props) {
    return <div>안녕하세요 {props.name}</div>
  }
  
  export default Hello;
  ```

컴포넌트에게 전달되는 props 파라미터를 통하여 조회 가능
props는 객체 형태로 전달되며, 만약 `name` 값을 조회하고 싶다면 `props.name`을 조회

### 여러 개의 props, 비구조화 할당

Hello 컴포넌트에 또 다른 `color`라는 props를 전달할 경우

+ ./src/App.js 수정

  ```jsx
  // ./src/App.js 
  
  import React from 'react';
  import Hello from './Hello';
  
  function App() {
    return (
      <Hello name="react" color="red"/>
    );
  }
  
  export default App;
  ```

+ ./src/Hello.js 수정

  ```jsx
  import React from "react";
  
  function Hello(props) {
    return <div style={{ color: props.color }}>안녕하세요 {props.name}</div>;
  }
  
  export default Hello;
  ```

props 내부의 값을 조회할 때마다 `props.`를 입력하는데, 함수 파라미터에서 비구조화 할당(혹은 구조 분해) 문법을 사용하면 코드를 조금 더 간결하게 작성 가능

+ ./src/Hello.js 수정

  ```jsx
  // ./src/Hello.js
  
  import React from 'react';
  
  function Hello({ color, name }) {
    return <div style={{ color }}>안녕하세요 {name}</div>
  }
  
  export default Hello;
  ```

### defaultProps로 기본값 설정

컴포넌트에 props를 지정하지 않았을 때 기본적으로 사용할 값을 설정하고 싶다면 컴포넌트에 `defaultProps`라는 값을 설정

+ ./src/Hello.js 수정

  ```jsx
  import React from "react";
  
  function Hello({ name, color }) {
    return <div style={{ color: color }}>안녕하세요 {name}</div>;
  }
  
  Hello.defaultProps = {
    name: "이름없음",
  };
  
  export default Hello;
  ```

+ ./src/App.js 수정

  ```jsx
  // ./src/App.js
  
  import React from "react";
  import Hello from "./Hello";
  import "./App.css";
  
  function App() {
    return (
      <>
        <Hello name="react" color="red" />
        <Hello color="pink" />
      </>
    );
  }
  
  export default App;
  ```

### props.children

컴포넌트 태그 사이에 넣은 값을 조회하고 싶을 땐, `props.children` 을 조회

+ ./src에 Wrapper.js 생성

  ```jsx
  import React from "react";
  
  function Wrapper({ children }) {
    const style = {
      border: "2px solid black",
      padding: 16,
    };
    return <div style={style}>{children}</div>;
  }
  
  export default Wrapper;
  ```

+ ./src/App.js 수정

  ```jsx
  import React from "react";
  import Hello from "./Hello";
  import "./App.css";
  import Wrapper from "./Wrapper";
  
  function App() {
    return (
      <Wrapper>
        <Hello name="react" color="red" />
        <Hello color="pink" />
      </Wrapper>
    );
  }
  
  export default App;
  ```

  
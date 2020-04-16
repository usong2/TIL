# JSX

## JSX의 기본 규칙 알아보기

JSX는 리액트에서 생김새를 정의할 때 사용하는 문법으로 얼핏보면 HTML 같이 생겼지만 실제로는 JavaScript

```jsx
return <div>안녕하세요</div>;
```

리액트 컴포넌트 파일에서 XML 형태로 코드를 작성하면 babel이 JSX를 JavaScript로 변환해줌

### Babel

자바스크립트의 문법을 확장해주는 도구로 아직 지원되지 않는 최신 문법이나, 편의상 사용하거나 실험적인 자바스크립트 문법들을 정식 자바스크립트 형태로 변환해줌으로써 구형 브라우저같은 환경에서도 제대로 실행할 수 있게 해주는 역할
<참고: [https://babeljs.io/repl](https://babeljs.io/repl)>

### JSX 규칙

#### 꼭 닫혀야 하는 태그

+ HTML에서는 `input` 또는 `br` 태그 사용 시에 닫지 않고 사용하기도 하지만 리액트에서는 무조건 닫아야 함

  ```jsx
  import React from 'react';
  import Hello from './Hello';
  
  function App() {
    return (
      <div>
        <Hello />
        <Hello />
        <Hello />
        <input />
        <br />
      </div>
    );
  }
  
  export default App;
  ```

#### 꼭 감싸져야 하는 태그

+ 두 개 이상의 태그는 무조건 하나의 태그로 감싸져야 있어야 함

  + 단순히 감싸기 위하여 불필요한 div로 감싸는게 좋지 않은 상황에서는 리액트의 **Fragment**를 사용

  ```jsx
  import React from 'react';
  import Hello from './Hello';
  
  function App() {
    return (
      <>
        <Hello />
        <div>안녕히계세요</div>
      </>
    );
  }
  
  export default App;
  ```

  + 태그 작성 시 이름 없이 작성하게 되면 Fragment가 만들어지는데, Fragment는 브라우저 상에서 따로 별도의 엘리먼트로 나타나지 않음

#### JSX 안에 자바스크립트 값 사용하기

+ JSX 내부에 자바스크립트 변수를 보여줘야할 때에는 `{}`으로 감싸서 보여줌

  ```jsx
  import React from "react";
  import Hello from "./Hello";
  
  function App() {
    const name = "Usong";
    return (
      <>
        <Hello />
        <div>{name}</div>
      </>
    );
  }
  
  export default App;
  ```

#### style과 className

+ 인라인 스타일: 객체 형태로 작성하며 `background-color` 처럼 `-`로 구분되어 있는 이름들은 `backgroundColor`처럼 camelCase 형태로 네이밍

  ```jsx
  import React from "react";
  import Hello from "./Hello";
  
  function App() {
    const name = "Usong";
    const style = {
      backgroundColor: "black",
      color: "aqua",
      fontSize: 24,
      padding: "1rem",
    };
    return (
      <>
        <Hello />
        <div style={style}>{name}</div>
      </>
    );
  }
  
  export default App;
  ```

+ CSS class: `class=`가 아닌 `className=`으로 설정

  ```jsx
  // ./src/App.css
  
  .gray-box {
    background: gray;
    width: 64px;
    height: 64px;
  }
  ```

  ```jsx
  // ./src/App.js
  
  import React from "react";
  import Hello from "./Hello";
  import "./App.css";
  
  function App() {
    const name = "Usong";
    const style = {
      backgroundColor: "black",
      color: "aqua",
      fontSize: 24,
      padding: "1rem",
    };
    return (
      <>
        <Hello />
        <div style={style}>{name}</div>
        <div className="gray-box"></div>
      </>
    );
  }
  
  export default App;
  ```

#### 주석

+ JSX 내부의 주석은 `{/* 이런 형태로 */}` 작성

  ```jsx
  import React from "react";
  import Hello from "./Hello";
  import "./App.css";
  
  function App() {
    const name = "Usong";
    const style = {
      backgroundColor: "black",
      color: "aqua",
      fontSize: 24,
      padding: "1rem",
    };
    return (
      <>
        {/* 어쩌고 저쩌고 */}
        <Hello
        // 이런식으로 작성하는 주석은 나타나지 않음
        />
        <div
          // 어쩌고 저쩌고
          style={style}
        >
          {name}
        </div>
        <div className="gray-box"></div>
      </>
    );
  }
  
  export default App;
  ```

#### if문 대신 조건부 연산자

+ JSX 내부의 자바스크립트 표현식에서 if문을 사용할 수 없음

+ 조건에 따라 다른 내용을 렌더링해야 할 때는 JSX 밖에서 if문을 사용하여 사전에 값을 설정하거나, { } 안에 조건부 연산자(삼항 연산자)를 사용

  ```jsx
  import React from 'react';
  
  function App() {
    const name = '리액트';
    return(
      <div>
        {name === '리액트' ? (
            <h1>리액트입니다.</h1>
        ) : (
            <h2>리액트가 아닙니다.</h2>    
        )}
      </div>
    )
  }
  ```

#### AND 연산자(&&)를 사용한 조건부 렌더링

+ 특정 조건을 만족할 때 내용을 보여주고, 만족하지 않을 때 아예 아무것도 렌더링하지 않아야 하는 상황이 오면 조건부 연산자를 통해 구현 가능

  ```jsx
  import React from 'react';
  
  function App() {
    const name = '뤼액트';
    return <div>{name === '리액트' ? <h1>리액트입니다.</h1> : null}</div>;
  }
  
  export default App;
  ```

+ 위 코드와 같이 null을 렌더링하면 아무것도 보여주지 않음

+ 하지만 이것보다 더 짧은 코드로 똑같은 작업 가능

  ```jsx
  import React from 'react';
  
  function App() {
    const name = '뤼액트';
    return <div>{name === '리액트' && <h1>리액트입니다.</h1>}</div>;
  }
  
  export default App;
  ```

<br>

## 정리

```jsx
<div>태그는 꼭 닫혀야 한다!</div>
<Hello />
```

```jsx
<>
	<div>두개 이상의</div>
	<p>태그는 감싸자</p>
</>
```

```jsx
const name = '이렇게';
return <div>JavaScript 값 보여줄 땐, {name}</div>
```

```jsx
const style = {
    background: 'gray',
}
return (
	<div style={style}>
    	<div className="my-style">
        	style과 className
        </div>
    </div>
)
```

```jsx
return (
	<div>
    	{/* 주석은 이렇게 */}
        <input 
            // 또는 이렇게
        />
    </div>
)
```


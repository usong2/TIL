# useState

## useState를 통한 동적 상태 관리

컴포넌트에서 보여줘야 하는 내용이 사용자 인터랙션에 따라 바뀌어야 할 때 구현 방법

리액트 16.8 이전 버전에서는 함수형 컴포넌트에서는 상태 관리가 불가했으나, 리액트 16.8 에서 Hooks 라는 기능이 도입되면서 함수형 컴포넌트에서도 상태 관리가 가능

useState 함수는 리액트 Hooks 중 하나

+ ./src에 Counter.js 생성

  ```jsx
  // ./src/Counter.js
  
  import React from "react";
  
  function Counter() {
    const onIncrease = () => {
      console.log("+1");
    };
    const onDecrease = () => {
      console.log("-1");
    };
    return (
      <div>
        <h1>0</h1>
        <button onClick={onIncrease}>+1</button>
        <button onClick={onDecrease}>-1</button>
      </div>
    );
  }
  
  export default Counter;
  ```

+ ./src/App.js 수정

  ```jsx
  // ./src/App.js
  
  import React from "react";
  import Counter from "./Counter";
  
  function App() {
    return <Counter />;
  }
  
  export default App;
  ```

  함수를 만들고, button의 `onClick`으로 각 함수를 연결해주었음
  리액트에서 엘리먼트에 이벤트를 설정해줄 때에 `on이벤트이름={실행하고싶은함수}` 형태로 설정

  여기서 주의해야할 점은, 함수형태를 넣어주어야 하지, 함수를 다음과 같이 실행하면 안됨

  ```jsx
  onClick={onincrease()}
  ```

  이렇게 하면 렌더링되는 시점에서 함수가 호출되어버리기 때문. 이벤트를 설정할 때에는 함수타입의 값을 넣어주어야 함

### 동적인 값 끼얹기, useState

컴포넌트에서 동적인 값을 상태(state)라고 부르는데, 리액트의 `useState` 함수를 통해 컴포넌트에서 상태 관리가 가능

+ ./src/Counter.js 수정

  ```jsx
  import React, { useState } from "react";
  
  function Counter() {
    const [number, setNumber] = useState(0);
  
    const onIncrease = () => {
      setNumber(number + 1);
    };
    const onDecrease = () => {
      setNumber(number - 1);
    };
    return (
      <div>
        <h1>{number}</h1>
        <button onClick={onIncrease}>+1</button>
        <button onClick={onDecrease}>-1</button>
      </div>
    );
  }
  
  export default Counter;
  ```

  ```jsx
  import React, { useState } from 'react';
  ```

  위의 코드로 리액트 패키지에서 `useState` 함수를 불러옴

  ```jsx
  const [number, setNumber] = useState(0);
  ```

  `useState`를 사용할 때에는 상태의 기본값을 파라미터로 넣어서 호출하는데 이 함수를 호출해주면 배열이 반환, 여기서 첫 번째 원소는 현재 상태, 두 번째 원소는 Setter 함수

### 함수형 업데이트

지금은 Sette 함수를 사용할 때, 업데이트 하고 싶은 새로운 값으로 파라미터를 넣어주고 있는데, 그 대신 기존 값을 어떻게 업데이트할 지에 대한 함수를 등록하는 방식으로도 값을 업데이트 가능

+ ./src/Counter.js 수정

  ```jsx
  import React, { useState } from "react";
  
  function Counter() {
    const [number, setNumber] = useState(0);
  
    const onIncrease = () => {
      setNumber((prevNumber) => prevNumber + 1);
    };
    const onDecrease = () => {
      setNumber((prevNumber) => prevNumber - 1);
    };
    return (
      <div>
        <h1>{number}</h1>
        <button onClick={onIncrease}>+1</button>
        <button onClick={onDecrease}>-1</button>
      </div>
    );
  }
  
  export default Counter;
  ```

  `onIncrease`와 `onDecrease`에서 `setNumber`를 사용할 때 그 다음 상태를 파라미터로 넣어준 것이 아니라, 값을 업데이트 하는 함수를 파라미터로 넣어줌

  함수형 업데이트는 주로 컴포넌트 최적화 시에 사용하게 됨
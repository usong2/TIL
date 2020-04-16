# input

## 리액트에서 input 상태 관리하기

+ ./src에 InputSample.js 생성

  ```jsx
  // ./src/InputSample.js
  
  import React from "react";
  
  function InputSample() {
    return (
      <div>
        <input />
        <button>초기화</button>
        <div>
          <b>값: </b>
          어쩌고 저쩌고...
        </div>
      </div>
    );
  }
  
  export default InputSample;
  ```

+ ./src/App.js 수정

  ```jsx
  // ./src/App.js
  
  import React from 'react';
  import InputSample from './InputSample';
  
  function App() {
    return (
      <InputSample />
    );
  }
  
  export default App;
  ```

input의 `onChange` 이벤트에 등록하는 함수에서는 이벤트 객체 e를 파라미터로 받아와서 사용할 수 있는데 이 객체의 `e.target`은 이벤트가 발생한 DOM인 input DOM을 가르킴

+ ./src/InputSample.js 수정

  ```jsx
  import React from "react";
  
  function InputSample() {
    const onChange = (e) => {
      console.log(e.target);
    };
    return (
      <div>
        <input onChange={onChange} />
        <button>초기화</button>
        <div>
          <b>값: </b>
          어쩌고 저쩌고...
        </div>
      </div>
    );
  }
  
  export default InputSample;
  ```

  이 DOM의 `value` 값, 즉 `e.target.value`를 조회하면 현재 input에 입력한 값이 무엇인지 알 수 있음

  ```jsx
  import React from "react";
  
  function InputSample() {
    const onChange = (e) => {
      console.log(e.target);
    };
    return (
      <div>
        <input onChange={onChange} />
        <button>초기화</button>
        <div>
          <b>값: </b>
          어쩌고 저쩌고...
        </div>
      </div>
    );
  }
  
  export default InputSample;
  ```

input의 상태를 관리할 때에는 input 태그의 `value` 값도 설정해주는 것이 중요함. 그렇게 해야 상태가 바뀌었을 때 input 내용도 업데이트 가능

<br>

## 여러 개의 input 상태 관리하기

+ ./src/InputSample.js 초기화

  ```jsx
  import React, { useState } from "react";
  
  function InputSample() {
    const onChange = (e) => {
    };
    const onReset = (e) => {
    };
    return (
      <div>
        <input />
        <button onClick={onReset}>초기화</button>
        <div>
          <b>값: </b>
        </div>
      </div>
    );
  }
  
  export default InputSample;
  ```

input의 개수가 여러 개가 됐을 때는, 단순히 `useState`를 여러 번 사용하고 `onChange`도 여러 개 만들어서 구현 가능하지만 좋은 방법은 아님

더 좋은 방법은 input에 `name`을 설정하고 이벤트가 발생했을 때 이 값을 참조하는 것이며, `useState`에서는 문자열이 아니라 객체 형태의 상태를 관리해주어야 함

+ ./src/InputSample.js 수정

  ```jsx
  import React, { useState } from "react";
  
  function InputSample() {
    const [inputs, setInputs] = useState({
      name: "",
      nickname: "",
    });
  
    const { name, nickname } = inputs;
  
    const onChange = (e) => {
      const { name, value } = e.target;
  
      setInputs({
        ...inputs,
        [name]: value,
      });
    };
  
    const onReset = (e) => {
      setInputs({
        name: "",
        nickname: "",
      });
    };
    return (
      <div>
        <input 
            name="name" 
            placeholder="이름" 
            onChange={onChange} 
            value={name} 
        />
        <input
          name="nickname"
          placeholder="닉네임"
          onChange={onChange}
          value={nickname}
        />
        <button onClick={onReset}>초기화</button>
        <div>
          <b>값: </b>
          {name}({nickname})
        </div>
      </div>
    );
  }
  
  export default InputSample;
  ```

  리액트 상태에서 객체를 수정해야 할 때는,

  ``` jsx
  inputs[name] = value;
  ```

  이런식으로 직접 수정 불가

  그 대신에, 새로운 객체를 만들어 새로운 객체에 변화를 주고 이를 상태로 사용해주어야 함

  ```jsx
  setInputs({
    ...inputs,
    [name]: value
  })
  ```

  여기서 사용한 `...` 문법은 spread 문법으로 객체의 내용을 모두 "펼쳐서" 기존 객체를 복사해줌

  이러한 작업을 "불변성을 지킨다"라고 부르며 불변성을 지켜주어야만 리액트 컴포넌트에서 상태가 업데이트 됐음을 감지할 수 있고 이에 따라 필요한 렌더링이 진행

리액트에서는 불변성을 지켜주어야만 컴포넌트 업데이트 성능 최적화를 제대로 할 수 있음

**리액트에서 객체를 업데이트하게 될 때에는 기존 객체를 직접 수정하면 안되고, 새로운 객체를 만들어서, 새 객체에 변화를 주어야 함**
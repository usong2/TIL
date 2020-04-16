# useRef

## useRef로 특정 돔 선택하기

JavaScript 사용 시에는, 우리가 특정 DOM을 선택해야 하는 상황에 `getElementById`, `querySelector` 같은 DOM Selector 함수를 사용해서 DOM을 선택

리액트를 사용하는 프로젝트에서도 가끔씩 DOM을 직접 선택해야 하는 상황이 발생할 때도 있음
예를 들어, 특정 엘리먼트의 크기를 가져오거나, 스크롤바 위치를 가져오고 설정해야된다던지, 포커스를 설정해줘야된다던지 등 다양한 상황이 있음

추가적으로 Video.js, JWPlayer 같은 HTML5 Video 관련 라이브러리, 또는 D3, chart.js 같은 그래프 관련 라이브러리 등의 외부 라이브러리를 사용할 때에도 특정 DOM에다 적용하기 때문에 DOM을 선택해야 하는 상황이 발생 가능

### ref

이럴 때, 리액트에서 `ref`라는 것을 사용

+ 함수형 컴포넌트에서 `ref` 사용 시에는 `useRef`라는 Hook 함수를 사용
+ 클래스형 컴포넌트에서는 콜백 함수나 `React.createRef` 함수를 사용

기존에 만들었던 InputSample에서는 초기화 버튼을 누르면 포커스가 초기화 버튼에 그대로 남아 있게 되는데, 초기화 버튼 클릭 시에 이름 input에 포커스가 잡히도록 `useRef`를 사용하여 기능 구현

+ ./src/InputSample.js 수정

  ```jsx
  import React, { useState, useRef } from "react";
  
  function InputSample() {
    const [inputs, setInputs] = useState({
      name: "",
      nickname: "",
    });
  
    const nameInput = useRef();
  
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
      nameInput.current.focus();
    };
    return (
      <div>
        <input
          name="name"
          placeholder="이름"
          onChange={onChange}
          value={name}
          ref={nameInput}
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

  `useRef()`를 사용하여 Ref 객체를 만들고, 이 객체를 우리가 선택하고 싶은 DOM에 `ref` 값으로 설정해주면 Ref 객체의 `.current` 값은 원하는 DOM을 가르키게 됨


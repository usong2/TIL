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

<br>

## useRef로 컴포넌트 안의 변수 만들기

컴포넌트에서 특정 DOM을 선택해야 할 때, `ref`를 사용해야 하며 함수형 컴포넌트에서 이를 설정할 때 `useRef`를 사용하여 설정함

`useRef` Hook은 DOM을 선택하는 용도 외에도 컴포넌트 안에서 조회 및 수정할 수 있는 변수를 관리 가능

`useRef`로 관리하는 변수는 값이 바뀐다고 해서 컴포넌트가 리렌더링 되지 않음
리액트 컴포넌트에서의 상태는 상태를 바꾸는 함수를 호출하고나서 그 다음 렌더링 이후로 업데이트된 상태를 조회할 수 있는 반면, `useRef`로 관리하고 있는 변수는 설정 후 바로 조회 가능

이 변수를 사용하여 다음과 같은 값을 관리 가능

+ `setTimeout`, `setInterval`을 통해서 만들어진 `id`
+ 외부 라이브러리를 사용하여 생성된 인스턴스
+ scroll 위치

App 컴포넌트에서 `useRef`를 사용하여 변수를 관리해볼 것인데, 용도는 앞으로 배열에 새항목을 추가하며 새 항목에서 사용할 고유 id를 관리하는 용도

우선 App에서 배열을 선언한 후 UserList에게 props로 전달

+ ./src/UserList.js 수정

  ```jsx
  import React from "react";
  
  function User({ user }) {
    return (
      <div>
        <b>{user.username}</b> <span>({user.email})</span>
      </div>
    );
  }
  
  function UserList({ users }) {
    return (
      <div>
        {users.map((user) => (
          <User user={user} key={user.id} />
        ))}
      </div>
    );
  }
  
  export default UserList;
  ```

+ ./src/App.js 수정

  ```jsx
  import React from "react";
  import UserList from "./UserList";
  
  function App() {
    const users = [
      {
        id: 1,
        username: "usong",
        email: "dbthd6@naver.com",
      },
      {
        id: 2,
        username: "tester",
        email: "tester@naver.com",
      },
      {
        id: 3,
        username: "merong",
        email: "merong@naver.com",
      },
    ];
  
    return <UserList users={users} />;
  }
  
  export default App;
  ```

App에서 `useRef()`를 사용하여 nextId라는 변수를 만듦

+ ./src/App.js 수정

  ```jsx
  import React, { useRef } from "react";
  import UserList from "./UserList";
  
  function App() {
    const users = [
      {
        id: 1,
        username: "usong",
        email: "dbthd6@naver.com",
      },
      {
        id: 2,
        username: "tester",
        email: "tester@naver.com",
      },
      {
        id: 3,
        username: "merong",
        email: "merong@naver.com",
      },
    ];
  
    const nextId = useRef(4);
    const onCreate = () => {
      console.log(nextId.current);
      nextId.current += 1;
    };
  
    return <UserList users={users} />;
  }
  
  export default App;
  ```

`useRef()`를 사용할 때 파라미터를 넣어주면, 이 값이 `.current` 값의 기본값이 됨

그리고 이 값을 수행할 때에는 `.current` 값을 수정하면 되고 조회 시에는 `.current`를 조회
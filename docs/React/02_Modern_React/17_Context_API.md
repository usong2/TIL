# Context API

## Context API를 사용한 전역 값 관리

현재 만들고 있는 프로젝트에서는 App 컴포넌트에서 `onToggle`, `onRemove`가 구현되어 있고 이 함수들은 UserList 컴포넌트를 거쳐서 각 User 컴포넌트들에게 전달되고 있음

여기서 UserList 컴포넌트의 경우에는 `onToggle`과 `onRemove`를 전달하기 위한 중간 다리역할만 하고 있음

이렇게 특정 함수를 특정 컴포넌트를 거쳐 원하는 컴포넌트에게 전달하는 작업은 리액트 개발 중 자주 발생할 수 있는데 만약 3~4개 이상의 컴포넌트를 거쳐 전달을 해야 하는 일이 발생하면 매우 번거로울 것

이럴 때, 리액트의 Context API와 dispatch를 함께 사용하면 복잡한 구조를 해결할 수 있음

Context API는 프로젝트 안에서 전역적으로 사용할 수 있는 값을 관리가 가능
상태가 아닌 '값'은 꼭 상태를 가르키지 않아도 되며 이 값은 함수일 수도 있고 어떤 외부 라이브러리 인스턴스일 수도 있고 심지어 DOM일 수도 있음

Context API를 사용하여 새로운 Context를 만드는 방법

```jsx
context UserDispatch = React.createContext(null);
```

`createContext`의 파라미터에는 Context의 기본값을 설정할 수 있으며 여기서 설정하는 값은 Context를 쓸 때 값을 따로 지정하지 않을 경우 사용되는 기본값

Context를 만들면, Context 안에 Provider라는 컴포넌트가 들어있는데 이 컴포넌트를 통하여 Context의 값을 정할 수 있고 컴포넌트를 사용할 때, `value`라는 값을 설정

```jsx
<UserDispatch.Provider value={dispatch}>...</UserDispatch.Provider>
```

이렇게 설정해주고 나면 Provider에 의하여 감싸진 컴포넌트 중 어디서든지 Context의 값을 다른 곳에서 바로 조회해서 사용 가능

### 실습

+ ./src/ContextSample.js 생성

  ```jsx
  // ./src/ContextSample.js
  
  import React, { createContext, useContext } from "react";
  
  function Child({ text }) {
    return <div>안녕하세요? {text}</div>;
  }
  
  function Parent({ text }) {
    return <Child text={text} />;
  }
  
  function GrandParent({ text }) {
    return <Parent text={text} />;
  }
  
  function ContextSample() {
    return <GrandParent text="GOOD" />;
  }
  
  export default ContextSample;
  ```

+ ./src/index.js 수정

  ```jsx
  // ./src/index.js
  
  import React from "react";
  import ReactDOM from "react-dom";
  import "./index.css";
  import App from "./App";
  import * as serviceWorker from "./serviceWorker";
  import ContextSample from "./ContextSample";
  
  ReactDOM.render(<ContextSample />, document.getElementById("root"));
  
  // If you want your app to work offline and load faster, you can change
  // unregister() to register() below. Note this comes with some pitfalls.
  // Learn more about service workers: https://bit.ly/CRA-PWA
  serviceWorker.unregister();
  ```

+ Context API 사용

  ```jsx
  // ./src/ContextSample.js
  
  import React, { createContext, useContext } from "react";
  
  const MyContext = createContext("defaultValue");
  
  function Child() {
    const text = useContext(MyContext);
    return <div>안녕하세요? {text}</div>;
  }
  
  function Parent() {
    return <Child />;
  }
  
  function GrandParent() {
    return <Parent />;
  }
  
  function ContextSample() {
    return (
      <MyContext.Provider value="GOOD">
        <GrandParent />
      </MyContext.Provider>
    );
  }
  
  export default ContextSample;
  ```

+ 유동적으로 변하는 Context

  ```jsx
  // ./src/ContextSample.js
  
  import React, { createContext, useContext, useState } from "react";
  
  const MyContext = createContext("defaultValue");
  
  function Child() {
    const text = useContext(MyContext);
    return <div>안녕하세요? {text}</div>;
  }
  
  function Parent() {
    return <Child />;
  }
  
  function GrandParent() {
    return <Parent />;
  }
  
  function ContextSample() {
    const [value, setValue] = useState(true);
    return (
      <MyContext.Provider value={value ? "GOOD" : "BAD"}>
        <GrandParent />
        <button onClick={() => setValue(!value)}>CLICK ME</button>
      </MyContext.Provider>
    );
  }
  
  export default ContextSample;
  ```

<br>

## UserDispatch Context 만들기

+ ./src/App.js 수정

  ```jsx
  // ./src/App.js
  
  import React, { useReducer, useMemo, createContext } from "react";
  import UserList from "./UserList";
  import CreateUser from "./CreateUser";
  
  function countActiveUsers(users) {
    console.log("활성 사용자 수를 세는 중...");
    return users.filter((user) => user.active).length;
  }
  
  const initialState = {
    users: [
      {
        id: 1,
        username: "usong",
        email: "dbthd6@naver.com",
        active: true,
      },
      {
        id: 2,
        username: "tester",
        email: "tester@naver.com",
        active: false,
      },
      {
        id: 3,
        username: "merong",
        email: "merong@naver.com",
        active: false,
      },
    ],
  };
  
  function reducer(state, action) {
    switch (action.type) {
      case "CREATE_USER":
        return {
          inputs: initialState.inputs,
          users: state.users.concat(action.user),
        };
      case "TOGGLE_USER":
        return {
          ...state,
          users: state.users.map((user) =>
            user.id === action.id ? { ...user, active: !user.active } : user
          ),
        };
      case "REMOVE_USER":
        return {
          ...state,
          users: state.users.filter((user) => user.id !== action.id),
        };
      default:
        throw new Error("Unhandled action");
    }
  }
  
  export const UserDispatch = createContext(null);
  
  function App() {
    const [state, dispatch] = useReducer(reducer, initialState);
    const { users } = state;
  
    const count = useMemo(() => countActiveUsers(users), [users]);
  
    return (
      <UserDispatch.Provider value={dispatch}>
        <CreateUser users={users} />
        <UserList users={users} />
        <div>활성 사용자 수 : {count}</div>
      </UserDispatch.Provider>
    );
  }
  
  export default App;
  ```

+ ./src/CreateUser.js 수정

  ```jsx
  // ./src/CreateUser.js
  
  import React, { useRef, useContext } from "react";
  import useInputs from "./useInputs";
  import { UserDispatch } from "./App";
  
  function CreateUser() {
    const [{ username, email }, onChange, reset] = useInputs({
      username: "",
      email: "",
    });
  
    const nextId = useRef(4);
    const dispatch = useContext(UserDispatch);
  
    const onCreate = () => {
      dispatch({
        type: "CREATE_USER",
        user: {
          id: nextId.current,
          username,
          email,
        },
      });
      reset();
      nextId.current += 1;
    };
  
    return (
      <div>
        <input
          name="username"
          placeholder="계정명"
          onChange={onChange}
          value={username}
        />
        <input
          name="email"
          placeholder="이메일"
          onChange={onChange}
          value={email}
        />
        <button onClick={onCreate}>등록</button>
      </div>
    );
  }
  
  export default React.memo(CreateUser);
  ```

  


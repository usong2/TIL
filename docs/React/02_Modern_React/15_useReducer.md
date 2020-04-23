# useReducer

## useReducer Hook

상태를 업데이트할 때에는 `useState`를 사용해서 새로운 상태를 설정해주었는데, 상태를 관리하게 될 때 `useState` 외에도 `useReducer`를 사용 가능

`useReducer`를 사용하면 컴포넌트의 상태 업데이트 로직을 컴포넌트에서 분리시킬 수 있고 상태 업데이트 로직을 바깥에 작성할 수도 있고 심지어 다른 파일에 작성 후 불러와서 사용 가능

+ `useState`:  설정하고 싶은 다음 상태를 직접 지정해주는 방식으로 상태 업데이트

  ```jsx
  setValue(5);
  ```

+ `useReducer`: action 객체를 기반으로 상태를 업데이트 가능하며 type이라는 상태를 사용하여 어떤 업데이트를 할 건지 명시할 수 있고 필요한(참조하고 싶은) 값이 있다면 함께 넣을 수 있음

  ```bash
  dispatch({ 
    type: 'INCREMENT',
    diff: 4
  })
  ```

### reducer란?

reducer: 상태를 업데이트 하는 함수

```jsx
function reducer(state, action) {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1;
    case 'DECREMENT':
      return state - 1;
    case 'INCREMENT':
      return state;
  }
}
```

현재 상태와 액션 객체를 파라미터로 받아와서 새로운 상태를 반환하는 형태

### useReducer 사용 방법

```jsx
$ const [number, dispatch] = useReducer(reducer, 0);
```

number는 현재 상태, dispatch는 액션을 발생시키는 함수

<br>

### 실습

+ ./src/Counter.js 수정

  ```jsx
  // ./src/Counter.js
  
  import React, { useReducer } from "react";
  
  function reducer(state, action) {
    switch (action.type) {
      case "INCREMENT":
        return state + 1;
      case "DECREMENT":
        return state - 1;
      default:
        throw new Error("Unhanded action");
    }
  }
  
  function Counter() {
    const [number, dispatch] = useReducer(reducer, 0);
  
    const onIncrease = () => {
      dispatch({
        type: "INCREMENT",
      });
    };
    const onDecrease = () => {
      dispatch({
        type: "DECREMENT",
      });
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

+ ./src/index.js 수정

  ```jsx
  // ./src/index.js
  
  import React from "react";
  import ReactDOM from "react-dom";
  import "./index.css";
  import App from "./App";
  import Counter from "./Counter";
  import * as serviceWorker from "./serviceWorker";
  
  ReactDOM.render(
    <React.StrictMode>
      <Counter />
    </React.StrictMode>,
    document.getElementById("root")
  );
  
  // If you want your app to work offline and load faster, you can change
  // unregister() to register() below. Note this comes with some pitfalls.
  // Learn more about service workers: https://bit.ly/CRA-PWA
  serviceWorker.unregister();
  ```


<br>

## App 컴포넌트를 useReducer로 구현하기

### 실습

+ ./src/App.js 초기화

  ```jsx
  // ./src/App.js
  
  import React, { useRef, useState, useMemo, useCallback } from "react";
  import UserList from "./UserList";
  import CreateUser from "./CreateUser";
  
  function countActiveUsers(users) {
    console.log("활성 사용자 수를 세는 중...");
    return users.filter((user) => user.active).length;
  }
  
  const initialState = {
    inputs: {
      username: "",
      email: "",
    },
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
  
  function App() {
    return (
      <>
        <CreateUser />
        <UserList users={[]} />
        <div>활성 사용자 수 : 0</div>
      </>
    );
  }
  
  export default App;
  ```

+ onChange, onCreate 구현

  ```jsx
  import React, { useRef, useReducer, useMemo, useCallback } from "react";
  import UserList from "./UserList";
  import CreateUser from "./CreateUser";
  
  function countActiveUsers(users) {
    console.log("활성 사용자 수를 세는 중...");
    return users.filter((user) => user.active).length;
  }
  
  const initialState = {
    inputs: {
      username: "",
      email: "",
    },
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
      case "CHANGE_INPUT":
        return {
          ...state,
          inputs: {
            ...state.inputs,
            [action.name]: action.value,
          },
        };
      case "CREATE_USER":
        return {
          inputs: initialState.inputs,
          users: state.users.concat(action.user),
        };
      default:
        throw new Error("Unhandled action");
    }
  }
  
  function App() {
    const [state, dispatch] = useReducer(reducer, initialState);
    const nextId = useRef(4);
  
    const { users } = state;
    const { username, email } = state.inputs;
  
    const onChange = useCallback((e) => {
      const { name, value } = e.target;
      dispatch({
        type: "CHANGE_INPUT",
        name,
        value,
      });
    }, []);
  
    const onCreate = useCallback(() => {
      dispatch({
        type: "CREATE_USER",
        user: {
          id: nextId.current,
          username,
          email,
        },
      });
      nextId.current += 1;
    }, [username, email]);
  
    return (
      <>
        <CreateUser
          username={username}
          email={email}
          onChange={onChange}
          onCreate={onCreate}
        />
        <UserList users={users} />
        <div>활성 사용자 수 : 0</div>
      </>
    );
  }
  
  export default App;
  ```

+ onToggle, onRemove 구현

  ```jsx
  // ./src/App.js
  
  import React, { useRef, useReducer, useMemo, useCallback } from "react";
  import UserList from "./UserList";
  import CreateUser from "./CreateUser";
  
  function countActiveUsers(users) {
    console.log("활성 사용자 수를 세는 중...");
    return users.filter((user) => user.active).length;
  }
  
  const initialState = {
    inputs: {
      username: "",
      email: "",
    },
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
      case "CHANGE_INPUT":
        return {
          ...state,
          inputs: {
            ...state.inputs,
            [action.name]: action.value,
          },
        };
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
  
  function App() {
    const [state, dispatch] = useReducer(reducer, initialState);
    const nextId = useRef(4);
  
    const { users } = state;
    const { username, email } = state.inputs;
  
    const onChange = useCallback((e) => {
      const { name, value } = e.target;
      dispatch({
        type: "CHANGE_INPUT",
        name,
        value,
      });
    }, []);
  
    const onCreate = useCallback(() => {
      dispatch({
        type: "CREATE_USER",
        user: {
          id: nextId.current,
          username,
          email,
        },
      });
      nextId.current += 1;
    }, [username, email]);
  
    const onToggle = useCallback((id) => {
      dispatch({
        type: "TOGGLE_USER",
        id,
      });
    }, []);
  
    const onRemove = useCallback((id) => {
      dispatch({
        type: "REMOVE_USER",
        id,
      });
    }, []);
  
    return (
      <>
        <CreateUser
          username={username}
          email={email}
          onChange={onChange}
          onCreate={onCreate}
        />
        <UserList users={users} onToggle={onToggle} onRemove={onRemove} />
        <div>활성 사용자 수 : 0</div>
      </>
    );
  }
  
  export default App;
  ```

+ 활성 사용자 수 구현

  ```jsx
  // ./src/App.js
  
  import React, { useRef, useReducer, useMemo, useCallback } from "react";
  import UserList from "./UserList";
  import CreateUser from "./CreateUser";
  
  function countActiveUsers(users) {
    console.log("활성 사용자 수를 세는 중...");
    return users.filter((user) => user.active).length;
  }
  
  const initialState = {
    inputs: {
      username: "",
      email: "",
    },
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
      case "CHANGE_INPUT":
        return {
          ...state,
          inputs: {
            ...state.inputs,
            [action.name]: action.value,
          },
        };
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
  
  function App() {
    const [state, dispatch] = useReducer(reducer, initialState);
    const nextId = useRef(4);
  
    const { users } = state;
    const { username, email } = state.inputs;
  
    const onChange = useCallback((e) => {
      const { name, value } = e.target;
      dispatch({
        type: "CHANGE_INPUT",
        name,
        value,
      });
    }, []);
  
    const onCreate = useCallback(() => {
      dispatch({
        type: "CREATE_USER",
        user: {
          id: nextId.current,
          username,
          email,
        },
      });
      nextId.current += 1;
    }, [username, email]);
  
    const onToggle = useCallback((id) => {
      dispatch({
        type: "TOGGLE_USER",
        id,
      });
    }, []);
  
    const onRemove = useCallback((id) => {
      dispatch({
        type: "REMOVE_USER",
        id,
      });
    }, []);
  
    const count = useMemo(() => countActiveUsers(users), [users]);
  
    return (
      <>
        <CreateUser
          username={username}
          email={email}
          onChange={onChange}
          onCreate={onCreate}
        />
        <UserList users={users} onToggle={onToggle} onRemove={onRemove} />
        <div>활성 사용자 수 : {count}</div>
      </>
    );
  }
  
  export default App;
  ```

<br>

## useReducer VS UseState

+ useState: 컴포넌트에서 관리하는 값이 하나고 그 값이 숫자나 문자열 또는 불리언 값일 때 
+ useReducer: 컴포넌트에서 관리하는 값이 여러 가지로 상태의 구조가 복잡할 때
# Custom Hook

## Custom Hook 만들기

컴포넌트를 만들다보면, 반복되는 로직이 자주 발생함

```jsx
const onChange = (e) => {
  const { name, value } = e.target;
  setInputs({ ...inputs, [name]: value });
}
```

예를 들어, input을 관리하는 코드는 이렇게 e.target 안에 있는 name과 value를 읽어서 그것들을 참조해 새로운 상태를 만들어 내는데 이럴 때 Custom Hook을 만들 수 있음

Custom Hook을 만드는 방법은 그냥, 안에서 `useState`, `useEffect`, `useReducer` `useCallback` 등 Hooks를 사용하여 원하는 기능을 구현해주고 컴포넌트에서 사용하고 싶은 값들을 반환하면 됨

+ ./src/useInputs.js 생성

  ```jsx
  // ./src/useInputs.js
  
  import { useState, useCallback } from "react";
  
  function useInputs(initialForm) {
    const [form, setForm] = useState(initialForm);
    const onChange = useCallback((e) => {
      const { name, value } = e.target;
      setForm((form) => ({ ...form, [name]: value }));
    }, []);
  
    const reset = useCallback(() => setForm(initialForm), [initialForm]);
  
    return [form, onChange, reset];
  }
  
  export default useInputs;
  ```

+ ./src/App.js 수정

  ```jsx
  // ./src/App.js
  
  import React, { useRef, useReducer, useMemo, useCallback } from "react";
  import UserList from "./UserList";
  import CreateUser from "./CreateUser";
  import useInputs from "./useInputs";
  
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
  
  function App() {
    const [state, dispatch] = useReducer(reducer, initialState);
    const [form, onChange, reset] = useInputs({
      username: "",
      email: "",
    });
    const { username, email } = form;
    const nextId = useRef(4);
    const { users } = state;
  
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
      reset();
    }, [username, email, reset]);
  
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

+ ./src/useInputs.js 를 reducer로 구현

  ```jsx
  // ./src/useInputs.js
  
  import { useReducer, useCallback } from "react";
  
  function reducer(state, action) {
    switch (action.type) {
      case "CHANGE":
        return {
          ...state,
          [action.name]: action.value,
        };
      case "RESET":
        return Object.keys(state).reduce((acc, current) => {
          acc[current] = "";
          return acc;
        }, {});
      default:
        return state;
    }
  }
  
  function useInputs(initialForm) {
    const [form, dispatch] = useReducer(reducer, initialForm);
    // change
    const onChange = useCallback((e) => {
      const { name, value } = e.target;
      dispatch({ type: "CHANGE", name, value });
    }, []);
    const reset = useCallback(() => dispatch({ type: "RESET" }), []);
    return [form, onChange, reset];
  }
  
  export default useInputs;
  ```

  

  
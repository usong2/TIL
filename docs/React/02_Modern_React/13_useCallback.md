# useCallback

## useCallback Hook

`useMemo`는 특정 결과값을 재사용할 때 사용하는 반면, `useCallback`은 특정 함수를 새로 만들지 않고 재사용하고 싶을 경우 사용

+ ```jsx
// ./src/App.js
  
  import React, { useRef, useState, useMemo, useCallback } from "react";
  import UserList from "./UserList";
  import CreateUser from "./CreateUser";
  
  function countActiveUsers(users) {
    console.log("활성 사용자 수를 세는 중...");
    return users.filter((user) => user.active).length;
  }
  
  function App() {
    const [inputs, setInputs] = useState({
      username: "",
      email: "",
    });
    const { username, email } = inputs;
    const onChange = useCallback(
      (e) => {
        const { name, value } = e.target;
        setInputs({
          ...inputs,
          [name]: value,
        });
      },
      [inputs]
    );
  
    const [users, setUsers] = useState([
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
    ]);
  
    const nextId = useRef(4);
  
    const onCreate = useCallback(() => {
      const user = {
        id: nextId.current,
        username,
        email,
      };
      setUsers(users.concat(user)); // concat 함수
  
      setInputs({
        username: "",
        email: "",
      });
      nextId.current += 1;
    }, [username, email, users]);
  
    const onRemove = useCallback(
      (id) => {
        setUsers(users.filter((user) => user.id !== id));
      },
      [users]
    );
  
    const onToggle = useCallback(
      (id) => {
        setUsers(
          users.map((user) =>
            user.id === id ? { ...user, active: !user.active } : user
          )
        );
      },
      [users]
    );
  
    const count = useMemo(() => countActiveUsers(users), [users]);
  
    return (
      <>
        <CreateUser
          username={username}
          email={email}
          onChange={onChange}
          onCreate={onCreate}
        />
        <UserList users={users} onRemove={onRemove} onToggle={onToggle} />
        <div>활성 사용자 수 : {count}</div>
      </>
    );
  }
  
  export default App;
  ```

함수 안에서 사용하는 상태 혹은 props가 있다면 꼭 `deps` 배열안에 포함시켜야 함.
만약 `deps` 배열 안에 함수에서 사용하는 값을 넣지 않는다면 함수 내에서 해당 값들을 참조할 때 가장 최신 값을 참조할 것이라고 보장할 수 없음. props로 받아오면 함수가 있다면 이 또한 `deps`에 넣어주어야 함

`useCallback`은 `useMemo`를 기반으로 만들어졌으나 함수를 위해서 사용할 때 더욱 편하게 한 것으로 아래와 같이 표현 가능

```jsx
const onToggle = useMemo(
  () => () => {
    /* ... */
  },
  [users]
)
```

+ react devtools 설치: [https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=en](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=en)
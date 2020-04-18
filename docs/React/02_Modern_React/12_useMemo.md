# useMemo

## useMemo Hook

성능 최적화를 위하여 연산된 값을 `useMemo`라는 Hook을 사용하여 재사용

`countActiveUsers`라는 함수를 만들어 `active` 값이 `true`인 사용자의 수를 세어 화면에 렌더링

+ ./src/App.js 수정

  ```jsx
  // ./src/App.js
  
  import React, { useRef, useState } from "react";
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
    const onChange = (e) => {
      const { name, value } = e.target;
      setInputs({
        ...inputs,
        [name]: value,
      });
    };
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
  
    const onCreate = () => {
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
    };
  
    const onRemove = (id) => {
      setUsers(users.filter((user) => user.id !== id));
    };
  
    const onToggle = (id) => {
      setUsers(
        users.map((user) =>
          user.id === id ? { ...user, active: !user.active } : user
        )
      );
    };
  
    const count = countActiveUsers(users);
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

`countActiveUsers` 함수에서 콘솔에 메시지를 출력하도록 한 이유는, 이 함수가 호출될 때마다 우리가 알 수 있게 하기 위함

그러나, input의 값을 바꿀 때에도 `countActiveUsers` 함수가 호출되어 성능적으로 문제가 있음

활성 사용자 수를 세는 건, users에 변화가 있을 때만 세야되는데 input 값이 바뀔 때에도 컴포넌트가 리렌더링되므로 이렇게 불필요할 때에도 호출되어 자원이 낭비됨

이러한 상황에서 `useMemo`라는 Hook 함수를 사용하면 성능 최적화가 가능

Memo는 "memorized"를 의미하는데 이는 이전에 계산한 값을 재사용한다는 의미를 가지고 있음

+ ./src/App.js 수정

  ```jsx
  // ./src/App.js
  
  import React, { useRef, useState, useMemo } from "react";
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
    const onChange = (e) => {
      const { name, value } = e.target;
      setInputs({
        ...inputs,
        [name]: value,
      });
    };
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
  
    const onCreate = () => {
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
    };
  
    const onRemove = (id) => {
      setUsers(users.filter((user) => user.id !== id));
    };
  
    const onToggle = (id) => {
      setUsers(
        users.map((user) =>
          user.id === id ? { ...user, active: !user.active } : user
        )
      );
    };
  
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

`useMemo`의 첫번째 파라미터에는 어떻게 연산할지 정의하는 함수를 넣어주면 되고 두번째 파라미터에는 deps 배열을 넣어주면 되는데, 이 배열 안에 넣은 내용이 바뀌면 우리가 등록한 함수를 호출해서 값을 연산해주고 만약에 내용이 바뀌지 않았다면 이전에 연산한 값을 재사용하게 됨


# React.memo

## React.memo를 사용한 컴포넌트 리렌더링 방지

React.memo는 컴포넌트의 props가 바뀌지 않았다면 리렌더링을 방지하여 컴포넌트의 리렌더링 성능 최적화를 해줄 수 있는 함수

컴포넌트에서 리렌더링이 필요한 상황에서만 리렌더링을 하도록 설정 가능

+ ./src/CreateUser.js 수정

  ```jsx
  // ./src/CreateUser.js
  
  import React from "react";
  
  function CreateUser({ username, email, onChange, onCreate }) {
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

+ ./src/UserList.js 수정

  ```jsx
  // ./src/UserList.js
  
  import React, { useEffect } from "react";
  
  const User = React.memo(function User({ user, onRemove, onToggle }) {
    const { username, email, id, active } = user;
    useEffect(() => {
      console.log("user 값이 설정됨");
      console.log(user);
      return () => {
        console.log("user 값이 바뀌기 전");
        console.log(user);
      };
    }, [user]);
    return (
      <div>
        <b
          style={{
            color: active ? "green" : "black",
            cursor: "pointer",
          }}
          onClick={() => onToggle(id)}
        >
          {username}
        </b>{" "}
        <span>({email})</span>
        <button onClick={() => onRemove(id)}>삭제</button>
      </div>
    );
  });
  
  function UserList({ users, onRemove, onToggle }) {
    return (
      <div>
        {users.map((user) => (
          <User
            user={user}
            key={user.id}
            onRemove={onRemove}
            onToggle={onToggle}
          />
        ))}
      </div>
    );
  }
  
  export default React.memo(UserList);
  ```

적용 후 input 수정 시에 하단의 UserList가 리렌더링 되지 않는 것을 확인

그런데 User 중 하나라도 수정하면 모든 User들이 리렌더링되고 createUser도 리렌더링됨
그 이유는 user 배열이 바뀔 때마다 onCreate에서도 새로 만들어지고, onToggle, onREmove도 새로 만들어지기 때문

`deps`에 `users`가 들어있기 때문에 배열이 바뀔 때마다 함수가 새로 만들어지는 것은 당연함

이것을 최적화하고 싶다면 deps에서 `users`를 지우고 함수들에서 현재 `useState`로 관리하는 `users`를 참조하지 않게 하면 됨

함수형 업데이트로 `setUsers`에 등록하는 콜백함수의 파라미터에서 최신 `users`를 참조할 수 있으므로 `deps`에 `users`를 넣지 않아됨

+ ./src/App.js 수정

  ```jsx
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
      setUsers((users) => users.concat(user)); // concat 함수
  
      setInputs({
        username: "",
        email: "",
      });
      nextId.current += 1;
    }, [username, email]);
  
    const onRemove = useCallback((id) => {
      setUsers((users) => users.filter((user) => user.id !== id));
    }, []);
  
    const onToggle = useCallback((id) => {
      setUsers((users) =>
        users.map((user) =>
          user.id === id ? { ...user, active: !user.active } : user
        )
      );
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
        <UserList users={users} onRemove={onRemove} onToggle={onToggle} />
        <div>활성 사용자 수 : {count}</div>
      </>
    );
  }
  
  export default App;
  ```

이렇게 수정하면 특정 항목을 수정할 때 해당 항목만 리렌더링됨

리액트 개발 시에 `useCallback`, `useMemo`, `React.memo`는 컴포넌트의 성능을 실제로 개선할 수 있는 상황에서만 사용하는 것이 좋음

예를 들어, User 컴포넌트에 `b`와 `button`에 `onClick`으로 설정해준 함수들은 해당 함수들을 `useCallback`으로 재사용한다고 해서 리렌더링을 막을 수 있는 것은 아니므로 굳이 그렇게 할 필요 없음

추가적으로, 렌더링 최적화하지 않을 컴포넌트에 React.memo를 사용하는 것은 불필요한 props 비교만 하는 것이므로 실제 렌더링을 방지할 수 있는 경우에만 사용하는 것이 좋음

또 React.memo에서 두 번째 파라미터에 `propsAreEqual`이라는 함수를 사용하여 특정 값들만 비교하는 것도 가능

```jsx
export default React.memo(
  UserList,
  (prevProps, nextProps) => prevProps.users === nextProps.users
)
```

하지만, 이것을 잘못 사용하면 오히려 의도치 않은 버그들이 발생하기 쉬움. 예를 들어, 함수형 업데이트로 전환을 안했는데 이렇게 users만 비교하게 되면 onToggle과 onRemove에서 최신 users 배열을 참조하지 않으므로 심각한 오류 발생 가능


# useEffect

## useEffect Hook

useEffect Hook을 이용하여 컴포넌트가 마운트 됐을 때(처음 나타났을 때), 언마운트 됐을 때(사라질 때), 그리고 업데이트될 때(특정 props가 바뀔 때) 특정 작업을 처리하는 방법을 공부

### 마운트/언마운트

+ ./src/UserList.js 수정

  ```jsx
  // ./src/UserList.js
  
  import React, { useEffect } from "react";
  
  function User({ user, onRemove, onToggle }) {
    const { username, email, id, active } = user;
    useEffect(() => {
      console.log("컴포넌트가 화면에 나타남");
      return () => {
        console.log("컴포넌트가 화면에서 사라짐");
      };
    }, []);
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
  }
  
  function Use름rList({ users, onRemove, onToggle }) {
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
  
  export default UserList;
  ```

`useEffect` 사용 시 첫번째 파라미터에는 함수, 두 번째 파라미터에는 의존값이 들어있는 배열(`deps`)을 넣으며 만약, `deps`배열을 비우게 된다면, 컴포넌트가 처음 나타날 때만 `useEffect`에 등록한 함수가 호출됨

`useEffect`에서는 함수를 반환할 수 있으며 이를 `cleanup` 함수라고 부르는데 `cleanup` 함수는 `deps`가 비어있는 경우에는 컴포넌트가 사라지면서 호출되므로 `useEffect`에 대한 뒷정리를 해줌

주로 마운트 시에 하는 작업들은 다음과 같은 작업 사항들

+ `props`로 받은 값을 컴포넌트의 로컬 상태로 설정
+ 외부 API 요청(REST API 등)
+ 라이브러리 사용(D3, Video.js 등...)
+ setInterval을 통한 반복작업 혹은 setTimeout을 통한 작업 예약

언마운트 시에 하는 작업들

+ setInterval, setTimeout을 사용하여 등록한 작업들 clear 하기(clearInterval, clearTimeout)
+ 라이브러리 인스턴스 제거

### deps에 특정 값 넣기

deps에 특정 값을 넣게 된다면, 컴포넌트가 처음 마운트될 때에도 호출이 되고, 지정한 값이 바뀔 때에도 호출이 되며, deps 안에 특정 값이 있다면 언마운트 시에도 호출이 되고, 값이 바뀌기 직전에도 호출이 됨

+ ./src/UserList.js 수정

  ```jsx
  // ./src/UserList.js
  
  import React, { useEffect } from "react";
  
  function User({ user, onRemove, onToggle }) {
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
  }
  
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
  
  export default UserList;
  ```

`useEffect` 안에서 사용하는 상태나 props가 있다면, `useEffect`의 `deps`에 넣어주는 것이 규칙

만약 `useEffect` 안에서 사용하는 상태가 props를 `deps`에 넣지 않게 된다면 `useEffect`에 등록한 함수가 실행될 때 최신 props / 상태를 가르키지 않게 됨

### deps 파라미터를 생략하기

`dep` 파라미터를 생략하면 컴포넌트가 리렌더링될 때마다 호출

+ ./src/UserList.jsx 수정

  ```jsx
  // ./src/UserList.jsx
  
  import React, { useEffect } from "react";
  
  function User({ user, onRemove, onToggle }) {
    const { username, email, id, active } = user;
    useEffect(() => {
      console.log(user);
    });
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
  }
  
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
  
  export default UserList;
  ```

리액트는 기본적으로 부모 컴포넌트가 리렌더링되면서 바뀐 내용이 없을지라도 자식 컴포넌트 또한 리렌더링됨. 

물론, 실제 DOM에 변화가 반영되는 것은 바뀐 내용이 있는 컴포넌트에만 해당하지만 Virtual DOM에는 모든 걸 다 리렌더링 하고 있음

컴포넌트를 최적화 하는 과정에서 기존 내용을 그대로 사용하면서 Virtual DOM에 렌더링하는 리소스를 아낄 수도 있음
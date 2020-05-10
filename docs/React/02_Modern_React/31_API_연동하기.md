# API 연동

## API 연동하기

+ 새 프로젝트 생성

  ```bash
  $ npx create-react-app api-integrate
  ```

+ axios 라이브러리 설치

  ```bash
  $ cd api-integrate
  $ yarn add axios
  ```

axios를 사용하면 GET, PUT, POST, DELETE 등의 메서드로 API를 요청할 수 있음

REST API 참고: [https://meetup.toast.com/posts/92](https://meetup.toast.com/posts/92)

REST API를 사용할 때에는 하고 싶은 작업에 따라 다른 메서드로 요청 가능

| 메서드 | 작업        |
| ------ | ----------- |
| GET    | 데이터 조회 |
| POST   | 데이터 등록 |
| PUT    | 데이터 수정 |
| DELETE | 데이터 제거 |

+ axios의 사용법

  ```jsx
  import axios from 'axios';
  
  axios.get('/users/1');
  ```

  `get`이 위치한 자리에는 메서드 이름을 소문자로 넣으며 새로운 데이터를 등록하고 싶다면 `axios.post()`를 사용하고 파라미터 주소에는 API의 주소를 넣음

  `axios.post()`로 데이터 등록 시에는 두번째 파라미터에 등록하고자 하는 정보를 넣을 수 있음

  ```jsx
  axios.post('/users', {
    username: 'blabla',
    name: 'blabla',
  })
  ```

+ API 연동 실습 시에 [JSONPlaceholder](https://jsonplaceholder.typicode.com/)의 연습용 API를 사용하며 그 중에서 다음의 주소를 사용
  [https://jsonplaceholder.typicode.com/users](https://jsonplaceholder.typicode.com/users)
  결과물은 다음과 같은 형식으로 구성

  ```json
  [
    {
      "id": 1,
      "name": "Leanne Graham",
      "username": "Bret",
      "email": "Sincere@april.biz",
      "address": {
        "street": "Kulas Light",
        "suite": "Apt. 556",
        "city": "Gwenborough",
        "zipcode": "92998-3874",
        "geo": {
          "lat": "-37.3159",
          "lng": "81.1496"
        }
      },
      "phone": "1-770-736-8031 x56442",
      "website": "hildegard.org",
      "company": {
        "name": "Romaguera-Crona",
        "catchPhrase": "Multi-layered client-server neural-net",
        "bs": "harness real-time e-markets"
      }
    },
    {
      "id": 2,
      "name": "Ervin Howell",
      "username": "Antonette",
      "email": "Shanna@melissa.tv",
      "address": {
        "street": "Victor Plains",
        "suite": "Suite 879",
        "city": "Wisokyburgh",
        "zipcode": "90566-7771",
        "geo": {
          "lat": "-43.9509",
          "lng": "-34.4618"
        }
      },
      "phone": "010-692-6593 x09125",
      "website": "anastasia.net",
      "company": {
        "name": "Deckow-Crist",
        "catchPhrase": "Proactive didactic contingency",
        "bs": "synergize scalable supply-chains"
      }
    },
    (...)
  ]
  ```

### useState 와 useEffect로 데이터 로딩 하기

`useState`를 사용하여 요청 상태를 관리하고 `useEffect`를 사용하여 컴포넌트가 렌더링되는 시점에 요청을 시작

요청에 대한 상태 관리 시에는 총 3가지 상태를 관리

1. 요청의 결과
2. 로딩 상태
3. 에러

<br>

+ ./src/Users.js 생성

  ```jsx
  // ./src/Users.js
  
  import React, { useState, useEffect } from "react";
  import axios from "axios";
  
  function Users() {
    const [users, setUsers] = useState(null);
    const [loading, setLoading] = useState(False);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      const fetchUsers = async () => {
        try {
          setUsers(null);
          setError(null);
          setLoading(true);
          const response = await axios.get(
            "https://jsonplaceholder.typicode.com/users"
          );
          setUsers(response.data);
        } catch (e) {
          setError(e);
        }
        setLoading(false);
      };
      fetchUsers();
    }, []);
  
    if (loading) return <div>로딩중..</div>;
    if (error) return <di>에러 발생</di>;
    if (!users) return null;
  
    return (
      <div>
        <ul>
          {users.map((user) => (
            <li key={user.id}>
              {user.username} ({user.name})
            </li>
          ))}
        </ul>
      </div>
    );
  }
  
  export default Users;
  ```

+ ./src/App.js 수정

  ```jsx
  // ./src/App.js
  
  import React from "react";
  import Users from "./Users";
  
  function App() {
    return <Users />;
  }
  
  export default App;
  ```

+ 특정 버튼을 눌렀을 때 API를 재요청

  ```jsx
  // ./src/Users.js
  
  import React, { useState, useEffect } from "react";
  import axios from "axios";
  
  function Users() {
    const [users, setUsers] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
  
    const fetchUsers = async () => {
      try {
        setUsers(null);
        setError(null);
        setLoading(true);
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/users"
        );
        setUsers(response.data);
      } catch (e) {
        console.log(e.response.status);
        setError(e);
      }
      setLoading(false);
    };
  
    useEffect(() => {
      fetchUsers();
    }, []);
  
    if (loading) return <div>로딩중..</div>;
    if (error) return <di>에러 발생</di>;
    if (!users) return null;
  
    return (
      <>
        <ul>
          {users.map((user) => (
            <li key={user.id}>
              {user.username} ({user.name})
            </li>
          ))}
        </ul>
        <button onClick={fetchUsers}>다시 불러오기</button>
      </>
    );
  }
  
  export default Users;
  ```

### useReducer로 요청 상태 관리하기

이 전에는 useState를 3번 사용해서 요청에 관련된 상태를 관리했으나 useReducer로 요청, 관리에 관한 코드를 분리해서 추후에 재사용 가능

+ ./src/Users.js 수정

  ```jsx
  // ./src/Users.js
  
  import React, { useEffect, useReducer } from "react";
  import axios from "axios";
  
  // LOADING, SUCCESS, ERROR
  function reducer(state, action) {
    switch (action.type) {
      case "LOADING":
        return {
          loading: true,
          data: null,
          error: null,
        };
      case "SUCCESS":
        return {
          loading: false,
          data: action.data,
          error: null,
        };
      case "ERROR":
        return {
          loading: false,
          data: null,
          error: action.error,
        };
      default:
        throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
  
  function Users() {
    const [state, dispatch] = useReducer(reducer, {
      loading: false,
      data: null,
      error: null,
    });
  
    const fetchUsers = async () => {
      dispatch({ type: "LOADING" });
      try {
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/users"
        );
        dispatch({ type: "SUCCESS", data: response.data });
      } catch (e) {
        dispatch({ type: "ERROR", error: e });
      }
    };
  
    useEffect(() => {
      fetchUsers();
    }, []);
  
    const { loading, data: users, error } = state;
  
    if (loading) return <div>로딩중..</div>;
    if (error) return <di>에러 발생</di>;
    if (!users) return null;
  
    return (
      <>
        <ul>
          {users.map((user) => (
            <li key={user.id}>
              {user.username} ({user.name})
            </li>
          ))}
        </ul>
        <button onClick={fetchUsers}>다시 불러오기</button>
      </>
    );
  }
  
  export default Users;
  ```

<br>

## useAsync 커스텀 Hook 만들어서 사용하기

+ ./src/useAsync.js 생성

  ```jsx
  // ./src/useAsync.js
  
  import { useReducer, useEffect, useCallback } from "react";
  
  // LOADING, SUCCESS, ERROR
  function reducer(state, action) {
    switch (action.type) {
      case "LOADING":
        return {
          loading: true,
          data: null,
          error: null,
        };
      case "SUCCESS":
        return {
          loading: false,
          data: action.data,
          error: null,
        };
      case "ERROR":
        return {
          loading: false,
          data: null,
          error: action.error,
        };
      default:
        throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
  
  function useAsync(callback, deps = []) {
    const [state, dispatch] = useReducer(reducer, {
      loading: false,
      data: null,
      error: null,
    });
  
    const fetchData = useCallback(async () => {
      dispatch({ type: "LOADING" });
      try {
        const data = await callback();
        dispatch({ type: "success", data });
      } catch (e) {
        dispatch({ type: "error", error: e });
      }
    }, [callback]);
  
    useEffect(() => {
      fetchData();
      // eslint-disable-next-Line
    }, deps);
  
    return [state, fetchData];
  }
  
  export default useAsync;
  ```

+ ./src/Users.js 수정

  ```jsx
  // ./src/Users.js
  
  import React from "react";
  import axios from "axios";
  import useAsync from "./useAsync";
  
  async function getUsers() {
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/users"
    );
    return response.data;
  }
  
  function Users() {
    const [state, refetch] = useAsync(getUsers);
  
    const { loading, data: users, error } = state;
  
    if (loading) return <div>로딩중..</div>;
    if (error) return <di>에러 발생</di>;
    if (!users) return null;
  
    return (
      <>
        <ul>
          {users.map((user) => (
            <li key={user.id}>
              {user.username} ({user.name})
            </li>
          ))}
        </ul>
        <button onClick={refetch}>다시 불러오기</button>
      </>
    );
  }
  
  export default Users;
  ```

+ 컴포넌트가 처음 렌더링 될 때는 데이터를 요청하지 않고 특정 버튼을 클릭해야만 요청 시작

  ```jsx
  // ./src/useAsync.js
  
  import { useReducer, useEffect, useCallback } from "react";
  
  // LOADING, SUCCESS, ERROR
  function reducer(state, action) {
    switch (action.type) {
      case "LOADING":
        return {
          loading: true,
          data: null,
          error: null,
        };
      case "SUCCESS":
        return {
          loading: false,
          data: action.data,
          error: null,
        };
      case "ERROR":
        return {
          loading: false,
          data: null,
          error: action.error,
        };
      default:
        throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
  
  function useAsync(callback, deps = [], skip = false) {
    const [state, dispatch] = useReducer(reducer, {
      loading: false,
      data: null,
      error: null,
    });
  
    const fetchData = useCallback(async () => {
      dispatch({ type: "LOADING" });
      try {
        const data = await callback();
        dispatch({ type: "SUCCESS", data });
      } catch (e) {
        dispatch({ type: "ERROR", error: e });
      }
    }, [callback]);
  
    useEffect(() => {
      if (skip) {
        return;
      }
      fetchData();
      // eslint-disable-next-Line
    }, deps);
  
    return [state, fetchData];
  }
  
  export default useAsync;
  ```

  ```jsx
  // ./src/Users.js
  
  import React from "react";
  import axios from "axios";
  import useAsync from "./useAsync";
  
  async function getUsers() {
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/users"
    );
    return response.data;
  }
  
  function Users() {
    const [state, refetch] = useAsync(getUsers, [], true);
  
    const { loading, data: users, error } = state;
  
    if (loading) return <div>로딩중..</div>;
    if (error) return <di>에러 발생</di>;
    if (!users) return <button onClick={refetch}>불러오기</button>;
  
    return (
      <>
        <ul>
          {users.map((user) => (
            <li key={user.id}>
              {user.username} ({user.name})
            </li>
          ))}
        </ul>
        <button onClick={refetch}>다시 불러오기</button>
      </>
    );
  }
  
  export default Users;
  ```

+ 특정 파라미터를 가져와 주소에 넣고 싶은 경우

  ./src/User.js 생성

  ```jsx
  // ./src/User.js
  
  import React from "react";
  import axios from "axios";
  import useAsync from "./useAsnyc";
  
  async function getUser(id) {
    const response = await axios.get(
      `https://jsonplaceholder.typicode.com/users/${id}`
    );
    return response.data;
  }
  
  function User({ id }) {
    const [state] = useAsync(() => getUser(id), [id]);
    const { loading, data: user, error } = state;
  
    if (loading) return <div>로딩중..</div>;
    if (error) return <div>에러 발생</div>;
    if (!user) return null;
  
    return (
      <div>
        <h2>{user.username}</h2>
        <p>
          <b>Email: </b> {user.email}
        </p>
      </div>
    );
  }
  
  export default User;
  ```

  ./src/Users.js 수정

  ```jsx
  // ./src/Users.js
  
  import React, { useState } from "react";
  import axios from "axios";
  import useAsync from "./useAsync";
  import User from "./User";
  
  async function getUsers() {
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/users"
    );
    return response.data;
  }
  
  function Users() {
    const [state, refetch] = useAsync(getUsers, [], true);
    const [userId, setUserId] = useState(null);
  
    const { loading, data: users, error } = state;
  
    if (loading) return <div>로딩중..</div>;
    if (error) return <di>에러 발생</di>;
    if (!users) return <button onClick={refetch}>불러오기</button>;
  
    return (
      <>
        <ul>
          {users.map((user) => (
            <li key={user.id} onClick={() => setUserId(user.id)}>
              {user.username} ({user.name})
            </li>
          ))}
        </ul>
        <button onClick={refetch}>다시 불러오기</button>
        {userId && <User id={userId} />}
      </>
    );
  }
  
  export default Users;
  ```

<br>

## react-async로 요청 상태 관리하기

+ 라이브러리 설치

  ```bash
  $ yarn add react-async
  ```

+ react-async의 공식 사용법

  ```jsx
  import { useAsync } from "react-async"
  
  const loadCustomer = async ({ customerId }, { signal }) => {
    const res = await fetch(`/api/customers/${customerId}`, { signal })
    if (!res.ok) throw new Error(res)
    return res.json()
  }
  
  const MyComponent = () => {
    const { data, error, isLoading } = useAsync({ promiseFn: loadCustomer, customerId: 1 })
    if (isLoading) return "Loading..."
    if (error) return `Something went wrong: ${error.message}`
    if (data)
      return (
        <div>
          <strong>Loaded some data:</strong>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
      )
    return null
  }
  ```

+ ./src/User.js 수정

  ```jsx
  // ./src/User.js
  
  import React from "react";
  import axios from "axios";
  import { useAsync } from "react-async";
  
  async function getUser({ id }) {
    const response = await axios.get(
      `https://jsonplaceholder.typicode.com/users/${id}`
    );
    return response.data;
  }
  
  function User({ id }) {
    const { data: user, error, isLoading } = useAsync({
      promiseFn: getUser,
      id,
      watch: id,
    });
  
    if (isLoading) return <div>로딩중..</div>;
    if (error) return <div>에러 발생</div>;
    if (!user) return null;
  
    return (
      <div>
        <h2>{user.username}</h2>
        <p>
          <b>Email: </b> {user.email}
        </p>
      </div>
    );
  }
  
  export default User;
  ```

+ ./src/Users.js 수정

  ```jsx
  // ./src/Users.js
  
  import React, { useState } from "react";
  import axios from "axios";
  import { useAsync } from "react-async";
  import User from "./User";
  
  async function getUsers() {
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/users"
    );
    return response.data;
  }
  
  function Users() {
    const [userId, setUserId] = useState(null);
    const { data: users, error, isLoading, reload } = useAsync({
      promiseFn: getUsers,
    });
  
    if (isLoading) return <div>로딩중..</div>;
    if (error) return <di>에러 발생</di>;
    if (!users) return <button onClick={reload}>불러오기</button>;
  
    return (
      <>
        <ul>
          {users.map((user) => (
            <li key={user.id} onClick={() => setUserId(user.id)}>
              {user.username} ({user.name})
            </li>
          ))}
        </ul>
        <button onClick={reload}>다시 불러오기</button>
        {userId && <User id={userId} />}
      </>
    );
  }
  
  export default Users;
  ```

+ 특정 버튼을 클릭했을 때만 불러오기

  ```jsx
  // ./src/Users.js
  
  import React, { useState } from "react";
  import axios from "axios";
  import { useAsync } from "react-async";
  import User from "./User";
  
  async function getUsers() {
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/users"
    );
    return response.data;
  }
  
  function Users() {
    const [userId, setUserId] = useState(null);
    const { data: users, error, isLoading, reload, run } = useAsync({
      deferFn: getUsers,
    });
  
    if (isLoading) return <div>로딩중..</div>;
    if (error) return <di>에러 발생</di>;
    if (!users) return <button onClick={run}>불러오기</button>;
  
    return (
      <>
        <ul>
          {users.map((user) => (
            <li key={user.id} onClick={() => setUserId(user.id)}>
              {user.username} ({user.name})
            </li>
          ))}
        </ul>
        <button onClick={reload}>다시 불러오기</button>
        {userId && <User id={userId} />}
      </>
    );
  }
  
  export default Users;
  ```

### react-async의 장점, 단점

| 장점                                                  | 단점             |
| ----------------------------------------------------- | ---------------- |
| 필요할 때 설치 후 바로 사용 가능                      | 옵션이 조금 복잡 |
| 컴포넌트에서 비동기 작업 시 필요한 기능들 대부분 탑재 |                  |
| Hook이 아닌 컴포넌트 형태로도 사용 가능               |                  |
| 특정 Promise를 기다리는 작업을 도중에 취소 가능       |                  |

<br>

## Context에서 비동기작업 상태 관리하기

특정 데이터들은 다양한 컴포넌트에서 필요하게 될 때도 있는데(예: 현재 로그인된 사용자의 정보, 설정 등) Context를 사용하면 개발이 편해짐

+ ./src/UsersContext.js 생성

  ```jsx
  // ./src/UsersContext.js
  
  import React, { createContext, useReducer, useContext } from "react";
  import axios from "axios";
  
  const initialState = {
    users: {
      loading: false,
      data: null,
      error: null,
    },
    user: {
      loading: false,
      data: null,
      error: null,
    },
  };
  
  const loadingState = {
    loading: true,
    data: null,
    error: null,
  };
  
  const success = (data) => ({
    loading: false,
    data,
    error: null,
  });
  
  const error = (e) => ({
    loading: false,
    data: null,
    error: e,
  });
  
  // GET_USERS
  // GET_USERS_SUCCESS
  // GET_USERS_ERROR
  // GET_USER
  // GET_USER_SUCCESS
  // GET_USER_ERROR
  
  function usersReducer(state, action) {
    switch (action.type) {
      case "GET_USERS":
        return {
          ...state,
          users: loadingState,
        };
      case "GET_USERS_ERROR":
        return {
          ...state,
          users: error(action.error),
        };
      case "GET_USERS_SUCCESS":
        return {
          ...state,
          users: success(action.data),
        };
      case "GET_USER":
        return {
          ...state,
          user: loadingState,
        };
      case "GET_USER_ERROR":
        return {
          ...state,
          user: error(action.error),
        };
      case "GET_USER_SUCCESS":
        return {
          ...state,
          user: success(action.data),
        };
  
      default:
        throw new Error("Unhandled action type", action.type);
    }
  }
  
  const UsersStateContext = createContext(null);
  const UsersDispatchContext = createContext(null);
  
  export function UsersProvider({ children }) {
    const [state, dispatch] = useReducer(usersReducer, initialState);
    return (
      <UsersStateContext.Provider value={state}>
        <UsersDispatchContext.Provider value={dispatch}>
          {children}
        </UsersDispatchContext.Provider>
      </UsersStateContext.Provider>
    );
  }
  
  export function useUsersState() {
    const state = useContext(UsersStateContext);
    if (!state) {
      throw new Error("Cannot find UsersProvider");
    }
    return state;
  }
  
  export function useUsersDispatch() {
    const dispatch = useContext(UsersDispatchContext);
    if (!dispatch) {
      throw new Error("Cannot find UsersProvider");
    }
    return dispatch;
  }
  
  export async function getUsers(dispatch) {
    dispatch({ type: "GET_USERS" });
    try {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/users"
      );
      dispatch({
        type: "GET_USERS_SUCCESS",
        data: response.data,
      });
    } catch (e) {
      dispatch({
        type: "GET_USERS_ERROR",
        error: e,
      });
    }
  }
  
  export async function getUser(dispatch, id) {
    dispatch({ type: "GET_USER" });
    try {
      const response = await axios.get(
        `https://jsonplaceholder.typicode.com/users/${id}`
      );
      dispatch({
        type: "GET_USER_SUCCESS",
        data: response.data,
      });
    } catch (e) {
      dispatch({
        type: "GET_USER_ERROR",
        error: e,
      });
    }
  }
  ```

+ ./src/App.js 수정

  ```jsx
  // ./src/App.js
  
  import React from "react";
  import Users from "./Users";
  import { UsersProvider } from "./UsersContext";
  
  function App() {
    return (
      <UsersProvider>
        <Users />
      </UsersProvider>
    );
  }
  
  export default App;
  ```

+ ./src/Users.js 수정

  ```jsx
  // ./src/Users.js
  
  import React, { useState } from "react";
  import User from "./User";
  import { useUsersState, useUsersDispatch, getUsers } from "./UsersContext";
  
  function Users() {
    const [userId, setUserId] = useState(null);
    const state = useUsersState();
    const dispatch = useUsersDispatch();
  
    const { loading, data: users, error } = state.users;
  
    const fetchData = () => {
      getUsers(dispatch);
    };
  
    if (loading) return <div>로딩중..</div>;
    if (error) return <di>에러 발생</di>;
    if (!users) return <button onClick={fetchData}>불러오기</button>;
  
    return (
      <>
        <ul>
          {users.map((user) => (
            <li key={user.id} onClick={() => setUserId(user.id)}>
              {user.username} ({user.name})
            </li>
          ))}
        </ul>
        <button onClick={fetchData}>다시 불러오기</button>
        {userId && <User id={userId} />}
      </>
    );
  }
  
  export default Users;
  ```

+ ./src/User.js 수정

  ```jsx
  // ./src/User.js
  
  import React, { useEffect } from "react";
  import { useUsersDispatch, useUsersState, getUser } from "./UsersContext";
  
  function User({ id }) {
    const state = useUsersState();
    const dispatch = useUsersDispatch();
  
    useEffect(() => {
      getUser(dispatch, id);
    }, [dispatch, id]);
  
    const { loading, data: user, error } = state.user;
  
    if (loading) return <div>로딩중..</div>;
    if (error) return <div>에러 발생</div>;
    if (!user) return null;
  
    return (
      <div>
        <h2>{user.username}</h2>
        <p>
          <b>Email: </b> {user.email}
        </p>
      </div>
    );
  }
  
  export default User;
  ```

### 리팩토링

*반복되는 코드 줄이기*

+ ./src/api.js 생성

  ```jsx
  // ./src/api.js
  
  import axios from "axios";
  
  export async function getUsers() {
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/users"
    );
    return response.data;
  }
  
  export async function getUser(id) {
    const response = await axios.get(
      `https://jsonplaceholder.typicode.com/users/${id}`
    );
    return response.data;
  }
  ```

+ ./src/asyncActionUtils.js

  ```jsx
  // ./src/asyncActionUtils.js
  
  export default function createAsyncDispatcher(type, promiseFn) {
    const SUCCESS = `${type}_SUCCESS`;
    const ERROR = `${type}_ERROR`;
  
    async function actionHandler(dispatch, ...rest) {
      dispatch({ type });
      try {
        const data = await promiseFn(...rest);
        dispatch({
          type: SUCCESS,
          data,
        });
      } catch (e) {
        dispatch({
          type: ERROR,
          error: e,
        });
      }
    }
    return actionHandler;
  }
  
  export const initialAsyncState = {
    loading: false,
    data: null,
    error: null,
  };
  
  const loadingState = {
    loading: true,
    data: null,
    error: null,
  };
  
  const success = (data) => ({
    loading: false,
    data,
    error: null,
  });
  
  const error = (e) => ({
    loading: false,
    data: null,
    error: e,
  });
  
  export function createAsyncHandler(type, key) {
    const SUCCESS = `${type}_SUCCESS`;
    const ERROR = `${type}_ERROR`;
  
    function handler(state, action) {
      switch (action.type) {
        case type:
          return {
            ...state,
            [key]: loadingState,
          };
        case SUCCESS:
          return {
            ...state,
            [key]: success(action.data),
          };
        case ERROR:
          return {
            ...state,
            [key]: error(action.error),
          };
        default:
          return state;
      }
    }
    return handler;
  }
  ```

+ ./src/UsersContext.js 수정

  ```jsx
  // ./src/UsersContext.js
  
  import React, { createContext, useReducer, useContext } from "react";
  import * as api from "./api";
  import createAsyncDispatcher, {
    initialAsyncState,
    createAsyncHandler,
  } from "./asyncActionUtils";
  
  const initialState = {
    users: initialAsyncState,
    user: initialAsyncState,
  };
  
  // GET_USERS
  // GET_USERS_SUCCESS
  // GET_USERS_ERROR
  // GET_USER
  // GET_USER_SUCCESS
  // GET_USER_ERROR
  
  const usersHandler = createAsyncHandler("GET_USERS", "users");
  const userHandler = createAsyncHandler("GET_USER", "user");
  
  function usersReducer(state, action) {
    switch (action.type) {
      case "GET_USERS":
      case "GET_USERS_SUCCESS":
      case "GET_USERS_ERROR":
        return usersHandler(state, action);
      case "GET_USER":
      case "GET_USER_SUCCESS":
      case "GET_USER_ERROR":
        return userHandler(state, action);
      default:
        throw new Error("Unhandled action type", action.type);
    }
  }
  
  const UsersStateContext = createContext(null);
  const UsersDispatchContext = createContext(null);
  
  export function UsersProvider({ children }) {
    const [state, dispatch] = useReducer(usersReducer, initialState);
    return (
      <UsersStateContext.Provider value={state}>
        <UsersDispatchContext.Provider value={dispatch}>
          {children}
        </UsersDispatchContext.Provider>
      </UsersStateContext.Provider>
    );
  }
  
  export function useUsersState() {
    const state = useContext(UsersStateContext);
    if (!state) {
      throw new Error("Cannot find UsersProvider");
    }
    return state;
  }
  
  export function useUsersDispatch() {
    const dispatch = useContext(UsersDispatchContext);
    if (!dispatch) {
      throw new Error("Cannot find UsersProvider");
    }
    return dispatch;
  }
  
  export const getUsers = createAsyncDispatcher("GET_USERS", api.getUsers);
  export const getUser = createAsyncDispatcher("GET_USER", api.getUser);
  ```

<br>


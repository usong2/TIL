# Immer

## Immer를 사용한 더 쉬운 불변성 지키기

리액트에서 배열이나 객체를 업데이트 해야 할 때는 직접 수정하면 안되고 불변성을 지켜주면서 업데이트를 해주어야 함

예를 들면 다음과 같이 하면 안되고

```jsx
const object = {
  a: 1,
  b: 2
}

object.b = 3;
```

다음과 같이 ... 연산자를 사용해서 새로운 객체를 만들어야 함

```jsx
const object = {
  a: 1,
  b: 2
}

const nextObject = {
  ...object,
  b: 3
}
```

배열도 마찬가지로 `push`, `splice` 등의 함수를 사용하거나 n 번째 항목을 직접 수정하면 안되고 다음과 같이 `concat`, `filter`, `map` 등의 함수를 사용해야 함

```jsx
const todos = [
  {
    id: 1,
    text: '할 일 #1',
    done: true
  },
  {
    id: 2
    text: '할 일 #2',
    done: false
  }
];

const inserted = todos.concat({
  id: 3,
  text: '할 일 #3',
  done: false
});

const filtered = todos.filter(todo => todo.id !== 2);

const toggled = todos.map(
  todo => todo.id === 2
    ? {
      ...todo,
      done: !todo.done,
    }
    : todo
);
```

대부분의 경우 ... 연산자 또는 배열 내장함수를 사용하는건 그렇게 어렵지는 않지만 데이터의 구조가 조금 까다로워지면 불변성을 지켜가면서 새로운 데이터를 생성해내는 코드가 조금 복잡해짐

아래와 같은 객체가 있다고 가정하면

```jsx
const state = {
  posts: [
    {
      id: 1,
      title: '제목입니다.',
      body: '내용입니다.',
      comments: [
        {
          id: 1,
          text: '와 정말 잘 읽었습니다.'
        }
      ]
    },
    {
      id: 2,
      title: '제목입니다.',
      body: '내용입니다.',
      comments: [
        {
          id: 2,
          text: '또 다른 댓글 어쩌고 저쩌고'
        }
      ]
    }
  ],
  selectedId: 1
};
```

여기서 `post` 배열 안의 id가 1인 `post` 객체를 찾아서 `comments`에 새로운 댓글 객체를 추가해줘야 한다고 가정하면 다음과 같이 객체를 업데이트 해줘야 함

```jsx
const nextState = {
  ...state,
  posts: state.posts.map(post =>
    post.id === 1
      ? {
          ...post,
          comments: post.comments.concat({
            id: 3,
            text: '새로운 댓글'
          })
        }
      : post
  )
};
```

어려운 건 아니지만 코드의 구조가 복잡해져서 코드를 봤을 때 한 눈에 들어오지 않으나 이럴 때, Immer라는 라이브러리를 사용하면 쉽게 구현이 가능

```jsx
const nextState = produce(state, draft => {
  const post = draft.posts.find(post => post.id === 1);
  post.comments.push({
    id: 3,
    text: '와 정말 쉽다!'
  });
});
```

Immer를 사용하면 상태를 업데이트 할 때 불변성을 신경쓰지 않으면서 업데이트를 해주면 Immer가 불변성 관리를 대신 해줌

<br>

## Immer 사용법

```bash
$ yarn add immer
```

라이브러리를 짤 때는 아래와 같이 코드 상단에서 immer를 불러와주어야 하는데 보통 `produce`라는 이름으로 불러옴

```jsx
import produce from 'immer';
```

`produce` 함수를 사용할 때에는 첫번째 파라미터에 수정하고 싶은 상태, 두 번째 파라미터에는 어떻게 업데이트하고 싶은지 정의하는 함수를 넣어줌

두 번째 파라미터에 넣는 함수는 불변성에 대해 신경쓰지 않고 그냥 업데이트 해주면 다 알아서 해줌

```jsx
const state = {
  number: 1,
  dontChangeMe: 2
};

const nextState = produce(state, draft => {
  draft.number += 1;
});

console.log(nextState);
// { number: 2, dontChangeMe: 2 }
```

<br>

## 리듀서에서 Immer 사용하기

Immer를 사용해서 간단해지는 업데이트가 있고 오히려 코드가 길어지는 업데이트들이 있음

예를 들어, 기존에 만들었던 프로젝트의 경우 `users` 배열이 객체의 깊은 곳에 위치하지 않기 때문에 새 항목을 추가하거나 제거할 때는 Immer를 사용하는 것 보다 `concat`과 `filter`를 사용하는 것이 코드가 더 짧고 간편함

### 실습

+ ./src/App.js 수정

  ```jsx
  // ./src/App.js
  
  import React, { useReducer, useMemo, createContext } from "react";
  import produce from "immer";
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
        return produce(state, (draft) => {
          draft.users.push(action.user);
        });
      // return {
      //   inputs: initialState.inputs,
      //   users: state.users.concat(action.user),
      // };
      case "TOGGLE_USER":
        return produce(state, (draft) => {
          const user = draft.users.find((user) => user.id === action.id);
          user.active = !user.active;
        });
      // return {
      //   ...state,
      //   users: state.users.map((user) =>
      //     user.id === action.id ? { ...user, active: !user.active } : user
      //   ),
      // };
      case "REMOVE_USER":
        return produce(state, (draft) => {
          const index = draft.users.findIndex((user) => user.id === action.id);
          draft.users.splice(index, 1);
        });
      // return {
      //   ...state,
      //   users: state.users.filter((user) => user.id !== action.id),
      // };
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

`TOGGLE_USER` 액션의 경우는 Immer 사용 후 코드가 깔끔해졌으나 나머지의 경우에는 코드가 좀 더 복잡해졌으므로 상황에 따라 잘 선택하여 사용하면 됨

<br>

## Immer와 함수형 업데이트

`useState`를 사용할 때 함수형 업데이트를 하면

```jsx
const [todo, setTodo] = useState({
  text: 'Hello',
  done: false
});

const onClick = useCallback(() => {
  setTodo(todo => ({
    ...todo,
    done: !todo.done
  }));
}, []);
```

`setTodo` 함수에 업데이트 해주는 함수를 넣음으로써, 만약 `useCallback`을 사용하는 경우 두번째 파라미터인 `deps` 배열에 `todo`를 넣지 않아도 됨




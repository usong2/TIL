# Redux

+ 리액트 생태계에서 가장 사용률이 높은 상태관리 라이브러리
+ 리덕스를 사용하게 되면 만들게 되는 컴포넌트의 상태 로직들을 다른 파일들로 분리시켜 더욱 효율적으로 관리 가능
+ 손쉬운 글로벌 상태 관리 
+ **Context API + useReducer** 를 사용하여 상태 관리 하는 것과 사용 방식이 유사
+ 리액트에서 사용하기 위해 만들어진 라이브러리이긴 하지만 무조건 리액트와 함께 사용될 필요는 없으며 일반 자바스크립트 환경, 앵귤러와 같은 다른 프레임워크에서 사용되기도 함
+ 리덕스를 잘 활용하면 상황이나 취향에 따라 프로젝트 개발 생산성 향상에 큰 도움을 줄 수 있으나 단순히 글로벌 상태 관리를 위한 것이거나 글로벌 상태가 별로 없다면 Context API를 활용하는 것만으로도 충분할 수 있음

<br>

## Context 사용과 리덕스 사용의 차이점

### 1. 미들웨어

리덕스에는 미들웨어라는 기능이 있는데 아래와 같은 기능으로 다양한 작업 가능

+ 특정 조건에 따라 액션이 무시되게 만들 수 있음
+ 액션을 콘솔에 출력하거나, 서버쪽에 로깅 가능
+ 액션이 디스패치 됐을 때 이를 수정해서 리듀서에게 전달되도록 할 수 있음
+ 특정 액션이 발생했을 때 이에 기반하여 다른 액션이 발생되도록 할 수 있음
+ 특정 액션이 발생했을 때 특정 자바스크립트 함수를 실행 가능

이렇게 용도는 다양하지만 가장 주요 사용 용도는 **비동기 작업을 더욱 체계적으로 관리 가능**

### 2. 유용한 함수와, Hooks

react-redux라는 라이브러리를 사용하면서 유용한 함수와 Hooks를 지원받을 수 있음

예를 들어, Context API와 UseReducer를 사용할 경우에는 어떤 기능을 만들 때마다 Context를 새로 만들고 Context의 Provider를 설정하고 각 Context를 더욱 편하게 사용하기 위해서 전용 커스텀 Hook을 만들어 사용했으나 리덕스에서는 이와 비슷한 작업을 편리하게 해줄 수 있는 여러 기능들이 존재함

+ **connect**: 전역적인 상태, Dispatch하는 함수들을 props로 받아와서 사용 가능
+ **useSelector, useDispatch, useStore**: 리덕스에서 관리하고 있는 상태를 쉽게 조회하거나 액션을 Dispatch 가능
+ Context API를 사용한다면 이런 것을 직접 만들어주어야 함

### 3. 기본적인 최적화가 이미 되어 있음

+ 상태를 받아와서 사용하게 될 때 기본적인 최적화가 어느 정도 되어 있어 필요한 상태가 바뀔 때만 리렌더링되는 기능이 탑재되어 있음
+ Context API와 useReducer를 사용하게 될 때도 비슷하게 최적화가 가능하나 따로 직접 해야할 것이 있음

### 4. 하나의 커다란 상태

+ Context API를 사용하여 글로벌 상태를 관리하는 경우에는 기능별로 Context를 만들어 사용하는 것이 일반적
+ 리덕스에서는 모든 글로벌 상태를 하나의 커다란 객체에 넣어서 사용하는 것이 필수이므로 매번 Context를 만드는 수고로움을 덜 수 있음

### 5. DevTools

+ 아주 유용한 개발자 도구인 DevTools가 있음
+ 현재 상태를 한 눈에 볼 수 있고 지금까지 어떤 변화가 있는지 볼 수 있고 특정 시점으로 상태를 되돌릴 수 있음

### 6. 이미 사용중인 프로젝트가 많음

+ 리액트 프로젝트를 유지보수하게 될 경우 해당 프로젝트에서 리덕스를 사용하고 있을 경우가 높음

<br>

## 리덕스 언제 써야 할까?

### 프로젝트의 규모가 큰가요?

+ Y - Redux
  N - Context API

### 비동기 작업을 자주 하게 되나요?

+ Y - Redux
  N - Context API

### 리덕스가 편하게 느껴지나요?

+ Y - Redux
  N - Context API or MobX

<br>

## 리덕스에서 사용되는 키워드 숙지하기

### 액션 (Action)

+ 상태에 어떠한 변화가 필요할 때 액션을 발생시키고 이는 하나의 객체로 표현되는데 액션 객체는 다음과 같은 형식으로 이루어져 있음

  ```jsx
  { 
  	type: "TOGGLE_VALUE"
  }
  ```

  type이라는 값이 필수적으로 있으며 type을 보고 어떻게 업데이트할지 정함

  type 외에도 다른 값을 넣어줄 수 있음

  ```jsx
  {
      type: "ADD_TODO",
      data: {
          id: 0,
          text: "리덕스 배우기"
      }
  }
  ```

  위의 액션은 새로운 TODO(할 일)를 만드는 액션이며 이러한 데이터를 추가하겠다는 것을 의미

  ````jsx
  {
      type: "CHANGE_INPUT",
      text: "안녕하세요"
  }
  ````

  위의 액션은 input의 상태를 바꾸는 액션으로 input의 상태를 text로 받아온 '안녕하세요'라는 값으로 바꾸겠다는 액션

+ 액션이라는 것 자체는 액션을 업데이트할 때 어떻게 업데이트해야 하는지를 정의하는 객체

### 액션 생성함수(Action Creator)

+ 말 그대로 액션을 만들어주는 함수로 단순히 파라미터를 받아와서 액션 객체를 만들어주는 함수

  ```jsx
  export function addTodo(data) {
      return {
          type: "ADD_TODO",
          data
      };
  }
  
  // 화살표 함수로도 만들 수 있음
  export const changeInput = text => ({
      type: 'CHANGE_INPUT',
      text
  });
  ```

+ 리덕스 사용 시에는 액션 생성함수가 필수적이진 않으나 액션 생성함수를 만들고나면 나중에 조금 더 편하게 액션 객체를 만들 수 있음

+ 액션 생성함수를 사용하지 않을 경우 액션을 발생시킬 때마다 직접 액션 객체를 작성해야 함

### 리듀서(Reducer)

+ useReducer를 사용했을 때 접했던 리듀서와 같음

+ 변화를 일으키는 함수이며 state, action 두 가지 파라미터를 가져옴

  ```jsx
  function counter(state, action) {
      switch (action.type) {
          case 'INCREASE':
             	return state + 1;
          case 'DECREASE':
              return state - 1;
          default:
              return state;
      }
  }
  ```

  리듀서 함수에서 하는 일은 action의 type이 무엇인가에 따라서 다른 업데이트 작업을 함

+ 리듀서에는 불변성을 꼭 유지해야 함. 즉, 기존에 있는 객체나 배열을 건드리지 않고 새로운 배열이나 객체를 만들어서 반환해야 함

+ useReducer 사용 시에는 default 부분에 에러를 발생시켜야 하는 것이 일반적이나 리덕스의 reducer에서는 기존의 state를 그대로 반환하는 형태로 작성해야 함. 리덕스 사용 시에는 여러 개의 리듀서를 만들고 이를 합쳐서 루트 리듀서를 만들 수 있는데 루트 리듀서 안에 들어있는 작은 리듀서들은 서브 리듀서라 부름

### 스토어(Store)

+ 리덕스를 사용하게 되면 한 애플리케이션 당 하나의 스토어를 만들게 되는데 스토어 안에는 현재 앱의 상태와 리듀서가 들어있고 추가적으로 몇 가지 내장 함수들이 들어있음

#### 디스패치(dispatch)

+ 스토어 안에 들어 있는 몇 가지 내장 함수들 중의 하나인 디스패치는 액션을 발생시키는 것 또는 액션을 스토어에게 전달한다는 의미로 이해 가능

+ 디스패치는 아래와 같은 형태로 사용(액션 객체를 만들고 디스패치 파라미터에 넣어서 호출 -> 호출 후에는 해당 액션이 리듀서에게 전달되고 리듀서 함수에서 새로운 상태를 반환 -> 스토어의 상태가 업데이트)

  ```jsx
  dispatch({ type: 'INCREASE' })
  ```

#### 구독(subscribe)

+ 스토어의 내장 함수 중 하나이며 subscribe 함수를 호출할 때 파라미터로 특정 함수를 넣어주면 액션이 디스패치될 때마다 설정한 함수가 호출됨
+ 스토어의 상태가 업데이트될 때마다 특정 함수를 호출 가능

### 정리

1. **액션(Action)**
   상태를 업데이트할 때 어떻게 업데이트해야 할지에 대한 정보를 지니고 있는 객체이며 type 값을 필수로 가지고 있어야 함
2. **액션 생성함수(Action Creator)**
   액션 객체를 만들어주는 함수
3. **리듀서(Reducer)**
   상태를 바꿔주는 함수로 새로운 상태를 만들어줌 
   즉, state, action을 파라미터로 가져와서 새로운 상태로 만들어줌
4. **스토어(Store)**
   현재 앱의 상태와 리듀서가 들어있으며 하나의 애플리케이션에서는 하나의 스토어만 만듦
   스토어 안에는 몇 가지 내장 함수들이 들어있음
   1. **디스패치(Dispatch)**: 디스패치를 통해 액션을 발생시킬 수 있음
   2. **구독(subscribe)**: 서브스크라이브를 통해 액션이 발생되었을 때 특정 함수를 호출 가능

<br>

## 리덕스의 3가지 규칙

### 1. 하나의 애플리케이션에는 하나의 스토어가 있음

+ 여러 개의 스토어를 만드는 것은 가능하긴하나 절대 권장되지 않음
+ 만약 특정 업데이트가 빈번하게 일어나거나 애플리케이션의 특정 부분을 완전히 분리시키게 될 때 스토어를 여러 개 만들게 되기도 하는데 일반적인 방법은 아님
+ 스토어가 여러 개가 되었을 때 개발자 도구를 제대로 활용하지 못함

### 2. 상태는 읽기전용

+ 즉, 불변성을 지켜주어야 함 => 좋은 성능을 지켜내기 위함(불변성을 지켜야만 컴포넌트들이 제대로 리렌더링)
  + 객체가 있다면 spread 연산자를 사용하여 객체를 복사 후 특정 값을 덮어씌움
  + 배열의 경우 push, splice, reverse를 사용하면 안되고 concat, filter, map, slice 등과 같은 불편성을 지키는 내장 함수를 사용해야 함 

### 3. 변화를 일으키는 함수 리듀서는 순수한 함수여야 함

+ 리듀서 함수는 이전 상태와 액션 객체를 파라미터로 받는데 이전의 상태는 절대로 변경하지 않고, 변화를 일으킨 새로운 상태 객체를 만들어서 반환하며 **똑같은 파라미터**로 호출된 리듀서 함수는 **언제나 똑같은 결과값**을 반환해야만 함

+ 즉, 동일한 인풋 -> 동일한 아웃풋

+ 아래와 같은 함수를 사용하면 안됨

  ```jsx
  new Date(), Math.random(), axios.get()
  ```

  현재 날짜와 랜덤을 가져오는 것은 호출할 때마다 다른 값이 나오며 axios.get()과 같이 네트워크를 요청하는 작업은 순수하지 않은 작업이므로 리듀서 함수 바깥에서 처리해줘야 함

<br>

## 리덕스 사용 할 준비하기

+ 프로젝트 생성 및 라이브러리 설치

  ```bash
  $ npx create-react-app learn-redux
  $ cd learn-redux
  $ yarn add redux
  ```

+ ./src/exercise.js 생성

  ```jsx
  // ./src/exercise.js
  
  console.log("Hello!");
  ```

+ ./src/index.js 수정

  ```jsx
  // ./src/index.js
  
  import React from "react";
  import ReactDOM from "react-dom";
  import "./index.css";
  import App from "./App";
  import * as serviceWorker from "./serviceWorker";
  import "./exercise";
  
  ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    document.getElementById("root")
  );
  
  // If you want your app to work offline and load faster, you can change
  // unregister() to register() below. Note this comes with some pitfalls.
  // Learn more about service workers: https://bit.ly/CRA-PWA
  serviceWorker.unregister();
  ```

### 리덕스 불러오기

+ ./src/exercise.js 수정

  ```jsx
  // ./src/exercise.js
  
  import { createStore } from "redux";
  
  const initialState = {
    counter: 0,
    text: "",
    list: [],
  };
  
  const INCREASE = "INCREASE";
  const DECREASE = "DECREASE";
  const CHANGE_TEXT = "CHANGE_TEXT";
  const ADD_TO_LIST = "ADD_TO_LIST";
  
  const increase = () => ({
    type: INCREASE,
  });
  
  const decrease = () => ({
    type: DECREASE,
  });
  
  const changeText = (text) => ({
    type: CHANGE_TEXT,
    text,
  });
  
  const addToList = (item) => ({
    type: ADD_TO_LIST,
    item,
  });
  
  function reducer(state = initialState, action) {
    switch (action.type) {
      case INCREASE:
        return {
          ...state,
          counter: state.counter + 1,
        };
      case DECREASE:
        return {
          ...state,
          counter: state.counter - 1,
        };
      case CHANGE_TEXT:
        return {
          ...state,
          text: action.text,
        };
      case ADD_TO_LIST:
        return {
          ...state,
          list: state.list.concat(action.item),
        };
      default:
        return state;
    }
  }
  
  const store = createStore(reducer);
  console.log(store.getState());
  ```

### 구독(subscribe)

+ ./src/exercise.js 수정

  ```jsx
  // ./src/exercise.js
  
  import { createStore } from "redux";
  
  const initialState = {
    counter: 0,
    text: "",
    list: [],
  };
  
  const INCREASE = "INCREASE";
  const DECREASE = "DECREASE";
  const CHANGE_TEXT = "CHANGE_TEXT";
  const ADD_TO_LIST = "ADD_TO_LIST";
  
  const increase = () => ({
    type: INCREASE,
  });
  
  const decrease = () => ({
    type: DECREASE,
  });
  
  const changeText = (text) => ({
    type: CHANGE_TEXT,
    text,
  });
  
  const addToList = (item) => ({
    type: ADD_TO_LIST,
    item,
  });
  
  function reducer(state = initialState, action) {
    switch (action.type) {
      case INCREASE:
        return {
          ...state,
          counter: state.counter + 1,
        };
      case DECREASE:
        return {
          ...state,
          counter: state.counter - 1,
        };
      case CHANGE_TEXT:
        return {
          ...state,
          text: action.text,
        };
      case ADD_TO_LIST:
        return {
          ...state,
          list: state.list.concat(action.item),
        };
      default:
        return state;
    }
  }
  
  const store = createStore(reducer);
  console.log(store.getState());
  
  const listner = () => {
    const state = store.getState();
    console.log(state);
  };
  
  const unsubscribe = store.subscribe(listner);
  // unsubscribe();
  ```

### 디스패치(dispatch)

+ ./src/exercise.js 수정

  ```jsx
  // ./src/exercise.js
  
  import { createStore } from "redux";
  
  const initialState = {
    counter: 0,
    text: "",
    list: [],
  };
  
  const INCREASE = "INCREASE";
  const DECREASE = "DECREASE";
  const CHANGE_TEXT = "CHANGE_TEXT";
  const ADD_TO_LIST = "ADD_TO_LIST";
  
  const increase = () => ({
    type: INCREASE,
  });
  
  const decrease = () => ({
    type: DECREASE,
  });
  
  const changeText = (text) => ({
    type: CHANGE_TEXT,
    text,
  });
  
  const addToList = (item) => ({
    type: ADD_TO_LIST,
    item,
  });
  
  function reducer(state = initialState, action) {
    switch (action.type) {
      case INCREASE:
        return {
          ...state,
          counter: state.counter + 1,
        };
      case DECREASE:
        return {
          ...state,
          counter: state.counter - 1,
        };
      case CHANGE_TEXT:
        return {
          ...state,
          text: action.text,
        };
      case ADD_TO_LIST:
        return {
          ...state,
          list: state.list.concat(action.item),
        };
      default:
        return state;
    }
  }
  
  const store = createStore(reducer);
  console.log(store.getState());
  
  const listner = () => {
    const state = store.getState();
    console.log(state);
  };
  
  const unsubscribe = store.subscribe(listner);
  // unsubscribe();
  
  store.dispatch(increase());
  store.dispatch(decrease());
  store.dispatch(changeText("안녕하세요"));
  store.dispatch(addToList({ id: 1, text: "와우" }));
  ```

  디스패치될 때마다 console 화면에 출력

+ ./src/exercise.js 수정

  ```jsx
  // ./src/exercise.js
  
  import { createStore } from "redux";
  
  const initialState = {
    counter: 0,
    text: "",
    list: [],
  };
  
  const INCREASE = "INCREASE";
  const DECREASE = "DECREASE";
  const CHANGE_TEXT = "CHANGE_TEXT";
  const ADD_TO_LIST = "ADD_TO_LIST";
  
  const increase = () => ({
    type: INCREASE,
  });
  
  const decrease = () => ({
    type: DECREASE,
  });
  
  const changeText = (text) => ({
    type: CHANGE_TEXT,
    text,
  });
  
  const addToList = (item) => ({
    type: ADD_TO_LIST,
    item,
  });
  
  function reducer(state = initialState, action) {
    switch (action.type) {
      case INCREASE:
        return {
          ...state,
          counter: state.counter + 1,
        };
      case DECREASE:
        return {
          ...state,
          counter: state.counter - 1,
        };
      case CHANGE_TEXT:
        return {
          ...state,
          text: action.text,
        };
      case ADD_TO_LIST:
        return {
          ...state,
          list: state.list.concat(action.item),
        };
      default:
        return state;
    }
  }
  
  const store = createStore(reducer);
  console.log(store.getState());
  
  const listner = () => {
    const state = store.getState();
    console.log(state);
  };
  
  const unsubscribe = store.subscribe(listner);
  // unsubscribe();
  
  store.dispatch(increase());
  store.dispatch(decrease());
  store.dispatch(changeText("안녕하세요"));
  store.dispatch(addToList({ id: 1, text: "와우" }));
  
  window.store = store; // console 창에서 store.dispatch({ type: 'INCREASE' });를 실행하면 counter가 1씩 증가
  window.unsubscribe = unsubscribe; // unsubscribe을 호출하면 이후에는 dispatch 후에도 변화가 없음 그러나 store.getState() 호출 후에는 숫자가 올라가 있음
  ```

## 리덕스 모듈 만들기

리덕스 모듈은

1. 액션 타입
2. 액션 생성 함수
3. 리듀서

3가지 모두 들어있는 자바스크립트 파일로 구성되어 있음

### 한 파일에 몰아서 작성하기 => Ducks 패턴

Ducks 패턴: [https://github.com/erikras/ducks-modular-redux](https://github.com/erikras/ducks-modular-redux)

+ ./src/modules 폴더 생성

+ ./src/modules/counter.js 생성

  ```jsx
  // ./src/modules/counter.js
  
  // 액션 타입 선언
  const SET_DIFF = "counter/SET_DIFF";
  const INCREASE = "counter/INCREASE";
  const DECREASE = "counter/DECREASE";
  
  // 액션 생성함수 선언
  export const setDiff = (diff) => ({ type: SET_DIFF, diff });
  export const increase = () => ({ type: INCREASE });
  export const decrase = () => ({ type: DECREASE });
  
  // 초기 상태 선언
  const initialState = {
    number: 0,
    diff: 1,
  };
  
  // 리듀서 생성
  export default function counter(state = initialState, action) {
    switch (action.type) {
      case SET_DIFF:
        return {
          ...state,
          diff: action.diff,
        };
      case INCREASE:
        return {
          ...state,
          number: state.number + state.diff,
        };
      case DECREASE:
        return {
          ...state,
          number: state.number - state.diff,
        };
      default:
        return state;
    }
  }
  ```

+ ./src/modules/todos.js 생성

  ```jsx
  // ./src/modules/todos.js
  
  const ADD_TODO = "todos/ADD_TODO";
  const TOGGLE_TODO = "todos/TOGGLE_TODO";
  
  let nextId = 1;
  
  export const addTodo = (text) => ({
    type: ADD_TODO,
    todo: {
      id: nextId++,
      text,
    },
  });
  
  export const toggleTodo = (id) => ({
    type: TOGGLE_TODO,
    id,
  });
  
  const initialState = [
    /* 
      {
          id: 1,
          text: '예시',
          done: false
      }
      */
  ];
  
  export default function todos(state = initialState, action) {
    switch (action.type) {
      case ADD_TODO:
        return state.concat(action.todo);
      case TOGGLE_TODO:
        // todo의 id가 일치하면 done 값을 바꿔주고 그렇지 않으면 유지
        return state.map((todo) =>
          todo.id === action.id ? { ...todo, done: !todo.done } : todo
        );
      default:
        return state;
    }
  }
  ```

+ ./modules/index.js

  ```js
  // ./src/modules/index.js
  
  import { combineReducers } from "redux";
  import counter from "./counter";
  import todos from "./todos";
  
  const rootReducer = combineReducers({
    counter,
    todos,
  });
  
  export default rootReducer;
  ```

#### 리덕스 적용

+ 리덕스 설치

  ```bash
  $ yarn add react-redux
  ```

+ 상태 확인
  ./src/index.js 수정

  ```jsx
  // ./src/index.js
  
  import React from "react";
  import ReactDOM from "react-dom";
  import "./index.css";
  import App from "./App";
  import * as serviceWorker from "./serviceWorker";
  import { Provider } from "react-redux";
  import { createStore } from "redux";
  import rootReducer from "./modules";
  
  const store = createStore(rootReducer);
  console.log(store.getState());
  
  ReactDOM.render(<App />, document.getElementById("root"));
  
  // If you want your app to work offline and load faster, you can change
  // unregister() to register() below. Note this comes with some pitfalls.
  // Learn more about service workers: https://bit.ly/CRA-PWA
  serviceWorker.unregister();
  ```

+ 리덕스 적용
  ./src/index.js 수정

  ```jsx
  // ./src/index.js
  
  import React from "react";
  import ReactDOM from "react-dom";
  import "./index.css";
  import App from "./App";
  import * as serviceWorker from "./serviceWorker";
  import { Provider } from "react-redux";
  import { createStore } from "redux";
  import rootReducer from "./modules";
  
  const store = createStore(rootReducer);
  
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById("root")
  );
  
  // If you want your app to work offline and load faster, you can change
  // unregister() to register() below. Note this comes with some pitfalls.
  // Learn more about service workers: https://bit.ly/CRA-PWA
  serviceWorker.unregister();
  ```

<br>

## 카운터 구현하기

+ ./src/components 폴더 생성

+ ./src/components/Counter.js 생성

  ```jsx
  // ./src/components/Counter.js
  
  import React from "react";
  
  function Counter({ number, diff, onIncrease, onDecrease, onSetDiff }) {
    const onChange = (e) => {
      onSetDiff(parseInt(e.target.value, 10));
    };
    return (
      <div>
        <h1>{number}</h1>
        <div>
          <input type="number" value={diff} onChange={onChange} />
          <button onClick={onIncrease}>+</button>
          <button onClick={onDecrease}>-</button>
        </div>
      </div>
    );
  }
  
  export default Counter;
  ```

+ ./src/containers 폴더 생성

+ ./src/containers/CounterContainer.js 수정

  ```jsx
  // ./src/containers/CounterContainer.js
  
  import React from "react";
  import Counter from "../components/Counter";
  import { useSelector, useDispatch } from "react-redux";
  import { increase, decrase, setDiff } from "../modules/counter";
  
  function CounterContainer() {
    const { number, diff } = useSelector((state) => ({
      number: state.counter.number,
      diff: state.counter.diff,
    }));
    const dispatch = useDispatch();
  
    const onIncrease = () => dispatch(increase());
    const onDecrease = () => dispatch(decrase());
    const onSetDiff = (diff) => dispatch(setDiff(diff));
  
    return (
      <Counter
        number={number}
        diff={diff}
        onIncrease={onIncrease}
        onDecrease={onDecrease}
        onSetDiff={onSetDiff}
      />
    );
  }
  
  export default CounterContainer;
  ```

+ ./src/App.js 수정

  ```jsx
  // ./src/App.js
  
  import React from "react";
  import CounterContainer from "./containers/CounterContainer";
  
  function App() {
    return <CounterContainer />;
  }
  
  export default App;
  ```

프리젠테이셔널 컴포넌트(Counter.js)에서는 단순한 UI 선언에 집중하고 상태 관리는 컨테이너 컴포넌트(CounterContainer.js)에서 하도록 하여 컨테이너 컴포넌트에서 리덕스 스토어 상태를 불러오고 어떤 함수가 호출되면 액션 디스패치 작업을 컨테이너 컴포넌트에서 하며 프리젠테이셔널 컴포넌트에서는 클릭 시 받아온 props를 호출하고 받아온 값을 특정 부분에서 보여주는 형태 구현

<br>

## 리덕스 개발자 도구 적용하기

리덕스 개발자 도구를 사용하면 현재 스토어의 상태를 개발자 도구에서 조회할 수 있으며 지금까지 어떤 액션들이 디스패치되었는지 그리고 액션에 따라 상태가 어떻게 변화해왔는지 확인 가능, 액션의 상태를 뒤로 되돌리기도 가능하며 액션의 상태를 개발자 도구에서 바로 디스패치도 가능

+ Google에 'Redux Devtools' 검색 

+ Chrome 웹 스토어 열기 및 설치 버튼 클릭

+ 프로젝트에서의 설치 명령어

  ```bash
  $ yarn add redux-devtools-extension
  ```

+ ./src/index.js 수정

  ```jsx
  // ./src/index.js
  
  import React from "react";
  import ReactDOM from "react-dom";
  import "./index.css";
  import App from "./App";
  import * as serviceWorker from "./serviceWorker";
  import { Provider } from "react-redux";
  import { createStore } from "redux";
  import rootReducer from "./modules";
  import { composeWithDevTools } from "redux-devtools-extension";
  
  const store = createStore(rootReducer, composeWithDevTools());
  
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById("root")
  );
  
  // If you want your app to work offline and load faster, you can change
  // unregister() to register() below. Note this comes with some pitfalls.
  // Learn more about service workers: https://bit.ly/CRA-PWA
  serviceWorker.unregister();
  ```

+ 개발자 도구 -> Redux에서 상태 관리 확인 가능




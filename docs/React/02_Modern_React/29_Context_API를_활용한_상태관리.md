# TodoList

## Context API를 활용한 상태관리

### 리듀서 만들기

+ ./src/TodoContext.js 생성

  ```jsx
  // ./src/TodoContext.js
  
  import React, { useReducer, createContext, useContext, useRef } from "react";
  
  const initialTodos = [
    {
      id: 1,
      text: "프로젝트 생성하기",
      done: true,
    },
    {
      id: 2,
      text: "컴포넌트 스타일링하기",
      done: true,
    },
    {
      id: 3,
      text: "Context 만들기",
      done: false,
    },
    {
      id: 4,
      text: "기능 구현하기",
      done: false,
    },
  ];
  
  /* 
      CREATE
      TOGGLE
      REMOVE
  */
  function todoReducer(state, action) {
    switch (action.type) {
      case "CREATE":
        return state.concat(action.todo);
      case "TOGGLE":
        return state.map((todo) =>
          todo.id === action.id ? { ...todo, done: !todo.done } : todo
        );
      case "REMOVE":
        return state.filter((todo) => todo.id !== action.id);
  
      default:
        throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
  
  const TodoStateContext = createContext();
  const TodoDispatchContext = createContext();
  const TodoNextIdContext = createContext();
  
  export function TodoProvider({ children }) {
    const [state, dispatch] = useReducer(todoReducer, initialTodos);
    const nextId = useRef(5);
  
    return (
      <TodoStateContext.Provider value={state}>
        <TodoDispatchContext.Provider value={dispatch}>
          <TodoNextIdContext.Provider value={nextId}>
            {children}
          </TodoNextIdContext.Provider>
        </TodoDispatchContext.Provider>
      </TodoStateContext.Provider>
    );
  }
  
  export function useTodoState() {
    const context = useContext(TodoStateContext);
    if (!context) {
      throw new Error("Cannot find TodoProvider");
    }
    return context;
  }
  
  export function useTodoDispatch() {
    const context = useContext(TodoDispatchContext);
    if (!context) {
      throw new Error("Cannot find TodoProvider");
    }
    return context;
  }
  
  export function useTodoNextId() {
    const context = useContext(TodoNextIdContext);
    if (!context) {
      throw new Error("Cannot find TodoProvider");
    }
    return context;
  }
  ```

+ ./src/components/TodoList.js 수정

  ```jsx
  // ./src/components/TodoList.js
  
  import React from "react";
  import styled from "styled-components";
  import TodoItem from "./TodoItem";
  import { useTodoState } from "../TodoContext";
  
  const TodoListBlock = styled.div`
    flex: 1; // 자신이 차지할 수 있는 모든 영역 차지
    padding: 20px 32px 48px 32px;
    overflow-y: auto;
  `;
  
  function TodoList() {
    const state = useTodoState();
    console.log(state);
    return (
      <TodoListBlock>
        <TodoItem text="프로젝트 생성하기" done={true} />
        <TodoItem text="컴포넌트 스타일링 하기" done={true} />
        <TodoItem text="Context 만들기" done={false} />
        <TodoItem text="기능 구현하기" done={false} />
      </TodoListBlock>
    );
  }
  
  export default TodoList;
  ```

+ ./src/App.js 수정

  ```jsx
  // ./src/App.js
  
  import React from "react";
  import { createGlobalStyle } from "styled-components";
  import TodoTemplate from "./components/TodoTemplate";
  import TodoHead from "./components/TodoHead";
  import TodoList from "./components/TodoList";
  import TodoCreate from "./components/TodoCreate";
  import { TodoProvider } from "./TodoContext";
  
  const GlobalStyle = createGlobalStyle`
    body {
      background: #e9ecef;
    }
  `;
  
  function App() {
    return (
      <TodoProvider>
        <GlobalStyle />
        <TodoTemplate>
          <TodoHead />
          <TodoList />
          <TodoCreate />
        </TodoTemplate>
      </TodoProvider>
    );
  }
  
  export default App;
  ```

  

  
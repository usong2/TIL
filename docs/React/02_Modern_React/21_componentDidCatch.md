# componentDidCatch

## componentDidCatch로 에러 잡아내기

+ 새로운 프로젝트 생성

  ```bash
  $ npx create-react-app error-catch
  ```

+ 해당 디렉터리를 에디터로 열고 개발 서버 시작

  ```bash
  $ cd error-catch
  $ yarn start
  ```

### 리액트 앱에서 에러가 발생하는 상황

+ ./src/User.js 생성

  ```jsx
  // ./src/User.js
  
  import React from "react";
  
  function User({ user }) {
    return (
      <div>
        <div>
          <b>ID</b>: {user.id}
        </div>
        <div>
          <b>Username</b>: {user.username}
        </div>
      </div>
    );
  }
  
  export default User;
  ```

+ ./src/App.js 수정

  ```jsx
  // ./src/App.js
  
  import React from "react";
  import User from "./User";
  import "./App.css";
  
  // 정상출력
  function App() {
    const user = {
      id: 1,
      username: 'usong',
    }
    return <User user={user} />;
  }
  
  // 에러 발생
  function App() {
    return <User />;
  }
  
  export default App;
  ```

  user props를 넣어주지 않아 에러가 발생!

<br>

#### 에러 발생 처리(1) - user가 없을 경우 return

```jsx
// ./src/User.js

import React from "react";

function User({ user }) {
  if (!user) return null;

  return (
    <div>
      <div>
        <b>ID</b>: {user.id}
      </div>
      <div>
        <b>Username</b>: {user.username}
      </div>
    </div>
  );
}

export default User;
```

#### 에러 발생 처리(2)

+ ./src/ErrorBoundary.js 생성

  ```jsx
  // ./src/ErrorBoundary.js
  
  import React, { Component } from "react";
  
  class ErrorBoundary extends Component {
    state = {
      error: false,
    };
  
    componentDidCatch(error, info) {
      console.log("에러가 발생했습니다.");
      console.log({
        error,
        info,
      });
      this.setState({
        error: true,
      });
    }
  
    render() {
      if (this.state.error) {
        return <h1>에러 발생!</h1>;
      }
      return this.props.children;
    }
  }
  
  export default ErrorBoundary;
  ```

+ ./src/App.js 수정

  ```jsx
  // ./src/App.js
  
  import React from "react";
  import User from "./User";
  import ErrorBoundary from "./ErrorBoundary";
  
  function App() {
    const user = {
      id: 1,
      username: "usong",
    };
    return (
      <ErrorBoundary>
        <User />
      </ErrorBoundary>
    );
  }
  
  export default App;
  ```

+ ./src/User.js 수정

  ```jsx
  // ./src/User.js
  
  import React from "react";
  
  function User({ user }) {
    //   if (!user) return null;
  
    return (
      <div>
        <div>
          <b>ID</b>: {user.id}
        </div>
        <div>
          <b>Username</b>: {user.username}
        </div>
      </div>
    );
  }
  
  export default User;
  ```

<br>

## Sentry 연동

`componentDidCatch`를 사용해서 앱에서 에러 발생 시에 사용자에게 에러 발생을 인지시켜줄 수 있지만, `componentDidCatch`가 실제로 호출되는 일은 서비스에서 없어야 함. 만약 놓친 에러가 있다면 이를 알아내어 예외 처리 해주는 것이 중요

발견하지 못했으나 사용자가 발견하게 되는 오류는 `componentDidCatch`에서 `error`와 `info` 값을 네트워크를 통하여 다른 곳으로 전달해주면 됨. 그러나 이를 위해 따로 서버를 만들어주는 것은 굉장히 번거로우므로 Sentry를 사용해 장기적으로 작업하는 프로젝트에 적용하는 것이 좋음

[https://sentry.io](https://sentry.io)

```bash
# Using yarn
$ yarn add @sentry/browser

# Using npm
$ npm install @sentry/browser
```

<br>

+ ./src/index.js 수정

  ```jsx
  // ./src/index.js 
  
  import React from "react";
  import ReactDOM from "react-dom";
  import "./index.css";
  import App from "./App";
  import * as Sentry from "@sentry/browser";
  import * as serviceWorker from "./serviceWorker";
  
  Sentry.init({
    dsn:
      "https://bf57bf97aa344c6788ffd3489463b4a7@o382378.ingest.sentry.io/5211121",
  });
  
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

+ 브라우저에서 새로고침 후 sentry 사이트의 [Take me to my event] 버튼 클릭

+ ./src/ErrorBoundary.js 수정

  ```jsx
  // ./src/ErrorBoundary.js
  
  import React, { Component } from "react";
  import * as Sentry from "@sentry/browser";
  
  class ErrorBoundary extends Component {
    state = {
      error: false,
    };
  
    componentDidCatch(error, info) {
      console.log("에러가 발생했습니다.");
      console.log({
        error,
        info,
      });
      this.setState({
        error: true,
      });
  
      if (process.env.NODE_ENV === "production") {
        Sentry.captureException(error, { extra: info });
      }
    }
  
    render() {
      if (this.state.error) {
        return <h1>에러 발생!</h1>;
      }
      return this.props.children;
    }
  }
  
  export default ErrorBoundary;
  ```

+ 프로덕션에서 잘 작동하는지 확인

  ```bash
  $ yarn build
  $ npx serve ./build
  ```

  


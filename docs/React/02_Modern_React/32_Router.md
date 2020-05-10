# Router

## 리액트 라우터

### SPA(Single Page Application)

+ 라우팅: 어떤 **주소**에 어떤 **UI**를 보여줄지?
+ 라우팅을 클라이언트가 담당
+ 옛날에는 보통 서버에서 관리하는 로직을 이제는 클라이언트가 관리

#### SPA의 단점

+ 앱의 규모가 커지면 JS 파일의 크기가 너무 커질 수 있음 (해결책: Code Splitting)
+ 브라우저에서 자바스크립트가 구동되지 않으면 UI를 볼 수 없음
  예) 검색엔진에서 크롤링 불가능 (해결책: Server Side Rendering)
+ 리액트에서 가장 많이 사용되는 라우터 라이브러리
  + react-router: 컴포넌트를 기반으로 라우팅
  + next: 서버사이드 렌더링을 엄청나게 쉽게 구현 가능, 파일 경로, 이름을 기반으로 라우팅

### 리액트 라우터에서 사용되는 주요 컴포넌트 살펴보기

#### BrowserRouter

+ ```jsx
  <BrowserRouter>
      basename: string
      getUserConfirmation: func
      forceRefresh: bool
      keyLength: number
      children: node
  ```

+ HTML5 History API 사용

+ 주소만 바뀌고 페이지는 다시 불러오진 않음

#### HashRouter

+ ```jsx
  <HashRouter>
      basename: string
      getUserConfirmation: func
      hashType: string
      children: node
  ```

+ example.com/#/path/to/route

+ #를 사용함. 못생김. 옛날 브라우저 전용

#### MemoryRouter

+ ```jsx
  <MemoryRouter>
      initialEntries: array
      initialIndex: number
      getUserConfirmation: func
      keyLength: number
      children: node
  ```

+ 브라우저의 주소와 무관함, 일체 건드리지 않음

+ 임베디드 웹앱, 리액트 네이티브 등에서 사용

#### StaticRouter

+ ```jsx
  <StaticRouter>
      basename: string
      location: string
      location: object
      context: object
      children: node
  ```

+ 서버사이드 렌더링에서 사용하는 용도

#### Route

+ ```jsx
  <Route>
      Route render methods
      Route props
      component
      render: func
      children: func
      path: string
      exact: bool
      strict: bool
      location: object
      sensitive: bool
  ```

+ 라우트를 정의할 때 사용하는 컴포넌트

#### Link

+ ```jsx
  <Link>
      to: string
      to: object
      replace: bool
      innerRef: function
      others
  ```

+ 사용한 Router의 주소를 바꿈

+ a 태그지만 새로고침 안됨

<br>

## 프로젝트 준비 및 기본 사용법

```bash
$ npx create-react-app router-tutorial
$ cd router-tutorial
$ yarn add react-router-dom
```

### Route 사용법

+ ./src/index.js 수정

  ```jsx
  // ./src/index.js
  
  import React from "react";
  import ReactDOM from "react-dom";
  import "./index.css";
  import App from "./App";
  import * as serviceWorker from "./serviceWorker";
  import { BrowserRouter } from "react-router-dom";
  
  ReactDOM.render(
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>,
    document.getElementById("root")
  );
  
  // If you want your app to work offline and load faster, you can change
  // unregister() to register() below. Note this comes with some pitfalls.
  // Learn more about service workers: https://bit.ly/CRA-PWA
  serviceWorker.unregister();
  ```

+ ./src/Home.js 생성

  ```jsx
  // ./src/Home.js
  
  import React from "react";
  
  function Home() {
    return (
      <div>
        <h1>홈</h1>
        <p>이 곳은 홈입니다. 가장 먼저 보여지는 페이지 입니다.</p>
      </div>
    );
  }
  
  export default Home;
  ```

+ ./src/About.js 생성

  ```jsx
  // ./src/About.js
  
  import React from "react";
  
  function About() {
    return (
      <div>
        <h1>소개</h1>
        <p>이 프로젝트는 리액트 라우터 기초를 실습해보는 예제 프로젝트입니다.</p>
      </div>
    );
  }
  
  export default About;
  ```

+ ./src/App.js 수정

  ```jsx
  // ./src/App.js
  
  import React from "react";
  import { Route } from "react-router-dom";
  import Home from "./Home";
  import About from "./About";
  
  function App() {
    return (
      <div>
        <Route path="/" component={Home} />
        <Route path="/about" component={About} />
      </div>
    );
  }
  
  export default App;
  ```

  router 컴포넌트에서는 해당 컴포넌트의 path로 주어진 것과 실제 주소의 경로를 비교하여 해당 컴포넌트를 렌더링할지 말지를 정하는데 이 과정에서 브라우저의 about 경로가 두 가지 모두 일치 

+ exact를 사용하여 문제 해결: 경로가 완전 일치할 때만 보여줌

  ```jsx
  // ./src/App.js
  
  import React from "react";
  import { Route } from "react-router-dom";
  import Home from "./Home";
  import About from "./About";
  
  function App() {
    return (
      <div>
        <Route path="/" component={Home} exact />
        <Route path="/about" component={About} />
      </div>
    );
  }
  
  export default App;
  ```

### Link 사용법

+ ./src/App.js 수정

  ```jsx
  // ./src/App.js
  
  import React from "react";
  import { Route, Link } from "react-router-dom";
  import Home from "./Home";
  import About from "./About";
  
  function App() {
    return (
      <div>
        <ul>
          <li>
            <Link to="/">홈</Link>
          </li>
          <li>
            <Link to="/about">소개</Link>
          </li>
        </ul>
        <hr />
        <Route path="/" component={Home} exact />
        <Route path="/about" component={About} />
      </div>
    );
  }
  
  export default App;
  ```


<br>

## 파라미터와 쿼리

파라미터와 쿼리는 주소를 통해 동적인 값을 읽어와야 할 때 사용되는데 사용법이 조금 다름

+ URL Parameter: /profiles/usong
+ Query: /filter?type=book&sort_by=date

### URL Parameter

+ ./src/Profile.js 생성

  ```jsx
  // ./src/Profile.js
  
  import React from "react";
  
  const profileData = {
    usong: {
      name: "유송",
      description: "Frontend Engineer",
    },
    homer: {
      name: "호머 심슨",
      description: "심슨 가족에 나오는 아빠 역할 캐릭터",
    },
  };
  
  function Profile({ match }) {
    const { username } = match.params;
    const profile = profileData[username];
  
    if (!profile) {
      return <div>존재하지 않는 사용자입니다.</div>;
    }
    return (
      <div>
        <h3>
          {username} ({profile.name})
        </h3>
        <p>{profile.description}</p>
      </div>
    );
  }
  
  export default Profile;
  ```

+ ./src/App.js 수정

  ```jsx
  // ./src/App.js
  
  import React from "react";
  import { Route, Link } from "react-router-dom";
  import Home from "./Home";
  import About from "./About";
  import Profile from "./Profile";
  
  function App() {
    return (
      <div>
        <ul>
          <li>
            <Link to="/">홈</Link>
          </li>
          <li>
            <Link to="/about">소개</Link>
          </li>
          <li>
            <Link to="/profile">프로필</Link>
          </li>
        </ul>
        <hr />
        <Route path="/" component={Home} exact />
        <Route path="/about" component={About} />
        <Route path="/profiles/:username" component={Profile} />
      </div>
    );
  }
  
  export default App;
  ```

### Query

+ ./src/About.js 수정

  ```jsx
  // ./src/About.js
  
  import React from "react";
  
  function About({ location }) {
    console.log(location);
    return (
      <div>
        <h1>소개</h1>
        <p>이 프로젝트는 리액트 라우터 기초를 실습해보는 예제 프로젝트입니다.</p>
      </div>
    );
  }
  
  export default About;
  ```

+ qs 설치

  ```bash
  $ yarn add qs
  ```

+ ./src/About.js 수정

  ```jsx
  // ./src/About.js
  
  import React from "react";
  import qs from "qs";
  
  function About({ location }) {
    const query = qs.parse(location.search, {
      ignoreQueryPrefix: true,
    });
    const detail = query.detail === "true";
    return (
      <div>
        <h1>소개</h1>
        <p>이 프로젝트는 리액트 라우터 기초를 실습해보는 예제 프로젝트입니다.</p>
        {detail && <p>detail값이 true입니다.</p>}
      </div>
    );
  }
  
  export default About;
  ```


<br>

## 서브 라우트 만들기

**서브라우트**: 라우트 안에 들어있는 또 다른 라우터
라우트를 사용한 컴포넌트 내부에서 라우트 컴포넌트를 한번 더 사용하면 됨
주소가 주어졌을 때 원하는 UI가 보여지게끔 가능

*특정 경로에 탭이 있는 경우 사용하기 좋음*

+ ./src/Profiles.js 생성

  ```jsx
  // ./src/Profiles.js
  
  import React from "react";
  import Profile from "./Profile";
  import { Link, Route } from "react-router-dom";
  
  function Profiles() {
    return (
      <div>
        <h3>사용자 목록</h3>
        <ul>
          <li>
            <Link to="/profiles/usong">usong</Link>
          </li>
          <li>
            <Link to="/profiles/homer">homer</Link>
          </li>
        </ul>
        <Route
          path="/profiles"
          exact
          render={() => <div>사용자를 선택해주세요</div>}
        />
        <Route path="/profiles/:username" component={Profile} />
      </div>
    );
  }
  
  export default Profiles;
  ```

+ ./src/App.js 수정

  ```jsx
  // ./src/App.js
  
  import React from "react";
  import { Route, Link } from "react-router-dom";
  import Home from "./Home";
  import About from "./About";
  import Profiles from "./Profiles";
  
  function App() {
    return (
      <div>
        <ul>
          <li>
            <Link to="/">홈</Link>
          </li>
          <li>
            <Link to="/about">소개</Link>
          </li>
          <li>
            <Link to="/profile">프로필</Link>
          </li>
          <li>
            <Link to="/profiles">프로필 목록</Link>
          </li>
        </ul>
        <hr />
        <Route path="/" component={Home} exact />
        <Route path="/about" component={About} />
        <Route path="/profiles" component={Profiles} />
      </div>
    );
  }
  
  export default App;
  ```

<br>

## 리액트 라우터 부가기능

### history 객체

라우터로 사용되는 컴포넌트에게 props로 전달되는데 history 객체를 사용하여 컴포넌트에서 라우터에 직접적인 접근 가능

특정 함수를 호출했을 때 특정 경로로 이동하거나 뒤로 가거나 무언가를 작성하고 있을 때 페이지 이탈 방지 가능

+ ./src/HistorySample.js 생성

  ```jsx
  // ./src/HistorySample.js
  
  import React, { useEffect } from "react";
  
  function HistorySample({ history }) {
    const goBack = () => {
      history.goBack();
    };
  
    const goHome = () => {
      history.push("/");
    };
  
    const replaceToHome = () => {
      history.replace("/");
    };
  
    useEffect(() => {
      console.log(history);
      const unblock = history.block("정말 떠나실건가요?");
      return () => {
        unblock();
      };
    }, [history]);
  
    return (
      <div>
        <button onClick={goBack}>뒤로가기</button>
        <button onClick={goHome}>홈으로</button>
        <button onClick={replaceToHome}>홈으로 (Replace)</button>
      </div>
    );
  }
  
  export default HistorySample;
  ```

+ ./src/App.js 수정

  ```jsx
  // ./src/App.js
  
  import React from "react";
  import { Route, Link } from "react-router-dom";
  import Home from "./Home";
  import About from "./About";
  import Profiles from "./Profiles";
  import HistorySample from "./HistorySample";
  
  function App() {
    return (
      <div>
        <ul>
          <li>
            <Link to="/">홈</Link>
          </li>
          <li>
            <Link to="/about">소개</Link>
          </li>
          <li>
            <Link to="/profile">프로필</Link>
          </li>
          <li>
            <Link to="/profiles">프로필 목록</Link>
          </li>
          <li>
            <Link to="/history">예제</Link>
          </li>
        </ul>
        <hr />
        <Route path="/" component={Home} exact />
        <Route path="/about" component={About} />
        <Route path="/profiles" component={Profiles} />
        <Route path="/history" component={HistorySample} />
      </div>
    );
  }
  
  export default App;
  ```

### withRouter

라우터 컴포넌트가 아닌 곳에서 match, location, history 사용

**match**: 현재 자신이 렌더링된 위치 기준으로 match 값을 받아옴

**location**: 어떤 위치에서 불러와도 똑같은 정보를 가르킴

+ ./src/WithRouterSample.js 생성

  ```jsx
  // ./src/WithRouterSample.js
  
  import React from "react";
  import { withRouter } from "react-router-dom";
  
  function WithRouterSample({ location, match, history }) {
    return (
      <div>
        <h4>location</h4>
        <textarea value={JSON.stringify(location, null, 2)} readOnly />
        <br />
        <h4>match</h4>
        <textarea value={JSON.stringify(match, null, 2)} readOnly />
        <button onClick={() => history.push("/")}>홈으로</button>
      </div>
    );
  }
  
  export default withRouter(WithRouterSample);
  ```

+ Profiles에서 withRouterSample을 불러올 경우 
  ./src/Profiles.js 수정

  ```jsx
  // ./src/Profiles.js
  
  import React from "react";
  import Profile from "./Profile";
  import { Link, Route } from "react-router-dom";
  import WithRouterSample from "./WithRouterSample";
  
  function Profiles() {
    return (
      <div>
        <h3>사용자 목록</h3>
        <ul>
          <li>
            <Link to="/profiles/usong">usong</Link>
          </li>
          <li>
            <Link to="/profiles/homer">homer</Link>
          </li>
        </ul>
        <Route
          path="/profiles"
          exact
          render={() => <div>사용자를 선택해주세요</div>}
        />
        <Route path="/profiles/:username" component={Profile} />
        <WithRouterSample />
      </div>
    );
  }
  
  export default Profiles;
  ```

+ Profile에서 withRouter을 불러올 경우
  ./src/Profile.js 수정

  ```jsx
  // ./src/Profile.js
  
  import React from "react";
  import WithRouterSample from "./WithRouterSample";
  
  const profileData = {
    usong: {
      name: "유송",
      description: "Frontend Engineer",
    },
    homer: {
      name: "호머 심슨",
      description: "심슨 가족에 나오는 아빠 역할 캐릭터",
    },
  };
  
  function Profile({ match }) {
    const { username } = match.params;
    const profile = profileData[username];
  
    if (!profile) {
      return <div>존재하지 않는 사용자입니다.</div>;
    }
    return (
      <div>
        <h3>
          {username} ({profile.name})
        </h3>
        <p>{profile.description}</p>
        <WithRouterSample />
      </div>
    );
  }
  
  export default Profile;
  ```

### Switch

여러 라우트 중 하나만 보여줌
notFound 페이지를 보여줄 때 유용

+ ./src/App.js 수정

  ```jsx
  // ./src/App.js
  
  import React from "react";
  import { Switch, Route, Link } from "react-router-dom";
  import Home from "./Home";
  import About from "./About";
  import Profiles from "./Profiles";
  import HistorySample from "./HistorySample";
  
  function App() {
    return (
      <div>
        <ul>
          <li>
            <Link to="/">홈</Link>
          </li>
          <li>
            <Link to="/about">소개</Link>
          </li>
          <li>
            <Link to="/profile">프로필</Link>
          </li>
          <li>
            <Link to="/profiles">프로필 목록</Link>
          </li>
          <li>
            <Link to="/history">예제</Link>
          </li>
        </ul>
        <hr />
        <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/about" component={About} />
          <Route path="/profiles" component={Profiles} />
          <Route path="/history" component={HistorySample} />
          <Route
            render={({ location }) => (
              <div>
                <h2>이 페이지는 존재하지 않습니다.</h2>
                <p>{location.pathname}</p>
              </div>
            )}
          />
        </Switch>
      </div>
    );
  }
  
  export default App;
  ```

### NavLink

현재 주소와 일치한다면 스타일 바꾸기

+ ./src/Profiles.js

  ```jsx
  // ./src/Profiles.js
  
  import React from "react";
  import Profile from "./Profile";
  import { NavLink, Route } from "react-router-dom";
  
  function Profiles() {
    return (
      <div>
        <h3>사용자 목록</h3>
        <ul>
          <li>
            <NavLink
              to="/profiles/usong"
              activeStyle={{ background: "black", color: "white" }}
            >
              usong
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/profiles/homer"
              activeStyle={{ background: "black", color: "white" }}
            >
              homer
            </NavLink>
          </li>
        </ul>
        <Route
          path="/profiles"
          exact
          render={() => <div>사용자를 선택해주세요</div>}
        />
        <Route path="/profiles/:username" component={Profile} />
      </div>
    );
  }
  
  export default Profiles;
  ```

  NavLink에는 아래와 같이도 사용 가능

  ```jsx
  isActive={(match, location) => {
    return (match.params.blbal = "asdf");
  }}
  
  activeClassName="active", 
  ```

+ 참고: [https://reacttraining.com/react-router/core/api](https://reacttraining.com/react-router/core/api)

<br>

## useReactRouter Hook 사용하기

history, match, location 객체를 사용하는 방법

+ use-react-router 설치

  ```bash
  $ yarn add use-react-router
  ```

+ ./src/RouterHookSample.js 생성

  ```jsx
  // ./src/RouterHookSample.js
  
  import useReactRouter from "use-react-router";
  
  function RouterHookSample() {
    const { history, location, match } = useReactRouter();
    console.log({ history, location, match });
    return null;
  }
  
  export default RouterHookSample;
  ```

+ ./src/Profiles.js 수정

  ```jsx
  // ./src/Profiles.js
  
  import React from "react";
  import Profile from "./Profile";
  import { NavLink, Route } from "react-router-dom";
  import RouterHookSample from "./RouterHookSample";
  
  function Profiles() {
    return (
      <div>
        <h3>사용자 목록</h3>
        <ul>
          <li>
            <NavLink
              to="/profiles/usong"
              activeStyle={{ background: "black", color: "white" }}
            >
              usong
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/profiles/homer"
              activeStyle={{ background: "black", color: "white" }}
            >
              homer
            </NavLink>
          </li>
        </ul>
        <Route
          path="/profiles"
          exact
          render={() => <div>사용자를 선택해주세요</div>}
        />
        <Route path="/profiles/:username" component={Profile} />
        <RouterHookSample />
      </div>
    );
  }
  
  export default Profiles;
  ```

<br>

## 정리

+ 서비스를 만들 때 사용자가 들어온 경로가 따라 다양한 UI를 보여주어야 하는 경우 React-router를 사용
+ React-router의 대안으로는 Next.js 있음
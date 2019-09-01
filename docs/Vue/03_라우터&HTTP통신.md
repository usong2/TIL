# Vue.js

## 뷰 라우터

### 라우팅이란?

라우팅이란 웹 페이지 간의 이동 방법을 말합니다. 라우팅은 현대 웹 앱 형태 중 하나인 싱글 페이지 애플리케이션(SPA, Single Page Application)에서 주로 사용하고 있습니다. <br />라우팅을 이용하면 화면 간의 전환이 매끄러울 뿐만 아니라 애플리케이션의 사용자 경험을 향상시킬 수 있습니다. 일반적으로는 브라우저에서 웹 페이지를 요청하면 서버에서 응답을 받아 웹페이지를 다시 사용자에게 돌려주는 시간 동안 화면 상에 깜빡거림 현상이 나타납니다. 이런 부분들을 라우팅으로 처리하면 깜빡거림 없이 화면을 매끄럽게 전환할 수 있을 뿐만 아니라 더 빠르게 화면을 조작할 수 있어 사용자 경험이 향상됩니다. <br />뷰 뿐만 아니라 리액트와 앵귤러 모두 라우팅을 이용하여 화면을 전환하고 있으며, 프런트엔드 프레임워크를 사용하지 않고 일반 HTMl 파일들로도 라우팅 자바스크립트 라이브러리를 이용하여 라우팅 방식의 페이지 이동을 구현할 수 있습니다. 

<br />

### 뷰 라우터

뷰 라우터는 뷰에서 라우팅 기능을 구현할 수 있도록 지원하는 공식 라이브러리입니다. 뷰 라우터를 이용하여 뷰로 만든 페이지 간에 자유롭게 이동할 수 있습니다. 

<table>
    <thead>
    	<tr>
        	<th>태그</th>
            <th>설명</th>
        </tr>
    </thead>
    <tbody>
    	<tr>
        	<td>&lt;router-link-to="URL 값"&gt;</td>
        	<td>페이지 이동 태그. 화면에서는 &lt;a&gt;로 표시되며 클릭하면 to에 지정한 URL로 이동합니다. </td>
        </tr>
        <tr>
        	<td>&lt;router-view&gt;</td>
            <td>페이지 표시 태그. 변경되는 URL에 따라 해당 컴포넌트를 뿌려주는 영역입니다. </td>
        </tr>
    </tbody>
</table>

<br />

> 뷰 라우터 실습

```vue
<div id="app">
  <h1>뷰 라우터 예제</h1>
  <p>
    <router-link to="/main">Main 컴포넌트로 이동</router-link>
    <router-Link to="/login">Login 컴포넌트로 이동</router-link>
  </p>
  <router-view></router-view>
</div>

<script src="https://cdn.jsdelivr.net/npm/vue@2.5.2/dist/vue.js"></script>
<script src="https://unpkg.com/vue-router@3.1.3/dist/vue-router.js"></script>

<script>
  var Main = { template: '<div>main</div>' };
  var Login = { template: '<div>login<div>' };

  var routes = [
    { path : '/main', component: Main },
    { path: '/login', component: Login}
  ];

  var router = new VueRouter({
    routes
  });

  var app = new Vue({
    router
  }).$mount('#app');
</script>
```

1. 각 `<router-link>`는 화면 상에서 [Main 컴포넌트로 이동], [Login 컴포넌트로 이동]이라는 &lt;a&gt; 버튼 태그로 변환되어 표시됩니다. 각 버튼을 클릭하면 to=""에 정으된 텍스트 값이 브라우저 URL 끝에 추가됩니다. 여기서는 /main과 /login 2개의 URL이 끝에 추가됩니다. 
2. `<router-view>`는 갱신된 URL에 해당하는 화면을 보여주는 영역입니다. `<router-view>`에 나타낼 화면은 &lt;script&gt;에서 정의합니다. 
   + 스크립트 코드에는 현재 크게 Main, Login 컴포넌트를 정의하는 부분,  URL 값에 따라 표시될 컴포넌트를 지정하는 routes 부분, 뷰 라우터에 routes를 연결하는 부분, 마지막으로 뷰 인스턴스를 생성하여 라우터를 삽입하는 부분이 있습니다.
3. Main과 Login 컴포넌트에는 template 속성으로 각 컴포넌트를 구분할 수 있는 정도의 간단한 HTML 코드를 정의합니다. 
4. routes 변수에는 URL 값이 /main일 때 Main 컴포넌트를, /login일 때 Login 컴포넌트를 표시하도록 정의합니다. 
5. router 변수에는 뷰 라우터를 하나 생성하고, routes를 삽입해 URL에 따라 화면이 전환될 수 있게 정의합니다. 
6. 새 인스턴스를 생성하고 라우터의 정보가 담긴 router를 추가하는 코드에서 .$mount()는 el 속성과 같이 인스턴스를 화면에 붙여주는 역할을 합니다. 

<br />

> **$mount() API**
>
> > $mount() API는 el 속성과 동일하게 인서튼서를 화면에 붙이는 역할을 합니다. 인스턴스를 생성할 때 el 속성을 넣지 않았더라도 생성하고 나서 $mount()를 이용하면 강제로 인스턴스를 화면에 붙일 수가 있습니다. 참고로, 뷰 라우터의 공식 문서는 모두 인스턴스 안에 el을 지정하지 않고 라우터만 지정하여 생성한 다음 생성된 인스턴스를 $mount()를 이용해 붙이는 식으로 안내하고 있습니다. 

<br />

> **라우터의 URL의 해시 값(#)을 없애는 방법**
>
> > 뷰 라우터의 기본 URL 형식은 해시 값을 사용합니다. 만약 index.html/login과 같이 해시 값을 없애고 싶으면 아래의 히스토리 모드(history mode)를 활용하면 됩니다.

```vue
<script>
  var router = new VueRouter({
  	mode: 'history',
    routes
  });
</script>
```

<br />

### 네스티드 라우터

네스티드 라우터(Nested Router)는 라우터로 페이지를 이동할 때 최소 2개 이상의 컴포넌트를 화면에 나타낼 수 있습니다. 네스티드라는 단어에서 추측할 수 있듯이 상위 컴포넌트 1개에 하위 컴포넌트 1개를 포함하는 구조로 구성합니다. 

<br />

> 네스티드라우터 구현

```vue
<div id="app">
  <router-view></router-view>
</div>

<script src="https://cdn.jsdelivr.net/npm/vue@2.5.2/dist/vue.js"></script>
<script src="https://unpkg.com/vue-router@3.1.3/dist/vue-router.js"></script>

<script>
  var User = {
    template: `
      <div>
        User Component
        <router-view></router-view>
      </div>
    `
  };
  var UserProfile = { template: '<p>User Profile Component</p>' };
  var UserPost = { template: '<p>User Post Component</p>' };

  var routes = [
    {
      path: '/user',
      component: User,
      children: [
        {
          path: 'posts',
          component: UserPost
        },
        {
          path: 'profile',
          component: UserProfile
        }
      ]
    }
  ];

  var router = new VueRouter({
    routes
  });

  var app = new Vue({
    router
  }).$mount('#app');
</script>
```

1. `<div id="app">`에 &lt;router-view&gt;를 등록하여 User 컴포넌트가 뿌려질 영역을 정의합니다.
2. User, UserPost, UserProfile 컴포넌트의 내용을 각 객체에 정의합니다. 컴포넌트가 전환된 것을 확인할 수 있게 template 속성을 컴포넌트 내용에 추가하였습니다. 여기서 주목할 부분은 User 컴포넌트의 template에 하위 컴포넌트를 표시할 &lt;router-view&gt;가 하나 더 있다는 점입니다. 
3. `routes`에 라우터 정보를 정의합니다. 제일 먼저 path 속성에는 네스티드 라우터를 실행하는 기본 URL을 /user로 설정하고, 상위 컴포넌트는 User 컴포넌트로 지정합니다. 그런 다음 children 속성에는 URL 값 /user 다음에 올 URL에 따라 표시될 하위 컴포넌트를 정의합니다. /user/posts인 경우 UserPost를 표시하고, /user/profile인 경우 UserProfile을 표시하도록 설정합니다. 
4. 이제 뷰 라우터를 새로 하나 생성하고 앞에서 정의한 라우터 정보를 담은 객체 routes를 정의합니다. 
5. 마지막으로 인스턴스를 하나 생성하고 라우터 정보 router를 포함합니다. 그리고 app이라는 id를 가진 요소에 인스턴스를 붙여 화면에 나타냅니다. 
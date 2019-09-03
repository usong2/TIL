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

<br />

### 네임드 뷰

네임드 뷰(Named View)는 특정 페이지로 이동했을 때 여러 개의 컴포넌트를 동시에 표시하는 라우팅 방식입니다. 앞에서 다룬 네스티드 라우터는 상위 컴포넌트가 하위 컴포넌트를 포함하는 형식이지만 네임드 뷰는 같은 레벨에서 여러 개의 컴포넌트를 한 번에 표시합니다. 

> 네임드뷰 구현

```vue

<div id="app">
  <router-view name="header"></router-view>
  <router-view></router-view>
  <router-view name="footer"></router-view>
</div>

<script src="https://cdn.jsdelivr.net/npm/vue@2.5.2/dist/vue.js"></script>
<script src="https://unpkg.com/vue-router@3.1.3/dist/vue-router.js"></script>

<script>
  var Body = { template: '<div>This is Body</div>' };
  var Header = { template: '<div>This is Header</div>' };
  var Footer = { template: '<div>This is Footer</div>' };

  var router = new VueRouter({
    routes: [
      {
        path: '/',
        components: {
          default: Body,
          header: Header,
          footer: Footer
        }
      }
    ]
  });

  var app = new Vue({
    router
  }).$mount('#app');
</script>
```

1. `<div>`태그 안에 &lt;router-view&gt;를 3개 추가하고 name 속성을 추가합니다. 여기서 name 속성은 아래 components 속성에 정의하는 컴포넌트와 매칭하기 위한 속성입니다. Header 컴포넌트는 header, Footer 컴포넌트는 footer를 각각 name 속성에 값으로 지정합니다. 그리고 name 속성이 없는 두 번째 &lt;router-view&gt;는 default로 표시될 컴포넌트를 의미합니다. 
2. 이제 &lt;script&gt;로 넘어가서 Body, Header, Footer 컴포넌트의 내용이 담길 객체를 선언합니다. 각 컴포넌트 내용에는 컴포넌트 영역이 구분될 수 있게 간단한 template 속성을 추가합니다. 
3. 그리고 앞의 네스티드 라우터 예제 코드와는 다르게 이번에는 new VueRouter()로 라우터를 하나 생성하고 라우터 정보를 바로 그 안에 정의합니다. 
4. path는 네임드 뷰가 실행될 URL을 정의하는 속성입니다. 여기서는 애플리케이션을 실행하면 마주치는 기본 URL값 '/'를 지정합니다. 
5. components는 앞에서 &lt;router-view&gt;에 정의한 name 속성에 따라 표시될 컴포넌트를 정의하는 속성입니다. 
6. 마지막으로 인스턴스를 생성하고 네임드 뷰 정보를 갖고 있는 라우터를 포함합니다. 

<br /><hr />

## 뷰 HTTP 통신

### 웹 앱의 HTTP 통신 방법

요즘 웹 앱에서 서버에 데이터를 요청하는 HTTP(HyperText Transfer Protocol) 통신은 필수로 구현해야 하는 기능입니다. 과거의 웹사이트가 정적인 텍스트나 간단한 이미지를 나타내는 데 그쳤다면 이제는 사용자와 상호 작용에 따라 데이터를 동적으로 화면에 표시해 줘야 하기 때문입니다. <br />

여기서 HTTP는 브라우저와 서버 간에 데이터를 주고받는 통신 프로토콜(protocol)입니다. 브라우저에서 특정 데이터를 보내달라고 요청(request)을 보내면 서버에서 응답(response)으로 해당 데이터를 보내주는 방식으로 동작합니다. 서버에 '해당 데이터를 보내주세요'라는 메시지를 보내는 게 바로 'HTTP 요청을 보낸다'와 같은 의미입니다. <br />

![브라우저와 서버 간 HTTP 통신](https://joshua1988.github.io/images/posts/web/http/request-response.png)

웹 앱 HTTP 통신의 대표적인 사례로는 제이쿼리(jQuery)의 ajax가 있습니다. ajax는 서버에서 받아온 데이터를 표시할 때 화면 전체를 갱신하지 않고도 화면의 일부분만 변경할 수 있게 하는 자바스크립트 기법입니다. ajax가 대중화되면서 많은 웹 앱에서 ajax를 사용하고 있습니다. 리액트, 앵귤러 등에서도 활발하게 사용하고 있죠. <br />

뷰에서도 마찬가지로 ajax를 지원하기 위한 라이브러리를 제공합니다. 뷰 프레임워크의 필수 라이브러리로 관리하던 뷰 리소스와 요즘 가장 많이 사용하는 액시오스(axios)가 바로 그것입니다. <br /><br />

### 뷰 리소스

뷰 리소스(resource)는 초기에 코어 팀에서 공식적으로 권하는 라이브러리였으나 2016년 말에 에반이 공식적인 지원을 중단하기로 결정하면서 다시 기존에 관리했던 PageKit 팀의 라이브러리로 돌아갔습니다. 그 이유는 HTTP 통신 관련 라이브러리는 뷰 라우팅, 상태 관리와 같은 라이브러리와는 다르게 프레임워크에 필수적인 기능이 아니라고 판단했기 때문입니다. 그럼에도 불구하고 뷰 리소스는 아직 계속 사용할 수 있는 라이브러리이기 때문에 간단히 살펴보겠습니다. <br />

뷰 리소스를 사용하는 방법은 CDN을 이용해서 라이브러리를 로딩하는 방식과 NPM으로 라이브러리를 설치하는 방법(ES6 기준)이 있습니다.<br />

*ES6 설치 방법은 [https://github.com/pagekit/vue-resource#installation](https://github.com/pagekit/vue-resource#installation)을 참고하세요.

```vue
<div id="app">
  <button v-on:click="getData">프레임워크 목록 가져오기</button>
</div>

<script src="https://cdn.jsdelivr.net/npm/vue@2.5.2/dist/vue.js"></script>
<script src="https://cdn.jsdelivr.net/npm/vue-resource@1.3.4"></script>

<script>
  new Vue({
    el: '#app',
    methods: {
      getData: function() {
        this.$http.get('https://raw.githubusercontent.com/joshua1988/doit-vuejs/master/data/demo.json')
          .then(function(response){
            console.log(response);
            console.log(JSON.parse(response.data));
          });
      }
    }
  });
</script>
```

이 코드를 버튼을 하나 추가하고 클릭하면 지정한 URL의 데이터를 가져오는 예제입니다. 여기서 불러오는 데이터는 JSON 형식의 간단한 파일이며 '프레임워크 종류 - 프레임워크 이름' 형태의 '키 - 쌍' 조합으로 총 7개의 데이터 쌍으로 되어 있습니다. 

1. 먼저 버튼은 인스턴스 영역 안인 &lt;div&gt; 태그 안에  &lt;button&gt; 태그로 추가합니다. 그리고 v-on:click을 이용하여 버튼을 클릭했을 때 getData()가 호출되도록 클릭 이벤트를 설정합니다. 
2. getData()에는 뷰 리소스에서 제공하는 API인 this.$http.get()을 사용하여 해당 URL에서 제공하는 데이터를 받아옵니다. API 이름에서 유추할 수 있듯이 this.$http.get()은 HTTP GET 요청을 서버에 보내고 특정 데이터를 받아옵니다. 
3. 그리고 버튼을 클릭하여 해당 URL로 HTTP GET 요청을 보내고 .then() 안에서 응답을 받은 데이터 response를 콘솔에 출력합니다. 




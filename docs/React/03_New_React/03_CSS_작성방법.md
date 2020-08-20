## CSS 작성방법

웹 애플리케이션을 개발할 때 돔 요소에 스타일을 적용하기 위해서 CSS를 이용한다. CSS를 작성하는 전통적인 방법은 CSS를 별도의 파일로 작성하고 HTML의 link 태그를 이용해서 사용자에게 전달하는 것이다. 순수 CSS 문법은 코드를 재사용하기가 힘들기 때문에 Sass(syntactically awesome stylesheets)를 이용하기도 한다. Sass에는 변수와 믹스인(mixin) 개념이 있어서 중복 코드를 많이 줄일 수 있다. 

리액트 프로그래밍을 할 때는 컴포넌트를 중심으로 생각하는 게 좋다. UI는 컴포넌트의 조합으로 표현되며, 컴포넌트 하나를 잘 만들어서 여러 곳에 재사용하는 게 좋다. 그렇게 하기 위해서 각 컴포넌트는 서로 간의 의존성을 최소화하면서 내부적으로는 응집도(cohesion)를 높여야 한다. 

컴포넌트는 화면에 보이는 한 부분이므로 당연히 CSS 코드가 필요하다. 응집도가 높은 컴포넌트를 작성하기 위해 CSS 코드도 컴포넌트 내부에서 관리하는 게 좋다. 컴포넌트 내부에서 CSS 코드를 관리하는 방법으로 css-module, css-in-js를 알아보자. 

css-module 또는 css-in-js로 CSS 코드를 작성하면 좋겠지만 현실은 녹록지 않다. 회사에 CSS 코드를 담당하는 팀이 별도로 조내한다면 css-module, css-in-js는 그림의 떡이라고 할 수 있다. 그런 경우를 위해 일반적인 CSS 파일을 작성하는 방법과 Sass를 이용하는 방법도 알아보자. 

css-test라는 이름으로 프로젝트를 생성한다. 

```bash
$ npx create-react-app css-test
```

### 일반적인 CSS 파일로 작성하기

일반적인 CSS 파일로 스타일을 적용하는 방법을 알아보자. src 폴더 밑에 Button1.js, Button1.css 파일을 만들고 다음 코드를 입력한다. 

```css
/* Button1.css */

.big {
    width: 100%;
}
.small {
    width: 50px;
}
.button {
    height: 30px;
    background-color: #aaa;
}
```

```jsx
// Button1.js

import React from 'react';
import './Button1.css';

function Button({ size }) {
    if (size === 'big') {
        return <button className="button big">큰 버튼</button>;
    } else {
        return <button className="button small">작은 버튼</button>;
    }
}

export default Button;
```

같은 방식으로 Box 컴포넌트를 만들어서 스타일을 적용해 보자. Box1.js, Box1.css 파일을 만든 다음, 다음 코드를 입력한다. 

```css
/* Box1.css */

.big {
    width: 200px;
}
.small {
    width: 100px;
}
.box {
    height: 50px;
    background-color: #aaa;
}
```

 ```jsx
// Box1.js

import React from 'react';
import './Box1.css';

function Box({ size }) {
    if (size === 'big') {
        return <div className="box big">큰 박스</div>;
    } else {
        return <div className="box small">작은 박스</div>;
    }
}

export default Box;
 ```

이제 Button, Box 컴포넌트를 사용하여 App.js 파일의 내용을 아래와 같이 수정하자. 

```jsx
// App.js

import React from 'react';
import Button from './Button1';
import Box from './Box1';

export default function App() {
    return(
    	<div>
            <Button size="big" />
            <Button size="small" />
            <Box size="big" />
            <Box size="small" />
        </div>
    );
}
```

npm start를 이용해서 실행하면 화면에 버튼 두 개와 박스 두 개가 보인다. 하지만 버튼의 너비가 이상하다는 것을 발견할 수 있다. 그리고 Button1.css 파일에서 small, big 클래스로 정의한 너비가 제대로 적용되지 않은 것을 발견할 수 있다. 브라우저의 개발자 모드로 분석해 보면 박스의 스타일이 버튼의 스타일을 덮어쓰고 있기 때문이라는 걸 알 수 있다. npm run build를 실행해서 build/static/css 폴더 밑에 생성된 CSS 파일을 확인해 보자. 

```css
.big {
    width: 100px;
}
.small {
    width: 50px;
}
.button {
    height: 30px;
    background-color: #aaa;
}
.big {
    width: 200px;
}
.small {
    width: 100px;
}
.box {
    height: 50px;
    background-color: #aaa;
}
```

CSS 클래스 명이 서로 같기 때문에 위의 .big, .small는 아래의 .big, .small로 대체된다. 이처럼 일반적인 CSS 파일에서는 클래스명이 충돌할 수 있다. 
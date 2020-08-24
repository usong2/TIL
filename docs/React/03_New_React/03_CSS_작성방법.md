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

### css-module로 작성하기

css-module을 사용하면 일반적인 CSS 파일에서 클래스명이 충돌할 수 있는 단점을 극복할 수 있다. css- module은 간결한 클래스명을 이용해서 컴포넌트 단위로 스타일을 적용할 때 좋다. create-react-app에서는 CSS 파일 이름을 다음과 같이 작성하면 css-module이 된다. 

```bash
{이름}.module.css
```

css-module을 이용해서 이전에 작성했던 Button 컴포넌트를 다시 작성해 보자. Button1.css 파일을 복사해서 Button2.module.css 파일을 만들자. Button2.js 파일을 만들고 다음 코드를 입력한다. 

```jsx
import React from 'react';
import style from './Button2.module.css';

function Button({ size }) {
    if (size === 'big') {
        return <button className={`${style.button} ${style.big}`}>큰 버튼</button>;
    } else {
        return (
        	<button className={`${style.button} ${style.small}`}>작은 버튼</button>;
        );
    }
}

export default Button;
console.log(style);
```

css-module로 작성된 CSS 파일을 가져온 결과는 다음과 같다.

```css
{
    big: 'Button2_big__1AXxH',
    small: 'Button2_small_1G4lx',
    button: 'Button2_box-_D8Lg-',
}
```

각 클래스명에 고유한 해시값이 들어 있다. 사용자에게 전달된 HTML 파일을 열어 보면 해시값이 어떻게 사용되는지 알 수 있다. 

```html
<style type="text/css">
    .Button2_big__1deZX {
        width: 100px;
    }
    .Button2_small__1G4lx {
        width: 50px;
    }
    .Button2_button__D8Lg- {
        height: 30px;
        background-color: #aaa;
    }
</style>
```

Button2.module.css 파일에서 입력한 내용이 클래스명만 변경된 채로 들어 있다. 클래스명에 해시값이 포함되어 있기 때문에 다른 CSS 파일에서 같은 이름의 클래스명을 사용하더라도 이름 충돌은 발생하지 않는다. 

Button2.js 파일에서는 className에 속성값을 입력하는 코드가 번거롭기도 하고 가독성도 좋지 않다. 이때 classnames 패키지를 이용하면 코드를 개선할 수 있다. 다음과 같이 classnames 패키지를 설치한다. 

```bash
$ npm install classnames
```

이제 Buttons2.js 코드를 리팩토링 해보자.

```jsx
// ...
import cn from 'classnames';
// ....
<button className={cn(style.button, style.big)}>큰 버튼</button>
<button className={cn(style.button, style.small)}>작은 버튼</button>
```

박스 컴포넌트도 css-module 방식으로 작성해 보자. Box1.css 파일을 복사해서 Box2.module.css 파일을 만든다. Box2.js 파일을 만든 다음, 다음 코드를 입력해 보자. 

```jsx
import React from 'react';
import style from './Box2.module.css';
import cn from 'classnames';

function Box({ size }) {
    const isBig = size === 'big';
    const label = isBig ? '큰 박스' : '작은 박스';
    return(
    	<div className={cn(style.box, { [style.big]: isBig, [style.small]: !isBig })}>{label}</div>
    );
}

export default Box;
```

cn 함수의 인수로 객체를 사용하면 조건부로 클래스명을 입력할 수 있다.

### Sass로 작성하기

Sass는 CSS와 비슷하지만 별도의 문법을 이용해서 생산성이 높은 스타일 코드를 작성할 수 있게 도와준다. Sass 문법에 있는 변수, 믹스인(mixin) 등의 개념을 이용하면 스타일 코드를 재사용할 수 있다. 다음은 Sass 문법으로 작성된 간단한 코드다. 

```scss
$sizeNormal: 100px;

.box { 
	width: $sizeNormal;
    height: 80px;
}

.button {
    width: $sizeNormal;
    height: 50px;
}
```

일반적인 프로그래밍 언어처럼 변수를 정의할 수 있고 변수를 사용하면 코드 중복을 없앨 수 있다. 
Sass 문법으로 작성한 파일은 별도의 빌드 단계를 거쳐서 CSS 파일로 변환된다. create-react-app에서 Sass를 사용하고 싶다면 다음 패키지를 설치하자.

```bash
$ npm install node-sass
```

node-sass 패키지는 Sass를 CSS로 빌드할 때 사용된다. create-react-app에는 Sass를 위한 빌드 시스템이 구축되어 있다. 자바스크립트에서 scss 확장자를 가지는 파일을 불러오면 자동으로 Sass 파일이 CSS 파일로 컴파일된다. 

먼저 공통으로 사용되는 코드를 관리할 shared.scss 파일을 만든 다음 다음 내용을 입력하자. 

```scss
$infoColor: #aaa;
```

Sass를 이용해서 이전에 작성한 버튼 컴포넌트에 스타일을 적용해 보자. Button2.moudle.css, Button2.js 파일을 복사해서 Button3.js 파일에서는 Button2.module.css 파일을 가져오는 부분을 Button3.module.scss 파일로 변경한다. Button3.module.scss 파일은 다음과 같이 수정한다. 

```css
@import './shared.scss';

.big {
    width: 200px;
}
.small {
    with: 100px;
}
.box {
    height: 50px;
    background-color: $infoColor;
} 
```

Sass 모듈의 시스템 덕분에 스타일 코드를 재사용할 수 있다. 

App.js 파일에서 Button3.js, Box3.js 파일을 가져오도록 수정하고 npm start를 실행하면 의도한 대로 스타일이 적용된 것을 확인할 수 있다. shared.scss에서 색상 정보를 변경해 보자. HMR이 작동하면서 변경된 내용이 자동으로 브라우저 화면에 반영된다. 

npm run build를 실행 후 생성된 CSS 파일을 열어 보자. shared.scss 파일의 변수가 .box, .button 스타일에 적용된 것을 확인할 수 있다.

### css-in-js로 작성하기

css-in-js는 리액트의 인기에 힘입어 비교적 최근에 떠오르고 있느 방법이다. 이름에서 알 수 있듯이 CSS 코드를 자바스크립트 파일 안에서 작성한다. CSS 코드가 자바스크립트 안에서 관리되기 때문에 공통되는 CSS 코드를 변수로 관리할 수 있다. 또한 동적으로 CSS 코드를 작성하기도 쉽다. 

css-in-js를 지원하는 패키지가 많이 나왔고, 문법도 다양하다. 개발자 개개인이 자바스크립트와 CSS 모두를 작성할 줄 안다면 css-in-js는 좋은 선택이 될 수 있다. 그러나 CSS만 담당하는 마크업 개발팀 별도로 있는 회사라면 css-in-js를 도입하기가 힘들 수 있다. 

css-in-js를 지원하는 패키지 중에서 가장 유명한 styled-components를 사용해서 간단한 코드를 작성해 보자.

```bash
$ npm install styled-components
```

css-in-js 방식을 이용해서 박스 컴포넌트에 스타일을 적용해 보자. Box1.js 파일을 복사해서 Box1.js 파일을 만든 후 다음과 같이 수정한다. 

```jsx
import React from 'react';
import styled from 'styled-components';

const BoxCommon = styled.div`
	height: 50px;
	background-color: #aaa;
`;
const BoxBig = styled(BoxCommon)`
	width: 200px;
`;
const BoxSmall = styled(BoxCommon)`
	width: 100px;
`;

function Box({ size }) {
    if (size === 'big') {
        return <BoxBig>큰 박스</BoxBig>;
    } else {
        return <BoxSmall>작은 박스</BoxSmall>;
    }
}

export default Box;
```

공통 CSS 코드를 담고 있는 styled-components 컴포넌트를 만들었다. 마치 클래스 상속처럼 이전에 만든 BoxCommon 컴포넌트를 확장해서 새로운 styled-components 컴포넌트를 만들 수 있다. styled-components 컴포넌트는 일반적인 리액트 컴포넌트처럼 사용될 수 있다. styled-components 컴포넌트를 만들 때 사용된 문법이 생소해 보일 수 있다. 이는 ES6에 추가된 태그된 템플릿 리터럴(tagged template literals) 문법이다.

App.js 파일에서 Box4.js 파일을 가져오도록 수정하고 npm start를 실행하면 의도한 대로 동작하는 것을 확인할 수 있다. CSS 파일 없이 자바스크립트 파일만으로 스타일을 작성하는 데 성공한 것이다. 

css-in-js의 장점인 동적 스타일을 적용해 보자. Box4.js 파일의 내용을 다음과 같이 변경한다. 

```jsx
import React from 'react';
import styled from 'styled-components';

const BoxCommon = styled.div`
	width: ${props => (props.isBig ? 200 : 100)}px;
	height: 50px;
	background-color: #aaa;
`;

function Box({ size }) {
    const isBig = size === 'big';
    const label = isBig ? '큰 박스' : '작은 박스';
    return <BoxCommon isBig={isBig}>{label}</BoxCommon>;
}

export default Box;
```

템플릿 리터럴에서 표현식(expression)을 사용하면 컴포넌트의 속성값을 매개변수로 갖는 함수를 작성할 수 있다. 동적으로 스타일을 변경하기 때문에 styled-components 컴포넌트는 하나로 충분하다. isBig 속성값은 styled-components 컴포넌트의 표현식에서 사용된다. 


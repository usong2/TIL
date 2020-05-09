# CSS Module

리액트 프로젝트에서 컴포넌트를 스타일링할 때 CSS Module을 사용하면 CSS 클래스가 중첩되는 것을 완벽히 방지할 수 있음

CRA로 만든 프로젝트에서 CSS Module을 사용할 때에는 CSS 파일의 확장자를 `.module.css`로 하면 됨

```css
/* Box.module.css */
.Box {
  background: black;
  color: white;
  padding: 2rem;
}
```

Box라는 클래스의 이름이 고유해지며 그 과정에서 파일 경로, 파일 이름, 클래스 이름, 해쉬값 등이 사용될 수 있음

```jsx
/* Box.js */
import React from "react";
import styles from "./Box.module.css";

function Box() {
  return <div className={style.Box}>{styles.Box}</div>
}

export default Box;
```

`className` 설정 시에 `styles.Box` 이렇게 `import`로 불러온 `styles` 객체 안에 있는 값을 참조해야 함

이 기술은 다음과 같은 상황에 사용하면 유용함

+ 레거시 프로젝트에 리액트를 도입할 때
  (기존 프로젝트에 있던 CSS 클래스와 이름이 중복되어도 스타일이 꼬이지 않게 해줌)
+ CSS 클래스를 중복되지 않게 작성하기 위하여 CSS 클래스 네이밍 규칙을 만들기 귀찮을 때

리액트 컴포넌트를 위한 클래스를 작성할 때 CSS 클래스 네이밍 규칙

1. 컴포넌트의 이름은 다른 컴포넌트와 중복되지 않도록 함
2. 컴포넌트의 최상단 CSS 클래스는 컴포넌트의 이름과 일치시킴 (예: `.Button`)
3. 컴포넌트 내부에서 보여지는 CSS 클래스는 CSS Selector를 잘 활용함 (예. `MyForm .my-input`)

<br>

## 기본 구조 생성

+ 새 프로젝트 생성

  ```bash
  $ npx create-react-app styling-with-css-module
  ```

+ ./src/components/CheckBox.js 생성

  ```jsx
  // ./src/components/CheckBox.js
  
  import React from "react";
  
  function CheckBox({ checked, children }) {
    return (
      <div>
        <label>
          <input type="checkbox" />
          <div>{checked ? "체크됨" : "체크 안됨"}</div>
        </label>
        <span>{children}</span>
      </div>
    );
  }
  
  export default CheckBox;
  ```

+ ./src/App.js 수정

  ```jsx
  // ./src/App.js
  
  import React, { useState } from "react";
  import CheckBox from "./components/CheckBox";
  
  function App() {
    const [check, setCheck] = useState(false);
    const onChange = (e) => {
      setCheck(e.target.checked);
    };
    return (
      <div>
        <CheckBox onChange={onChange} checked={check}>
          다음 약관에 모두 동의
        </CheckBox>
      </div>
    );
  }
  
  export default App;
  ```

+ ./src/components/Checkbox.js 수정

  ```jsx
  // ./src/components/Checkbox.js
  
  import React from "react";
  
  function CheckBox({ checked, children, ...rest }) {
    return (
      <div>
        <label>
          <input type="checkbox" checked={checked} {...rest} />
          <div>{checked ? "체크됨" : "체크 안됨"}</div>
        </label>
        <span>{children}</span>
      </div>
    );
  }
  
  export default CheckBox;
  ```

+ 브라우저에서 작동 확인

<br>

## 디자인 입히기

+ react-icons 라이브러리 설치

  ```bash
  $ yarn add react-icons
  ```

  참고: [https://react-icons.github.io/icons?name=md](https://react-icons.github.io/icons?name=md)

+ ./src/components/CheckBox.js 수정

  ```jsx
  // ./src/components/CheckBox.js
  
  import React from "react";
  import { MdCheckBox, MdCheckBoxOutlineBlank } from "react-icons/md";
  
  function CheckBox({ checked, children, ...rest }) {
    return (
      <div>
        <label>
          <input type="checkbox" checked={checked} {...rest} />
          <div>{checked ? <MdCheckBox /> : <MdCheckBoxOutlineBlank />}</div>
        </label>
        <span>{children}</span>
      </div>
    );
  }
  
  export default CheckBox;
  ```

+ ./src/components/CheckBox.module.css 생성

  ```css
  /* ./src/components/CheckBox.module.css */
  
  .checkbox {
    display: flex;
    align-items: center;
  }
  
  .checkbox label {
    cursor: pointer;
  }
  
  .checkbox input {
    width: 0;
    height: 0;
    position: absolute;
    opacity: 0;
  }
  
  .checkbox span {
    font-size: 1.125rem;
    font-weight: bold;
  }
  
  .icon {
    display: flex;
    align-items: center;
    font-size: 2rem;
    margin-right: 0.25rem;
    color: #adb5bd;
  }
  
  .checked {
    color: #339af0;
  }
  ```

+ ./src/components/CheckBox.js 수정

  ```jsx
  // ./src/components/CheckBox.js
  
  import React from "react";
  import { MdCheckBox, MdCheckBoxOutlineBlank } from "react-icons/md";
  import styles from "./CheckBox.module.css";
  
  function CheckBox({ checked, children, ...rest }) {
    return (
      <div className={styles.checkbox}>
        <label>
          <input type="checkbox" checked={checked} {...rest} />
          <div className={styles.icon}>
            {checked ? (
              <MdCheckBox className={styles.checked} />
            ) : (
              <MdCheckBoxOutlineBlank />
            )}
          </div>
        </label>
        <span>{children}</span>
      </div>
    );
  }
  
  export default CheckBox;
  ```

### 두 개 이상의 클래스 넣기

#### 일반적인 방법

```jsx
<div className={`${styles.checkbox} ${styles.blabla}`}></div>
```

#### classnames 사용

+ 설치

  ```bash
  $ yarn add classnames
  ```

+ ./src/components/CheckBox.js 수정

  ```jsx
  // ./src/components/CheckBox.js
  
  import React from "react";
  import { MdCheckBox, MdCheckBoxOutlineBlank } from "react-icons/md";
  import styles from "./CheckBox.module.css";
  import classNames from "classnames/bind";
  
  const cx = classNames.bind(styles);
  
  function CheckBox({ checked, children, ...rest }) {
    const color = "blue";
    return (
      <div className={cx("checkbox")}>
        <label>
          <input type="checkbox" checked={checked} {...rest} />
          <div className={cx("icon")}>
            {checked ? (
              <MdCheckBox className={cx("checked")} />
            ) : (
              <MdCheckBoxOutlineBlank />
            )}
          </div>
        </label>
        <span>{children}</span>
      </div>
    );
  }
  
  export default CheckBox;
  ```

+ 여러 클래스 및 변수 추가 가능

  ```jsx
  <div className={cx("checkbox", "abc", "def", { ghi: true }, color)}>
  ```

### module.scss

node Sass 설치 후 확장자를 .scss로 바꿔주면 scss로 사용 가능

#### global&local 클래스 네임 선언

:global이나 :local 키워드를 앞에 넣어주면 됨

```css
/* sample.module.css */

:global .my-global-name {
    
}
```

```scss
/* sample.module.scss */

:global {
  .my-global-name {
        
  }    
}
```

```css
/* sample.css */

:local .make-this.local {
    
}
```

```scss
/* sample.scss */

:local {
  .make-this-local {
        
  }
}
```


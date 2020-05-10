# styled-components

CSS in JS는 JS 안에 CSS를 작성하는 것을 의미하며 [styled-components](https://styled-components.com/)는 현존하는 리액트 라이브러리 중에서 가장 인기 있는 CSS in JS 라이브러리.

이에 대한 대안으로는 [emotion](https://github.com/emotion-js/emotion), [styled-jsx](https://github.com/zeit/styled-jsx)가 있음

## Tagged Template Literal

Template Literal은 문자열 안에 특정 자바스크립트 값을 넣어서 조합할 때 조금 더 쉽게 할 수 있도록 해줌

```jsx
const name = 'react';
const message = `hello ${name}`;

console.log(message);
// "hello react"
```

`${}` 안에 일반 문자열 / 숫자가 아닌 객체를 넣으면

```jsx
const object = { a: 1 };
const text = `${object}`
console.log(text);

// "[object Object]"
```

함수를 넣으면

```jsx
const fn = () => true;
const msg = `${fn}`;
console.log(msg);
// "() => true"
```

Template Literal을 사용하면서도 내부에 넣은 자바스크립트 값을 조회하고 싶을 땐 Tagged Template Literal 문법을 사용 가능

```jsx
const red = '빨간색';
const blue = '파란색';

function favoriteColors(texts, ...values) {
  console.log(texts);
  console.log(values);
}

favoriteColors`제가 좋아하는 색은 ${red}와 ${blue}입니다.`

// ["제가 좋아하는 색은", "와 ", "입니다.", raw: array(3)]
// ["빨간색", "파란색"]
```

이러한 작업도 가능

```jsx
const red = '빨간색';
const blue = '파란색';

function favoriteColors(texts, ...values) {
   return texts.reduce((result, text, i) => `${result}${text}${values[i] ? `<b>${values[i]}</b>` : ''}`, '');
}

favoriteColors`제가 좋아하는 색은 ${red}과 ${blue}입니다.`
// 제가 좋아하는 색은 <b>빨간색</b>과 <b>파란색</b>입니다.
```

Tagged Template Literal을 사용 시 만약 `${}`을 통하여 함수를 넣어줬다면 해당 함수를 사용해줄 수도 있음

```jsx
function sample(texts, ...fns) {
  const mockProps = {
    title: '안녕하세요',
    body: '내용은 내용내용 입니다.'
  };
  return texts.reduce((result, text, i) => `${result}${text}${fns[i] ? fns[i](mockProps) : ''}`, '');
}
sample`
  제목: ${props => props.title}
  내용: ${props => props.body}
`
/*
"
  제목: 안녕하세요
  내용: 내용은 내용내용 입니다.
"
*/
```

<br>

## styled-components 사용하기

+ 새 프로젝트 생성 후 styled-components 설치

  ```bash
  $ npx create-react-app styling-with-styled-components
  $ cd styling-with-styled-components
  $ yarn add styled-components
  ```

+ ./src/App.js 수정

  ```jsx
  // ./src/App.js
  
  import React from "react";
  import styled from "styled-components";
  
  const Circle = styled.div`
    width: 5rem;
    height: 5rem;
    background: black;
    border-radius: 50%;
  `;
  
  function App() {
    return <Circle />;
  }
  
  export default App;
  ```

### props 넣기

+ ./src/App.js 수정

  ```jsx
  // ./src/App.js
  
  import React from "react";
  import styled, { css } from "styled-components";
  
  const Circle = styled.div`
    width: 5rem;
    height: 5rem;
    background: ${(props) => props.color};
    border-radius: 50%;
    ${(props) =>
      props.huge &&
      css`
        width: 10rem;
        height: 10rem;
      `}
  `;
  
  function App() {
    return (
      <>
        <Circle color="black" />
        <Circle color="blue" huge />
      </>
    );
  }
  
  export default App;
  ```

<br>

## styled-components로 재사용성 높은 버튼 만들기

+ ./src/components/Button.js 생성

  ```jsx
  // ./src/components/Button.js
  
  import React from "react";
  import styled from "styled-components";
  
  const StyledButton = styled.button`
    /* 공통 스타일 */
    display: inline-flex;
    outline: none;
    border: none;
    border-radius: 4px;
    color: white;
    font-weight: bold;
    cursor: pointer;
    padding: 0 1rem;
  
    /* 크기 */
    height: 2.25rem;
    font-size: 1rem;
  
    /* 색상 */
    background: #228be6;
    &:hover {
      background: #339af0;
    }
    &:active {
      background: #1c7ed6;
    }
  
    /* 기타 */
    & + & {
      margin-left: 1rem;
    }
  `;
  
  function Button({ children, ...rest }) {
    return <StyledButton {...rest}>{children}</StyledButton>;
  }
  
  export default Button;
  ```

+ ./src/App.js 수정

  ```jsx
  // ./src/App.js
  
  import React from "react";
  import styled from "styled-components";
  import Button from "./components/Button";
  
  const AppBlock = styled.div`
    width: 512px;
    margin: 0 auto;
    margin-top: 4rem;
    border: 1px solid black;
    padding: 1rem;
  `;
  
  function App() {
    return (
      <AppBlock>
        <Button>BUTTON</Button>
      </AppBlock>
    );
  }
  
  export default App;
  ```

<br>

## Polished 스타일 유틸 함수 사용

+ 참고: [https://polished.js.org/docs/](https://polished.js.org/docs/)

Sass 사용 시에 `lighten()` 또는 `darken()` 과 같은 유틸 함수를 사용하여 색상에 변화를 줄 수 있었는데 CSS in JS에서도 비슷한 유틸 함수를 사용할 수 있는 polished 라이브러리 사용 가능

+ polished 설치

  ```bash
  $ yarn add polished
  ```

+ ./src/components/Button.js 수정

  ```jsx
  // ./src/components/Button.js
  
  import React from "react";
  import styled from "styled-components";
  import { darken, lighten } from "polished";
  
  const StyledButton = styled.button`
    /* 공통 스타일 */
    display: inline-flex;
    outline: none;
    border: none;
    border-radius: 4px;
    color: white;
    font-weight: bold;
    cursor: pointer;
    padding: 0 1rem;
  
    /* 크기 */
    height: 2.25rem;
    font-size: 1rem;
  
    /* 색상 */
    background: #228be6;
    &:hover {
      background: ${lighten(0.1, "#228be6")};
    }
    &:active {
      background: ${darken(0.1, "#228be6")};
    }
  
    /* 기타 */
    & + & {
      margin-left: 1rem;
    }
  `;
  
  function Button({ children, ...rest }) {
    return <StyledButton {...rest}>{children}</StyledButton>;
  }
  
  export default Button;
  ```

### *Theme*

App.js에서 색상을 선언하고 그 색상을 어떤 스타일 컴포넌트든지 불러와서 쉽게 사용할 수 있는 방법

+ ./src/App.js 수정

  ```jsx
  // ./src/App.js
  
  import React from "react";
  import styled, { ThemeProvider } from "styled-components";
  import Button from "./components/Button";
  
  const AppBlock = styled.div`
    width: 512px;
    margin: 0 auto;
    margin-top: 4rem;
    border: 1px solid black;
    padding: 1rem;
  `;
  
  const palette = {
    blue: "#228be6",
    gray: "#496057",
    pink: "#f06595",
  };
  
  function App() {
    return (
      <ThemeProvider theme={{ palette }}>
        <AppBlock>
          <Button>BUTTON</Button>
        </AppBlock>
      </ThemeProvider>
    );
  }
  
  export default App;
  ```

+ ./src/components/Button.js 수정

  ```jsx
  // ./src/components/Button.js
  
  import React from "react";
  import styled from "styled-components";
  import { darken, lighten } from "polished";
  
  const StyledButton = styled.button`
    /* 공통 스타일 */
    display: inline-flex;
    outline: none;
    border: none;
    border-radius: 4px;
    color: white;
    font-weight: bold;
    cursor: pointer;
    padding: 0 1rem;
  
    /* 크기 */
    height: 2.25rem;
    font-size: 1rem;
  
    /* 색상 */
    background: ${(props) => props.theme.palette.blue};
    &:hover {
      background: ${(props) => lighten(0.1, props.theme.palette.blue)};
    }
    &:active {
      background: ${(props) => darken(0.1, props.theme.palette.blue)};
    }
  
    /* 기타 */
    & + & {
      margin-left: 1rem;
    }
  `;
  
  function Button({ children, ...rest }) {
    return <StyledButton {...rest}>{children}</StyledButton>;
  }
  
  export default Button;
  ```

### 스타일 코드를 하나의 함수로 묶어 넣기

+ ./src/components/Button.js 수정

  ```jsx
  // ./src/components/Button.js
  
  import React from "react";
  import styled, { css } from "styled-components";
  import { darken, lighten } from "polished";
  
  const StyledButton = styled.button`
    /* 공통 스타일 */
    display: inline-flex;
    outline: none;
    border: none;
    border-radius: 4px;
    color: white;
    font-weight: bold;
    cursor: pointer;
    padding: 0 1rem;
  
    /* 크기 */
    height: 2.25rem;
    font-size: 1rem;
  
    /* 색상 */
    ${(props) => {
      const color = props.theme.palette.blue;
      return css`
        background: ${color};
        &:hover {
          background: ${lighten(0.1, color)};
        }
        &:active {
          background: ${darken(0.1, color)};
        }
      `;
    }}
  
    /* 기타 */
    & + & {
      margin-left: 1rem;
    }
  `;
  
  function Button({ children, ...rest }) {
    return <StyledButton {...rest}>{children}</StyledButton>;
  }
  
  export default Button;
  ```

### 다른 색상의 버튼 만들기

+ ./src/components/Button.js 수정

  ```jsx
  // ./src/components/Button.js
  
  import React from "react";
  import styled, { css } from "styled-components";
  import { darken, lighten } from "polished";
  
  const StyledButton = styled.button`
    /* 공통 스타일 */
    display: inline-flex;
    outline: none;
    border: none;
    border-radius: 4px;
    color: white;
    font-weight: bold;
    cursor: pointer;
    padding: 0 1rem;
  
    /* 크기 */
    height: 2.25rem;
    font-size: 1rem;
  
    /* 색상 */
    ${(props) => {
      const color = props.theme.palette[props.color];
      return css`
        background: ${color};
        &:hover {
          background: ${lighten(0.1, color)};
        }
        &:active {
          background: ${darken(0.1, color)};
        }
      `;
    }}
  
    /* 기타 */
    & + & {
      margin-left: 1rem;
    }
  `;
  
  function Button({ children, color, ...rest }) {
    return (
      <StyledButton color={color} {...rest}>
        {children}
      </StyledButton>
    );
  }
  
  Button.defaultProps = {
    color: "blue",
  };
  
  export default Button;
  ```

+ ./src/App.js 수정

  ```jsx
  // ./src/App.js
  
  import React from "react";
  import styled, { ThemeProvider } from "styled-components";
  import Button from "./components/Button";
  
  const AppBlock = styled.div`
    width: 512px;
    margin: 0 auto;
    margin-top: 4rem;
    border: 1px solid black;
    padding: 1rem;
  `;
  
  const palette = {
    blue: "#228be6",
    gray: "#496057",
    pink: "#f06595",
  };
  
  function App() {
    return (
      <ThemeProvider theme={{ palette }}>
        <AppBlock>
          <Button>BUTTON</Button>
          <Button color="gray">BUTTON</Button>
          <Button color="pink">BUTTON</Button>
        </AppBlock>
      </ThemeProvider>
    );
  }
  
  export default App;
  ```

### 코드 리팩토링

+ ./src/components/Button.js 수정

  ```jsx
  // ./src/components/Button.js
  
  import React from "react";
  import styled, { css } from "styled-components";
  import { darken, lighten } from "polished";
  
  const StyledButton = styled.button`
    /* 공통 스타일 */
    display: inline-flex;
    outline: none;
    border: none;
    border-radius: 4px;
    color: white;
    font-weight: bold;
    cursor: pointer;
    padding: 0 1rem;
  
    /* 크기 */
    height: 2.25rem;
    font-size: 1rem;
  
    /* 색상 */
    ${({ theme, color }) => {
      const selected = theme.palette[color];
      return css`
        background: ${selected};
        &:hover {
          background: ${lighten(0.1, selected)};
        }
        &:active {
          background: ${darken(0.1, selected)};
        }
      `;
    }}
  
    /* 기타 */
    & + & {
      margin-left: 1rem;
    }
  `;
  
  function Button({ children, color, ...rest }) {
    return (
      <StyledButton color={color} {...rest}>
        {children}
      </StyledButton>
    );
  }
  
  Button.defaultProps = {
    color: "blue",
  };
  
  export default Button;
  ```

+ 색상 지정 부분을 바깥으로 빼기

  ```jsx
  // ./src/components/Button.jsx
  
  import React from "react";
  import styled, { css } from "styled-components";
  import { darken, lighten } from "polished";
  
  const colorStyles = css`
    ${({ theme, color }) => {
      const selected = theme.palette[color];
      return css`
        background: ${selected};
        &:hover {
          background: ${lighten(0.1, selected)};
        }
        &:active {
          background: ${darken(0.1, selected)};
        }
      `;
    }}
  `;
  
  const StyledButton = styled.button`
    /* 공통 스타일 */
    display: inline-flex;
    outline: none;
    border: none;
    border-radius: 4px;
    color: white;
    font-weight: bold;
    cursor: pointer;
    padding: 0 1rem;
  
    /* 크기 */
    height: 2.25rem;
    font-size: 1rem;
  
    /* 색상 */
    ${colorStyles}
  
    /* 기타 */
    & + & {
      margin-left: 1rem;
    }
  `;
  
  function Button({ children, color, ...rest }) {
    return (
      <StyledButton color={color} {...rest}>
        {children}
      </StyledButton>
    );
  }
  
  Button.defaultProps = {
    color: "blue",
  };
  
  export default Button;
  ```

<br>

## 버튼 사이즈 조정하기

+ ./src/components/Button.js 수정

  ```jsx
  // ./src/components/Button.js
  
  import React from "react";
  import styled, { css } from "styled-components";
  import { darken, lighten } from "polished";
  
  const colorStyles = css`
    ${({ theme, color }) => {
      const selected = theme.palette[color];
      return css`
        background: ${selected};
        &:hover {
          background: ${lighten(0.1, selected)};
        }
        &:active {
          background: ${darken(0.1, selected)};
        }
      `;
    }}
  `;
  
  const sizeStyles = css`
    ${(props) =>
      props.size === "large" &&
      css`
        height: 3rem;
        font-size: 1.25rem;
      `}
  
    ${(props) =>
      props.size === "medium" &&
      css`
        height: 2.25rem;
        font-size: 1rem;
      `}
   
    ${(props) =>
      props.size === "small" &&
      css`
        height: 1.75rem;
        font-size: 0.875rem;
      `}
  `;
  
  const StyledButton = styled.button`
    /* 공통 스타일 */
    display: inline-flex;
    outline: none;
    border: none;
    border-radius: 4px;
    color: white;
    font-weight: bold;
    cursor: pointer;
    padding: 0 1rem;
  
    /* 크기 */
    ${sizeStyles}
  
    /* 색상 */
    ${colorStyles}
  
    /* 기타 */
    & + & {
      margin-left: 1rem;
    }
  `;
  
  function Button({ children, color, size, ...rest }) {
    return (
      <StyledButton color={color} size={size} {...rest}>
        {children}
      </StyledButton>
    );
  }
  
  Button.defaultProps = {
    color: "blue",
    size: "medium",
  };
  
  export default Button;
  ```

+ ./src/App.js 수정

  ```jsx
  // ./src/App.js
  
  import React from "react";
  import styled, { ThemeProvider } from "styled-components";
  import Button from "./components/Button";
  
  const AppBlock = styled.div`
    width: 512px;
    margin: 0 auto;
    margin-top: 4rem;
    border: 1px solid black;
    padding: 1rem;
  `;
  
  const ButtonGroup = styled.div`
    & + & {
      margin-top: 1rem;
    }
  `;
  
  const palette = {
    blue: "#228be6",
    gray: "#496057",
    pink: "#f06595",
  };
  
  function App() {
    return (
      <ThemeProvider theme={{ palette }}>
        <AppBlock>
          <ButtonGroup>
            <Button size="large">BUTTON</Button>
            <Button>BUTTON</Button>
            <Button size="small">BUTTON</Button>
          </ButtonGroup>
          <ButtonGroup>
            <Button color="gray" size="large">
              BUTTON
            </Button>
            <Button color="gray">BUTTON</Button>
            <Button color="gray" size="small">
              BUTTON
            </Button>
          </ButtonGroup>
          <ButtonGroup>
            <Button color="pink" size="large">
              BUTTON
            </Button>
            <Button color="pink">BUTTON</Button>
            <Button color="pink" size="small">
              BUTTON
            </Button>
          </ButtonGroup>
        </AppBlock>
      </ThemeProvider>
    );
  }
  
  export default App;
  ```

### 코드 리팩토링

+ ./src/components/Button.js 수정

  ```jsx
  // ./src/components/Button.js
  
  import React from "react";
  import styled, { css } from "styled-components";
  import { darken, lighten } from "polished";
  
  const colorStyles = css`
    ${({ theme, color }) => {
      const selected = theme.palette[color];
      return css`
        background: ${selected};
        &:hover {
          background: ${lighten(0.1, selected)};
        }
        &:active {
          background: ${darken(0.1, selected)};
        }
      `;
    }}
  `;
  
  const sizes = {
    large: {
      height: "3rem",
      fontSize: "1.25rem",
    },
    medium: {
      height: "2.25rem",
      fontSize: "1rem",
    },
    small: {
      height: "1.75rem",
      fontSize: "0.875rem",
    },
  };
  
  const sizeStyles = css`
    /* 크기 */
    ${({ size }) => css`
      height: ${sizes[size].height};
      font-size: ${sizes[size].fontSize};
    `}
  `;
  
  const StyledButton = styled.button`
    /* 공통 스타일 */
    display: inline-flex;
    outline: none;
    border: none;
    border-radius: 4px;
    color: white;
    font-weight: bold;
    cursor: pointer;
    padding: 0 1rem;
  
    /* 크기 */
    ${sizeStyles}
  
    /* 색상 */
    ${colorStyles}
  
    /* 기타 */
    & + & {
      margin-left: 1rem;
    }
  `;
  
  function Button({ children, color, size, ...rest }) {
    return (
      <StyledButton color={color} size={size} {...rest}>
        {children}
      </StyledButton>
    );
  }
  
  Button.defaultProps = {
    color: "blue",
    size: "medium",
  };
  
  export default Button;
  ```


<br>

## 버튼 outline, fullWidth 설정

outline: 버튼의 테두리만 보여짐

fullWidth: 가로 너비를 100% 차지함

### outline

+ ./src/components/Buton.js 수정

  ```jsx
  // ./src/components/Button.js
  
  import React from "react";
  import styled, { css } from "styled-components";
  import { darken, lighten } from "polished";
  
  const colorStyles = css`
    ${({ theme, color }) => {
      const selected = theme.palette[color];
      return css`
        background: ${selected};
        &:hover {
          background: ${lighten(0.1, selected)};
        }
        &:active {
          background: ${darken(0.1, selected)};
        }
        ${(props) =>
          props.outline &&
          css`
            color: ${selected};
            background: none;
            border: 1px solid ${selected};
            &:hover {
              background: ${selected};
              color: white;
            }
          `}
      `;
    }}
  `;
  
  const sizes = {
    large: {
      height: "3rem",
      fontSize: "1.25rem",
    },
    medium: {
      height: "2.25rem",
      fontSize: "1rem",
    },
    small: {
      height: "1.75rem",
      fontSize: "0.875rem",
    },
  };
  
  const sizeStyles = css`
    /* 크기 */
    ${({ size }) => css`
      height: ${sizes[size].height};
      font-size: ${sizes[size].fontSize};
    `}
  `;
  
  const StyledButton = styled.button`
    /* 공통 스타일 */
    display: inline-flex;
    outline: none;
    border: none;
    border-radius: 4px;
    color: white;
    font-weight: bold;
    cursor: pointer;
    padding: 0 1rem;
  
    /* 크기 */
    ${sizeStyles}
  
    /* 색상 */
    ${colorStyles}
  
    /* 기타 */
    & + & {
      margin-left: 1rem;
    }
  `;
  
  function Button({ children, color, size, outline, ...rest }) {
    return (
      <StyledButton color={color} size={size} outline={outline} {...rest}>
        {children}
      </StyledButton>
    );
  }
  
  Button.defaultProps = {
    color: "blue",
    size: "medium",
  };
  
  export default Button;
  ```

+ ./src/App.js 수정

  ```jsx
  // ./src/App.js
  
  import React from "react";
  import styled, { ThemeProvider } from "styled-components";
  import Button from "./components/Button";
  
  const AppBlock = styled.div`
    width: 512px;
    margin: 0 auto;
    margin-top: 4rem;
    border: 1px solid black;
    padding: 1rem;
  `;
  
  const ButtonGroup = styled.div`
    & + & {
      margin-top: 1rem;
    }
  `;
  
  const palette = {
    blue: "#228be6",
    gray: "#496057",
    pink: "#f06595",
  };
  
  function App() {
    return (
      <ThemeProvider theme={{ palette }}>
        <AppBlock>
          <ButtonGroup>
            <Button size="large">BUTTON</Button>
            <Button>BUTTON</Button>
            <Button size="small">BUTTON</Button>
          </ButtonGroup>
          <ButtonGroup>
            <Button color="gray" size="large">
              BUTTON
            </Button>
            <Button color="gray">BUTTON</Button>
            <Button color="gray" size="small">
              BUTTON
            </Button>
          </ButtonGroup>
          <ButtonGroup>
            <Button color="pink" size="large">
              BUTTON
            </Button>
            <Button color="pink">BUTTON</Button>
            <Button color="pink" size="small">
              BUTTON
            </Button>
          </ButtonGroup>
          <ButtonGroup>
            <Button size="large" outline>
              BUTTON
            </Button>
            <Button color="gray" outline>
              BUTTON
            </Button>
            <Button size="small" color="pink" outline>
              BUTTON
            </Button>
          </ButtonGroup>
        </AppBlock>
      </ThemeProvider>
    );
  }
  
  export default App;
  ```

### fullWidth

+ ./src/components/Button.js 수정

  ```jsx
  // ./src/components/Button.js
  
  import React from "react";
  import styled, { css } from "styled-components";
  import { darken, lighten } from "polished";
  
  const colorStyles = css`
    ${({ theme, color }) => {
      const selected = theme.palette[color];
      return css`
        background: ${selected};
        &:hover {
          background: ${lighten(0.1, selected)};
        }
        &:active {
          background: ${darken(0.1, selected)};
        }
        ${(props) =>
          props.outline &&
          css`
            color: ${selected};
            background: none;
            border: 1px solid ${selected};
            &:hover {
              background: ${selected};
              color: white;
            }
          `}
      `;
    }}
  `;
  
  const sizes = {
    large: {
      height: "3rem",
      fontSize: "1.25rem",
    },
    medium: {
      height: "2.25rem",
      fontSize: "1rem",
    },
    small: {
      height: "1.75rem",
      fontSize: "0.875rem",
    },
  };
  
  const sizeStyles = css`
    /* 크기 */
    ${({ size }) => css`
      height: ${sizes[size].height};
      font-size: ${sizes[size].fontSize};
    `}
  `;
  
  const fullWidthStyle = css`
    ${(props) =>
      props.fullWidth &&
      css`
        width: 100%;
        justify-content: center;
        & + & {
          margin-left: 0;
          margin-top: 1rem;
        }
      `}
  `;
  
  const StyledButton = styled.button`
    /* 공통 스타일 */
    display: inline-flex;
    outline: none;
    border: none;
    border-radius: 4px;
    color: white;
    font-weight: bold;
    cursor: pointer;
    padding: 0 1rem;
  
    /* 기타 */
    & + & {
      margin-left: 1rem;
    }
  
    /* 크기 */
    ${sizeStyles}
  
    /* 색상 */
    ${colorStyles}
  
    ${fullWidthStyle}
  
  
  `;
  
  function Button({ children, color, size, outline, fullWidth, ...rest }) {
    return (
      <StyledButton
        color={color}
        size={size}
        outline={outline}
        fullWidth={fullWidth}
        {...rest}
      >
        {children}
      </StyledButton>
    );
  }
  
  Button.defaultProps = {
    color: "blue",
    size: "medium",
  };
  
  export default Button;
  ```

+ ./src/App.js 수정

  ```jsx
  // ./src/App.js
  
  import React from "react";
  import styled, { ThemeProvider } from "styled-components";
  import Button from "./components/Button";
  
  const AppBlock = styled.div`
    width: 512px;
    margin: 0 auto;
    margin-top: 4rem;
    border: 1px solid black;
    padding: 1rem;
  `;
  
  const ButtonGroup = styled.div`
    & + & {
      margin-top: 1rem;
    }
  `;
  
  const palette = {
    blue: "#228be6",
    gray: "#496057",
    pink: "#f06595",
  };
  
  function App() {
    return (
      <ThemeProvider theme={{ palette }}>
        <AppBlock>
          <ButtonGroup>
            <Button size="large">BUTTON</Button>
            <Button>BUTTON</Button>
            <Button size="small">BUTTON</Button>
          </ButtonGroup>
          <ButtonGroup>
            <Button color="gray" size="large">
              BUTTON
            </Button>
            <Button color="gray">BUTTON</Button>
            <Button color="gray" size="small">
              BUTTON
            </Button>
          </ButtonGroup>
          <ButtonGroup>
            <Button color="pink" size="large">
              BUTTON
            </Button>
            <Button color="pink">BUTTON</Button>
            <Button color="pink" size="small">
              BUTTON
            </Button>
          </ButtonGroup>
          <ButtonGroup>
            <Button size="large" outline>
              BUTTON
            </Button>
            <Button color="gray" outline>
              BUTTON
            </Button>
            <Button size="small" color="pink" outline>
              BUTTON
            </Button>
          </ButtonGroup>
          <ButtonGroup>
            <Button size="large" fullWidth>
              BUTTON
            </Button>
            <Button size="large" color="gray" fullWidth>
              BUTTON
            </Button>
            <Button size="large" color="pink" fullWidth>
              BUTTON
            </Button>
          </ButtonGroup>
        </AppBlock>
      </ThemeProvider>
    );
  }
  
  export default App;
  ```

<br>

## Dialog 만들기

### 구조 작업

+ ./src/components/Dialog.js 생성

  ```jsx
  // ./src/components/Dialog.js
  
  import React from "react";
  import styled from "styled-components";
  import Button from "./Button";
  
  const DarkBackground = styled.div`
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(0, 0, 0, 0.8);
  `;
  
  const DialogBlock = styled.div`
    width: 320px;
    padding: 1.5rem;
    background: white;
    border-radius: 2px;
  
    h3 {
      margin: 0;
      font-size: 1.5rem;
    }
  
    p {
      font-size: 1.125rem;
    }
  `;
  
  const ButtonGroup = styled.div`
    margin-top: 3rem;
    display: flex;
    justify-content: flex-end;
  `;
  
  function Dialog({ title, children, confirmText, cancelText }) {
    return (
      <DarkBackground>
        <DialogBlock>
          <h3>{title}</h3>
          <p>{children}</p>
          <ButtonGroup>
            <Button color="gray">{cancelText}</Button>
            <Button color="pink">{confirmText}</Button>
          </ButtonGroup>
        </DialogBlock>
      </DarkBackground>
    );
  }
  
  Dialog.defaultProps = {
    cancelText: "취소",
    confirmText: "확인",
  };
  
  export default Dialog;
  ```

+ ./src/App.js 수정

  ```jsx
  // ./src/App.js
  
  import React from "react";
  import styled, { ThemeProvider } from "styled-components";
  import Button from "./components/Button";
  import Dialog from "./components/Dialog";
  
  const AppBlock = styled.div`
    width: 512px;
    margin: 0 auto;
    margin-top: 4rem;
    border: 1px solid black;
    padding: 1rem;
  `;
  
  const ButtonGroup = styled.div`
    & + & {
      margin-top: 1rem;
    }
  `;
  
  const palette = {
    blue: "#228be6",
    gray: "#496057",
    pink: "#f06595",
  };
  
  function App() {
    return (
      <ThemeProvider theme={{ palette }}>
        <AppBlock>
          <ButtonGroup>
            <Button size="large">BUTTON</Button>
            <Button>BUTTON</Button>
            <Button size="small">BUTTON</Button>
          </ButtonGroup>
          <ButtonGroup>
            <Button color="gray" size="large">
              BUTTON
            </Button>
            <Button color="gray">BUTTON</Button>
            <Button color="gray" size="small">
              BUTTON
            </Button>
          </ButtonGroup>
          <ButtonGroup>
            <Button color="pink" size="large">
              BUTTON
            </Button>
            <Button color="pink">BUTTON</Button>
            <Button color="pink" size="small">
              BUTTON
            </Button>
          </ButtonGroup>
          <ButtonGroup>
            <Button size="large" outline>
              BUTTON
            </Button>
            <Button color="gray" outline>
              BUTTON
            </Button>
            <Button size="small" color="pink" outline>
              BUTTON
            </Button>
          </ButtonGroup>
          <ButtonGroup>
            <Button size="large" fullWidth>
              BUTTON
            </Button>
            <Button size="large" color="gray" fullWidth>
              BUTTON
            </Button>
            <Button size="large" color="pink" fullWidth>
              BUTTON
            </Button>
          </ButtonGroup>
          <Dialog
            title="정말로 삭제하시겠습니까?"
            confirmText="삭제"
            cancelText="취소"
          >
            데이터를 정말로 삭제하시겠습니까?
          </Dialog>
        </AppBlock>
      </ThemeProvider>
    );
  }
  
  export default App;
  ```

+ 버튼 간격 줄이기

  ```jsx
  // ./src/components/Dialog.js
  
  import React from "react";
  import styled from "styled-components";
  import Button from "./Button";
  
  const DarkBackground = styled.div`
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(0, 0, 0, 0.8);
  `;
  
  const DialogBlock = styled.div`
    width: 320px;
    padding: 1.5rem;
    background: white;
    border-radius: 2px;
    h3 {
      margin: 0;
      font-size: 1.5rem;
    }
    p {
      font-size: 1.125rem;
    }
  `;
  
  const ButtonGroup = styled.div`
    margin-top: 3rem;
    display: flex;
    justify-content: flex-end;
  `;
  
  const ShortMarginButton = styled(Button)`
    & + & {
      margin-left: 0.5rem;
    }
  `;
  
  function Dialog({ title, children, confirmText, cancelText }) {
    return (
      <DarkBackground>
        <DialogBlock>
          <h3>{title}</h3>
          <p>{children}</p>
          <ButtonGroup>
            <ShortMarginButton color="gray">{cancelText}</ShortMarginButton>
            <ShortMarginButton color="pink">{confirmText}</ShortMarginButton>
          </ButtonGroup>
        </DialogBlock>
      </DarkBackground>
    );
  }
  
  Dialog.defaultProps = {
    cancelText: "취소",
    confirmText: "확인",
  };
  
  export default Dialog;
  ```

<br>

### 기능 구현

+ ./src/App.js 수정

  ```jsx
  // ./src/App.js
  
  import React, { useState } from "react";
  import styled, { ThemeProvider } from "styled-components";
  import Button from "./components/Button";
  import Dialog from "./components/Dialog";
  
  const AppBlock = styled.div`
    width: 512px;
    margin: 0 auto;
    margin-top: 4rem;
    border: 1px solid black;
    padding: 1rem;
  `;
  
  const ButtonGroup = styled.div`
    & + & {
      margin-top: 1rem;
    }
  `;
  
  const palette = {
    blue: "#228be6",
    gray: "#496057",
    pink: "#f06595",
  };
  
  function App() {
    const [dialog, setDialog] = useState(false);
    const onClick = () => {
      setDialog(true);
    };
    const onConfirm = () => {
      console.log("확인");
      setDialog(false);
    };
  
    const onCancel = () => {
      console.log("취소");
      setDialog(false);
    };
  
    return (
      <ThemeProvider theme={{ palette }}>
        <>
          <AppBlock>
            <Button color="pink" size="large" fullWidth onClick={onClick}>
              삭제
            </Button>
          </AppBlock>
          <Dialog
            title="정말로 삭제하시겠습니까?"
            confirmText="삭제"
            cancelText="취소"
            onConfirm={onConfirm}
            onCancel={onCancel}
            visible={dialog}
          >
            데이터를 정말로 삭제하시겠습니까?
          </Dialog>
        </>
      </ThemeProvider>
    );
  }
  
  export default App;
  ```

+ ./src/components/Dialog.js 수정

  ```jsx
  // ./src/components/Dialog.js
  
  import React from "react";
  import styled from "styled-components";
  import Button from "./Button";
  
  const DarkBackground = styled.div`
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(0, 0, 0, 0.8);
  `;
  
  const DialogBlock = styled.div`
    width: 320px;
    padding: 1.5rem;
    background: white;
    border-radius: 2px;
    h3 {
      margin: 0;
      font-size: 1.5rem;
    }
    p {
      font-size: 1.125rem;
    }
  `;
  
  const ButtonGroup = styled.div`
    margin-top: 3rem;
    display: flex;
    justify-content: flex-end;
  `;
  
  const ShortMarginButton = styled(Button)`
    & + & {
      margin-left: 0.5rem;
    }
  `;
  
  function Dialog({
    title,
    children,
    confirmText,
    cancelText,
    visible,
    onConfirm,
    onCancel,
  }) {
    if (!visible) return null;
  
    return (
      <DarkBackground>
        <DialogBlock>
          <h3>{title}</h3>
          <p>{children}</p>
          <ButtonGroup>
            <ShortMarginButton color="gray" onClick={onCancel}>
              {cancelText}
            </ShortMarginButton>
            <ShortMarginButton color="pink" onClick={onConfirm}>
              {confirmText}
            </ShortMarginButton>
          </ButtonGroup>
        </DialogBlock>
      </DarkBackground>
    );
  }
  
  Dialog.defaultProps = {
    cancelText: "취소",
    confirmText: "확인",
  };
  
  export default Dialog;
  ```

<br>

## 트렌지션 구현하기

+ ./src/components/Dialog.js 수정

  ```jsx
  // ./src/components/Dialog.js
  
  import React, { useState, useEffect } from "react";
  import styled, { keyframes, css } from "styled-components";
  import Button from "./Button";
  
  const fadeIn = keyframes`
      from {
          opacity: 0;
      }
      to {
          opacity 1;
      }
  `;
  
  const fadeOut = keyframes`
      from {
          opacity: 1;
      }
      to {
          opacity 0;
      }
  `;
  
  const slideUp = keyframes`
      from {
          transform: translateY(200px);
      }
      to {
          transform: translateY(0px);
      }
  `;
  
  const slideDown = keyframes`
      from {
          transform: translateY(0px);
      }
      to {
          transform: translateY(200px);
      }
  `;
  
  const DarkBackground = styled.div`
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(0, 0, 0, 0.8);
  
    animation-duration: 0.25s;
    animation-timing-function: ease-out;
    animation-name: ${fadeIn};
    animation-fill-mode: forwards;
  
    ${(props) =>
      props.disappear &&
      css`
        animation-name: ${fadeOut};
      `}
  `;
  
  const DialogBlock = styled.div`
    width: 320px;
    padding: 1.5rem;
    background: white;
    border-radius: 2px;
  
    h3 {
      margin: 0;
      font-size: 1.5rem;
    }
    p {
      font-size: 1.125rem;
    }
  
    animation-duration: 0.25s;
    animation-timing-function: ease-out;
    animation-name: ${slideUp};
    animation-fill-mode: forwards;
  
    ${(props) =>
      props.disappear &&
      css`
        animation-name: ${slideDown};
      `}
  `;
  
  const ButtonGroup = styled.div`
    margin-top: 3rem;
    display: flex;
    justify-content: flex-end;
  `;
  
  const ShortMarginButton = styled(Button)`
    & + & {
      margin-left: 0.5rem;
    }
  `;
  
  function Dialog({
    title,
    children,
    confirmText,
    cancelText,
    visible,
    onConfirm,
    onCancel,
  }) {
    const [animate, setAnimate] = useState(false);
    const [localVisible, setLocalVisible] = useState(visible);
  
    useEffect(() => {
      // visible true -> false
      if (localVisible && !visible) {
        setAnimate(true);
        setTimeout(() => setAnimate(false), 250);
      }
      setLocalVisible(visible);
    }, [localVisible, visible]);
  
    if (!visible && !animate) return null;
  
    return (
      <DarkBackground disappear={!visible}>
        <DialogBlock disappear={!visible}>
          <h3>{title}</h3>
          <p>{children}</p>
          <ButtonGroup>
            <ShortMarginButton color="gray" onClick={onCancel}>
              {cancelText}
            </ShortMarginButton>
            <ShortMarginButton color="pink" onClick={onConfirm}>
              {confirmText}
            </ShortMarginButton>
          </ButtonGroup>
        </DialogBlock>
      </DarkBackground>
    );
  }
  
  Dialog.defaultProps = {
    cancelText: "취소",
    confirmText: "확인",
  };
  
  export default Dialog;
  ```

  
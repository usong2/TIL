# Transitions

CSS 속성의 전환 효과를 지정

## `transition`

CSS 속성의 시작과 끝을 지정(전환 효과)하여 중간 값을 애니메이션`<단축>`

| 값                           | 의미                         | 기본값 |
| ---------------------------- | ---------------------------- | ------ |
| `transition-property`        | 전환 효과를 사용할 속성 이름 | `all`  |
| `transition-duration`        | 전환 효과의 지속시간 설정    | `0s`   |
| `transition-timing-function` | 타이밍 함수 지정             | `ease` |
| `transition-delay`           | 전환 효과의 대기시간 설정    | `0s`   |

### 사용법

```html
<div class="box"></div>
```

```css
.box {
    width: 100px;
    height: 100px;
    background: tomato;
    margin: 50px;
    transition: width 1s, background: 1s;
    /*transition-property: width, background;
    transition-duration: 1s;*/
}
.box:hover {
    width: 300px;
    background: dodgerblue;
}
```

#### `transition-property`

전환 효과를 사용할 속성 이름을 설정`<개별>`

| 값       | 의미                         | 기본값 |
| -------- | ---------------------------- | ------ |
| `all`    | 모든 속성에 적용             | `all`  |
| 속성이름 | 전환 효과를 사용할 속성 이름 |        |

```css
.box {
    width: 100px;
    height: 100px;
    background: tomato;
    margin: 50px;
    transition: width 1s;
}
.box:hover {
    width: 300px;
    background: dodgerblue;
}
```

#### `transition-duration`

전환 효과의 지속시간을 설정`<개별>`

| 값   | 의미                      | 기본값 |
| ---- | ------------------------- | ------ |
| 시간 | 전환 효과가 지속되는 시간 | `0s`   |

```css
.box {
    width: 100px;
    height: 100px;
    background: tomato;
    margin: 50px;
    transition: .4s;
}
.box:hover {
    width: 300px;
    background: dodgerblue;
}
```

#### `transition-timing-function`

타이밍 함수(애니메이션 전환 효과를 계산하는 방법) 지정`<개별>`

| 값                      | 의미                              | 기본값 | Cubic Bezier 값                                              |
| ----------------------- | --------------------------------- | ------ | ------------------------------------------------------------ |
| `ease`                  | 빠르게 - 느리게                   | `ease` | `cubic-bezier(.25, .1, .25, 1)`                              |
| `linear`<br />`ease-in` | 일정하게<br />느리게 - 빠르게     |        | `cubic-bezier(0, 0, 1, 1)`<br />`cubic-bezier(.42, 0, 1, 1)` |
| `ease-out`              | 빠르게 - 느리게                   |        | `cubic-bezier(0, 0, .58, 1)`                                 |
| `ease-in-out`           | 느리게 - 빠르게 - 느리게          |        | `cubic-bezier(.42, 0, .58, 1)`                               |
| `cubic-bezier(n,n,n,n)` | 자신만의 값을 정의<br />(`0`~`1`) |        |                                                              |
| `steps(n)`              | `n`번 분할된 애니메이션           |        |                                                              |

[https://easings.net/](https://easings.net/)

```css
.box {
    width: 100px;
    height: 100px;
    background: tomato;
    margin: 50px;
    /*transition: 2s ease-in;*/
    transition: 2s steps(4);
}
.box:hover {
    width: 300px;
    background: dodgerblue;
}
```

#### `trasition-delay`

전환 효과가 몇 초 뒤에 시작할지 대기시간을 설정`<개별>`

| 값   | 의미                        | 기본값 |
| ---- | --------------------------- | ------ |
| 시간 | 전환 효과의 대기시간을 설정 | `0s`   |

```css
.box {
    width: 100px;
    height: 100px;
    background: tomato;
    margin: 50px;
    transition: 2s 3s;
}
.box:hover {
    width: 300px;
    background: dodgerblue;
}
```




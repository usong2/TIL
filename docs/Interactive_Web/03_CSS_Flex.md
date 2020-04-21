# CSS Flex

## Flexbox

### Grid

+ 격자로 구성되어 칸을 합치는 것도 가능하며 가로축 세로축 두 가지 방향으로 구성
+ 아직 지원하는 브라우저가 많지 않아 실무에서는 많이 쓰이지 않음

### Flex

+ 축이 가로 아니면 세로 한 방향으로 구성
+ 알아두면 실무에서 바로 사용 가능
+ IE 10부터 지원

<br>

### 기본 구조

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie-edge" />
    <title>Interactive Web</title>
    <style>
      .container {
        height: 80vh;
        background: gray;
      }
      .item {
        padding: 2em;
        border: 3px solid black;
        background: white;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="item">AAA</div>
      <div class="item">B</div>
      <div class="item">CCCCC</div>
      <div class="item">DDD</div>
      <div class="item">E</div>
    </div>
  </body>
</html>
```

#### Flex 구조

+ `display: flex;` 
+ `flex-direction: row | row-reverse | column | column-reverse;`

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie-edge" />
    <title>Interactive Web</title>
    <style>
      .container {
        display: flex;
        flex-direction: column;
        height: 80vh;
        background: gray;
      }
      .item {
        padding: 2em;
        border: 3px solid black;
        background: white;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="item">AAA</div>
      <div class="item">B</div>
      <div class="item">CCCCC</div>
      <div class="item">DDD</div>
      <div class="item">E</div>
    </div>
  </body>
</html>
```

#### 정렬 구조

+ `justify-content: flex-start | flex-end | center | space-between | space-around`
+ `align-items: stratch | flex-start | flex-end | center`

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie-edge" />
    <title>Interactive Web</title>
    <style>
      .container {
        display: flex;
        /* flex-direction: row; */
        /* justify-content: flex-start; */
        align-items: center;
        height: 80vh;
        background: gray;
      }
      .item {
        padding: 2em;
        border: 3px solid black;
        background: white;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="item">AAA</div>
      <div class="item">B</div>
      <div class="item">CCCCC</div>
      <div class="item">DDD</div>
      <div class="item">E</div>
    </div>
  </body>
</html>
```

#### 자식 적용

+ `flex-grow: 숫자` : 자신의 콘텐츠 폭을 제외한 늘어날 때 여백의 비율
+ `flex-shrink: 숫자` : 자신의 콘텐츠 폭을 제외한 줄어들 때 여백의 비율
+ `flex-basis: auto | 0` : flex-grow 사용시 원래 콘텐츠가 차지하는 영역 설정
+ `flex: 1` : 축약형

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie-edge" />
    <title>Interactive Web</title>
    <style>
      .container {
        display: flex;
        /* flex-direction: row; */
        /* justify-content: flex-start; */
        align-items: center;
        height: 80vh;
        background: gray;
      }
      .item {
        /* flex-grow: 1;
        flex-basis: 0; */
        flex: 1;
        border: 3px solid black;
        font-size: 3rem;
        background: white;
      }
      /* .item:nth-child(1) {
        flex-grow: 1;
      }
      .item:nth-child(2) {
        flex-grow: 5;
      }
      .item:nth-child(3) {
        flex-grow: 2;
      }
      .item:nth-child(4) {
        flex-grow: 3;
      }
      .item:nth-child(5) {
        flex-grow: 1;
      } */
    </style>
  </head>
  <body>
    <div class="container">
      <div class="item">AAA</div>
      <div class="item">B</div>
      <div class="item">CCCCC</div>
      <div class="item">DDD</div>
      <div class="item">E</div>
    </div>
  </body>
</html>
```


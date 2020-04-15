# CSS 변환과 애니메이션

## Transform

+ scale(): 크기
+ rotate(): 회전
+ skewY(): 비틀기
+ translate(): 위치조정
+ transform-origin: 기준점

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie-edge">
    <title>Interactive Web</title>
    <link rel="stylesheet" href="css/reset.css">
    <style>
      .box-container {
        display: flex;
      }
      .box {
        width: 100px;
        height: 100px;
        border: 2px solid black;
        background: rgba(255, 255, 0, 0.7);
      }
      .box:hover {
        /* transform: scale(2) rotate(15deg); */
        /* transform: skewY(-30deg); */
        /* transform: translate(30px, 10px); */
        /* transform: translateY(-30px); */
        /* transform: scale(1.5); */
        transform: rotate(30deg);
        /* transform-origin: right bottom; */
        transform-origin: 100% 100%
      }
    </style>
  </head>
  <body>
    <h1>CSS Transform</h1>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
    </p>
    <div class="box-container">
      <div class="box">A</div>
      <div class="box">B</div>
      <div class="box">C</div>
      <div class="box">D</div>
      <div class="box">E</div>
    </div>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
    </p>
  </body>
</html>
```


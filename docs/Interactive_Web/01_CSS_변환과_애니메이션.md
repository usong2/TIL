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

<br>

## Transition

+ transition: 애니메이션이 플레이되는 시간

+ transition-property: 적용 속성 

  ```css
  transition-property: none | all | property | initial | inherit
  ```

  + none: 모든 속성에 미적용
  + all: 모든 속성에 적용
  + property: 속성을 지정, 여러 개의 속성을 지정할 경우 쉼표로 구분
  + initial: 기본값으로 설정
  + inherit: 부모 요소의 속성값을 상속

+ transition-duration: 재생시간

+ transition-timing-function: 가속도

+ transition-delay: 지연시간

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
        transition: 1s;
      }
      .box:hover {
        width: 200px;
        background: red;
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

<br>

## Animation

+ animation-name: 애니메이션 이름 지정

+ animation-duration: 지속 시간

+ animation-timing-function: 속도 곡선

  + ```css
    linear | cubic-bezier(0, 0, 0.07, 1.57)
    ```

+ animation-delay: 애니메이션 시작 전 대기 시간

+ animation-interaction-count: 반복 횟수

  + ```css
    infinite | 3 
    ```

+ animation-direction: 애니메이션의 방향

  + ```css
    normal | reverse | alternate | alternate-reverse
    ```

+ animation-fill-mode: 애니메이션 종료 후 위치

  + ```css
    none | forwards | backwords | both
    ```

+ animation-play-state: 일시정지 OR 재생 여부

  + ```css
    running | paused
    ```

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie-edge">
    <title>Interactive Web</title>
    <style>
      @keyframes sample-ani {
        0% {
          transform: translate(0, 0);
        }
        50% {
          transform: translate(300px, 0);
          background: red;
        }
        100% {
          transform: translate(400px, 500px);
        }
      }
      .box {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100px;
        height: 100px;
        border: 2px solid #000;
        background: #fff000;
        animation: sample-ani 3s linear forwards;
      }
      .box:hover {
        animation-play-state: paused;
      }
    </style>
  </head>
  <body>
    <h1>Animation</h1>
    <div class="box">BOX</div>
  </body>
</html>
```

<br>

## frame by frame

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie-edge">
    <title>Interactive Web</title>
    <style>
      body{background: #000;}
      @keyframes runner-ani {
        /* to = 100% */
        to {
          background-position: -768px 0;
          transform: translate(500px, 0);
        }
      }
      .runner {
        width: 128px;
        height: 128px;
        background: url('./runner.png') no-repeat 0 0 / auto 128px;
        animation: runner-ani 1s infinite alternate steps(6);
      }
    </style>
  </head>
  <body>
    <div class="runner"></div>
  </body>
</html>
```


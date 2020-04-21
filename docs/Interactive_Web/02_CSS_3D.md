# CSS 3D

## CSS 3D 표현하기

+ perspective: 숫자가 작아질 수록 눈 앞에서 가까이 보이는 것과 같은 효과

### 카드 뒤집기

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie-edge" />
    <title>Interactive Web</title>
    <style>
      .world {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 80vw;
        height: 80vh;
        background: #fff000;
        perspective: 500px;
      }
      .card {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100px;
        height: 150px;
        margin: 1em;
        border-radius: 0.5em;
        font-size: 1.5em;
        background: red;
        transition: 1s;
        transform: rotateY(0deg);
      }
      .world:hover .card {
        transform: rotateY(180deg);
      }
    </style>
  </head>
  <body>
    <div class="world">
      <div class="card">CARD</div>
      <div class="card">CARD</div>
      <div class="card">CARD</div>
    </div>
  </body>
</html>
```

### 카드 뒷면

+ transform-style: preserve-3d;
+ backface-visibility: hidden;

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie-edge" />
    <title>Interactive Web</title>
    <style>
      .world {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 80vw;
        height: 80vh;
        background: #fff000;
        perspective: 500px;
      }
      .card {
        position: relative;
        width: 100px;
        height: 150px;
        margin: 1em;
        transform: rotateY(0deg);
        transition: 1s;
        transform-style: preserve-3d;
      }
      .card-side {
        display: flex;
        align-items: center;
        justify-content: center;
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        border-radius: 0.5em;
        font-size: 1.5em;
        backface-visibility: hidden;
      }
      .card-side-front {
        z-index: 1;
        background: white;
      }
      .card-side-back {
        background: red;
        transform: rotateY(180deg);
      }
      .world:hover .card {
        transform: rotateY(180deg);
      }
    </style>
  </head>
  <body>
    <div class="world">
      <div class="card">
        <div class="card-side card-side-front">F</div>
        <div class="card-side card-side-back">B</div>
      </div>
    </div>
  </body>
</html>
```

### 문 열기

+ transform-origin: left;

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie-edge" />
    <title>Interactive Web</title>
    <style>
      .world {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 80vw;
        height: 80vh;
        background: #fff000;
        perspective: 500px;
      }
      .card {
        position: relative;
        width: 100px;
        height: 150px;
        margin: 1em;
        transform: rotateY(0deg);
        transition: 1s;
        transform-style: preserve-3d;
        transform-origin: left;
      }
      .card-side {
        display: flex;
        align-items: center;
        justify-content: center;
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        border-radius: 0.5em;
        font-size: 1.5em;
        backface-visibility: hidden;
      }
      .card-side-front {
        z-index: 1;
        background: white;
      }
      .card-side-back {
        background: red;
        transform: rotateY(180deg);
      }
      .world:hover .card {
        transform: rotateY(-180deg);
      }
    </style>
  </head>
  <body>
    <div class="world">
      <div class="card">
        <div class="card-side card-side-front">F</div>
        <div class="card-side card-side-back">B</div>
      </div>
    </div>
  </body>
</html>
```

### 크로스브라우징 이슈 해결

#### safari

+ -webkit-backface-visibility: hidden;

#### IE

+ transform-style: preserve-3d를 지원하지 않음

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie-edge" />
    <title>Interactive Web</title>
    <style>
      .world {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 80vw;
        height: 80vh;
        background: #fff000;
        perspective: 500px;
      }
      .card {
        position: relative;

        margin: 1em;
        transform: rotateY(0deg);
        transform-style: preserve-3d;
        transform-origin: left;
      }
      .card-side {
        display: flex;
        align-items: center;
        justify-content: center;
        position: absolute;
        left: 50%;
        top: 50%;
        width: 100px;
        height: 150px;
        margin: -75px 0 0 -50px;
        border-radius: 0.5em;
        font-size: 1.5em;
        -webkit-backface-visibility: hidden;
        backface-visibility: hidden;
        transition: 1s;
      }
      .card-side-front {
        z-index: 1;
        background: white;
      }
      .card-side-back {
        background: red;
        transform: rotateY(180deg);
      }
      .world:hover .card-side-front {
        transform: rotateY(180deg);
      }
      .world:hover .card-side-back {
        transform: rotateY(360deg);
      }
    </style>
  </head>
  <body>
    <div class="world">
      <div class="card-side card-side-front">F</div>
      <div class="card-side card-side-back">B</div>
    </div>
  </body>
</html>
```
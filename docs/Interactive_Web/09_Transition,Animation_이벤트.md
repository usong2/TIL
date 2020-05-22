# Transition/Animation 이벤트

## Transition 이벤트

+ **e.clientX**: 클릭한 지점의 x 값
+ **e.clientY**: 클릭한 지점의 y 값

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie-edge" />
    <title>Transition Event</title>
    <link rel="stylesheet" href="css/reset.css" />
    <style>
      .ball {
        position: absolute;
        left: 0;
        top: 0;
        width: 30px;
        height: 30px;
        border-radius: 50%;
        background: red;
        transition: 1s;
      }
    </style>
  </head>
  <body>
    <div class="ball"></div>

    <script>
      const ballElem = document.querySelector(".ball");

      window.addEventListener("click", function (e) {
        ballElem.style.transform = `translate(${e.clientX - 15}px, ${e.clientY - 15}px)`;
      });
    </script>
  </body>
</html>
```

<br>

+ **transitionend**: transition이 끝날 때 발생하는 이벤트

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie-edge" />
    <title>Transition Event</title>
    <link rel="stylesheet" href="css/reset.css" />
    <style>
      .ball {
        position: absolute;
        left: 0;
        top: 0;
        width: 30px;
        height: 30px;
        border-radius: 50%;
        background: red;
        transition: 1s;
      }
      .ball.end {
        background: dodgerblue;
      }
    </style>
  </head>
  <body>
    <div class="ball"></div>

    <script>
      const ballElem = document.querySelector(".ball");

      window.addEventListener("click", function (e) {
        ballElem.style.transform = `translate(${e.clientX - 15}px, ${
          e.clientY - 15
        }px)`;
      });

      ballElem.addEventListener("transitionend", function () {
        ballElem.classList.add("end");
      });
    </script>
  </body>
</html>
```

<br>

+ **elapsedTime**: transition이 재생되는데 걸리는 시간(transition-duration 값)
+ **propertyName**: 전환 이벤트 발생 시 전환과 관련된 CSS 속성의 이름 반환

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie-edge" />
    <title>Transition Event</title>
    <link rel="stylesheet" href="css/reset.css" />
    <style>
      .ball {
        position: absolute;
        left: 0;
        top: 0;
        width: 30px;
        height: 30px;
        border-radius: 50%;
        background: red;
        transition: 1s;
      }
      .ball.end {
        background: dodgerblue;
      }
    </style>
  </head>
  <body>
    <div class="ball"></div>

    <script>
      const ballElem = document.querySelector(".ball");

      window.addEventListener("click", function (e) {
        ballElem.style.transform = `translate(${e.clientX - 15}px, ${
          e.clientY - 15
        }px)`;
      });

      ballElem.addEventListener("transitionend", function (e) {
        ballElem.classList.add("end");
        console.log(e.elapsedTime);
        console.log(e.propertyName);
      });
    </script>
  </body>
</html>
```

<br>

+ **transitionstart**: transition이 시작할 때 발생하는 이벤트

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie-edge" />
    <title>Transition Event</title>
    <link rel="stylesheet" href="css/reset.css" />
    <style>
      .ball {
        position: absolute;
        left: 0;
        top: 0;
        width: 30px;
        height: 30px;
        border-radius: 50%;
        background: red;
        transition: 1s;
      }
      .ball.end {
        background: dodgerblue;
      }
    </style>
  </head>
  <body>
    <div class="ball"></div>

    <script>
      const ballElem = document.querySelector(".ball");

      window.addEventListener("click", function (e) {
        ballElem.style.transform = `translate(${e.clientX - 15}px, ${
          e.clientY - 15
        }px)`;
      });

      ballElem.addEventListener("transitionstart", function (e) {
        ballElem.classList.add("end");
        console.log(e.elapsedTime);
        console.log(e.propertyName);
      });
    </script>
  </body>
</html>
```

<br>

## Animation 이벤트

+ **animationend**: animation이 끝날 때 발생하는 이벤트
+ **animationstart**: animation이 시작될 때 발생하는 이벤트
+ **animationiteration**: animation이 반복되는 시점에 발생하는 이벤트

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie-edge" />
    <title>Transition Event</title>
    <link rel="stylesheet" href="css/reset.css" />
    <style>
      @keyframes ball-ani {
        from {
          transform: translateX(0, 0);
        }

        to {
          transform: translate(200px, 200px);
        }
      }
      .ball {
        position: absolute;
        left: 0;
        top: 0;
        width: 30px;
        height: 30px;
        border-radius: 50%;
        background: red;
        /* animation: ball-ani 1s 3 alternate forwards; */
      }
      .ball.end {
        border: 5px solid dodgerblue;
      }
    </style>
  </head>
  <body>
    <div class="ball"></div>

    <script>
      const ballElem = document.querySelector(".ball");

      ballElem.addEventListener("click", function () {
        ballElem.style.animation = "ball-ani 1s 3 alternate forwards";
      });

      ballElem.addEventListener("animationend", function () {
        ballElem.classList.add("end");
      });

      ballElem.addEventListener("animationiteration", function () {
        console.log("반복!");
      });
    </script>
  </body>
</html>
```


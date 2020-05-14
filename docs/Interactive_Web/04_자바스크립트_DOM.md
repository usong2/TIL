# 자바스크립트 DOM

## DOM Script

*DOM Script (Document Object Model)*

<br>

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie-edge" />
    <title>Interactive Web</title>
    <style>
    img {
        max-width: 100%;
        height: auto;
    }
    .characters {
        background: fff000;
    }
    .kakao_friend {
        width: 100px;
    }
    .characters .kakao_friend {
        display: inline-block;
    }
    </style>
  </head>
  <body>
    <div class="characters">
      <div class="kakao_friend a" ><img src="./images/01_muzi.png" alt="무지" /></div>
      <div class="kakao_friend b" ></div><img src="./images/02_neo.png" alt="네오" /></div>
      <div class="kakao_friend c" ></div><img src="./images/03_con.png" alt="콘" /></div>
    </div>
    <div class="kakao_friend d" ></div><img src="./images/04_lion.png" alt="콘" /></div>
    </body>
</html>
```

### querySelector

+ 콘솔창에서 실행

  ```javascript
  document.querySelector('.kakao_friend')
  // <div class="kakao_friend a" ><img src="./images/01_muzi.png" alt="무지" /></div>
  
  document.querySelectorAll('.kakao_friend')
  // NodeList(4) [div.kakao_friend.a, div.kakao_friend.b, div.kakao_friend.c, div.kakao_friend.d]
  
  const kakaoFriendGroup = document.querySelectorAll('.kakao_friend');
  kakaoFriendGroup
  // NodeList(4) [div.kakao_friend.a, div.kakao_friend.a, div.kakao_friend.c, div.kakao_friend.d]
  
  kakaoFriendGroup[2]
  // <div class="kakao_friend c"></div><img src="./images/03_con.png" alt="콘" /></div>
  
  document.querySelector('.kakao_friend:nth-child(2)')
  // div.kakao_friend.a
  ```

### 속성 값 관리

#### data

+ `data-`로 시작하는 표준 커스텀 속성

+ `data-index`, `data-id`, `data-role` 등 `data-`의 형식으로 시작하면 어떤 속성이든 필요에 따라 임의로 추가 가능

  ```javascript
  const char = document.querySelector('.kakao_friend')
  char.setAttribute('data-id', 123) // 속성 지정
  ```

  ```html
  <div class="characters" data-id="123"> <!-- 속성이 추가됨 -->
    <div class="kakao_friend a" ><img src="./images/01_muzi.png" alt="무지" /></div>
    <div class="kakao_friend b" ></div><img src="./images/02_neo.png" alt="네오" /></div>
    <div class="kakao_friend c" ></div><img src="./images/03_con.png" alt="콘" /></div>
  </div>
  ```

  ```javascript
  char.getAttribute('data-id') // 속성 얻기
  // "123"
  ```

### Element 관리

```javascript
const pElem = document.createElement('p')
pElem
// <p></p>

pElem.innerHTML = '<a href="#">안녕?</a>'
pElem
// <p><a href="#">안녕?</a></p>

const charactersElem = document.querySelector('.characters')
charatersElem.appendChild(pElem); // 맨 끝의 자식 element 생성
```

```html
<div class="characters" data-id="123"> <!-- 속성이 추가됨 -->
  <div class="kakao_friend a" ><img src="./images/01_muzi.png" alt="무지" /></div>
  <div class="kakao_friend b" ></div><img src="./images/02_neo.png" alt="네오" /></div>
  <div class="kakao_friend c" ></div><img src="./images/03_con.png" alt="콘" /></div>
  <p><a href="#">안녕?</a></p><!-- 생성 확인 -->
</div>
```

```javascript
characterElem.removeChild(document.querySelector('.b')) // 해당 자식 element 제거
```

```html
<div class="characters" data-id="123"> <!-- 속성이 추가됨 -->
  <div class="kakao_friend a" ><img src="./images/01_muzi.png" alt="무지" /></div>
  <div class="kakao_friend c" ></div><img src="./images/03_con.png" alt="콘" /></div>
  <p><a href="#">안녕?</a></p><!-- 생성 확인 -->
</div>
```

### class 관리

+ 해당 클래스 추가

  ```css
  .special {
      border: 10px dashed red;
  }
  ```

+ 클래스 붙이기

  ```javascript
  const kakao_friend = document.querySelectr('.kakao_friend');
  kakao_friend
  // div.kakao_friend.a
  
  kakao_friend.classList.add('special') // 해당 element에 클래스 추가
  
  kakao_friend.className = 'special' // 기존의 클래스를 제거하고 special 클래스 추가
  ```

+ 클래스 제거하기

  ```javascript
  const kakao_friend = document.querySelectr('.kakao_friend');
  
  kakao_friend.classList.remove('kakao_friend') // 해당 element에 kakao_friend 클래스 제거
  
  kakao_friend.classList.toggle('kakao_friend') // 클래스를 토글로 작동시켜 가지고 있으면 없애고 없으면 클래스를 붙여줌
  ```






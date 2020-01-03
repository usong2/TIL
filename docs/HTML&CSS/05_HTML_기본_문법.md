# HTML 기본 문법

## 기본 형태

태그는 각자의 의미를 가지고 있으며 다음과 같은 형태를 가집니다. 

```html
<TAG></TAG>
<TAG>CONTENT</TAG>
```

```html
<h1>토끼와 거북이</h1>
<p>옛날 옛적에 토끼와 거북이가 살았습니다 ...</p>

<!-- 다음과 같이 이해할 수 있습니다. -->
<주제1>토끼와 거북이</주제1>
<문단>옛날 옛적에 토끼와 거북이가 살았습니다 ...</문단>
```

또한 태그는 열리고(open) 닫히는(close) 태그 구조를 가지고 있으며 이는 한 쌍입니다. 
(시작하고(start) 종료되는(end) 구조라고 부르기도 합니다)
이 구조를 태그의 범위를 만들어 줍니다. 

```html
<h1>토끼와 거북이</h1>

<!-- 다음과 같이 이해할 수 있습니다. -->
<주제1여기서열림>토끼와 거북이</주제1여기서닫힘>
```

입문자가 주의할 점은 닫히는 태그는 태그 이름 앞에 /(슬래시)가 붙는다는 것입니다. 



## 속성(Attributes)과 값(Value)

태그(요소)의 기능을 확장하기 위해 '속성'을 사용할 수 있습니다. 

```html
<TAG 속성="값"></TAG>
```

```html
<img src="./my_photo.jpg" alt-"내 프로필 사진" />
<div class="name">홍길동</div>

<!-- 다음과 같이 이해할 수 있습니다. -->
<이미지삽입 소스위치="./my_photo.jpg" 대체텍스트="내 프로필 사진" />
<의미없는분할 태그별명="name">홍길동</의미없는분할>
```

`<img />`는 이미지를 삽입할 때 사용하는 태그입니다.
하지만 태그만 사용하면 어떤 이미지를 삽입하는지 알 수 없기 때문에 `src`(source)를 사용해서 삽입할 이미지의 경로를 지정합니다. 그리고 `alt`(alternative)라는 속성은 이미지를 출력하지 못하는 상황에 이미지 대신 보여질 텍스트를 지정합니다. 
`<div></div>`는 의미를 가지지 않는 태그로 어떤 내용이든 묶어낼(Wrap) 수 있습니다.
위에선 `'홍길동'`이라는 텍스트를 묶었으나 그 내용이 무엇을 의미하는지 알 수 없기 때문에 `name`이라는 태그 별명(`class`)을 추가했습니다. 

> `<img />`와 같이 닫히는 태그가 없으면 빈 태그(Empty Tag)라고 합니다. 



## 부모와 자식 요소

태그A가 태그B의 콘텐츠로 사용되면, 태그B는 태그A의 부모 요소, 태그A는 태그B의 자식 요소라고 합니다. 

```html
<PARENT>
    <CHILD></CHILD>
</PARENT>
```

```html
<section class="fruits">
	<h1>과일 목록</h1>
    <ul>
        <li>사과</li>
        <li>딸기</li>
        <li>바나나</li>
        <li>오렌지</li>
    </ul>
</section>

<!-- 다음과 같이 이해할 수 있습니다. -->
<섹션영역 태그별명="fruits">
	<주제1>과일 목록</주제1>
    <순서없는목록>
    	<항목>사과</항목>
    	<항목>딸기</항목>
    	<항목>바나나</항목>
    	<항목>오렌지</항목>
    </순서없는목록>
</섹션영역>
```



## 빈 태그

HTML에는 닫히는 개념이 없는 태그들이 있습니다. 
다음과 같은 형태를 가집니다. 

```html
<!-- `/`가 없는 빈 태그 -->
<TAG>
    
<!-- `/`가 있는 빈 태그 -->
<TAG/>
<TAG />
```

HTML5에서는 위 2가지 형태를 다 사용할 수 있는데, XHTML 버전이나 린트(Lint) 환경 혹은 프레임워크 세팅에 따라 /를 사용하는 것이 필수가 될 수 있습니다. 

> 어떤 형태를 써야 한다는 갑론을박이 있는데 이는 실제론 중요치 않습니다. 원하는 형태를 사용하되 혼용하지 마세요.



## HTML 문서의 범위

`index.html`같은 HTML 파일을 우리는 HTML 문서라고 표현할 수 있습니다. 
HTML 문서의 범위를 나타내는(의미하는) 태그들을 알아봅시다. 

```html
<!DOCTYPE html>
<html>
<head>
	문서의 정보
</head>
<body>
	문서의 구조
</body>
</html>
```

```html
<!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8">
	<meta name="author" content="홍길동">
	<meta name="description" content="우리 사이트가 최고!">
	<title>내 사이트</title>
	<link rel="stylesheet" href="./css/main.css">
	<script src="./js/main.js"></script>
</head>
<body>
    <section>
    	<h1></h1>
        <div>
        	<ul>
                <li></li>
                <li></li>
            </ul>    
        </div>
    </section>
</body>
</html>
```

### DOCTYPE(DTD, 버전 지정)

DOCTYPE(DTD, Document Type Definition)은 마크업 언어에서 문서 형식을 정의합니다. 
이는 웹 브라우저에 우리가 제공할 HTML 문서를 어떤 HTML 버전의 해석 방식으로 구조화하면 되는지 알려줍니다. (HTML은 크게 1, 2, 3, 4, X-, 5 버전이 있습니다.)

현재의 표준 모드는 HTML5 입니다. 

```html
<!-- HTML 5 -->
<!DOCTYPE html>

<!-- XHTML 1.0 Transitional -->
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
```

[더 많은 문서형 정보 보기](https://en.wikipedia.org/wiki/Document_type_declaration)

> Windows 운영체제가 95, 98, ME, XP, Vista, 7, 8, 10 버전이 있는 것과 비슷하다고 생각하시면 쉽습니다. 



## HTML 문서의 정보

`<head></head>`안에서 사용하는 태그들은 HTML 문서의 정보를 가지고 있습니다. 

### TITLE(웹 페이지의 제목)

HTML 문서의 제목을 정의합니다. 
웹 브라우저에서 각 사이트 탭에서 이름으로 표시됩니다. 

```html
<head>
    <title>네이버</title>
</head>
```

### META(웹 페이지의 정보)

HTML 문서(웹페이지)에 관한 정보(표시 방식, 제작자(소유자), 내용, 키워드 등)를 검색엔진이나 브라우저에 제공합니다. 빈(Empty) 태그입니다. 

```html
<head>
    <meta charset="UTF-8">
    <meta name="author" content="홍길동">
    <meta name="description" content="우리 사이트가 최고!">
</head>

<!-- 다음과 같이 이해할 수 있습니다. -->
<문서의정보범위>
	<정보 문자인코딩방식="UTF-8">
    <정보 정보종류="사이트제작자" 정보값="홍길동">
    <정보 정보종류="사이트설명" 정보값="우리 사이트가 최고!">
</문서의정보범위>
```

`<meta>`에서 사용할 수 있는 속성은 다음과 같습니다. 
각 태그는 자신이 사용할 수 있는 속성 값이 정해져 있습니다. 
어떤 속성을 사용할 수 있고, 사용할 수 없는지 구분할 수 있어야 합니다. 
잘 사용하지 않는 속성도 있기 때문에 당장 모든 속성과 값을 암기할 필요는 없습니다. 
('전역(Global) 속성'이라고 해서 어느 태그에서나 사용할 수 있는 속성들도 있습니다.)

| 속성    |                         의미                         |                   값                    |
| ------- | :--------------------------------------------------: | :-------------------------------------: |
| charset |                   문자인코딩 방식                    |           UTF-8, EUC-KR 등..            |
| name    | 검색엔진 등에 제공하기 위한 정보의 종류(메타 데이터) | author, description, keywords, viewport |
| content |        name 이나 http-equiv 속성의 값을 제공         |                                         |

### LINK(CSS 불러오기)

외부 문서를 연결할 때 사용합니다.
특히 HTML 외부에서 작성된 CSS 문서(xxx.css 파일)를 불러와 연결할 때 사용합니다. 
빈(Empty) 태그입니다. 

```html
<head>
    <link rel="stylesheet" href="./css/main.css">
    <link rel="icon" href="./favicon.png">
</head>

<!-- 다음과 같이 이해할 수 있습니다. -->
<문서의정보범위>
	<외부문서연결 관계="CSS" 문서경로="./css/main.css">
    <외부문서연결 관계="사이트대표아이콘" 문서경로="./favicon.png">
</문서의정보범위>
```

| 속성 |                    의미                     |         값          |
| ---- | :-----------------------------------------: | :-----------------: |
| rel  | (필수)현재 문서와 외부 문서와의 관계를 지정 | stylesheet, icon 등 |
| href |           외부 문서의 위치를 지정           |        경로         |

### STYLE(CSS 작성하기)

CSS를 외부 문서에서 작성하여 연결하는 것이 아니고 HTML 문서 내부에 작성할 때 사용합니다. 

```html
<style>
    img {
        width: 100px;
        height: 200px;
    }
    p {
        font-size: 20px;
        font-weight: bold;
    }
</style>

<!-- 다음과 같이 이해할 수 있습니다. -->
<스타일정의>
	<!-- CSS 코드 -->    
</스타일정의>
```

### SCRIPT(JS 불러오거나 작성하기)

HTML 문서에서 CSS는, 작성된 CSS를 `<link>`로 불러오거나 `<style></style>`안에 작성할 수 있습니다.
JS는 `<script></script>`로 이 2가지 방식을 모두 사용할 수 있습니다. 

```html
<!-- 불러오기 -->
<script src="./js/main.js"></script>

<!-- 작성하기 -->
<script>
	function windowOnClickHandler(event) {
        console.log(event);
    }
    window.addEventListner('click', windowOnClickHandler);
</script>

<!-- 다음과 같이 이해할 수 있습니다. -->

<!-- 불러오기 -->
<자바스크립트 문서경로="./js/main.js"></자바스크립트>

<!-- 작성하기 -->
<자바스크립트>
  <!-- JS 코드 -->
</자바스크립트>
```

## HTML 문서의 구조

`<body></body>` 안에서 사용하는 태그들은 HTML 문서의 구조를 나타냅니다. 

### DIV(막 쓰는 태그)

`<div></div>`의 'div'는 'division'으로 약자로 '분할'을 뜻하고 '문서의 부분이나 섹션을 정의'합니다. 
명확한 의미를 가지지 않기 때문에 정말 많은 경우 단순히 특정 범위를 묶는(wrap) 용도로 사용합니다. 
보통 이렇게 묶인 부분들에 CSS나 JS를 적용하게 됩니다. 

```html
<body>
  <div>
    <p></p>
  </div>
  <div>
    <div>
      <h1></h1>
      <p></p>
    </div>
  </div>
</body>

<!-- 다음과 같이 이해할 수 있습니다. -->
<body>
  <묶음1>
    <p></p>
  </묶음1>
  <묶음2>
    <묶음2-1>
      <h1></h1>
      <p></p>
    </묶음2-1>
  </묶음2>
</body>
```

> "DIV는 아무 의미가 없다. 왜냐하면 아무 의미가 없기 때문이다."

### IMG(이미지 넣는 태그)

`<img>`는 HTML에 이미지를 삽입할 때 사용합니다. 
(웹 페이지에 이미지를 삽입하는 방식은 크게 2가지로, 'HTML에서 삽입(IMG)'과 'CSS에서 삽입(background)'이 있습니다)

```html
<body>
    <img src="./kitty.png" alt="냥이">
</body>

<!-- 다음과 같이 이해할 수 있습니다. -->
<body>
    <이미지 경로="./kitty.png" 대체텍스트="냥이">
</body>
```

| 속성 | 의미                                         | 값   |
| ---- | -------------------------------------------- | ---- |
| src  | (필수)이미지의 URL                           | URL  |
| alt  | (필수)이미지의 대체 텍스트(alternate)를 지정 |      |

위 표에서 '(필수)'라고 되어 있는 속성들(`src`, `alt`)은 `<img>`를 사용할 때 반드시 포함되어야 할 속성(필수 속성, Required Attributes)입니다. 
만약 `<img src="./kitty.png">`라고 작성하여 `alt` 속성이 누락되었따면 이는 웹 표준에 어긋납니다. 



## 웹 표준 검사하기

우리가 작성한 HTML 문서가 표준에 부합하는지 테스트를 해볼 수 있습니다. 
[W3C validator](https://validator.w3.org/#validate_by_upload)에 접속하여 작성한 HTML 문서를 업로드하고 테스트를 시작하세요! 
기본적인 표준 여부를 판단할 수 있습니다. 

![결과값](https://heropy.blog/images/screenshot/html-css-starter/markup%20_validation_result_image_kytty.jpg)

위에서 `<img src="./kitty.png">`라고 작성했을 때 나오는 결과입니다. 
HTML 문서를 작성하면서 지켜야하는 이러한 규칙들이 많이 있습니다. 

> 테스트 통과과 웹 표준/웹 접근성의 준수 여부를 최종적으로 결정하진 않습니다. 이 테스트는 사실 기본 문법 검사에 가깝습니다. 

또는 사이트(페이지) 주소로 검사할 수도 있습니다. 
다음은 **naver.com**을 검사한 결과입니다. 

![naver.com 검사 결과](https://heropy.blog/images/screenshot/html-css-starter/markup%20_validation_result_naver_com.jpg)



## HTML 예제

다음 이미지는 [GitHub](https://github.com/) 메인 페이지의 일부입니다.(이 예제에 사용된 이미지는 예전 메인 페이지의 모습입니다)
이 페이지의 일부를 HTML로 코딩해 봅시다. 

> 완성된 페이지([https://heropcode.github.io/GitHub-Responsive/](https://heropcode.github.io/GitHub-Responsive/))를 공유합니다. GitHub 메인의 클론 페이지입니다. 

![GitHub 메인 페이지 클론](https://heropy.blog/images/screenshot/html-css-starter/guthub_clone_page.jpg)



+ Header 내용의 일부 구조 정리

  바탕화면 같은 익숙한 곳에서 `example1`이라는 이름의 프로젝트 디렉터리(폴더)를 생성합니다.(이름은 원하는 대로 자유롭게 지정)
  VS Code를 실행해 `파일/열기`를 선택해 생성한 디렉터리를 찾아 오픈합니다. 
  그 안에 `index.html`이라는 파일을 생성합니다.(`파일/새파일` > `저장` > 이름과 확장자 설정)
  다음 코드와 위 구조를 비교하며 코딩해 보세요. 

  ```html
  <!DOCTYPE html>
  <html lang="ko">
  <head>
      <meta charset="UTF-8">
      <title>GitHub</title>
  </head>
  <body>
      <div class="header">
          <div class="container">
              <div class="container-left">
                  <div class="logo">
                      <img src="https://heropcode.github.io/GitHub-Responsive/img/logo.svg" alt="GitHub Logo">
                  </div>
                  <div class="menu">
                      <div class="menu-item">Personal</div>
                      <div class="menu-item">Open Source</div>
                      <div class="menu-item">Business</div>
                      <div class="menu-item">Explore</div>
                  </div>
              </div>
          </div>
      </div>
  </body>
  </html>
  ```
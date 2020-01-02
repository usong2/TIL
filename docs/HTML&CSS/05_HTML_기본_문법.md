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


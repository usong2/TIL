# HTML-블록 요소와 인라인 요소

## 블록 요소

+ DIV, H1, P
+ 사용 가능한 최대 가로 너비를 사용
+ 크기를 지정할 수 있다. 
  (width: 100%; height: 0; 로 시작)
+ 수직으로 쌓임
+ margin, padding 위, 아래, 좌, 우 사용 가능
+ 레이아웃

## 인라인 요소

+ SPAN, IMG
+ 필요한 만큼의 너비를 사용한다.
+ 크기를 지정할 수 없다.
  (width: 0; height: 0; 로 시작)
+ 수평으로 쌓임
+ margin, padding 위, 아래 사용 불가
+ TEXT

```html
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <title>Document</title>
    <link rel="stylesheet" href="./main.css">
</head>
<body>
    <div>안녕하세요</div>
    <span>안녕하세요</span>
</body>
</html>
```

```css
body {
    margin: 0;
    padding: 0;
}
div {
    display: inline;
    background: red;
    width: 100%;;
    height: auto;
}
span {
    background: yellow;
    width: 200px;
    height: 500px;
    display: block;
}
```


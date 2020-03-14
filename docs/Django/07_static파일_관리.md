# Static 파일 관리

## Static 파일

+ community/static 폴더 생성
+ 부트스트랩 테마 : [https://bootswatch.com/](https://bootswatch.com/)
+ community/static 폴더에 다운로드 받은 bootstrap.min.css 파일을 이동 
+ community/user/templates/register.html 수정

```html
<!--<link
      rel="stylesheet"
      href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css"
      integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh"
      crossorigin="anonymous"
    />-->
<link rel="stylesheet" href="/static/bootstrap.min.css" />
```

+ community/community/settings.py 수정

```python
STATIC_URL = '/static/'
STATICFILES_DIRS = [
    os.path.join(BASE_DIR, 'static'),
]
```

+ 서버 실행 후 확인


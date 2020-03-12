# Template, View 만들기

## django Template, View 만들기(1)

+ community/user/templates에 register.html 생성

```html
<!doctype html>
<html lang="en">
    <head>
        <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
        
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
        <script src="https://code.jquery.com/jquery-3.4.1.slim.min.js" integrity="sha384-J6qa4849blE2+poT4WnyKhv5vZF5SrPo0iEjwBvKU7imGFAV0wwj1yYfoRSJoZ+n" crossorigin="anonymous"></script>
<script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js" integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" crossorigin="anonymous"></script>
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js" integrity="sha384-wfSDF2E50Y2D1uUdj0O3uMBJnjuUD4Ih7YwaYd1iqfktj0Uod8GCExl3Og8ifwB6" crossorigin="anonymous"></script>
    </head>
    <body>
        <div class="container">
            <div class="row mt-5">
                <div class="col-12 text-center">
                    <h1>회원가입</h1>
                </div>
            </div>
            <div class="row mt-5">
                <div class="col-12">
                    <form>
                      <div class="form-group">
                        <label for="exampleInputEmail1">Email address</label>
                        <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp">
                        <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
                      </div>
                      <div class="form-group">
                        <label for="exampleInputPassword1">Password</label>
                        <input type="password" class="form-control" id="exampleInputPassword1">
                      </div>
                      <div class="form-group form-check">
                        <input type="checkbox" class="form-check-input" id="exampleCheck1">
                        <label class="form-check-label" for="exampleCheck1">Check me out</label>
                      </div>
                      <button type="submit" class="btn btn-primary">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    </body>
</html>
```

+ community/user/views.py 수정

```python
from django.shortcuts import render

# Create your views here.

def register(request):
    return render(request, 'register.html')
```

+ community/community/urls.py 수정

```python
"""community URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('user/', include('user.urls'))
]
```

+ community/user/urls.py 생성

```python
from django.urls import path
from . import views

urlpatterns = [
    path('register/', views.register),
]
```

+ http://127.0.0.1:8000/user/register 확인

<br>

## django Template, View 만들기(2)

### 비밀번호 확인

+ community/user/templates/register.html 수정

```html
<!doctype html>
<html lang="en">
    <head>
        <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
        
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
        <script src="https://code.jquery.com/jquery-3.4.1.slim.min.js" integrity="sha384-J6qa4849blE2+poT4WnyKhv5vZF5SrPo0iEjwBvKU7imGFAV0wwj1yYfoRSJoZ+n" crossorigin="anonymous"></script>
<script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js" integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" crossorigin="anonymous"></script>
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js" integrity="sha384-wfSDF2E50Y2D1uUdj0O3uMBJnjuUD4Ih7YwaYd1iqfktj0Uod8GCExl3Og8ifwB6" crossorigin="anonymous"></script>
    </head>
    <body>
        <div class="container">
            <div class="row mt-5">
                <div class="col-12 text-center">
                    <h1>회원가입</h1>
                </div>
            </div>
            <div class="row mt-5">
                <div class="col-12">
                    <form method="POST" action=".">
                      {% csrf_token %}
                      <div class="form-group">
                        <label for="username">사용자 이름</label>
                        <input type="text" class="form-control" id="username" placeholder="사용자 이름" name="username">
                        <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
                      </div>
                      <div class="form-group">
                        <label for="password">비밀번호</label>
                        <input type="password" class="form-control" id="password" placeholder="비밀번호" name="password">
                      </div>
                        <div class="form-group">
                        <label for="re-password">비밀번호 확인</label>
                        <input type="password" class="form-control" id="re-password" placeholder="비밀번호 확인" name="re-password">
                      </div>
                      <button type="submit" class="btn btn-primary">등록</button>
                    </form>
                </div>
            </div>
        </div>
    </body>
</html>
```

+ community/user/views.py 수정

```python
from django.http import HttpResponse
from django.shortcuts import render
from .models import User

# Create your views here.

def register(request):
    if request.method == 'GET':
    	return render(request, 'register.html')
    elif request.method == 'POST':
        username = request.POST['username']
        password = request.POST['password']
        re_password = request.POST['re-password']
        
        res_data = {}
        if password != re_password:
            # return HttpResponse('비밀번호가 다릅니다!')
            res_data['error'] = '비밀번호가 다릅니다!'
        
        user = User(
        	username=username,
            password=password
        )
        
        user.save()
        
        return render(request, 'register.html', res_data)
```

+ community/user/templates/register.html에서 res_data를 전달하기 위해 수정

```html
...
        <div class="container">
            <div class="row mt-5">
                <div class="col-12 text-center">
                    <h1>회원가입</h1>
                </div>
            </div>
            <div class="row mt-5"> <!-- error 메세지 추가 -->
                <div class="col-12 text-center">
                    {{ error }}
                </div>
            </div>
            <div class="row mt-5">
                <div class="col-12">
                    <form method="POST" action=".">
                      {% csrf_token %}
                      <div class="form-group">
                        <label for="username">사용자 이름</label>
                        <input type="text" class="form-control" id="username" placeholder="사용자 이름" name="username">
                        <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
                      </div>
                      <div class="form-group">
                        <label for="password">비밀번호</label>
                        <input type="password" class="form-control" id="password" placeholder="비밀번호" name="password">
                      </div>
                        <div class="form-group">
                        <label for="re-password">비밀번호 확인</label>
                        <input type="password" class="form-control" id="re-password" placeholder="비밀번호 확인" name="re-password">
                      </div>
                      <button type="submit" class="btn btn-primary">등록</button>
                    </form>
                </div>
            </div>
```

<br>

### 비밀번호 암호화

+ community/user/views.py 수정

```python
from django.http import HttpResponse
from django.shortcuts import render
from django.contrib.auth.hashers import make_password
from .models import User

# Create your views here.

def register(request):
    if request.method == 'GET':
    	return render(request, 'register.html')
    elif request.method == 'POST':
        username = request.POST['username']
        password = request.POST['password']
        re_password = request.POST['re-password']
        
        res_data = {}
        if password != re_password:
            res_data['error'] = '비밀번호가 다릅니다!'
        
        user = User(
        	username=username,
            password=make_password(password)
        )
        
        user.save()
        
        return render(request, 'register.html', res_data)
```

<br>

### 비밀번호 미입력 예외처리

+ community/user/views.py 수정

```python
from django.http import HttpResponse
from django.shortcuts import render
from django.contrib.auth.hashers import make_password
from .models import User

# Create your views here.

def register(request):
    if request.method == 'GET':
    	return render(request, 'register.html')
    elif request.method == 'POST':
        username = request.POST.get('username', None)
        password = request.POST.get('password', None)
        re_password = request.POST.get('re-password', None)
        
        res_data = {}
        
        if not (username and password and re_password):
            res_data['error'] = '모든 값을 입력해야합니다.'
        elif password != re_password:
            res_data['error'] = '비밀번호가 다릅니다!'
        else:
            user = User(
                username=username,
                password=make_password(password)
            )

            user.save()
        
        return render(request, 'register.html', res_data)
```

<br>

### 이메일 필드 추가

+ community/user/models.py 수정

```python
from django.db import models
  
  # Create your models here.
  
  class User(models.Model):
      username = models.CharField(max_length=32, verbose_name='사용자명')
      useremail = models.EmailField(max_length=128, verbose_name='사용자이메일')
      password = models.CharField(max_length=64, verbose_name='비밀번호')
      registered_dttm = models.DateTimeField(auto_now_add=True, verbose_name='등록시간')
      
      def __str__(self):
            return self.username
        
      class Meta:
          db_table = 'usong_user'
          verbose_name = '유송커뮤니티 사용자'
          verbose_name_plural = '유송커뮤니티 사용자'
```

```bash
$ python manage.py makemigrations
  1) Provide a one-off default now
  >>> 'test@gmail.com'
$ python manage.py migrate
```

+ community/user/templates/register.html 수정

```html
...
        <div class="container">
            <div class="row mt-5">
                <div class="col-12 text-center">
                    <h1>회원가입</h1>
                </div>
            </div>
            <div class="row mt-5"> <!-- error 메세지 추가 -->
                <div class="col-12 text-center">
                    {{ error }}
                </div>
            </div>
            <div class="row mt-5">
                <div class="col-12">
                    <form method="POST" action=".">
                      {% csrf_token %}
                      <div class="form-group">
                        <label for="username">사용자 이름</label>
                        <input type="text" class="form-control" id="username" placeholder="사용자 이름" name="username">
                      </div>
                        <div class="form-group">
                        <label for="useremail">사용자 이메일</label>
                        <input type="email" class="form-control" id="useremail" placeholder="사용자 이름" name="useremail">
                      </div>
                      <div class="form-group">
                        <label for="password">비밀번호</label>
                        <input type="password" class="form-control" id="password" placeholder="비밀번호" name="password">
                      </div>
                        <div class="form-group">
                        <label for="re-password">비밀번호 확인</label>
                        <input type="password" class="form-control" id="re-password" placeholder="비밀번호 확인" name="re-password">
                      </div>
                      <button type="submit" class="btn btn-primary">등록</button>
                    </form>
                </div>
            </div>
```

+ community/user/views.py 수정

```python
from django.http import HttpResponse
from django.shortcuts import render
from django.contrib.auth.hashers import make_password
from .models import User

# Create your views here.

def register(request):
    if request.method == 'GET':
    	return render(request, 'register.html')
    elif request.method == 'POST':
        username = request.POST.get('username', None)
        useremail = request.POST.get('useremail', None)
        password = request.POST.get('password', None)
        re_password = request.POST.get('re-password', None)
        
        res_data = {}
        
        if not (username and useremail and password and re_password):
            res_data['error'] = '모든 값을 입력해야합니다.'
        elif password != re_password:
            res_data['error'] = '비밀번호가 다릅니다!'
        else:
            user = User(
                username=username,
                useremail=useremail,
                password=make_password(password)
            )

            user.save()
        
        return render(request, 'register.html', res_data)
```


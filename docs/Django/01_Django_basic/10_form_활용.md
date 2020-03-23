# form 활용

## Django form 활용

+ community/user/templates/login.html 수정

```html
{% extends "base.html" %} {% block contents %}
<div class="row mt-5">
  <div class="col-12 text-center">
    <h1>로그인</h1>
  </div>
</div>
<div class="row mt-5">
  <div class="col-12">
    {{ error }}
  </div>
</div>
<div class="row mt-5">
  <div class="col-12">
    <form method="POST" action=".">
      {% csrf_token %}
      <!-- {{ form }} -->
      <!-- {{ form.as_p }} -->
      <!-- {{ form.as_table }} -->
      {% for field in form %}
      <div class="form-group">
      	<label for="{{ field.id_for_label }}">{{ field.label }}</label>
        <input type="{{ field.field.widget.input_type }}" class="form-control" id="{{ field.id_for_label }}" placeholder="{{ field.label }}" name="{{ field.name }}" />
      </div>
      {% endfor %}
      <button type="submit" class="btn btn-primary">로그인</button>
    </form>
  </div>
</div>
{% endblock %}
```

+ community/user에 forms.py 생성

```python
from django import forms

class LoginForm(forms.Form):
    username = forms.CharField(max_length=32, label="사용자 이름")
    password = forms.CharField(widget="forms.PasswordInput" label="비밀번호")
```

+ community/user/views.py 수정

```python
from django.http import HttpResponse
from django.shortcuts import render, redirect
from django.contrib.auth.hashers import make_password, check_password
from .models import User
from .forms import LoginForm

# Create your views here.

def home(request):
    user_id = request.session.get('user')

    if user_id:
        user = User.objects.get(pk=user_id)
        return HttpResponse(user.username)

    return HttpResponse('Home!')

def logout(request):
    if request.session.get('user'):
        del(request.session['user'])

    return redirect('/')

def login(request):
    form = LoginForm()
	return render(request, 'login.html', {'form': form})

...
```

## form 검증

+ community/user/views.py 수정

```python
def login(request):
    if request.method == 'POST':
        form = LoginForm(request.POST)
        if form.is_valid():
            return redirect('/')
    else:
    	form = LoginForm()
	
    return render(request, 'login.html', {'form': form})
```

+ community/user/templates/login.html 수정

```html
{% extends "base.html" %} {% block contents %}
<div class="row mt-5">
  <div class="col-12 text-center">
    <h1>로그인</h1>
  </div>
</div>
<div class="row mt-5">
  <div class="col-12">
    {{ error }}
  </div>
</div>
<div class="row mt-5">
  <div class="col-12">
    <form method="POST" action=".">
      {% csrf_token %}
      <!-- {{ form }} -->
      <!-- {{ form.as_p }} -->
      <!-- {{ form.as_table }} -->
      {% for field in form %}
      <div class="form-group">
      	<label for="{{ field.id_for_label }}">{{ field.label }}</label>
        <input type="{{ field.field.widget.input_type }}" class="form-control" id="{{ field.id_for_label }}" placeholder="{{ field.label }}" name="{{ field.name }}" />
      </div>
      {% if field.errors %}
      <span style="color: red">{{ field.errors }}</span>
      {% endif %}
      {% endfor %}
      <button type="submit" class="btn btn-primary">로그인</button>
    </form>
  </div>
</div>
{% endblock %}
```

+ community/user/forms.py 수정

```python
from django import forms
from .models import User
from django.contrib.auth.hashers import check_password

class LoginForm(forms.Form):
    username = forms.CharField(
        error_messages={
            'require': '아이디를 입력해주세요.'
        },
        max_length=32, label="사용자 이름")
    password = forms.CharField(
        error_messages={
            'require': '비밀번호를 입력해주세요.'
        },
        widget="forms.PasswordInput" label="비밀번호")
    
    def clean(self):
        cleaned_data = super().clean()
        username = cleaned_data.get('username')
        password = cleaned_data.get('password')
        
        if username and password:
            user = User.objects.get(username=username)
            if not check_password(password, user.password):
                self.add_error('password', '비밀번호가 틀렸습니다.')
```

###  session 추가

+ community/user/forms.py 수정

```python
from django import forms
from .models import User
from django.contrib.auth.hashers import check_password

class LoginForm(forms.Form):
    username = forms.CharField(
        error_messages={
            'require': '아이디를 입력해주세요.'
        },
        max_length=32, label="사용자 이름")
    password = forms.CharField(
        error_messages={
            'require': '비밀번호를 입력해주세요.'
        },
        widget="forms.PasswordInput" label="비밀번호")
    
    def clean(self):
        cleaned_data = super().clean()
        username = cleaned_data.get('username')
        password = cleaned_data.get('password')
        
        if username and password:
            user = User.objects.get(username=username)
            if not check_password(password, user.password):
                self.add_error('password', '비밀번호가 틀렸습니다.')
            else:
                self.user_id = user.id
```

+ community/user/views.py 수정

```python
def login(request):
    if request.method == 'POST':
        form = LoginForm(request.POST)
        if form.is_valid():
            request.session['user'] = form.user_id
            return redirect('/')
    else:
    	form = LoginForm()
	
    return render(request, 'login.html', {'form': form})
```


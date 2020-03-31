# Decorator

## Decorator란?

+ 함수를 Wrapping
+ 기능의 재사용

```python
def test_func():
    print('Do something')
```

```python
# redirect 기능을 추가하고 싶다면
def test_func():
    if user is None:
        return redirect('/login')
    print('Do something')
    
def test_func2():
    if user is None:
        return redirect('/login')
    print('Do something2')
```

```python
# 위의 반복되는 기능을 함수로 만들어 호출 가능
def login_required(func):
    def wrap():
        if user is None:
            return redirect('/login')
    	return func()
	return wrap

@login_required
def test_func():
    print('Do something')

@login_required
def test_func():
    print('Do something2')
```


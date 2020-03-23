# Model 구성

## 사용자 Model

+ ys_django/user/models.py 수정

```python
from django.db import models

# Create your models here.

class User(models.Model):
    email = models.EmailField(verbose_name='이메일')
    password = models.CharField(max_length=64, verbose_name='비밀번호')
    register_date = models.DateTimeField(auto_now_add=True, verbose_name='등록날짜')

    class Meta:
        db_table = 'ys_user'
        verbose_name = '사용자'
        verbose_name_plural = '사용자'
```

+ ys_django/product/models.py 수정

```python
from django.db import models

# Create your models here.

class Product(models.Model):
    name = models.CharField(max_length=256, verbose_name='상품명')
    price = models.IntegerField(verbose_name='상품가격')
    description = models.TextField(verbose_name='상품설명')
    stock = models.IntegerField(verbose_name='재고')
    register_date = models.DateTimeField(auto_now_add=True, verbose_name='등록날짜')

    class Meta:
        db_table = 'ys_product'
        verbose_name = '상품'
        verbose_name_plural = '상품'
```

+ ys_django/order/models.py 수정

```python
from django.db import models

# Create your models here.

class Order(models.Model):
    user = models.ForeignKey('user.User', on_delete=models.CASCADE, verbose_name='사용자')
    product = models.ForeignKey('product.Product', on_delete=models.CASCADE, verbose_name='상품')
    quantity = models.IntegerField(verbose_name='수량')
    register_date = models.DateTimeField(auto_now_add=True, verbose_name='등록날짜')

    class Meta:
        db_table = 'ys_order'
        verbose_name = '주문'
        verbose_name_plural = '주문'
```

+ ys_django/ys_django/settings.py 수정

```python
# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'user',
    'product',
    'order',
]
```

+ 데이터베이스 테이블 생성

```bash
$ python manage.py makemigrations
$ python manage.py migrate
```


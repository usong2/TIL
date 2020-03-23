# Admin 구성

## 사용자 Admin

+ ys_django/user/admin.py 수정

```python
from django.contrib import admin
from .models import User

# Register your models here.

class UserAdmin(admin.ModelAdmin):
    list_display = ('email',)

admin.site.register(User, UserAdmin)
```

+ ys_django/product/admin.py 수정

```python
from django.contrib import admin
from .models import Product

# Register your models here.

class ProductAdmin(admin.ModelAdmin):
    list_display = ('name', 'price')

admin.site.register(Product, ProductAdmin)
```

+ ys_django/order/admin.py 수정

```python
from django.contrib import admin
from .models import Order

# Register your models here.

class OrderAdmin(admin.ModelAdmin):
    list_display = ('user', 'product')

admin.site.register(Order, OrderAdmin)
```

+ admin 계정 생성

```bash
$ python manage.py createsuperuser
```

+ admin 확인 [127.0.0.1:8000/admin](127.0.0.1:8000/admin)

```bash
$ python manage.py runserver
```

<br>

## 관리자 개선

+ ys_django/user/models.py 수정

```python
from django.db import models

# Create your models here.

class User(models.Model):
    email = models.EmailField(verbose_name='이메일')
    password = models.CharField(max_length=64, verbose_name='비밀번호')
    register_date = models.DateTimeField(auto_now_add=True, verbose_name='등록날짜')

    def __str__(self):
        return self.email

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

    def __str__(self):
        return self.name

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

    def __str__(self):
        return str(self.user) + ' ' + str(self.product)        

    class Meta:
        db_table = 'ys_order'
        verbose_name = '주문'
        verbose_name_plural = '주문'
```


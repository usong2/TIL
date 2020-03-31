# DRF 설치와 serializer 만들기

## DRF 설치

```bash
$ pip install djangorestframework
```

+ ys_django/ys_django/settings.py 수정

```python
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'django.contrib.humanize',
    'rest_framework',
    'user',
    'product',
    'order',
]
```

<br>

## serializer 만들기

+ ys_django/product에 serializers.py 생성

```python
from rest_framework import serializers
from .models import Product

class ProductSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Product
        fields = '__all__'
```

<br>

## DRF의 List view 만들기

+ ys_django/product/views.py 수정

```python
from django.shortcuts import render
from django.views.generic import ListView, DetailView
from django.views.generic.edit import FormView
from django.utils.decorators import method_decorator
from rest_framework import generics 
from rest_framework import mixins

from user.decorators import admin_required
from .models import Product
from .forms import RegisterForm
from .serializers import ProductSerializer
from order.forms import RegisterForm as OrderForm

# Create your views here.

class ProductListAPI(generics.GenericAPIView,mixins.ListModelMixin):
    serializer_class = ProductSerializer

    def get_queryset(self):
        return Product.objects.all().order_by('id')

    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)
    
...
```

+ ys_django/ys_django/urls.py 수정

```python
from django.contrib import admin
from django.urls import path
from user.views import index, logout, RegisterView, LoginView
from product.views import (
    ProductList, ProductCreate, ProductDetail, ProductListAPI
)
from order.views import OrderCreate, OrderList

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', index),
    path('logout/', logout),
    path('register/', RegisterView.as_view()),
    path('login/', LoginView.as_view()),
    path('product/', ProductList.as_view()),
    path('product/<int:pk>/', ProductDetail.as_view()),
    path('product/create/', ProductCreate.as_view()),
    path('order/', OrderList.as_view()),
    path('order/create/', OrderCreate.as_view()),

    path('api/product/', ProductListAPI.as_view())

]
```

```bash
# API 호출
$ curl http://127.0.0.1:8000/api/product
```

<br>

## DRF의 Detail view 만들기

+ ys_django/product/views.py 수정

```python
from django.shortcuts import render
from django.views.generic import ListView, DetailView
from django.views.generic.edit import FormView
from django.utils.decorators import method_decorator
from rest_framework import generics 
from rest_framework import mixins

from user.decorators import admin_required
from .models import Product
from .forms import RegisterForm
from .serializers import ProductSerializer
from order.forms import RegisterForm as OrderForm

# Create your views here.

class ProductListAPI(generics.GenericAPIView,mixins.ListModelMixin):
    serializer_class = ProductSerializer

    def get_queryset(self):
        return Product.objects.all().order_by('id')

    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)


class ProductDetailAPI(generics.GenericAPIView,mixins.RetrieveModelMixin):
    serializer_class = ProductSerializer

    def get_queryset(self):
        return Product.objects.all().order_by('id')

    def get(self, request, *args, **kwargs):
        return self.retrieve(request, *args, **kwargs)
    
...
```

+ ys_django/ys_django/urls.py 수정

```python
from django.contrib import admin
from django.urls import path
from user.views import index, logout, RegisterView, LoginView
from product.views import (
    ProductList, ProductCreate, ProductDetail, 
    ProductListAPI, ProductDetailAPI
)
from order.views import OrderCreate, OrderList

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', index),
    path('logout/', logout),
    path('register/', RegisterView.as_view()),
    path('login/', LoginView.as_view()),
    path('product/', ProductList.as_view()),
    path('product/<int:pk>/', ProductDetail.as_view()),
    path('product/create/', ProductCreate.as_view()),
    path('order/', OrderList.as_view()),
    path('order/create/', OrderCreate.as_view()),

    path('api/product/', ProductListAPI.as_view()),
    path('api/product/<int:pk>/', ProductDetailAPI.as_view())

]
```


# MTV

## Django의 기본적인 MVC 패턴

+ community/board 내에 templates 폴더 생성

+ community/board 내에 models.py에서 모델 생성

  ```python
  from django.db import models
  
  # Create your models here.
  
  class Board(models.Model); ## 예시
  	...__class__
  ```

+ community/board 내에 views.py에서 모델 생성

  ```python
  from django.shortcuts import render
  
  # Create your views here.
  
  def test(request): # 예시
      pass
  	pass
  	
      return
  ```

+ community/board/templates 내에 test.html 생성

  ```html
  <html>
      ...
  </html>
  ```

  


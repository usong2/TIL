# Expression Statement

## Expression

+ 값을 표현하는 간단한 코드를 **표현식**이라고 합니다. 

  ```javascript
  true 					// true
  26 						// 26
  1000+900+90+4			// 1994
  "Anna"					// "Anna"
  "Hello" + "JavaScript"	// "HelloJavaScript"
  ```

  <br>

+ 표현식은 값을 만들어내기 때문에 함수의 인자로 사용할 수 있습니다.

  ```javascript
  alert(1000 + 900 + 90 + 4); 	// 1994
  alert("Hello" + " JavaScript"); // "HelloJavaScript"
  ```

## Statement

+ 하나 혹은 여러 개의 표현식이 모여 **문장**을 이룹니다. 

+ 모든 표현식은 문장이 될 수 있습니다. 

+ (보통) 문장의 끝에는 세미 콜론을 붙입니다. 

  ```javascript
  true
  "Anna"
  var name = "Yousong";
  alert('Hello');
  ```

+ 한 줄에 문장이 하나인 경우에는 세미 콜론을 붙이지 않아도 문제가 없습니다. 

+ 하지만, 관례적으로 붙입니다. 

+ 한 줄에 여러 문장을 적을 경우, 세미 콜론으로 문장을 구분해야 합니다. 

+ 마지막 문장은 세미 콜론을 붙이지 않아도 문제가 없습니다. 

+ 마지막 문장의 결과가 반환됩니다. 

  ```javascript
  true; 26; 1000 + 900 + 90 + 4 // 1994
  ```

+ 조건문(if), 반복문(for)도 문장입니다. 

+ 이 경우 마지막 } 뒤에 세미콜론을 붙이지 않습니다. 

+ 문장들이 모여 만들고자 하는 프로그램이 됩니다. 


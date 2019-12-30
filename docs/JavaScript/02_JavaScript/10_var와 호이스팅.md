# var와 호이스팅

## var와 호이스팅(var & hoisting)

### Hoisting

+ 호이스팅(hoisting)은 ECMAScript 2015 언어 명세 및 그 이전 표준 명세에서 사용된 적이 없는 용어입니다. 호이스팅은 JavaScript에서 실행 콘텍스트(특히 생성 및 실행 단계)가 어떻게 동작하는가에 대한 일반적인 생각으로 여겨집니다. 하지만 호이스팅은 오해로 이어질 수 있습니다. 

  예를 들어, 호이스팅을 변수 및 함수 선언이 물리적으로 작성한 코드의 상단으로 옮겨지는 것으로 가르치지만, 실제로는 그렇지 않습니다. 변수 및 함수 선언은 컴파일 단계에서 메모리에 저장되지만, 코드에서 입력한 위치와 정확히 일치한 곳에 있습니다. 

  ```javascript
  // 함수 먼저
  function Hello1() {
      console.log('hello1');
  }
  
  hello1(); // 'hello1'
  
  // 함수의 호출을 먼저
  hello2(); // 'hello2'
  
  function hello2() {
      console.log('hello2');
  }
  ```

+ hoisting : 아래 있는 선언을(만) 끌어올리다

  ```javascript
  age = 6;
  age++;
  console.log(age); // 7
  
  var age;
  ```

  ```javascript
  console.log(name); // undefined
  
  name = 'Yousong';
  
  console.log(name); // Yousong
  
  var name;
  ```

  ```javascript
  // 코드 작성 
  
  console.log(name); // undefined
  
  name = 'Yousong';
  
  console.log(name); // Yousong
  
  var name = 'Ho';
  
  
  // 실제 코드
  
  var name;
  
  console.log(name); // undefined
  
  name = 'Yousong';
  
  console.log(name); // Yousong
  
  name = 'Ho';
  ```

  ```javascript
  console.log(name); // ReferenceError: name is not defined
  
  name = 'Yousong';
  
  console.log(name);
  
  let name; // 호이스팅 발생하지 않음
  ```

  

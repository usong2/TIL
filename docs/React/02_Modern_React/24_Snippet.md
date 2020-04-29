# Snippet

도구라기보다는 에디터마다 내장되어 있는 기능으로 한국어로는 "코드조각"이라고도 부름
Snippet의 용도는 자주 사용되는 코드에 대하여 단축어를 만들어 코드를 빠르게 생성해내는 것

아래와 같은 코드를 매번 작성하면 귀찮음

```jsx
import React from 'react';

function Sample() {
  return <div>Sample</div>;
}

export default Sample;
```

+ ./Sample.js 생성

  ```jsx
  import React from 'react';
  
  function ${TM_FILENAME_BASE}() {
    return <div>Hello React!</div>;
  }
  
  export default ${TM_FILENAME_BASE};
  ```

+ [https://snippet-generator.app/](https://snippet-generator.app/) 접속 후 위의 코드를 왼쪽 텍스트 박스에 붙여넣기

+ Description...에는 `Create Functional React Component` 등의 설명을 입력

+ Tab trigger...에는 `fc` 등의 단축어를 입력

+ 오른쪽의 코드를 복사

+ VSCode 오른쪽 하단의 `JavaScript`를 누르고 `JavaScript React`로 설정

+ 기본설정 -> 사용자 코드 조각 -> javascriptreact 선택 -> 복사한 코드 붙여넣기

+ 단축어 `fc` 입력으로 확인

<br>

## Snippet 생성 시 포커스 설정

+ ${1:MyComponent}로 해당 부분을 지정

  ```jsx
  {
  	"Create Functional React Component": {
  		"prefix": "fc",
  		"body": [
  			"import React from 'react';",
  			"",
  			"function ${TM_FILENAME_BASE}() {",
  			"  return <div>${1:MyComponent}</div>;",
  			"}",
  			"",
  			"export default ${TM_FILENAME_BASE};",
  			""
  		],
  		"description": "Create Functional React Component"
  	}
  }
  ```

+ 텍스트 지정을 원하지 않으면 ${1}

  ```json
  {
  	"Create Functional React Component": {
  		"prefix": "fc",
  		"body": [
  			"import React from 'react';",
  			"",
  			"function ${TM_FILENAME_BASE}() {",
  			"  return <div>${1}</div>;",
  			"}",
  			"",
  			"export default ${TM_FILENAME_BASE};",
  			""
  		],
  		"description": "Create Functional React Component"
  	}
  }
  ```

+ 컴포넌트 부분에도 지정을 원하는 경우 ${1:${TM_FILENAME_BASE}}

  ```jsx
  {
  	"Create Functional React Component": {
  		"prefix": "fc",
  		"body": [
  			"import React from 'react';",
  			"",
  			"function ${1:${TM_FILENAME_BASE}}() {",
  			"  return <div>${1}</div>;",
  			"}",
  			"",
  			"export default ${1:${TM_FILENAME_BASE}};",
  			""
  		],
  		"description": "Create Functional React Component"
  	}
  }
  ```

  


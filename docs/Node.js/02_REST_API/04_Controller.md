# Controller

**POST** /v1/user/login

<br>

## 컨트롤러 만들기

+ 루트폴더에 controllers 폴더 생성

+ ./controllers에 UserController.js 생성

  ```jsx
  // ./controllers/UserController.js
  
  const { Router } = require("express");
  
  const router = Router();
  
  router.post("/login", (req, res, next) => {
    console.log(req.body);
  });
  
  module.exports = router;
  ```

+ ./app.js 수정

  ```js
  // ./app.js
  
  const express = require('express');
  const UserController = require('./controllers/UserController');
  
  const app = express();
  
  app.use('/v1/users', UserController);
  app.get('/', (req, res) => {
    res.send('Hello');
  });
  
  module.exports = app;
  ```

+ 서버 실행

  ```bash
  $ npm run dev
  ```

+ 응답 처리 넣어주기 ./controllers/UserController.js 수정

  ```js
  const express = require("express");
  const bodyParser = require("body-parser");
  const UserController = require("./controllers/UserController");
  
  const app = express();
  
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  
  app.use("/v1/users", UserController);
  app.get("/", (req, res) => {
    res.send("Hello");
  });
  
  module.exports = app;
  ```

+ postman 로그인 후 POST 방식으로 http://localhost:3000/v1/users/login에 Body의 x-www-form-urlencoded

  + email, password에 값 넣어주기
  + Send

+ 실행 후 cmd 창에 postman에서 요청한 email과 password 값 확인 가능

+ ./controllers/UserController.js 수정

  ```jsx
  const { Router } = require('express');
  
  const router = Router();
  
  router.post('/login', async (req, res, next) => {
    console.log(req.body);
    const { email, password } = req.body;
  
    //   1. body 의 email 로 DB 의 User 테이블에서 검색하여 결과를 받아옵니다.
  
    //   2. DB 에서 받아온 User 의 password 와 body 의 password 를 비교합니다.
  
    //   3. 일치하면 Session 테이블에 추가하고 응답으로 token 을 내려줍니다.
  
    res.json({
      token: '',
    });
  });
  
  module.exports = router;
  ```

  
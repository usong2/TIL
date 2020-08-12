# ORM

*sequelize*

+ 개발자가 직접 SQL를 쓰지 않고도 데이터베이스와 연동해 작업 가능 

<br>

## 설치 및 설정

```bash
$ npm i sequelize
$ npm i mysql2
$ npm i sequelize-cli -D
$ npx sequelize # 명령어 확인
$ npx sequelize init
```

+ ./config/config.json 수정

  ```jsx
  // ./config/config.json
  
  {
    "development": {
      "username": "books_review",
      "password": "books_review",
      "database": "books_review",
      "host": "127.0.0.1",
      "dialect": "mysql"
    },
    "test": {
      "username": "books_review",
      "password": "books_review",
      "database": "books_review",
      "host": "127.0.0.1",
      "dialect": "mysql"
    },
    "production": {
      "username": "books_review",
      "password": "books_review",
      "database": "books_review",
      "host": "127.0.0.1",
      "dialect": "mysql"
    }
  }
  ```

<br>

## 모델

+ 모델 생성

  ```bash
  $ npx sequelize-cli model:generate --name User --attributes email:string,password:string,name:string
  ```

+ ./models.user.js과 migrations 파일 생성 확인

+ 모델이 mysql 서버에 생성되도록 명령어

  ```bash
  $ npx sequelize-cli db:migrate
  ```

+ 
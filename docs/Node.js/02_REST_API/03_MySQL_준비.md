# MySQL 준비

## 설치 및 설정

```bash
$ sudo docker run -d -p 3306:3306 -e MYSQL_ROOT_PASSWORD=1234 --name books_review mysql:5.6.40 # Windows의 경우 sudo만 제거

$ docker ps # 실행 확인

$ docker start books_review # 이미 생성한 컨테이너 재실행

$ docker exec -i -t books_review bash # 컨테이너 실행

$ mysql -u root -p # password 1234
```

```bash
mysql> CREATE DATABASE `books_review` CHARACTER SET utf8 COLLATE utf8_general_ci;

mysql> GRANT ALL ON `books_review`.* TO `books_review`@`localhost` IDENTIFIED BY 'books_review';

mysql> GRANT ALL ON `books_review`.* TO `books_review`@`%` IDENTIFIED BY 'books_review';

mysql> FLUSH PRIVILEGES;
```




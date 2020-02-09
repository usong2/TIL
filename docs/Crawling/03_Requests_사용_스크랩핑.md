# Requests 사용 스크랩핑

## Requests 요청 정보 Payload

+ 세션 활성화 및 비활성화
+ 쿠키 정보 전송
+ User-Agent 정보 전송
+ 수신 상태 코드 확인

```python
# Section04-1
# Requests
# requests 사용 스크랩핑(1) - Session

import requests

# 세션 활성화
# s = requests.Session()
# r = s.get('https://www.naver.com')

# 수신 데이터
# print(r.text)

# 수신 상태 코드
# print('Status Code : {}'.format(r.status_code))

# 확인
# print('OK? : {}'.format(r.ok))

# 세션 비활성화
# s.close()

s = requests.Session()

# 쿠키 Return
r1 = s.get('https://httpbin.org/cookies', cookies={'name': 'kim1'})
print(r1.text)

# 쿠키 Set
r2 = s.get('https://httpbin.org/cookies/set', cookies={'name': 'kim2'})
print(r2.text)

# User-Agent
url = 'https://httpbin.org'
headers = {'user-agent': 'nice-man_1.0.0_win10_ram16_home_chrome'}

# Header 정보 전송
r3 = s.get(url, headers=headers)
print(r3.text)

# 세션 비활성화
s.close()

# With문 사용(권장) -> 파일, DB, HTTP
with requests.Session() as s:
    r = s.get('https://daum.net')
    print(r.text)
    print(r.ok)
```

<br>

## Httpbin 사이트를 이용한 JSON 실습

+ 수신 데이터 처리 실습
+ 수신 데이터 -> JSON 변환 출력
+ Response 다양한 정보 출력

```python
# Section04-2
# Requests
# requests 사용 스크랩핑(2) - JSON

import json
import requests

s = requests.Session()

# 100개 JSON 데이터 요청
r = s.get('https://httpbin.org/stream/100', stream=True)

# 수신 확인
print(r.text)

# Encoding 확인
print('Before Encoding : {}'.format(r.encoding))

if r.encoding is None:
    r.encoding = 'UTF-8'

print('After Encoding : {}'.format(r.encoding))


for line in r.iter_lines(decode_unicode=True):
    # 라인 출력 후 타입 확인
    # print(line)
    # print(type(line))

    # JSON(Dict) 변환 후 타입 확인
    b = json.loads(line) # str -> dict
    print(b)
    print(type(b))

    # 정보 내용 출력
    for k, v in b.items():
        print("Key : {}, Value: {}".format(k, v))
    print()
    print()

s.close()

r = s.get('https://jsonplaceholder.typicode.com/todos/1')

# Header 정보
print(r.headers)

# 본문 정보
print(r.text)

# json 변환
print(r.json())

# key 반환
print(r.json().keys())

# 값 반환
print(r.json().values())

# 인코딩 반환
print(r.encoding)

# 바이너리 정보
print(r.content)

s.close()
```

<br>

## 개발자 도구 송수신 분석 및 실습

+ Rest API 란?
  - URL로 자원의 상태 정보를 받음
+ POST, PUT
+ DELETE
+ Requests 최종 정리

```python
# Section04-3
# Requests
# requests 사용 스크랩핑(3) - Rest API

# Rest API : GET, POST, DELETE, PUT:UPDATE, REPLACE(FETCH : UPDATE, MODIFY)
# 중요 : URL을 활용해서 자원의 상태 정보를 주고 받는 모든 것을 의미
# GET : www.movies.com/movies : 영화를 전부 조회
# GET : www.movies.com/movies/:id : 아이디인 영화를 조회
# POST : www.movies.com/movies/ : 영화를 생성
# PUT : www.movies.com/movies/ : 영화를 수정
# DELETE : www.movies.com/movies/ : 영화를 삭제

import requests

# 세션 활성화
s = requests.Session()

# 예제1
r = s.get('https://api.github.com/events')

# 수신상태 체크
r.raise_for_status()

# 출력
print(r.text)

########################
# 예제2

# 쿠키 설정
jar = requests.cookies.RequestsCookieJar()

# 쿠키 삽입
jar.set('name', 'usong', domain="httpbin.org", path='/cookies')

# 요청
r = s.get('http://httpbin.org/cookies', cookies=jar)

print(r.text)

########################
# 예제3
r = s.get('https://github.com', timeout=5)

# 출력
print(r.text)

########################
# 예제4
r = s.post('http://httpbin.org/post', data={'id': 'test77', 'pw': '111'}, cookies=jar)

# 출력
print(r.text)
print(r.headers)

########################
# 예제5
# 요청(POST)
payload1 = {'id': 'test77', 'pw': '111'}
payload2 = (('id', 'text7777'), ('pw', '1111111'))

r = s.post('http://httpbin.org/post', data=payload2)

# 출력
print(r.text)

########################
# 예제6(PUT)

r = s.put('http://httpbin.org/put', data=payload1)

# 출력
print(r.text)

########################
# 예제7(DELETE)
r = s.delete('http://httpbin.org/delete', data={'id' : 1})

# 출력
print(r.text)

# 예제7(DELETE)
r = s.delete('https://jsonplaceholder.typicode.com/posts/1')
print(r.ok)
print(r.text)
print(r.headers)

s.close()
```


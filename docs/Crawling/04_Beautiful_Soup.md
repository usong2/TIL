# Beautiful Soup

## Beautiful Soup 사용 스크랩핑

> Beautiful Soup 공식 문서 : [https://www.crummy.com/software/BeautifulSoup/bs4/doc/](https://www.crummy.com/software/BeautifulSoup/bs4/doc/)

<br>

### Beautiful Soup Selector

+ HTML 태그 선택자 이해
+ FIND, FIND_ALL
+ SELECT, SELECT_ONE
+ 다양한 DOM 접근 방법

```bash
$ pip install beautifulsoup4
$ pip list
```

```python
# Section05-1
# BeautifulSoup
# BeautifulSoup 사용 스크랩핑(1) - 기본 사용법

from bs4 import BeautifulSoup

html = """
<html>
    <head>
        <title>The Dormouse's story</title>
    </head>
    <body>
        <h1>This is h1 area</h1>
        <h2>This is h2 area</h2>
        <p class="title"><b>The Dormouse's story</b></p>
        <p class="story">Once upon a time there were three little sistes.
            <a href="http://example.com/elisie" class="sister" id="link1">Elsie</a>
            <a href="http://example.com/lacie" class="sister" id="link2">Lacie</a>
            <a data-test="test" data-io="link3" href="http://example.com/little" class="sister" id="link3">Title</a>
        </p>
        <p class="story">
            story...
        </p>
    </body>
</html>
"""

# 예제1(Beautiful Soup 기초)
# bs4 초기화
soup = BeautifulSoup(html, 'html.parser')

# 타입 확인
print('soup', type(soup))
print('prettify', soup.prettify())

# h1 태그 접근
h1 = soup.html.body.h1
print('h1', h1)

# p 태그 접근
p1 = soup.html.p
print('p1', p1)

# 다음 태그
p2 = p1.next_sibling.next_sibling
print('p2', p2)

# 텍스트 출력1
print('h1 >> ', h1.string)

# 텍스트 출력2
print('p1 >> ', p1.string)

# 함수 확인
print(dir(p2))

# 다음 엘리먼트 확인
print(list(p2.next_element))

# 반복 출력 확인
for v in p2.next_element:
    pass
    # print(v)

# 예제2(Find, Find_all)
# bs4 초기화

soup = BeautifulSoup(html, 'html.parser')

# a 태그 모두 선택
link1 = soup.find_all('a') # limit=2 옵션
# 타입 확인
# print(type(link1))

# 리스트 요소 확인
print('links', link1)

# 중요
link2 = soup.find_all("a", class_='sister') # id="link2", string=" Title", string=["Elsie"]
print('link2', link2)

for t in link2:
    print(t)

# 처음 발견한 a 태그 선택
link3 = soup.find("a")

print()
print(link3)
print(link3.string)
print(link3.text)

# 다중 조건(중요)
link4 = soup.find("a", {"class": "sister", "data-io": "link3"})

print()
print(link4)
print(link4.text)
print(link4.string)

# CSS 선택자 : select, select_one
# 태그로 접근 : find, find_all
# 예제3(select, select_one)
# 태그 + 클래스 + 자식선택자

link5 = soup.select_one('p.title > b')
print()
print(link5)
print(link5.text)
print(link5.string)

link6 = soup.select_one("a#link1")
print()
print(link6)
print(link6.text)
print(link6.string)

link7 = soup.select_one("a[data-test='test']")
print()
print(link7)
print(link7.text)
print(link7.string) #. : 클래스. # : id

# 선택자에 맞는 전체 선택
link8 = soup.select('p.story > a')
print()
print(link8)
# print(link8.string)

link9 = soup.select('p.story > a:nth-of-type(2)')
print()
print(link9)

link10 = soup.select("p.story")
print()
print(link10)

for t in link10:
    temp = t.find_all("a")

    if temp:
        for v in temp:
            print('>>>>>', v) 
            print('>>>>>', v.string) 
    else:
        print('-----', t)  
        print('-----', t.string)  
```

<br>

### Beautiful Soup 이미지 다운로드

+ Naver 이미지 검색 송수신 분석
+ Select, Find_all
+ 이미지 변환 및 저장
+ 예외 처리

```python
# Section05-2
# BeautifulSoup
# BeautifulSoup 사용 스크랩핑(2) - 이미지 다운로드

import os 
import urllib.parse as rep
import urllib.request as req
from fake_useragent import UserAgent
from bs4 import BeautifulSoup

# Header 정보 초기화
opener = req.build_opener()
# User-Agent 정보
opener.addheaders = [('User-agent', UserAgent().ie)]
# Header 정보 삽입
req.install_opener(opener)

# 네이버 이미지 기본 URL(크롬 개발자 도구)
base = 'https://search.naver.com/search.naver?where=image&sm=tab_jum&query='
# 검색어
quote = rep.quote_plus('고양이')
# URL 완성
url = base + quote

# 요청 URL 확인
print('Request URL : {}'.format(url))

# Request
res = req.urlopen(url)

# 이미지 저장 경로
savePath = "C:/imagedown/" # C:\\imagedown\\

# 폴더 생성 예외 처리(문제 발생 시 프로그램 종료)
try:
    # 기본 폴더가 있는지 체크
    if not (os.path.isdir(savePath)):
        # 없으면 폴더 생성
        os.makedirs(os.path.join(savePath))
except OSError as e:
    # 에러 내용
    print("forder creation failed.")
    print("folder name : {}".format(e.filename))

    # 런타임 에러
    raise RuntimeError("System Exit!")
else:
    # 폴더가 생성이 되었거나, 존재할 경우
    print("folder is created!")


# bs4 초기화
soup = BeautifulSoup(res, "html.parser")

# print (soup.prettify())

# select 사용
img_list = soup.select('div.img_area > a.thumb._thumb > img')

# find_all 사용 할 경우
# img_list2 = soup.find_all("a", class_="thumb _thumb")

# for v in img_list2:
#     img_t = v.find('img')
#     print(img_t.attrs['data-source'])

# print(img_list)

for i, img in enumerate(img_list, 1):
    print()
    print()
    # 속성 확인
    # print(img['data-source'], i)

    # 저장 파일명 및 경로
    fullFileName = os.path.join(savePath, savePath + str(i) + '.png')

    # 파일명
    # print(fullFileName)

    # 다운로드 요청(URL, 다운로드 경로)
    req.urlretrieve(img['data-source'], fullFileName)

# 다운로드 완료 시 출력
print("download succeeded!")
```

<br>

### Session 사용 

+ 대상 사이트 로그인 과정 분석
+ 로그인 후 페이지 이동
+ 필요 데이터 추출

```python
# Section05-3
# BeautifulSoup
# BeautifulSoup 사용 스크랩핑(3) = 로그인 처리

import requests as req
from fake_useragent import UserAgent
from bs4 import BeautifulSoup

# Login 정보(개발자 도구)
login_info = {
    'redirectUrl': 'http://www.danawa.com/',
    'loginMemberType': 'general',
    'id': 'dbthd6',
    'password': 'apfhdz*18'
}

# Headers 정보
headers = {
    "User-Agent": UserAgent().chrome,
    "Referer": "https://auth.danawa.com/login?url=http%3A%2F%2Fwww.danawa.com%2Fmember%2FmyPage.php"
}

with req.session() as s:
    # Request(로그인 시도)
    res = s.post("https://auth.danawa.com/login", login_info, headers=headers)

    # 로그인 시도 실패 시 예외
    if res.status_code != 200:
        raise Exception("Login failed!")

    # 본문 수신 데이터 확인
    # print(res.content.decode('UTF-8'))

    # 로그인 성공 후 세션 정보를 가지고 페이지 이동
    res = s.get('https://buyer.danawa.com/order/Order/orderList', headers=headers)

    # Euc-kr(한글 깨질 경우)
    # res.encoding = 'euc-kr'

    # 페이지 이동 후 수신 데이터 확인
    # print(res.text)

    # bs4 초기화
    soup = BeautifulSoup(res.text, 'html.parser')

    # 로그인 성공 체크
    check_name = soup.find('p', class_='user')
    # print(check_name)

    if check_name is None:
        raise Exception('Login failed. Wrong Password')


    # 선택자 사용
    info_list = soup.select("div.my_info > div.sub_info > ul.info_list > li")

    # 확인
    print(info_list)

    # 이 부분에서 재요청, 파일다운로드, DB 저장, 파일 쓰기(엑셀)

    # 제목
    print()
    print("***** My Info *****")

    for v in info_list:
        # 속성 메소드 확인
        # pirnt(dir(v))

        # 필요한 텍스트 추출
        proc, val = v.find('span').string.strip(), v.find('strong').string.strip()
        print('{} : {}'.format(proc, val))
```


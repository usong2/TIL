# Selenium

```bash
# selenium 설치
$ pip install selenium
$ pip list
```

## Selenium 설명 및 기본 설정

+ Driver 설치
+ 웹 자동화의 이해
+ Selenium 기초 학습
+ 다음 사이트 기반 학습

```python
# Section06-1
# Selenium
# Selenium 사용 실습(1) - 설정 및 기본 테스트
# https://sites.google.com/a/chromium.org/chromedriver/downloads

# selenium 임포트
from selenium import webdriver

# webdriver 설정(Chrome, Firefox 등)
browser = webdriver.Chrome('./webdriver/chrome/chromedriver.exe')

# 크롬 브라우저 내부 대기
browser.implicitly_wait(5)

# 속성 확인
print(dir(browser))

# 브라우저 사이즈
browser.set_window_size(1920, 1280) # maximize_window(), minimize_window()

# 페이지 이동
browser.get('https://www.daum.net/')

# 페이지 내용
print('Page Contents: {}'.format(browser.page_source))

print()

# 세션 값 출력
print('Selenium ID : {}'.format(browser.session_id))

# 타이틀 출력
print('Title : {}'.format(browser.title))

# 현재 URL 출력
print('URL : {}'.format(browser.current_url))

# 현재 쿠키 정보 출력
print('Cookies : {}'.format(browser.get_cookies()))

# 검색창 input 선택
element = browser.find_element_by_css_selector('div.inner_search > input.tf_keyword')

# 검색어 입력
element.send_keys('라쿤')

# 검색(Form Submit)
element.submit()

# 스크린샷 저장1
browser.save_screenshot("C:/website_ch1.jpg")

# 스크린샷 저장2
browser.get_screenshot_as_file("C:/website_ch2.jpg")

# 브라우저 종료
browser.quit()
```

<br>

## 데이터 수집 프로젝트 작성-1

+ 대상 사이트 선정 및 분석
+ Explicitly wait
+ Implicitly wait
+ 필요 정보 추출

```python
# Section06-2
# Selenium
# Selenium 사용 실습(2) - 실습 프로젝트(1)

# selenium 임포트
from selenium import webdriver
import time 
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.chrome.options import Options
from bs4 import BeautifulSoup

chrome_options = Options()
chrome_options.add_argument("--headless")

# webdriver 설정(Chrome, Firefox 등) - Headless 모드
# browser = webdriver.Chrome('./webdriver/chrome/chromedriver.exe', options=chrome_options)

# webdriver 설정(Chrome, Firefox 등) - 일반 모드
browser = webdriver.Chrome('./webdriver/chrome/chromedriver.exe')

# 크롬 브라우저 내부 대기
browser.implicitly_wait(5)

# 브라우저 사이즈
browser.set_window_size(1920, 1280) # maximize_window(), minimize_window()

# 페이지 이동
browser.get('http://prod.danawa.com/list/?cate=112758')

# 1차 페이지 내용
# print('Before Page Contents : {}'.format(browser.page_source))

# 제조사별 더 보기 클릭1
# Explicitly wait
WebDriverWait(browser, 5).until(EC.presence_of_element_located((By.XPATH, '//*[@id="dlMaker_simple"]/dd/div[2]/button[1]'))).click()

# 제조사별 더 보기 클릭2
# Implicitly wait
# time.sleep(2)
# browser.find_element_by_xpath('//*[@id="dlMaker_simple"]/dd/div[2]/button[1]').click()

# 원하는 모델 카테고리 클릭
WebDriverWait(browser, 2).until(EC.presence_of_element_located((By.XPATH, '//*[@id="selectMaker_simple_priceCompare_A"]/li[12]/label'))).click()

# 2차 페이지 내용
# print('After Page Contents : {}'.format(browser.page_source))

time.sleep(2)

# bs4 초기화
soup = BeautifulSoup(browser.page_source, 'html.parser')

# 소스코드 정리
# print(soup.prettify())

pro_list = soup.select('div.main_prodlist.main_prodlist_list > ul > li')

# 상품 리스트 확인
# print(pro_list)


# 필요 정보 추출
for v in pro_list:
    # 임시출력
    # print(v)

    if not v.find('div', class_="ad_header"):
        
        # 상품명, 이미지, 가격
        print(v.select('p.prod_name > a')[0].text.strip())
        print(v.select('a.thumb_link > img')[0]['src'])
        print(v.select('p.price_sect > a')[0].text.strip())

    print()

# 브라우저 종료
browser.close()
```

<br>

## 데이터 수집 프로젝트 작성-2

+ 페이지 전환 추가
+ Selenium 성능 개선
+ 전체 프로세스 확인

```python
# Section06-2
# Selenium
# Selenium 사용 실습(3) - 실습 프로젝트(2)

# selenium 임포트
from selenium import webdriver
import time 
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.chrome.options import Options
from bs4 import BeautifulSoup

chrome_options = Options()
chrome_options.add_argument("--headless")

# webdriver 설정(Chrome, Firefox 등) - Headless 모드
# browser = webdriver.Chrome('./webdriver/chrome/chromedriver.exe', options=chrome_options)

# webdriver 설정(Chrome, Firefox 등) - 일반 모드
browser = webdriver.Chrome('./webdriver/chrome/chromedriver.exe')

# 크롬 브라우저 내부 대기
browser.implicitly_wait(5)

# 브라우저 사이즈
browser.set_window_size(1920, 1280) # maximize_window(), minimize_window()

# 페이지 이동
browser.get('http://prod.danawa.com/list/?cate=112758')

# 1차 페이지 내용
# print('Before Page Contents : {}'.format(browser.page_source))

# 제조사별 더 보기 클릭1
# Explicitly wait
WebDriverWait(browser, 5).until(EC.presence_of_element_located((By.XPATH, '//*[@id="dlMaker_simple"]/dd/div[2]/button[1]'))).click()

# 제조사별 더 보기 클릭2
# Implicitly wait
# time.sleep(2)
# browser.find_element_by_xpath('//*[@id="dlMaker_simple"]/dd/div[2]/button[1]').click()

# 원하는 모델 카테고리 클릭
WebDriverWait(browser, 2).until(EC.presence_of_element_located((By.XPATH, '//*[@id="selectMaker_simple_priceCompare_A"]/li[13]/label'))).click()

# 2차 페이지 내용
# print('After Page Contents : {}'.format(browser.page_source))

# 2초간 대기
time.sleep(2)

# 현재 페이지
cur_page = 1

# 크롤링 페이지 수
target_crawl_num = 5

while cur_page <= target_crawl_num:

    # bs4 초기화
    soup = BeautifulSoup(browser.page_source, 'html.parser')

    # 소스코드 정리
    # print(soup.prettify())

    pro_list = soup.select('div.main_prodlist.main_prodlist_list > ul > li')

    # 상품 리스트 확인
    # print(pro_list)

    # 페이지 번호 출력
    print('****** Current Page : {}'.format(cur_page), '******')
    print()

    # 필요 정보 추출
    for v in pro_list:
        # 임시출력
        # print(v)

        if not v.find('div', class_="ad_header"):
            
            # 상품명, 이미지, 가격
            print(v.select('p.prod_name > a')[0].text.strip())
            print(v.select('a.thumb_link > img')[0]['src'])
            print(v.select('p.price_sect > a')[0].text.strip())

            # 이 부분에서 엑셀 저장(파일, DB 등)
            # CODE
            # CODE 

        print()
    print()

    # 페이지 별 스크린 샷 저장
    browser.save_screenshot('C:/target_page{}.png'.format(cur_page))

    # 페이지 증가
    cur_page += 1

    if cur_page > target_crawl_num:
        print('Crawling Succeed.')
        break

    # 페이지 이동 클릭
    WebDriverWait(browser, 3).until(EC.presence_of_element_located((By.CSS_SELECTOR, 'div.number_wrap > a:nth-child({})'.format(cur_page)))).click()
    
    # BeautifulShop 인스턴스 삭제
    del soup

    # 3초간 대기
    time.sleep(3)

    
# 브라우저 종료
browser.close()
```

<br>

## 데이터 수집 프로젝트 작성-3

+ 이미지 수집
+ 엑셀 데이터 작성
+ 전체 프로젝트 소스코드 리뷰
+ 기능 개선 및 공부 내용 추천

```bash
$ pip install xlsxwriter
```

```python
# Section06-2
# Selenium
# Selenium 사용 실습(4) - 실습 프로젝트(3)

# selenium 임포트
from selenium import webdriver
import time 
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.chrome.options import Options
from bs4 import BeautifulSoup

# 엑셀 처리 임포트
import xlsxwriter
# 이미지 바이트 처리
from io import BytesIO
import urllib.request as req

chrome_options = Options()
chrome_options.add_argument("--headless")

# 엑셀 처리 선언
workbook = xlsxwriter.Workbook("C:/crawling_result.xlsx")

# 워크 시트
worksheet = workbook.add_worksheet()

# webdriver 설정(Chrome, Firefox 등) - Headless 모드
browser = webdriver.Chrome('./webdriver/chrome/chromedriver.exe', options=chrome_options)

# webdriver 설정(Chrome, Firefox 등) - 일반 모드
# browser = webdriver.Chrome('./webdriver/chrome/chromedriver.exe')

# 크롬 브라우저 내부 대기
browser.implicitly_wait(5)

# 브라우저 사이즈
browser.set_window_size(1920, 1280) # maximize_window(), minimize_window()

# 페이지 이동
browser.get('http://prod.danawa.com/list/?cate=112758')

# 1차 페이지 내용
# print('Before Page Contents : {}'.format(browser.page_source))

# 제조사별 더 보기 클릭1
# Explicitly wait
WebDriverWait(browser, 5).until(EC.presence_of_element_located((By.XPATH, '//*[@id="dlMaker_simple"]/dd/div[2]/button[1]'))).click()

# 제조사별 더 보기 클릭2
# Implicitly wait
# time.sleep(2)
# browser.find_element_by_xpath('//*[@id="dlMaker_simple"]/dd/div[2]/button[1]').click()

# 원하는 모델 카테고리 클릭
WebDriverWait(browser, 2).until(EC.presence_of_element_located((By.XPATH, '//*[@id="selectMaker_simple_priceCompare_A"]/li[13]/label'))).click()

# 2차 페이지 내용
# print('After Page Contents : {}'.format(browser.page_source))

# 2초간 대기
time.sleep(2)

# 현재 페이지
cur_page = 1

# 크롤링 페이지 수
target_crawl_num = 5

# 엑셀 행 수
ins_cnt = 1

while cur_page <= target_crawl_num:

    # bs4 초기화
    soup = BeautifulSoup(browser.page_source, 'html.parser')

    # 소스코드 정리
    # print(soup.prettify())

    pro_list = soup.select('div.main_prodlist.main_prodlist_list > ul > li')

    # 상품 리스트 확인
    # print(pro_list)

    # 페이지 번호 출력
    print('****** Current Page : {}'.format(cur_page), '******')
    print()

    # 필요 정보 추출
    for v in pro_list:
        # 임시출력
        # print(v)

        if not v.find('div', class_="ad_header"):
            
            # 상품명, 이미지, 가격
            prod_name = v.select('p.prod_name > a')[0].text.strip()
            prod_price = v.select('p.price_sect > a')[0].text.strip()

            # 이미지 요청 후 바이트 변환
            # img_data = BytesIO(req.urlopen(v.select('a.thumb_link > img')[0]['data-original']).read())

            # 엑셀 저장(텍스트)
            worksheet.write('A%s'% ins_cnt, prod_name)
            worksheet.write('B%s'% ins_cnt, prod_price)

            # 엑셀 저장(이미지)
            # worksheet.insert_image('C%s'% ins_cnt, prod_name, {'image_data': img_data})

            # print(v.select('p.prod_name > a')[0].text.strip())
            # print(v.select('a.thumb_link > img')[0]['src'])
            # print(v.select('p.price_sect > a')[0].text.strip())

            ins_cnt += 1

        print()
    print()

    # 페이지 별 스크린 샷 저장
    browser.save_screenshot('C:/target_page{}.png'.format(cur_page))

    # 페이지 증가
    cur_page += 1

    if cur_page > target_crawl_num:
        print('Crawling Succeed.')
        break

    # 페이지 이동 클릭
    WebDriverWait(browser, 3).until(EC.presence_of_element_located((By.CSS_SELECTOR, 'div.number_wrap > a:nth-child({})'.format(cur_page)))).click()
    
    # BeautifulShop 인스턴스 삭제
    del soup

    # 3초간 대기
    time.sleep(3)

# 브라우저 종료
browser.close()

# 엑셀 파일 닫기
workbook.close()
```


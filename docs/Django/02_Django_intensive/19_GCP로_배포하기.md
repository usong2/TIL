# GCP로 배포하기

## 프로젝트 생성

+ 구글 로그인 후 [https://console.cloud.google.com/](https://console.cloud.google.com/) 접속
+ 시작하기 -> 크레딧 활성화 -> 서비스 약관 동의
+ 컴퓨팅 -> Compute Engine -> VM 인스턴스 -> 만들기 
  + 이름: ys-django
  + 리전: asia-northeast1(도쿄)
  + 머신 유형: f1-micro
  + 부팅 디스크: CentOS 7
    + 용량: 20GB
  + 방화벽: HTTP 트래픽 허용, HTTPS 트래픽 허용 체크
  + 만들기

<br>

## 서버 구성

+ VM인스턴스 -> SSH 버튼 클릭 

  ```bash
  $ sudo yum -y install epel-release
  $ sudo yum -y install https://centos7.iuscommunity.org/ius-release.rpm
  $ sudo yum list "*python36*"
  $ sudo yum -y install python36u python36u-devel python36u-pip
  $ python3.6
  $ exit()
  $ pip3.6
  $ sudo python3.6 -m pip install virtualenv
  $ sudo python3.6 -m pip install -U pip
  ```

+ 작업 폴더 압축 -> SSH 창 상단의 톱니바퀴 클릭 -> 파일 업로드 -> 압축폴더 선택

  ```bash
  $ ls # 확인
  $ sudo yum -y install unzip
  $ unzip ys_django.zip
  $ ls
  $ rm -rf __MACOSX # 맥 운영체제 사용시 자동생성 폴더 삭제
  ```

  
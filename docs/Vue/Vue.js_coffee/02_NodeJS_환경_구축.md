# 02. NodeJS 환경 구축하기

비단 Vue뿐 아니라 Angular, React와 같은 모던 자바스크립트 프레임워크는 대부분 NodeJS를 사용하여 코드를 빌드한다. 그렇기 때문에 NodeJS 환경 구축은 불가피하다. 물론 CDN을 사용하여 프레임워크의 코어 스크립트만 로드하여 개발을 진행할 수 있다. 그러나 이런 방식은 개발하고 있는 애플리케이션의 규모가 크다면 좀 더 세밀한 빌드 세팅을 못 한다거나 패키지 버전 관리와 같은 문제가 생긴다. 그래서 Vue.js를 사용하기에 앞서 먼저 NodeJS 설치를 통한 개발환경부터 구축해보려고 한다. 추후 설명할 Vue CLI를 사용하면 간단하게 Vue의 개발 환경을 구축할 수 있다. 

> CDN이란 Content Delivery Network(콘텐츠 전송 네트워크)의 약자로서, 일종의 웹 콘텐츠를 제공해주는 서버다. 원본 콘텐츠를 가지고 있는 서버, 즉 오리진 서버에 콘텐츠에 대한 요청이 몰리게 되면 막대한 트래픽이 발생하게 되고, 이때 오리진 서버에 장애가 발생하거나 응답 속도가 느려질 수 있다. 그래서 요청이 자주 되는 콘텐츠를 여러 개의 CDN 서버에서 받아갈 수 있도록 처리하여 요청을 분산시키는 기술이다. 우리가 긴급전화인 119에 전화를 했을 때 중앙소방본부가 아닌 각 지역에 있는 소방서 중 사용자와 가장 가까운 곳에 있는 소방서에 연결되어 서비스를 받을 수 있는 것과 같은 것이라고 보면 된다. CDN을 통해 라이브러리를 사용할 때는 사용하고 싶은 라이브러리를 [https://cdnjs.com/](https://cdnjs.com/)에서 검색한 후 검색된 URL을 `<script src="https://cdn-url.com">`과 같이 스크립트 태그로 호출하면 된다. 

<br>

NodeJS로 개발 환경을 구축하기 위해서는 먼저 NodeJS를 내려받아야 한다. 

NodeJS를 내려받기 위해서는 NodeJS의 공식 홈페이지[https://nodejs.org.ko/](https://nodejs.org.ko/)에 접속한다. 공식 홈페이지에 접속하면 사용자의 OS에 따라 두 가지 버전을 제공한다. Current 버전의 경우에는 현재 출시된 NodeJS 중 가장 버전이 높은 것을 의미한다. Current 버전은 말 그대로 최신 버전이기 때문에 다른 라이브러리에서 이 버전을 지원하지 않는다면 호환성 문제가 생길 여지가 있다. 그래서 많은 사용자가 사용하고 있고 더욱더 안정성이 보장되는 LTS(Lont Term Support) 버전을 사용하는 것이 좋다. 

다운로드 후 설치파일을 실행한다. 이후 설치가 완료되었다면, 정상적으로 NodeJS가 설치되었는지 확인해보도록 한다. 정상적으로 설치되었다면 터미널 또는 cmd에서 아래의 명령어를 입력하여 NodeJS 버전을 확인할 수 있다. 

<br>

**NodeJS와 npm의 버전을 확인하는 명령어**

```bash
$ node -v # node의 버전 확인
$ npm -v  # npm의 버전 확인
```

NodeJS를 설치하면 자동으로 npm(NodeJS Package Manager)도 함께 설치되므로 별도로 설치할 필요는 없다. npm이란 자바스크립트 기반의 패키지를 쉽게 설치 및 관리할 수 있도록 도와주는 틀이다.

<br> 

> 공식 홈페이지에서 내려받을 수 있는 NodeJS 버전 외에 다른 버전의 NodeJS를 설치하고 싶다면 nvm(Node Version Manager)을 이용해서 여러 버전의 NodeJS를 설치할 수 있다. 


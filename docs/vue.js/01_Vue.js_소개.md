<h1>Vue.js 소개</h1>

<h2>01. Vue.js란 무엇인가?</h2>

<blockquote>Vue.js란?</blockquote>

<p>Vue.js는 웹 페이지 화면을 개발하기 위한 프론트엔드 프레임워크로 기존 웹 개발자뿐만 아니라 HTML, CSS, 자바스크립트 기초만 아는 웹 개발 입문자 및 컴퓨터 비전공자들도 배우기 쉽게 만들어졌습니다. <br />뷰는 화면단 라이브러리이자 프레임워크라고도 볼 수 있습니다. </p>

<div><img src="https://t1.daumcdn.net/cfile/tistory/99BAF4375C7CB2EB2D" alt="점진적인 프레임워크로서의 뷰의 의미" style="display: block;width: 450px;border: 1px solid #ccc;" /></div>

<br />

<blockquote>뷰의 장점</blockquote>

1. <b>배우기가 쉽습니다.</b>

   <p>HTML, CSS, 자바스크립트의 기초만 아는 입문자라도 하루 안에 배울 수 있고, 익숙한 실무 개발자라면 몇 시간 이내에 배울 수 있습니다.</p>

2. <b>리액트와 앵귤러에 비해 성능이 우수하고 빠릅니다.</b>

   <p>뷰 제작팀에서 리액트와 앵귤러를 가지고 같은 테스트 케이스(test cas)에서 성능을 비교한 결과 뷰가 가장 빠른 것으로 나타났습니다.</p>

3. <b>리액트의 장점과 앵귤러의 장점을 갖고 있습니다.</b>

   <p>앵귤러의 데이터 바인딩 특성과 리액트의 가상 돔(Virtual DOM) 기반 렌더링 특징을 모두 가지고 있습니다.</p>

<br />

<blockquote>뷰가 리액트와 앵귤러보다 배우기 쉬운 이유</blockquote>

<p>앵귤러1은 프레임워크로서 완전한 기능을 제공하는 MVC 구조로 출발하여 컴포넌트 기반의 앵귤러2로 진화하였습니다. 이 과정에서 타입스크립트(TypeScript), ES6(ECMAScript 2015)  등 기타 어느 프레임워크보다 더 많은 학습이 필요하게 되었죠. 리액트 또한 입문자가 학습하기에는 ES6와 JSX라는 무시무시한 장벽이 존재합니다. 게다가 ES7, 웹팩(Webpack) 등 신기술이 마구 튀어나오고 있는 상황에서 웹 개발자에게 주어지는 점점 더 무거워집니다. 따라서 쉽게 배울 수 있는 뷰의 등장이 참 반갑다고 할 수 있습니다.</p><br /><hr />

<h2>02. Vue.js의 특징</h2>

<blockquote>UI 화면단 라이브러리</blockquote>

<p>뷰(Vue.js)는 UI화면 개발 방법 중 하나인 MVVM 패턴의 뷰 모델(ViewModel)에 해당하는 화면단 라이브러리입니다.</p>

<div><img src="https://012.vuejs.org/images/mvvm.png" alt="MVVM 구조에서의 Vue.js 위치" style="display: block;border: 1px solid #ccc;width: 500px;"/></div>

<br />

<div>
    <table>
        <thead>
        	<tr>
            	<th>용어</th>
                <th>설명</th>
            </tr>
        </thead>
        <tbody>
        	<tr>
            	<td>뷰(View)</td>
                <td>사용자에게 보이는 화면</td>
            </tr>
            <tr>
            	<td>돔(DOM)</td>
                <td>HTML 문서에 들어가는 요소(태그, 클래스, 속성 등)의 정보를 담고 있는 데이터 트리</td>
            </tr>
            <tr>
            	<td>돔 리스너(DOM Listner)</td>
                <td>돔의 변경 내역에 대해 즉각적으로 반응하여 특정 로직을 수행하는 장치</td>
            </tr>
            <tr>
            	<td>모델(Model)</td>
                <td>데이터를 담는 용기, 보통은 서버에서 가져온 데이터를 자바스크립트 객체 형태로 저장</td>
            </tr>
            <tr>
            	<td>데이터 바인딩(Data Binding)</td>
                <td>뷰(View)에 표시되는 내용과 모델의 데이터를 동기화</td>
            </tr>
            <tr>
            	<td>뷰 모델(ViewModel)</td>
                <td>뷰와 모델의 중간 영역. <br />돔 리스너와 데이터 바인딩을 제공하는 영역</td>
            </tr>
        </tbody>
    </table>
</div>

<br />

<blockquote>컴포넌트 기반 프레임워크</blockquote>

<p>컴포넌트란 마치 레고 블록과 같습니다. 레고 블록을 잘 조합해서 쌓으면 원하는 모형을 만들 수 있듯이 뷰의 컴포넌트를 조합하여 화면을 구성할 수 있습니다.</p>

<div><img src="https://kr.vuejs.org/images/components.png" alt="화면을 컴포넌트로 구조화한 컴포넌트 간 관계도" /></div>

<p>컴포넌트 기반 방식으로 개발하는 이유는 코드를 재사용하기가 쉽기 때문입니다. 뷰의 경우 컴포넌트를 썼을 때 HTML 코드에서 화면의 구조를 직관적으로 파악할 수 있습니다. </p>

<br />

<blockquote>MVVM 패턴이란?</blockquote>

<div style="border: 1px solid #ccc;padding: 20px;color: #999;">마크업 언어나 GUI 코드를 비즈니스 로직 또는 백엔드 로직과 분리하여 개발하는 소프트웨어 디자인 패턴<br />
<span style="display: block;text-align: right;font-size: 0.8em;font-style: italic">- 위키피디아 -</span>
</div>

<p>즉, <span style="text-decoration: underline">화면 앞단(프론트엔드)의 화면 동작과 관련된 로직과 화면 뒷단(백엔드)의 데이터베이스 데이터 처리 로직을 분리하여 더 깔끔하게 코드를 구성한다</span>는 것입니다.</p>



<blockquote>리액트와 앵귤러의 장점을 가진 프레임워크</blockquote>

<p>뷰는 앵귤러의 양방향 데이터 바인딩(Two-way Data Binding)과 리액트의 단방향 데이터 흐름(One-way Data Flow)의 장점을 모두 결합한 프레임워크입니다. 양방향 데이터 바인딩이란 화면에 표시되는 값과 프레임워크의 모델 데이터 값이 동기화되어 한쪽이 변경되면 다른 한쪽도 자동으로 변경되는 것을 말합니다. 단방향 데이터 흐름은 컴포넌트의 단방향 통신을 의미합니다. 컴포넌트 간에 데이터를 전달할 때 항상 상위 컴포넌트에서 하위 컴포넌트 한 방향으로만 전달하게끔 프레임워크가 구조화되어 있는 게 바로 단방향 데이터 흐름입니다.<br />
이 외에도 빠른 화면 렌더링(Rendering)을 위해 리액트의 가상 돔(Virtual DOM) 렌더링 방식을 적용하여 사용자 인터랙션(user interaction)이 많은 요즘의 웹 화면에 적합한 동작 구조를 갖추고 있습니다. 가상 돔을 활용하면 특정 돔 요소를 추가하거나 삭제하는 변경이 일어날 때 화면 전체를 다시 그리지 않고 프레임워크에서 정의한 방식에 따라 화면을 갱신합니다. 따라서 브라우저 입장에서는 성능 부하가 줄어들어 일반 렌더링 방식보다 더 빠르게 화면을 그릴 수 있습니다.</p>




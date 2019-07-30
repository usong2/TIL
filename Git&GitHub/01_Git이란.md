<h2>버전 관리 시스템  : Git</h2>

<p>코딩할 때 <br />단순히 [Ctrl+z]를 눌러 이전 상태로 되돌리는 것이 아니라, <br />
    <strong>원하는 시점마다 깃발을 꽂고</strong>(버전을 만들고)<br />
    <strong>이들 간에 자유롭게 돌아다닐 수 있다.</strong>
</p>

<p>내가 만든 버전 뿐 아니라 <br />동료가 만든 <strong>버전으로 이동</strong>할 수 있고, <br />동료와 내 버전을 <strong>비교해서</strong><br />
<strong>최신본으로 코드를 업데이트</strong>할 수 있다.
</p>


<hr />

<h2>Git을 쓰려면 무엇이 필요한가요?</h2>

<blockquote><p>저장할 공간만 있다면 어디서나 사용 가능.</p></blockquote>

<ol>
    <li>개인 컴퓨터</li>
	<li>USB</li>
    <li>회사 서버</li>
    <li>클라우드(Github, BitBucket, GitLab...)</li>
</ol>

<hr />

<h2>Git을 사용하는 두 가지 방법</h2>

1. CLI

   <div style="text-align: left;"><img src="https://www.nexmo.com/wp-content/uploads/2016/06/nexmo-cli-installed.jpg" alt="CLI" style="width: 500px" /></div>

2. GUI

   <div style="text-align: left;"><img src="https://git-scm.com/book/en/v2/images/git-gui.png" alt="CLI" style="width: 500px" /></div>
   
   

<hr />

<h2>GitHub에 코드를 올리는 과정</h2>

<ol>
    <li>내 컴퓨터 프로젝트 폴더에 '이 곳에 Git을 쓸거다'라고 명령 &lt;git init&gt;</li>
    <li>코딩 작업</li>
    <li>내가 변경한 파일 중 올리길 원하는 것만 선택 &lt;git add&gt;</li>
    <li>선택한 파일들을 한 덩어리로 만들고 설명 적어주기 &lt;git commit -m &quot;첫페이지 제작&quot;&gt;</li>
    <li>GitHub 사이트에서 프로젝트 저장소 만들기(블로그와 동일)</li>
    <li>내 컴퓨터 프로젝트 폴더에 GitHub 저장소 주소 알려주기 &lt;git remote add&gt;</li>
    <li>내 컴퓨터에 만들었던 코딩 작업물 GitHub에 올리기 &lt;git push&gt;</li>
</ol>
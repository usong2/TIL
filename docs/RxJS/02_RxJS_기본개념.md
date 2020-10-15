# 02. RxJS의 기본 개념

## 2.1 배경 지식

RxJS의 기본 개념을 소개하기 전 필요한 것은 기본 개념의 바탕을 이루는 배경 지식이다. 옵저버 패턴, 명령형 프로그래밍과 함수형 프로그래밍 패러다임, 순수 함수의 핵심을 설명한다.

### 2.1.1 옵저버 패턴

ReactiveX 공식 문서에는 Rx의 개념이 옵저버 패턴을 확장했다고 소개한다. 아마 자바스크립트 개발자라면 옵저버 패턴을 들어본 적이 있을 것이다. 공식 문서의 내용을 바탕으로 옵저버 패턴을 살펴보고, 그 이후에 ReactiveX의 옵저버블 타입이 옵저버 패턴에서 무엇을 더 확장한 것인지 알아보겠다.

옵저버 패턴의 기본 개념은 관찰하는 역할의 옵저버 객체들을 서브젝트라는 객체에 등록한 후, 서브젝트 객체의 상태 변경이 일어나면 여기에 의존성 있는 옵저버들의 메서드를 호출해서 알리는 것이다. 이를 확인하기 위해 옵저버 패턴의 UML 다이어그램을 살펴보자.

<br />

![옵저버 패턴의 UML 다이어그램](https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Observer.svg/1281px-Observer.svg.png)

<br />

그림의 Subject는 Observer를 등록하거나 해제할 수 있다. 그리고 등록한 Subject에 어떤 변화가 일어나면 notifyObservers를 호출하여 등록된 옵저버들의 notify를 호출해 이벤트 발생을 알릴 수 있다.

### 2.1.2 자바스크립트 옵저버 패턴 예제

자바스크립트 개발자라면 addEventListner 및 removeEventListner 메서드로 이벤트를 전파하는 방식에 익숙할 것이라고 생각한다. 즉, 특정 이벤트를 관찰할 옵저버(리스너)를 등록한 후 해당 이벤트가 발생했을 때 알려준다는 것이다. 아래의 코드는 옵저버 패턴을 적용한 자바스크립트 클릭 이벤트 코드 예다.

```js
function func1() {
    console.log('target click #1');
};
function func2() {
    console.log('target click #2');
}

document.querySelector('#target').addEventListner('click', func1);
document.querySelector('#target').addEventListner('click', func2);
```

실행 결과는 다음과 같다.

```
target click #1
target click #2
```

#target 엘리먼트에서 클릭 이벤트가 발생했을 때 호출하는 리스너인 콜백 함수 func1과 func2를 정의했다. #target을 클릭하면 콜백 함수 각각을 호출해 'target click #1'과 'target click #2' 두 가지 메시지 모두 로그에 출력한다. 즉, func1과 func2가 옵저버로 등록되어 #target의 클릭 이벤트를 관찰하다가 이벤트가 발생하면 리스너가 호출되는 것이다. 이렇게 콜백 함수가 동작하는 상황을 "옵저버가 이벤트를 구독한다"라고 한다.

구독을 해제하려면 다음 코드처럼 removeEventListener 메서드를 호출하면 된다.
콜백 함수 하나를 해제하는 코드는 다음과 같다.

```js
document.querySelector('#target').removeEventListner('click', func1);
```

앞 코드로 메서드를 호출한 후 #target 엘리먼트를 클릭하면 'target click #2' 메시지만 출력한다.

콜백 함수 모두를 해제하는 코드는 다음과 같다.

```jsx
document.querySelector('#target').removeEventListner('click');
```

이렇게 메서드를 호출하면 #target 엘리먼트를 클릭해도 어떤 콜백 함수든 호출되지 않는다.


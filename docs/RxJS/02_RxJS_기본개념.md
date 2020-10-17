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

### 2.1.3 함수형 프로그래밍과 순수 함수

명령형 프로그래밍은 코드의 흐름에 따라서 조건문 반복문 등으로 분기하고 각각의 흐름대로 차례차례 코드를 작성하는 방식이다. 자바스크립트는 멀티 패러다임 언어라 명령형 프로그래밍과 함수형 프로그래밍을 모두 지원하지만, 많은 개발자가 명령형 프로그래밍에 익숙하다고 생각한다. 명령형 방식에 익숙한 자바스크립트 개발자라면 코루틴 기반의 co 라이브러리나 이를 추상화한 async/await 방식이 여러 값들을 비동기 처리할 때 좀 더 편할 것이다. 

하지만 RxJS는 비동기로 처리하는 여러 값을 명령형 프로그래밍이 아닌 함수형 프로그래밍 패러다임으로 다룬다. 

함수형 프로그래밍의 주요 특징 중 하나는 함수를 값으로 취급하는 1급이라는 특성이 있다. 함수를 인자로 사용하거나 함수 자체를 리턴하거나 함수에 변수를 할당할 수 있다. 이 때문에 함수의 합성이 가능하고, 여러 함수를 미리 합성한 후 필요한 시점에 해당 함수를 호출할 수 있다. 자바스크립트는 함수를 값으로 취급하는 특성이 있는 프로그래밍 언어이므로 이러한 점이 RxJS와 잘 맞는다고 생각한다.

보통 함수형 프로그래밍에서 다루는 함수는 수학적인 정의의 함수처럼 주어진 값(입력 데이터)에 따른 고정된 결과(출력 데이터)를 계산하려는 것이다. 입출력 동작이나 외부 변수 참조처럼 수학적 정의의 함수 동작과 상관없는 부수 효과가 없다. 그래서 함수형 프로그래밍에서 다루는 함수는 입력 데이터에 관한 출력 데이터가 항상 같아야 한다. 이러한 특성 때문에 함수형 프로그래밍의 함수는 다른 프로그래밍 함수와 구분하려고 순수 함수라고도 한다. 순수 함수는 함수의 결과가 항상 보장되므로 잘 사용하면 값을 안전하게 관리하고 디버깅하기 쉽다.

## 2.2 옵저버블

ReactiveX 공식 문서 마지막에는 옵저버블 타입에 GoF의 옵저버 패턴에 없는 두 가지 의미가 추가되었다고 설명한다. 하나는 더 이상 데이터가 없음을 알리는 onCompleted 메서드(RxJS에서는 complete 함수)고, 다른 하나는 에러가 발생했음을 알리는 onError 메서드(RxJS에서는 error 함수)다. 즉, 옵저버 패턴을 기반으로 방금 소개한 두 가지 개념을 추가한 것이 옵저버블이다. 

두 가지 개념은 이터러블 타입도 소개한다. 이터러블이 forEach 연산자를 반복 실행한 후 완료되는 것이 onCompleted, 반복 실행하는 동안 이터러블에서 에러가 발생했을 때를 onError로 표현한다.

이는 뒤에서 소개할 이터러블/이터레이터 요소를 옵저버블/옵저버로 뒤집어놓은 것이다. 참고로 브라이언 베크먼과 에릭 마이어가 Rx에 관해 이야기하는 [영상](https://youtu.be/looJcaeboBY)에서 이 개념을 더 소개하니 관심이 있으면 참고하면 된다. 

지금부터 RxJS의 핵심 구성 요소인 옵저버블, 구독, 연산자, 서브젝트, 스케줄러 등을 소개하고 해당 개념을 구현한 예제 코드를 살펴보겠다. 먼저 RxJS의 핵심 중 핵심이라고 할 수 있는 옵저버블을 소개한다.

RxJS는 옵저버 패턴을 적용한 옵저버블이라는 객체를 중심으로 동작한다. 옵저버블은 특정 객체를 관찰하는 옵저버에게 여러 이벤트나 값을 보내는 역할을 한다. 좀 더 구체적으로 설명하면 옵저버블 객체 안에서 여러 개의 값이나 이벤트를 취급하고, 옵저버의 함수를 호출해 필요한 값이나 이벤트를 보내는 방식이다.

RxJS 공식 문서의 옵저버블 설명에 따르면 하나의 값이나 이벤트를 다루는 싱글, 여러 개의 갑이나 이벤트를 다루는 멀티플, 데이터를 받을지 결정하는 풀, 데이터를 보낼지 결정하는 푸시라는 네 가지 개념이 있다. 그리고 아래에 함수(싱글, 풀), 프로미스(싱글, 푸시), 이터레이터(멀티풀, 풀), 옵저버블(멀티풀, 푸시)의 개념을 구분한다. 이를 정리한 것이 아래의 표이다.

|            | 싱글              | 멀티플               |
| ---------- | ----------------- | -------------------- |
| 풀(Pull)   | 함수(Function)    | 이터레이터(Iterator) |
| 푸시(Push) | 프로미스(Promise) | 옵저버블(Observable) |

옵저버블은 '멀티플'과 '푸시'가 겹치는 영역에 있다. 앞 설명처럼 여러 개 값을 보낼지 결정하는 개념이라는 것을 확인할 수 있다.

또한 옵저버블은 데이터를 만드는 생산자와 데이터를 사용하는 소비자의 관계로도 설명할 수 있다. 위의 표에 있는 함수, 이터레이터, 프로미스, 옵저버블은 값을 만들어내는 생산자 역할을 한다. 이를 가져다 사용하는 입장인 function.call, iterator.next, promise.then, 옵저버블과 연결된 옵저버는 소비자 입장이다. 보통 풀 방식의 함수나 이터레이터는 데이터를 소비(처리)하는 역할이다. 따라서 데이터를 소비하는 쪽이 능동적으로 데이터를 호출하고 데이터를 생산하는 쪽은 데이터를 소비하는 쪽의 영향을 받는다. 

하지만 옵저버블이 속해 있는 푸시 방식은 데이터를 생산하는 생산자가 주체다. 즉, 이벤트나 값 같은 데이터를 생산하는 쪽에서 준비가 되면 데이터를 소비하는 소비자에게 알려주는 방식이다. 그래서 프로미스든 옵저버블이든 생산자가 능동적으로 데이터를 생산하면 알림을 받을 수 있는 콜백이 있다.

프로미스는 객체를 생성하는 시점에, 옵저버블은 RxJS의 subscribe라는 함수를 호출하여 값이나 이벤트를 소비할 수 있는 시점에 실행되어 데이터를 생산한다. 그리고 생산한 데이터는 옵저버에 있는 콜백을 이용해 받을 수 있다. 이는 데이터를 소비하는 쪽에서 데이터를 생산하는 쪽을 제어할 수 없다는 뜻이기도 하다. 

예를 들어 값을 취급하면서 풀 방식인 함수는 함수 선언만으로는 아무런 일도 하지 않는다. 소비자 쪽에서 함수를 호출해야 값을 생산하는 동작을 실행하고 데이터를 받을 수 있다. 푸시 방식의 프로미스는 객체 생성과 동시에 값을 생산하는 동작을 실행한다는 점에서 다르다. 또한 데이터를 전달받기 위해 then이라는 함수에서 사용하는 첫 번째 인자인 onFulfilled 콜백 함수도 데이터 생산이 끝나야만 호출되어 값을 발행할 수 있다. 만약 에러 때문에 데이터를 생산하지 못하는 상황이라면 에러를 보내고 이 또한 then이라는 함수에 두 번째 인자로 사용하는 onRejected 콜백 함수를 이용해 전달받을 수 있다.

반면 멀티풀/풀 조합의 이터레이터는 next 함수를 호출할 때마다 값을 발행하는 동작을 실행할 뿐이므로 데이터를 소비하는 쪽이 능동적인 입장이 된다. 여러 데이터를 푸시 방식으로 다루는 옵저버블은 그저 데이터 생산자가 능동적으로 값을 푸시해 옵저버를 호출한다. 이를 구독한 옵저버의 함수들은 값이 준비되었을 때 수동적으로 호출되어 받을 뿐이다. ES2015+의 제너레이터는 이터레이터이기도 한데, 함수 구조지만 원하는 시점에 next 함수를 호출해 중간에 동작을 멈췄다 다시 동작할 수 있다. 

이는 next 함수를 호출하여 소비하는 소비자가 능동적인 입장의 풀 방식이다. 공식 문서에도 아래의 표와 같은 형태로 정리되어 있다.

|            | 생산자(Producer)                              | 소비자(Consumer)                         |
| ---------- | --------------------------------------------- | ---------------------------------------- |
| 풀(Pull)   | 수동(Passive): 데이터를 요청할 때 생성        | 능동(Active): 데이터 요청 시점을 결정    |
| 푸시(Push) | 능동(Active): 페이스(pace)에 맞춰 데이터 생성 | 수동(Passive): 데이터를 전달받을 때 반응 |

### 2.2.1 옵저버블의 라이프사이클

RxJS 공식 문서에서는 옵저버블의 라이프사이클을 다음과 같이 설명한다.

1. 옵저버블 생성(Create Observables)
2. 옵저버블 구독(Subscribing to Observables)
3. 옵저버블 실행(Executing the Observables)
4. 옵저버블 구독 해제(Dosposing Observables)

시작은 옵저버블의 생성이다. 보통 require('rxjs')에서 불러온 Observable 클래스의 정적 함수 Observable.create로 직접 옵저버블을 생성한다. 그런데 Observable 클래스의 정적 함수가 아닌 require('rxjs')에서 불러올 수 있는 함수 중 range나 of로도 필요한 옵저버블을 쉽게 생성할 수 있다. 이 방식은 추상화된 형태로 옵저버블을 사용한다는 장점이 있다. 또한 이렇게 생성된 옵저버블 인스턴스에 Observable.prototype으로 연결된 pipe 함수에 다양한 연산자를 인자로 사용해서 새로운 옵저버블 인스턴스를 생성할 수 있다.

구독과 실행은 데이터를 전달할 콜백을 제공해 함수를 호출(구독)한 후 옵저버블에서 발행하는 값을 사용하는 것으로 설명할 수 있다. subscribe 함수를 이용한다. 함수를 여러 번 호출해도 해당 함수가 각각 독립적으로 동작한다는 특징이 있다. 예를 들어, addEventListner 메서드를 호출해서 함수가 등록된 이후로 이벤트가 발생했을 때 등록된 함수로 멀티캐스팅한다. 즉, 옵저버가 구독하는 이벤트에 이벤트가 발생하면 모든 옵저버가 같은 결과를 전달받도록 여러 옵저버에서 멀티캐스팅했다는 뜻이다. 

그러나 지금 소개하는 옵저버블은 subscribe라는 함수를 여러 번 호출해도 마치 함수 호출을 처음 하는 것처럼 새로 함수 실행이 시작되는 것을 확인할 수 있다. 

```js
const { Observable } = require('rxjs');

const observableCreated$ = Observable.create(function(observer) {
    for (let i = 1; i <= 10; i++) {
        setTimeout(function() {
            observer.next(i);
            if (i === 10) {
                observer.complete();
            }
        }, 300 * i);
    }
});

observableCreated$.subscribe(
	function next(item) {
        console.log(`observerA: ${item}`);
    },
    function error(err) {
        console.log(`observerA: ${err}`);
    },
    function complete() {
        console.log(`observerA: complete`);
    }
);
setTimeout(function() {
    observableCreate$.subscribe(
    	function next(item) {
            console.log(`observerB: ${item}`);
        },
        function error(err) {
            console.log(`observerB: ${err}`);
        },
        function complete() {
            console.log(`observerB: complete`);
        }
    );
}, 1350);
```

setTimeout 함수를 이용해 일정 간격으로 값을 발행하는 옵저버블이 있고 해당 옵저버블을 observerA란 이름으로 먼저 구독한 후, 1350ms 후에 observerB란 이름으로 같은 옵저버블을 구독한다. observerA와 observerB가 같은 값을 발행하지 않고 observerB를 구독한 시점부터는 1부터 새로운 값을 발행한다. 

위의 코드는 같은 값을 발행할 수 있도록 멀티캐스팅하지 않는 상황이다. 즉, 뒤늦게 구독해도 클릭 이벤트가 발생하면 같은 내용을 전달받아야 하는데 그렇지 않다. RxJS의 옵저버블은 멀티캐스팅이 안 될 때와 될 때를 모두 지원한다. 

구독 해제는 쉽게 말해 옵저버블의 구독을 해제하는 것이다. 예외 상황이 있긴 하지만 옵저버블에서 발행하는 값을 더 받지 않는다. unsubscribe 함수를 사용해 구독 해제를 알리거나 구독 해제 후 해야 할 처리를 정의한다.

참고로 명령형 프로그래밍에 익숙하다면 RxJS를 사용할 때 주의할 점이 있다. 각 연산자에 넘겨준 함수에 return이나 break를 설정한다고 옵저버블의 동작이 중단되지 않는다는 것이다. RxJS에서 실행되는 함수에서 return이나 break를 사용하면 해당 함수 안에서만 실행을 중단한다. 해당 옵저버블 구독을 중단한다는 의미는 아니다. 따라서 구독 해제를 원한다면 앞으로 소개할 RxJS에서 제공하는 풍부한 연산자 중 적절한 연산자를 선택해 구독을 해제하거나 명시적으로 unsubscribe 함수를 호출해서 구독을 해제해야 한다. 

### 2.2.2 옵저버블 생성하고 실행하기

아래의 코드는 Observable.create라는 함수를 호출해 옵저버블을 생성하고, 옵저버블 인스턴스에 있는 subscribe 함수를 호출해 옵저버블을 구독하고 실행하는 예다.

```js
const { Onbservable } = require('rxjs');

const observableCreated$ = Observable.create(function(observer) {
    console.log(`BEGIN Observable`);
    observer.next(1);
    observer.next(2);
    observer.complete();
    console.log(`END Observable`);
});

observableCreated$.subscribe(
	function next(item) { console.log(item); }
    function error(e) { },
    function complete() { console.log(`complete`); }
);
```

실행 결과는 다음과 같다.

```
BEGIN Observable
1
2
complete
END Observable
```

subscribe 함수의 호출 부분을 주석 처리하면(호출하지 않으면) 아무 일도 하지 않는다. 즉, 생성한 옵저버블은 옵저버에게 값을 전달하는 함수가 있지만 subscribe 함수가 호출되어야 옵저저블과 옵저버를 연결해 실행한다. 옵저버의 구성 요소가 옵저버블과 옵저버의 관계를 표현하면 아래와 같다.

> ① 함수 호출
>
> ↓
>
> 옵저버블 [ subscribe 함수 ]
>
> ② 옵저버와 연결
>
> ③ 동작 실행 
>
> ```
> next(1)
> next(2)
> next(3)
> complete()
> ```
>
> ↓
>
> 옵저버 [ next함수, error 함수, complete 함수 ]

즉, 옵저버블 객체 생성 자체는 아무 일도 하지 않고 어떤 일을 해야 할지에 관한 정보만 있고, subscribe 함수를 호출해야 옵저버블이 옵저버에 데이터를 전달하며 동작을 실행한다. 옵저버 객체는 next, error, complete라는 세 가지 함수로 구성되어 있고, subscribe 함수에는 next, error, complete 함수 순서로 옵저버의 구성 요소나 콜백 함수들을 객체로 감싼 옵저버 객체를 전달할 수 있다.

아래의 코드는 next와 complete 함수의 역할을 설명한다.

```js
Observable.create(function(observer) {
	console.log(`BEGIN Observable`);
    observer.next(1);
    observer.next(2);
    observer.complete();
    observer.next(3);
}).subscribe(
	function next(item) { console.log(item) },
    function error(e) { },
    function complete() { console.log(`complete`); }
);
```

실행 결과는 다음과 같다.

```bash
BEGIN Observable
1
2
complete
END Observable
```

옵저버블 객체에서 subscribe 함수를 호출하면 옵저버블이 옵저버의 complete나 error 함수를 호출할 때까지 next 함수로 값을 발행한다. 위의 코드에서는 observer.next(3)까지 호출할 수 있지만 next(3)을 호출하기 전 옵저버의 complete 함수를 호출했으므로 subscribe 함수 안에 있는 next 함수에 값 3은 발행되지 않는다.


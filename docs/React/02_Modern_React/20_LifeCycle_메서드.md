# LifeCycle

## LifeCycle Method

한국어로 "생명주기 메서드"라고 부르며 컴포넌트가 브라우저 상에 나타나고 업데이트되고 사라지게 될 때 호출되는 메서드들로 컴포넌트 에러가 났을 때 호출되는 메서드도 있음

생명주기 메서드는 클래스형 컴포넌트에서만 사용할 수 있는데, `useEffect`랑 비슷함(물론, 작동방식은 많이 다르고 커버하지 않는 기능들도 있음)

참고: [http://bit.ly/fcreact-lifecycle](http://bit.ly/fcreact-lifecycle)

<br>

![생명주기](https://i.imgur.com/cNfpEph.png)

<br>

### 마운트

마운트될 때 발생하는 생명 주기들

+ constructor
+ getDerivedStateFromProps
+ render
+ componentDidMount

#### constructor

`constructor`는 컴포넌트의 생성자 메서드로 컴포넌트가 만들어지면 가장 먼저 실행되는 메서드

```jsx
constructor(props) {
  super(props);
  console.log("constructor");
}
```

#### getDerivedStateFromProps

`getDerivedStateFromProps`는 `props`로 받아온 것을 `state`에 넣어주고 싶을 때 사용

```jsx
static getDerivedStateFromProps(nextProps, prevState) {
  console.log("getDerivedStateFromProps");
  if (nextProps.color !== prevState.color) {
    return { color: nextProps.color };
  }
  return null;
}
```

다른 생명주기 메서드와 달리 앞에 `static`을 필요로 하고 이 안에서는 `this`를 조회할 수 없음
여기서 특정 객체를 반환하게 되면 해당 객체 안에 있는 내용들이 컴포넌트의 `state`로 설정이 됨. 반면, `null`을 반환하게 되면 아무 일도 발생하지 않음

참고로 이 메서드는 컴포넌트가 처음 렌더링 되기 전에도 호출되고 그 이후 리렌더링 되기 전에도 매번 실행

#### return

컴포넌트를 렌더링하는 메서드

#### componentDidMount

컴포넌트의 첫번째 렌더링이 마치고 나면 호출되는 메서드로 호출되는 시점에는 만든 컴포넌트가 화면에 나타난 상태. 여기선 주로 D3, masonry처럼 DOM을 사용해야하는 외부 라이브러리 연동을 하거나 해당 컴포넌트에서 필요로 하는 데이터를 요청하기 위해 axios, fetch 등을 통하여 ajax 요청을 하거나 DOM의 속성을 읽거나 직접 변경하는 작업을 진행

<br>

### 업데이트

컴포넌트가 업데이트 되는 시점에 호출되는 생명주기들

+ getDerivedStateFormProps
+ shouldComponentUpdate
+ render
+ getSnapshotBeforeUpdate
+ componentDidUpdate

#### getDerivedStateFormProps

props나 state가 바뀌었을 때도 이 메서드가 호출

#### shouldComponentUpdate

컴포넌트가 리렌더링할지 말지를 결정하는 메서드

```jsx
shouldComponentUpdate(nextProps, nextState) {
  console.log("shouldComponentUpdate", nextProps, nextState);
  // 숫자의 마지막 자리가 4면 리렌더링하지 않습니다
  return nextState.number % 10 !== 4;
}
```

주로 최적화할 때 사용하는 메서드로 `React.memo`와 비슷

#### render

컴포넌트를 렌더링하는 메서드

#### getSnapshotBeforeUpdate

```jsx
getSnapshotBeforeUpdate(prevProps, prevState) {
  console.log("getSnapshotBeforeUpdate");
  if (prevProps.color !== this.props.color) {
    return this.myRef.style.color;
  }
  return null;
}
```

#### componentDidUpdate

리렌더링을 마치고 화면에 원하는 변화가 모두 반영되고 난 뒤 호출되는 메서드
3번째 파라미터로 `getSnapshotBeforeUpdate`에서 반환한 값을 조회 가능

```jsx
componentDidUpdate(prevProps, prevState, snapshot) {
  console.log("componentDidUpdate", prevProps, prevState);
  if (snapshot) {
    console.log("업데이트 되기 직전 색상: ", snapshot);
  }
}
```

<br>

### 언마운트

컴포넌트가 화면에서 사라지는 것을 의미함

#### componentWillUnmount

컴포넌트가 화면에서 사라지기 직전에 호출

```jsx
componentWillUnmount() {
  console.log("componentWillUnmount");
}
```


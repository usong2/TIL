# Promise

+ 프로그램에서 간단한 코드가 한 줄씩 순차적으로 실행된다면 크게 어렵지 않음
  하지만 자바스크립트에서 함수 호출 시, 함수가 시작되고 끝나는 동안에도 프로그램은 진행되야 할 때 Promise를 이용하면 비동기적인 상황에서 코드를 좀 더 명확하게 표현하고 실행하도록 가능
+ 참고: [https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Promise](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Promise)]

## Promise 혹은 Promise 객체

```javascript
/* 
ES6 부터 JavaScript 의 표준 내장 객체로 추가되었습니다.
ES6 를 지원하는 브라우저나 Node.js 에서 전역에 있는 Promise를 확인할 수 있습니다. 
*/

console.log(Promise); // [Function: Promise]
```

### Promise 생성자

```javascript
/* 
생성자를 통해서 프로미스 객체를 만들 수 있습니다. 
생성자의 인자로 executor 라는 함수를 이용합니다.
*/

new Promise(/* executor */);
```

### resolve와 reject

```javascript
/* 
executor 함수는 resolve와 reject를 인자로 가집니다.
	(resolve, reject) => {...}
resolve와 reject는 함수입니다. 
	resolve(), reject()
*/

new Promise(/* executor */ (resolve, reject) => {});
```

### pending 상태

```javascript
/* 
생성자를 통해서 프로미스 객체를 만드는 순간 pending (대기) 상태라고 합니다.
*/

new Promise((resolve, reject) => {}); // pending
```

### fulfilled 상태

```javascript
/* 
executor 함수 인자 중 하나인 resolve 함수를 실행하면, fulfilled (이행) 상태가 됩니다.
*/

new Promise((resolve, reject) => { 
	// 
    // ...
    resolve(); // fulfilled
});
```

### reject 상태

```javascript
/* 
executor 함수 인자 중 하나인 reject 함수를 실행하면, rejected (거부) 상태가 됩니다. 
*/

new Promise((resolve, reject) => {
	reject(); // rejected 
});
```

> new Promise(executor) 시 **pending** 상태
>
> + 성공: resolve() in executor으로 **fulfilled** 상태
> + 실패: reject() in executor으로 **rejected** 상태 

<br>

### Promise 사용 방법

```javascript
/* 
p 라는 프로미스 객체는 1000ms 후에 fulfilled 됩니다.
*/

new Promise((resolve, reject) => {
   /* pending */
   setTimeout(() => {
       resolve(); /* fulfilled */
   }, 1000);
});
```

```javascript
/* 
p 라는 프로미스 객체가 fulfilled 되는 시점에 p.then 안에 설정한 callback 함수가 실행됩니다. 
*/

const p = new Promise((resolve, reject) => {
   /* pending */
   setTimeout(() => {
       resolve(); /* fulfilled */
   }, 1000);
});

p.then(/* callback */);
```

```javascript
/* 
p.then 으로 callback 함수를 설정했기 때문에 fulfilled 되면서 callback 이 실행됩니다. 
*/

const p = new Promise((resolve, reject) => {
   /* pending */
   setTimeout(() => {
       resolve(); /* fulfilled */
   }, 1000);
});

p.then(() => {
    console.log('1000ms 후에 fulfilled 됩니다.');
});
```

```javascript
/* 
then 을 설정하는 시점을 정확히 하고,
함수의 실행과 동시에 프로미스 객체를 만들면서 pending이 시작하도록 하기 위해
프로미스 객체를 생성하면서 리턴하는 함수 (p) 를 만들어 함수 (p) 실행과 동시에 then 을 설정합니다.
*/

function p() {
    return new Promise((resolve, reject) => {
       /* pending */
       setTimeout(() => {
           resolve(); /* fulfilled */
       }, 1000);
    });
}

p().then(() => {
    console.log('1000ms 후에 fulfilled 됩니다.');
});
```

```javascript
/* 
마찬가지로 프로미스 객체가 rejected 되는 시점에 p.catch 안에 설정한 callback 함수가 실행됩니다.
*/

function p() {
    return new Promise((resolve, reject) => {
       /* pending */
       setTimeout(() => {
           reject(); /* rejected */
       }, 1000);
    });
}

p().then(() => {
    console.log('1000ms 후에 fulfilled 됩니다.');
}).catch(() => {
    console.log('1000ms 후에 rejected 됩니다.');
});
```

```javascript
/* 
executor 의 resolve 함수를 실행할 때 인자를 넣어 실행하면, then 의 callback 함수의 인자로 받을 수 있습니다. 
	resolve('hello');
	then((message) => { ... })
*/

function p() {
    return new Promise((resolve, reject) => {
       /* pending */
       setTimeout(() => {
           resolve('hello');
       }, 1000);
    });
}

p().then((message) => {
    console.log('1000ms 후에 fulfilled 됩니다.', message);
}).catch(() => {
    console.log('1000ms 후에 rejected 됩니다.');
});
```

```javascript
/* 
마찬가지로, executor 의 reject 함수를 실행할 때 인자를 넣어 실행하면, catch 의 callback 함수의 인자로 받을 수 있습니다. 
	reject('error');
	then((reason) => { ... })
*/

function p() {
    return new Promise((resolve, reject) => {
       /* pending */
       setTimeout(() => {
           reject('error');
       }, 1000);
    });
}

p().then((message) => {
    console.log('1000ms 후에 fulfilled 됩니다.', message);
}).catch((reason) => {
    console.log('1000ms 후에 rejected 됩니다.', reason);
});
```

```javascript
/* 
보통 reject 함수를 실행하며 rejected 되는 이유를 넘기는데, 표준 내장 객체인 Error의 생성자를 이용하여 Error 객체를 만들어 보냅니다. 
*/

function p() {
    return new Promise((resolve, reject) => {
       /* pending */
       setTimeout(() => {
           reject(new Error('bad'));
       }, 1000);
    });
}

p().then((message) => {
    console.log('1000ms 후에 fulfilled 됩니다.', message);
}).catch((error) => {
    console.log('1000ms 후에 rejected 됩니다.', error);
});
```

```javascript
/* 
fulfileed 되거나 rejected 된 후에 최종적으로 실행할 것이 있다면, .finally() 를 설정하고, 함수를 인자로 넣습니다. 
*/

function p() {
    return new Promise((resolve, reject) => {
       /* pending */
       setTimeout(() => {
           reject(new Error('bad'));
       }, 1000);
    });
}

p().then((message) => {
    console.log('1000ms 후에 fulfilled 됩니다.', message);
}).catch((error) => {
    console.log('1000ms 후에 rejected 됩니다.', error);
}).finally(() => {
    console.log('end');
});
```

```javascript
/*
보통 비동기 작업을 할때, callback 함수를 인자로 넣어 로직이 끝나면 callback 함수를 호출합니다. 
이런 경우 함수가 아래로 진행되지 않고, callback 함수 안으로 진행됩니다. 
*/

function c(callback) {
    setTimeout(() => {
        callback();
    }, 1000);
}

c(() => {
    console.log('1000ms 후에 callback 함수가 실행됩니다.');
});

c(() => {
    c(() => {
        c(() => {
            console.log('3000ms 후에 callback 함수가 실행됩니다.');
        });
    });
});
```

```javascript
/* 
then 함수에서 다시 프로미스 객체를 리턴하는 방법을 통해 체이닝하면, 비동기 작업을 순차적으로 아래로 표현할 수 있습니다. 
then 에 함수를 넣는 여러 방법을 확인해봅시다. 
*/

function p() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve();
        }, 1000);
    });
}

p().then(() => {
    then p();
})
.then(() => p())
.then(p)
.then(() => {
    console.log('4000ms 후에 fulfilled 됩니다.');
})
```

```javascript
/* 
value 가 프로미스 객체인지 아닌지 알 수 없는 경우, 사용하면 연결된 then 메서드를 실행합니다. 
	value 가 프로미스 객체면, resolve 된 then 메서드를 실행합니다. 
	value 가 프로미스 객체가 아니면, value 를 인자로 보내면서 then 메서드를 실행합니다. 
*/

Promise.resolve(/* value */);

Promise.resolve(new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('foo');
    }, 1000)
})).then((data) => {
    console.log('프로미스 객체인 경우, resolve 된 결과를 받아 thne 이 실행됩니다.', data)
});

Promise.resolve('bar').then(data => {
    console.log('then 메소드가 없는 경우,  fulfilled 됩니다.', data);
});
```

```javascript
/*
Promise.reject 를 사용하면, catch 로 연결된 rejected 상태로 변경됩니다. 
*/

Promise.reject(/* value */);

Promise.reject(new Error('reason'))
	.then(error => {})
    .catch(error => {
    	console.log(error)
	});
```

```javascript
/* 
프로미스 객체 여러개를 생성하여,
배열로 만들어 인자로 넣고 Promise.all 을 실행하면,
배열의 모든 프로미스 객체들이 fulfilled 되었을 때, then 의 함수가 실행됩니다. 
then 의 함수의 인자로 프로미스 객체들의 resolve 인자값을 배열로 돌려줍니다. 
*/

// Promise.all([프로미스 객체들]);

function p(ms) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(ms);
        }, ms);
    })
}

Promise.all([p(1000), p(2000), p(3000)]).then((messages) => {
    console.log('모두 fulfilled 된 이후에 실행됩니다.', messages);
});
```

```javascript
/*
프로미스 객체 여러개를 생성하여,
배열로 만들어 인자로 넣고 Promise.race 를 실행하면,
배열의 모든 프로미스 객체들 중 가장 먼저 fulfilled 된 것으로, then 의 함수가 실행됩니다. 
then 의 함수의 인자로 가장 먼저 fulfilled 된 프로미스 객체의 resolve 인자값을 돌려줍니다. 
*/

// Promise.race([프로미스 객체들]);

function p(ms) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(ms);
        }, ms);
    })
}

Promise.race([p(1000), p(2000), p(3000)]).then((message) => {
    console.log('가장 빠른 하나가 fulfilled 된 이후에 실행됩니다.', message);
});
```




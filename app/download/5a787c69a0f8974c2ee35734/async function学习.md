[![](https://blog.mcloudhub.com/public/images/uploads/20180226/20180226150806_aaa923070014a06848f49a2de6fce2cc.png)](https://blog.mcloudhub.com/public/images/uploads/20180226/20180226150806_aaa923070014a06848f49a2de6fce2cc.png)
## async function学习：
### 定义：
>	定义一个异步函数以async为关键字，如：

	async function(){}
	const asyncfn = async function(){}
	const asyncfn = { saync function(){} }
	const asyncfn = async ()=>{}
	
######  通过async关键字定义的函数返回一个[AsyncFunction(异步函数)对象](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/AsyncFunction "AsyncFunction(异步函数)对象")

#### 描述：
> 调用 async 函数时会返回一个 Promise 对象。当这个 async 函数返回一个值时，Promise 的 resolve 方法会负责传递这个值；当 async 函数抛出异常时，Promise 的 reject 方法也会传递这个异常值。

> async 函数中可能会有 await 表达式，这会使 async 函数暂停执行，等待表达式中的 Promise 解析完成后继续执行 async 函数并返回解决结果。

###### async/await的目的是在 promises 的基础上进一步简化异步的同步调用，它能对一组Promises执行一些操作。正如Promises类似于结构化回调，async/await类似于组合生成器和 promises。

#### 例子：
```
function resolveAfter2Seconds(x) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(x);
    }, 2000);
  });
}

async function add1(x) { 
  var a = await resolveAfter2Seconds(20); 
  var b = await resolveAfter2Seconds(30); 
  return x + a + b; 
}
 
add1(10).then(v => { 
  console.log(v); // prints 60 after 4 seconds. 
});

async function add2(x) {
  var a = resolveAfter2Seconds(20);
  var b = resolveAfter2Seconds(30);
  return x + await a + await b;
}

add2(10).then(v => {
  console.log(v);  // prints 60 after 2 seconds.
});
```
###### 不要将await和Promise.all混淆在函数add1中，程序为第一个await停留了2秒， 然后为第二个await又停留了2秒。第一个计时器结束后，第二个计时器才被创建。在函数add2中，两个计时器均被创建，然后一起被await。 这导致程序运行出结果需要2秒而非4秒，因为这两个计时器是同时运行的。但是这两个await调用仍然是串行而非并行的：Promise.all并没有自动做这种操作。如果你想要同时await两个或者更多Promise对象，必须使用Promise.all。

#### 通过async方法重写 promise 链
> 返回 Promise的 API 将会被用于 promise 链，它会将函数分成若干部分。例如下面代码：

```
function getProcessedData(url) {
  return downloadData(url) // returns a promise
    .catch(e => {
      return downloadFallbackData(url)  // returns a promise
        .then(v => {
          return processDataInWorker(v); // returns a promise
        }); 
    })
    .then(v => {
      return processDataInWorker(v); // returns a promise
    });
}
```
>可以通过如下所示的一个async函数重写：

```
async function getProcessedData(url) {
  let v;
  try {
    v = await downloadData(url); 
  } catch (e) {
    v = await downloadFallbackData(url);
  }
  return processDataInWorker(v);
}
```
###### 注意，在上述示例中，return 语句中没有 await 操作符，因为 async function 的返回值将隐式传递给 Promise.resolve。

#### 参考连接：
[https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function")
[https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/AsyncFunction](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/AsyncFunction "https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/AsyncFunction")
[http://www.css88.com/archives/7731](http://www.css88.com/archives/7731 "http://www.css88.com/archives/7731")
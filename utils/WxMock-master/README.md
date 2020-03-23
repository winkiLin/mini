# WxMock
微信小程序 - 模拟数据工具
##### 使用方法

### 使用代码片段分享 
[wechatide://minicode/wCHxXXmf6OYz](wechatide://minicode/wCHxXXmf6OYz)


* 1. copy文件 https://raw.githubusercontent.com/webx32/WxMock/1.0.1-beta3/dist/mock.js （dist/mock.js此文件小程序不支持） dist/WxMock.js 到小程序工程根目录的 utils目录下
* 2. 在app.js 引入 WxMock 代码 
```javascript 
var Mock = require("./utils/WxMock.js"); 
```
* 3. 在app.js中书写需要模拟的接口及返回结构
```javascript
 Mock.mock('https://xxx.com/users',{
        "code":200,
        "data|1-20":[
            {
                "name":function() {
                  return Mock.Random.cname()
                },
                "lastLogin":function() {
                  return Mock.Random.datetime()
                }
            }
        ]
 })
  Mock.mock('https://xxx.com/user/delete',{
         "code":200,
         "message":"s删除成功"
  })
```
* 4. 只要在 wx.request 中使用url为 mock对应的地址 就会返回响应mock数据
```javascript
wx.request({
  url: 'https://xxx.com/users',
  success:function(res){
    console.log('https://xxx.com/users',res);
  }
})
```

Mock.js 使用方式见 http://mockjs.com/examples.html


# Mock.js
<!-- 模拟请求 & 模拟数据 -->
[![Build Status](https://api.travis-ci.org/nuysoft/Mock.png?branch=master)](http://travis-ci.org/nuysoft/Mock)
[![GitHub version](https://badge.fury.io/gh/nuysoft%2FMock.png)](http://badge.fury.io/gh/nuysoft%2FMock)
[![NPM version](https://badge.fury.io/js/mockjs.png)](http://badge.fury.io/js/mockjs)
[![spm package](http://spmjs.io/badge/mockjs)](http://spmjs.io/package/mockjs)
[![Dependency Status](https://gemnasium.com/nuysoft/Mock.png)](https://gemnasium.com/nuysoft/Mock)
[![Bower version](https://badge.fury.io/bo/mockjs.png)](http://badge.fury.io/bo/mockjs)
[![Views in the last 24 hours](https://sourcegraph.com/api/repos/github.com/nuysoft/Mock/counters/views-24h.png)](https://github.com/nuysoft/Mock/)
<!-- [![Coverage Status](https://coveralls.io/repos/nuysoft/Mock/badge.png)](https://coveralls.io/r/nuysoft/Mock) -->

Mock.js is a simulation data generator to help the front-end to develop and prototype separate from the back-end progress and reduce some monotony particularly while writing automated tests.

The official site: <http://mockjs.com>

## Features

* Generate simulated data according to the data template
* Provide request/response mocking for ajax requests with jQuery and KISSY
* Generate simulated data according to HTML-based templates

<!-- **TODO** This library is loosely inspired by Elijah Manor's [post](http://www.elijahmanor.com/2013/04/angry-birds-of-javascript-green-bird.html), [mennovanslooten/mockJSON](https://github.com/mennovanslooten/mockJSON), [appendto/jquery-mockjax](https://github.com/appendto/jquery-mockjax) and [victorquinn/chancejs](https://github.com/victorquinn/chancejs/). -->

## Questions?
If you have any questions, please feel free to ask through [New Issue](https://github.com/nuysoft/Mock/issues/new).

## Reporting an Issue
Make sure the problem you're addressing is reproducible. Use <http://jsbin.com/> or <http://jsfiddle.net/> to provide a test page. Indicate what browsers the issue can be reproduced in. What version of Mock.js is the issue reproducible in. Is it reproducible after updating to the latest version?

## License
Mock.js is available under the terms of the [MIT License](./MIT-LICENSE.txt).



[![Bitdeli Badge](https://d2weczhvl823v0.cloudfront.net/nuysoft/mock/trend.png)](https://bitdeli.com/free "Bitdeli Badge")


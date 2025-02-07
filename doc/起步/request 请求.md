# request 请求

在 Page.vue 内部，默认使用 [Fetch API](https://developer.mozilla.org/zh-CN/docs/Web/API/Fetch_API) 与后端进行通信。

默认的请求 API 设计相对简单，不包含接口鉴权、超时处理、请求/响应拦截等高级功能。可以通过引入自定义配置，替换默认的 API 实现，从而满足更复杂的请求需求。

引入配置示例：
``` js{8,11}
// main.js

import Vue from 'vue';

import VPage from 'page-element2';

// 引入自定义 api
import api from './api.js';

// 让 Page.vue 使用 自定义 api
Vue.use(VPage, { api: api });
```
创建一个自定义 JavaScript 对象实现 [请求接口](#请求接口)，并在引入 Page.vue 时，通过传递 `api` 配置选项替换默认的 API 实现。

## 请求接口
``` ts
// TypeScript 接口
interface Api {
  /**
   * 发起 get 请求
   * @param {String} url    请求地址
   * @param {Object} params 请求参数
   * @return Promise
   */
  get<T>(url: string, params: object): Promise<T>,
  /**
   * 发起 post 请求
   * @param {String} url    请求地址
   * @param {Object} params 请求参数
   * @return Promise
   */ 
  post<T>(url: string, params: object): Promise<T>,
  /**
   * 发起 delete 请求
   * @param {String} url    请求地址
   * @param {Object} params 请求参数
   * @return Promise
   */
  delete<T>(url: string, params: object): Promise<T>
}
```

三个方法：`get`、`post` 和 `delete`

参数说明：
- 第一个参数为 url 请求地址
- 第二个参数为 请求参数

返回值说明：所有方法均返回一个 Promise 对象

## 自定义实现（[Axios](https://github.com/axios/axios)）

1. 创建 `pageCustomApi.js` 文件，在文件内写入以下内容
``` js
// pageCustomApi.js

import axios from 'axios'; // 记得安装 axiso

// 创建 axios 实例
const instance = axios.create();

// 请求截器
instance.interceptors.request.use(function () {
  /* 对请求做点什么 */
});

// 响应拦截器
instance.interceptors.response.use(function () {
  /* 对响应做点什么 */
});


// 导出接口三个方法实现， 提供给 Page.vue 使用
export default {
  get(url, params) {
    return instance.get(url, { params });
  },
  post(url, params) {
    return instance.post(url, params);
  },
  delete(url, params) {
    return instance.delete(url, { params });
  }
}
```
2. 修改 `main.js`，引入 `pageCustomApi.js` 并使用
``` js{8,11}
// main.js

import Vue from 'vue';

import VPage from 'page-element2';

// 引入 pageCustomApi.js, 注意文件路径
import pageCustomApi from './pageCustomApi.js';

// 使用自定义 request
Vue.use(VPage, { api: pageCustomApi });
```

## 已有 request 接入（若依 ui）

将 [自定义实现](#自定义实现-axios) 中的 `pageCustomApi.js` 文件内容替换为下方代码。

``` js{4}
// pageCustomApi.js

// 若依 ui 的 request
import request from '@/utils/request';

export default {
  // post 请求
  get(url, params) {
    return request({ url, method: 'get', params });
  },
  // post 请求
  post(url, data) { 
    return request({ url, method: 'post', data });
  },
  // delete 请求
  delete(url, params) {
    return request({ url, method: 'delete', params });
  }
}
```

> 若依 ui request 见 [request.js](https://gitee.com/y_project/RuoYi-Vue/blob/master/ruoyi-ui/src/utils/request.js)

## 默认请求实现
见 [默认请求实现](https://github.com/gonglihai/page-element2/blob/main/packages/page/api/fetchApi.js)

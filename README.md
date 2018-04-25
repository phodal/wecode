# code

A Serverless Code Highlight Application

```
.
├── client    // browser side code
├── docs      // documents
├── server    // server side code in Serverless
├── test      // some test scrpits
└── weapp     // wechat app
```

API List
---

| URL             | HTTP Method  |   用途          |
|-----------------|--------------|----------------|
| /               | GET          | 返回首页        | 
| /	               | POST         | 创建代码        |
| /features       | GET			   | 返回首页推荐内容  |
| /login          | GET          | 获取 OpenID     |
| /user/{userId}  | GET		      | 获取对应用户的代码 |
| /code/{codeId}  | GET          | 获取特定代码      |
| /code/{codeId}  | POST         | 更新特定代码      |
| /code/{codeId}  | DELETE       | 删除特定代码      |


License
---

[![Phodal's Idea](http://brand.phodal.com/shields/idea-small.svg)](http://ideas.phodal.com/)

© 2018 A [Phodal Huang](https://www.phodal.com)'s [Idea](http://github.com/phodal/ideas).  This code is distributed under the GPL 3.0 license. See `LICENSE` in this directory.

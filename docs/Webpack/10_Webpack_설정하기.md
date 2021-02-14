# 10. Webpack 설정하기

## 1. Handlebars & Webpack

### Webpack이 바라보는 Module

1. js
2. sass
3. hbs
4. jpg, png

### HBS(Handlebars)

+ 템플릿 엔진인 Handlebars라는 글자의 약자로 이해하면 됨
+ 이 확장자는 템플릿 엔진인 Handlebars가 사용하는 파일을 의미함
+ 문서 안에 특정 데이터를 노출시켜야 할 때 직접 DOM을 파싱하고 데이터가 들어갈 공간을 찾아서 넣어주는 작업을 데이터가 들어가는 위치마다 매번 반복해야 하는데 이러한 작업이 잦을 경우 템플릿 엔진을 활용하기도 함
+ 템플릿 엔진은 Model, Template, View 세 가지 용어로 설명 가능함
  + **Model**: 문서에 노출시킬 데이터
  + **Template**: 일반적인 문서와 비슷한데 차이점은 모델이 갖고 있는 데이터가 어디에 어떻게 표현될 지를 문서 내에 작성되어 있음
+ 템플릿 엔진의 컴파일러가 Model과 Template을 이용해 Model 데이터들이 Template을 통해 들어갈 자리를 확인하고 그 자리에 맞는 데이터들을 넣어주는 컴파일 과정을 거치게 됨. 이 과정이 끝나면 Template 내에 데이터가 함께 들어가 있는 완성되 있는 문서인 **View**가 결과물로 나옴
+ Webpack과 함께 템플릿 엔진 중 하나인 Handlebars를 활용할 예정
+ Handlebars는 템플릿을 표현하는 방식 중 하나인 Mustache를 활용하는 템플릿 엔진이므로 Handlebars를 활용하면 템플릿 파일에 데이터가 어디어디에 어떻게 들어가는 지를 Mustache라는 템플릿으로 표현하게 됨

## 2. 실습

### handlebars 설치

```bash
$ npm i handlebars -D
```

+ handlebars는 .hbs라는 확장자를 읽어 컴파일함
+ .hbs 확장자를 읽을 수 있도록 loader 설정 필요

### loader 설치

```bash
$ npm i handlebars-loader -D
```

### Webpack 설정 안에 추가

```js
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./index.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [
          {
            loader: "style-loader",
            options: {
              injectType: "singletonStyleTag",
            },
          },
          {
            loader: "css-loader",
            options: {
              modules: true,
            },
          },
        ],
      }, {
        test: /\.hbs$/,
        use: ['handlebars-loader']
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./template.html",
    }),
  ],
  mode: "none",
};
```

### hbs 파일 생성

+ template.html 파일의 확장자를 .hbs로 변경
+ .hbs로 변경하는 이유는 html의 webpack 플러그인에 설정된 내용을 html 문서에 주입시킬 수 있는 형태가 되었기 때문

### webpack 설정 파일 변경

+ 템플릿 경로 변경

  ```js
  const path = require("path");
  const HtmlWebpackPlugin = require("html-webpack-plugin");
  
  module.exports = {
    entry: "./index.js",
    output: {
      filename: "bundle.js",
      path: path.resolve(__dirname, "dist"),
    },
    module: {
      rules: [
        {
          test: /\.css$/i,
          use: [
            {
              loader: "style-loader",
              options: {
                injectType: "singletonStyleTag",
              },
            },
            {
              loader: "css-loader",
              options: {
                modules: true,
              },
            },
          ],
        }, {
          test: /\.hbs$/,
          use: ['handlebars-loader']
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: "./template.hbs",
      }),
    ],
    mode: "none",
  };
  ```

+ Title에 대한 내용을 적용

  ```js
  const path = require("path");
  const HtmlWebpackPlugin = require("html-webpack-plugin");
  
  module.exports = {
    entry: "./index.js",
    output: {
      filename: "bundle.js",
      path: path.resolve(__dirname, "dist"),
    },
    module: {
      rules: [
        {
          test: /\.css$/i,
          use: [
            {
              loader: "style-loader",
              options: {
                injectType: "singletonStyleTag",
              },
            },
            {
              loader: "css-loader",
              options: {
                modules: true,
              },
            },
          ],
        },
        {
          test: /\.hbs$/,
          use: ["handlebars-loader"],
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        title: "Webpack",
        template: "./template.hbs",
      }),
    ],
    mode: "none",
  };
  ```

### hbs 파일 수정

+ title 값이 문서에 전달되게 되는데 Mustache는 **중괄호 2개를 감싸는 형태**로 데이터가 전달되는 위치를 표현

+ html-webpack-plugin을 통해 전달될 때는 template에 htmlWebpackPlugin.options라는 공간에 데이터들이 전달되게 됨

  ```handlebars
  <!DOCTYPE html>
  <html>
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Webpack {{htmlWebpackPlugin.options.title}}</title>
  </head>
  <body>
  </body>
  </html>
  ```

### title 값 전달 확인

```bash
$ npm run build
```

+ dist/index.html 확인

  ```html
  <!DOCTYPE html>
  <html>
  
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Webpack Webpack</title>
  </head>
  
  <body>
  <script src="bundle.js"></script></body>
  
  </html>
  ```

  title이 변경된 것을 확인 가능

### meta 변경 방법

+ webpack 설정 파일 수정

  ```js
  const path = require("path");
  const HtmlWebpackPlugin = require("html-webpack-plugin");
  
  module.exports = {
    entry: "./index.js",
    output: {
      filename: "bundle.js",
      path: path.resolve(__dirname, "dist"),
    },
    module: {
      rules: [
        {
          test: /\.css$/i,
          use: [
            {
              loader: "style-loader",
              options: {
                injectType: "singletonStyleTag",
              },
            },
            {
              loader: "css-loader",
              options: {
                modules: true,
              },
            },
          ],
        },
        {
          test: /\.hbs$/,
          use: ["handlebars-loader"],
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        title: "Webpack",
        template: "./template.hbs",
        meta: {
          viewport: 'width=device-width, initial-scale=1.0'
        }
      }),
    ],
    mode: "none",
  };
  ```

+ hbs 파일 수정(기존 meta 삭제)

  ```handlebars
  <!DOCTYPE html>
  <html>
  
  <head>
      <meta charset="UTF-8">
      <title>Webpack {{htmlWebpackPlugin.options.title}}</title>
  </head>
  
  <body>
  </body>
  
  </html>
  ```

+ 빌드

  ```bash
  $ npm run build
  ```

+ dist/index.html 변경 확인

  ```html
  <!DOCTYPE html>
  <html>
  
  <head>
      <meta charset="UTF-8">
      <title>Webpack Webpack</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
  
  <body>
  <script src="bundle.js"></script></body>
  
  </html>
  ```

  
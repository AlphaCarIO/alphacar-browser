# acar-browser

> alphacar blockchain browser

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

npm install bootstrap --save
npm install node-sass --save --dev
npm install sass-loader --save --only=dev

{
     test: /\.vue$/,
     loader: 'vue-loader',
     options: {
         loaders: {
             'scss': 'vue-style-loader!css-loader!sass-loader',
             'sass': 'vue-style-loader!css-loader!sass-loader?indentedSyntax'
         }
     }
 }

{
  test: /\.scss$/,
  use: [
    {
      loader: 'css-loader'
    },
    {
      loader: 'sass-loader'
    }
  ]
}

<style lang="scss">
@import '../node_modules/bootstrap/scss/bootstrap.scss';
</style>

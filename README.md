# codecasts-spa-boilerplate

> Client for Codecast's SPA boilerplate

Instructions for Vishal

I called new module XPosts, so in src/app you will find new folder ( read components ) for xpost module

There is many things which could be better ( e.g. xposturl data, that should be some global constant ) but right
now, since this is test and wish to complete it as soon as possible, I just did not follow best practices.

GET/POST/PUT/DELETE has been sent directely to REST API which you gave me, but as you know only GET gives results,
other three just report Status 200 but they dont update data on server side...



## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

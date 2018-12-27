# vue-katex

KaTeX enables fast math typesetting for the web. This plugin introduces a simple directive to use [KaTeX](https://github.com/KaTeX/KaTeX) in your Vue app. Enjoy! 🙂

[![NPM version](https://img.shields.io/npm/v/vue-katex.svg?style=flat)](https://www.npmjs.com/package/vue-katex) [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Build Status](https://travis-ci.org/shadskii/vue-katex.svg?branch=master)](https://travis-ci.org/shadskii/vue-katex)
[![codecov](https://codecov.io/gh/shadskii/vue-katex/branch/master/graph/badge.svg)](https://codecov.io/gh/shadskii/vue-katex)


# Requirements

- Vue 2

# Installation

```
# With NPM
npm i vue-katex -P

# With Yarn
yarn add vue-katex
```

As explained in the [KaTeX documentation](https://katex.org/docs/autorender.html), you must also add the related stylesheet.

```html
<style>
  @import "../node_modules/katex/dist/katex.min.css";
</style>
```

# Usage

```js
import VueKatex from 'vue-katex'

Vue.use(VueKatex)
```

In your HTML file (don't forget to escape all backslashes):

```html
<div v-katex="'\\frac{a_i}{1+x}'"></div>
```



To render the math in display style:

```html
<div v-katex:display="'\\frac{a_i}{1+x}'"></div>
```

To add KaTeX options, use an object literal instead:

```html
<div v-katex="{ expression: '\\frac{a_i}{1+x}', options: { throwOnError: false }}"></div>
```

All KaTeX options are available [here](https://github.com/Khan/KaTeX#rendering-options).

# License

vue-katex is released under the [MIT license](http://opensource.org/licenses/MIT).
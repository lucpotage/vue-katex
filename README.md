# vue-katex

KaTeX enables fast math typesetting for the web. **vue-katex** is a lightweight plugin introduces a simple way to use [KaTeX](https://github.com/KaTeX/KaTeX) in your Vue app. Enjoy! 🙂

[![NPM version](https://img.shields.io/npm/v/vue-katex.svg?style=flat)](https://www.npmjs.com/package/vue-katex) [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Build Status](https://travis-ci.org/lucpotage/vue-katex.svg?branch=master)](https://travis-ci.org/lucpotage/vue-katex)
[![codecov](https://codecov.io/gh/lucpotage/vue-katex/branch/master/graph/badge.svg)](https://codecov.io/gh/lucpotage/vue-katex)


# Installation
Install `vue-katex` with `katex` as a peer dependency

```
# With NPM
npm i vue-katex katex -P

# With Yarn
yarn add vue-katex katex
```

As explained in the [KaTeX documentation](https://katex.org/docs/node.html), you must also add the related stylesheet.

```html
<style>
  @import "../node_modules/katex/dist/katex.min.css";
</style>
```
or 
```js
import 'katex/dist/katex.min.css';
```

# Getting started
In your script entry point:

```js
import Vue from 'vue';
import VueKatex from 'vue-katex';
import 'katex/dist/katex.min.css';

Vue.use(VueKatex, {
  globalOptions: {
    //... Define globally applied KaTeX options here
  }
});
```
Now you are all setup to use the plugin.

# Usage

There are two ways to use vue-katex, using the `KatexElement` component or using the `v-katex` directive.  

### Global Options
Options applied globally through the plugin will be merged with any options applied locally to the `v-katex` directive or `KatexElement`. Locally applied options have a higher precedence and will override globally applied options, the exception to this is any KaTeX option of the type `object` or `array`. These will be merged with the resultant option containing all global and local keys or elements.

### Using the katex directive

In your template (don't forget to escape all backslashes):

```html
<div v-katex="'\\frac{a_i}{1+x}'"></div>
```

To render the math in display mode:

```html
<div v-katex:display="'\\frac{a_i}{1+x}'"></div>
```

To add KaTeX options, use an object literal instead:

```html
<div v-katex="{ expression: '\\frac{a_i}{1+x}', options: { throwOnError: false }}"></div>
```

### Using the katex directive with auto-render

```html
<div v-katex:auto>
  \(\frac{a_i}{1+x}\)
</div>
```

Options can be applied as follows
```html
<div v-katex:auto="{ options }">
  \(\frac{a_i}{1+x}\)
</div>
```

See KaTeX documentation for [auto-render](https://katex.org/docs/autorender.html) for more information.

### Using the KatexElement component

```html
<katex-element expression="'\\frac{a_i}{1+x}'"/>
```
Through props `KatexElement` supports all of the same options that KaTeX supports.


| Props |
| :----- |
|<div><h3>`expression`</h3> <p>**Type:** `String` **Required**</p> A TeX expression to be displayed.</div>|
|<div><h3>`display-mode`</h3> <p>**Type:** `Boolean` **Default:** `false`</p> If true the math will be rendered in display mode, which will put the math in display style (so `\int` and `\sum` are large, for example), and will center the math on the page on its own line. If false the math will be rendered in inline mode.</div>|
|<div><h3>`throw-on-error`</h3><p>**Type:** `Boolean` **Default:** `false`</p> If true, KaTeX will throw a `ParseError` when it encounters an unsupported command or invalid LaTeX. If false, KaTeX will render unsupported commands as text, and render invalid LaTeX as its source code with hover text giving the error, in the color given by `errorColor`.</div>|
|<div> <h3>`error-color="#CC0000"`</h3> <p>**Type:** `String` **Default:** `#CC0000` </p> A color string given in the format "#XXX" or "#XXXXXX". This option determines the color that unsupported commands and invalid LaTeX are rendered in when throwOnError is set to false.</div>|
|<div><h3>`macros`</h3><p>**Type:** `Object` **Default:** `null`</p> A collection of custom macros. Each macro is a property with a name like `\name` (written `"\\name"` in JavaScript) which maps to a string that describes the expansion of the macro, or a function that accepts an instance of `MacroExpander` as first argument and returns the expansion as a string. `MacroExpander` is an internal API and subject to non-backwards compatible changes. See [src/macros.js](https://github.com/KaTeX/KaTeX/blob/master/src/macros.js) for its usage. Single-character keys can also be included in which case the character will be redefined as the given macro (similar to TeX active characters). This object will be modified if the LaTeX code defines its own macros via `\gdef`, which enables consecutive calls to KaTeX to share state.</div>|
|<div><h3>`color-is-text-color`</h3><p>**Type:** `Boolean` **Default:** `false`</p> If true, `\color` will work like LaTeX's `\textcolor`, and take two arguments (e.g., `\color{blue}{hello}`), which restores the old behavior of KaTeX (pre-0.8.0). If false, `\color` will work like LaTeX's `\color`, and take one argument (e.g., `\color{blue}hello`). In both cases, `\textcolor` works as in LaTeX (e.g., `\textcolor{blue}{hello}`).</div>|
|<div><h3>`max-size="Infinity"`</h3><p>**Type:** `Number` **Default:** `Infinity`</p> All user-specified sizes, e.g. in `\rule{500em}{500em}`, will be capped to `maxSize` ems. If set to `Infinity` (the default), users can make elements and spaces arbitrarily large.</div>|
|<div><h3>`max-expand="1000"`</h3><p>**Type:** `Number` **Default:** `1000`</p> Limit the number of macro expansions to the specified number, to prevent e.g. infinite macro loops. If set to `Infinity`, the macro expander will try to fully expand as in LaTeX.</div>|
|<div><h3>`allowed-protocols="[]"`</h3><p>**Type:** `String[]` **Default:**  `["http", "https", "mailto", "_relative"]`</p> Allowed protocols in `\href`. Use `_relative` to allow relative urls, and `*` to allow all protocols.</div>|
|<div><h3>`strict`</h3><p>**Type:** `[Boolean, String, Function]` **Default:**  `"warn"`</p> If `false` or `"ignore"`, allow features that make writing LaTeX convenient but are not actually supported by (Xe)LaTeX (similar to MathJax). If `true` or `"error"` (LaTeX faithfulness mode), throw an error for any such transgressions. If `"warn"` (the default), warn about such behavior via `console.warn`. Provide a custom function `handler(errorCode, errorMsg, token)` to customize behavior depending on the type of transgression (summarized by the string code `errorCode` and detailed in `errorMsg`); this function can also return `"ignore"`, `"error"`, or `"warn"` to use a built-in behavior. A list of such features and their `errorCode`: <ul><li>`"unknownSymbol"`: Use of unknown Unicode symbol, which will likely also lead to warnings about missing character metrics, and layouts may be incorrect (especially in terms of vertical heights).</li><li>`"unicodeTextInMathMode"`: Use of Unicode text characters in math mode.</li><li>`"mathVsTextUnits"`: Mismatch of math vs. text commands and units/mode.</li><li>`"commentAtEnd"`: Use of % comment without a terminating newline. LaTeX would thereby comment out the end of math mode (e.g. $), causing an error. A second category of errorCodes never throw errors, but their strictness affects the behavior of KaTeX</li><li>`"newLineInDisplayMode"`: Use of \\ or \newline in display mode (outside an array/tabular environment). In strict mode, no line break results, as in LaTeX.</li></ul></div>

See also: [KaTeX Documentation](https://katex.org/docs/options.html)

# License

vue-katex is released under the [MIT license](http://opensource.org/licenses/MIT).

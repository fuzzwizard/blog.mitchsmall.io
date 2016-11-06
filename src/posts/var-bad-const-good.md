---
title: Friends Don't Let Friends Write `var`
layout: post.pug
collection: posts
date:
draft: true
---

When I was first confronted by the expansive (and frankly overwhelming) featureset of ES6, I saw one change in particular as the most fundamental: `const` and `let`.


# How they work

### Hoisting

The big boon both with both keywords is that they're not hoisted. Consider the following:

```javascript
console.log(hoisted); // Logs undefined
var hoised = 'Wowza!';
```

Hoising essentially moves the _declaration_ of a variable to the top of it's enclosing scope while leaving the _assignment_ of that variable where you declared it.

There is more to hoisting, but this is an effective shorthand for how you, the programmer, will interact with hoisted variables.

What's great is that both `const` and `let` are not hoisted:

```javascript
console.log(notHoisted); // Uncaught Reference Error: notHoisted is not defined
let notHoisted = 'Wowza!';
```

This makes JavaScript more teachable, by making it possible to footnote what was once a strange and somewhat confounding language feature for developers arriving from different languages.

For existing JavaScript devs, the gains here are little less concrete. Can you forget about hoisting? Not if you're working with legacy code or eschewing function literals (the `function` keyword has its own flavor of hoisting). However, there are other features present in `const` and `let`.

### Let There Be Shadowing

`let` seems pretty much interchangable with `var`, sans the hoisting.

```javascript
console.log(a) // Uncaught Reference Error: a is not defined
let a = 0;
let b = 0;
b += 1; // b is now 1
```

However, there's another key difference: `let` obeys block scoping. 

### The Mutability Mombo

However, variables declared with `const` have an _immutable_ binding. They cannot be reassigned.

```javascript
const a = 1;
a = 2; // Uncaught TypeError: Assignment to constant variable.
```

Going one step further, primitives declared with `const` cannot be modified:

```javascript
const a = 1;
a += 1; // Uncaught TypeError: Assignment to constant variable.
``` 

However, objects declared with `const` can still be modified:

```javascript
const o = {};
o.field = 'value'; // Works just fine!
o = {}; // You guessed it: Uncaught TypeError: Assignment to constant variable.
```

So why is this useful?


# That ol' bugbear: Performance




I'd argue that the dust has settled around ES6's landing. Compatibility is [wide-reaching](http://kangax.github.io/compat-table/es6/), both with browsers and the newly minted Node LTS (as of this writing, that's v6.9.1.).
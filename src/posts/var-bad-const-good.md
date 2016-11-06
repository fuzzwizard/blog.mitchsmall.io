---
title: Explaining Const and Let
layout: post.pug
collection: posts
date: 
draft: true
---

When I was first confronted by the expansive (and frankly overwhelming) featureset of ES6, I saw one change in particular as the most fundamental: `const` and `let`. `var` was no longer the only keyword I needed to know to make my variables real. I was at once struck with a great bafflement and a yearning -- a yearning to know _why_.

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

### Let There Be Blocks

`let` seems pretty much interchangable with `var`, sans the hoisting.

```javascript
console.log(a) // Uncaught Reference Error: a is not defined
let a = 0;

let b = 0;
b += 1; // b is now 1
```

However, there's another key difference: `let` obeys block scoping. Consider the following:

```javascript
var a = 0;
if (true) {
  var a = 1;
}
console.log(a); // logs 1
```

In this case, the `var a` at line 3 is accessing the same variable as declared on line 1. These variables exist in the same namespace because they are not block scoped. However, if one were to use `let`:

```javascript
let a = 0;
if (true) {
  let a = 1;
}
console.log(a); // logs 0
```

The `let a` defined in the `if` block is cordoned off from the `let a` outside of it. Let allows you to keep your variable declarations from cross contaminating other sections of code. `const` shares this behaviour, but with one major difference. 

### The Mutability Mombo

Variables declared with `const` have an _immutable_ binding. They cannot be reassigned.

```javascript
const a = 1;
a = 2; // Uncaught TypeError: Assignment to constant variable.
```

Going one step further, primitives declared with `const` cannot be modified:

```javascript
const a = 1;
a += 1; // Uncaught TypeError: Assignment to constant variable.
``` 

However, objects declared with `const` can still be modified (because JavaScript needed another inconsistency, naturally):

```javascript
const o = {};
o.field = 'value'; // Works just fine!
o = {}; // You guessed it: Uncaught TypeError: Assignment to constant variable.
```

# Which Should I Use?

I've seen some claims floating around that `const` assists with runtime engines that utilize just-in-time compilation, but I haven't stumbled accross any benchmarks that support that its a substantial difference at the end of the day.

Personally, I opt for `const` over `let` for another reason: I'd rather avoid adding more mutable state to my program than necessary. Defaulting to `const` forces me to make a conscious decision as to whether or not a given variable should ever change. 

Granted, the object modification clause confounds that. To which I say: close enough. 👍

That said, now that the dust has mostly settled around ES6's landing (Compatibility is [wide-reaching](http://kangax.github.io/compat-table/es6/), both with browsers and the newly minted Node LTS), I'd recommend embracing these binding keywords -- whichever one you prefer.
---
title: I Do Declare! Explaining Const and Let
layout: post.pug
collection: posts
date: 2016-11-9
---

ES6 has a lot of changes. Some of which are nice, if somewhat minimal, adjustments (iterators, arrow functions), but others seem like a fundamental alteration to the way you're supposed to write the language.

Enter `const` and `let`:

# How they work

### Hoisting

The big boon both with both keywords is that they're inaccessible once hoisted. Consider the following:

```javascript
console.log(hoisted); // Logs undefined
var hoised = 'Wowza!';
```

Hoising essentially moves the _declaration_ of a variable to the top of it's enclosing scope while leaving the _assignment_ of that variable where you declared it.

There is more to hoisting, but this is an effective shorthand for how the programmer will interact with hoisted variables.

Where `const` and `let` take things further is that they will throw an error if accessed between their hoisting and their assignment:

```javascript
console.log(onlyKindaHoisted); // Uncaught Reference Error: onlyKindaHoisted is not defined
let onlyKindaHoisted = 'Wowza!';

console.log(noIReallyMeanIt);
const noIReallyMeanIt = 'Woah there!'; // Uncaught Reference Error: noIReallyMeanIt is not defined
```

By my estimation, this makes JavaScript just slightly more teachable to new devs. Hoisting is a stumbling point in many learners initial understanding of JavaScript's scoping, while these new declaration keywords effective lampshade the fact that hoisting even exists.

For existing JavaScript devs, the gains here are little less concrete. Can you forget about hoisting? Not if you're working with legacy code or eschewing function literals (the `function` keyword has its own flavor of hoisting). However, there are other features present in `const` and `let` that make them appealing.

### Let There Be Blocks

One key difference: `let` obeys block scoping. Consider the following:

```javascript
var a = 0;
if (true) {
  var a = 1;
}
console.log(a); // logs 1
```

In this case, the `var a` at line 3 is accessing the same variable as declared on line 1. These variables exist in the same namespace because they are part of the same scope. However, if one were to use `let`:

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

__Opinion time:__ Whichever, so long as it's not `var`.

Now that the dust has mostly settled around ES6's landing (compatibility is [wide-reaching](http://kangax.github.io/compat-table/es6/), both with browsers and the newly minted Node LTS), there's really not a compelling reason I'm aware of to use `var` outside of legacy code. 

I've seen some claims floating around that `const` assists with runtime engines that utilize just-in-time compilation, but I haven't stumbled accross any benchmarks that indicate that the difference is substantial.

Personally, I opt for `const` over `let` for another reason: I'd rather avoid adding more mutable state to my program than necessary. Defaulting to `const` forces me to make a conscious decision as to whether or not a given variable should ever change. 

Granted, the object modification clause confounds that. But we can't always get what we want, right?
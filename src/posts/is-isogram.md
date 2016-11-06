---
title: The Isogram Test, Compressed
layout: post.pug
collection: posts
date: 2016-11-6
---

Say you're given a challenge: `determine whether a given word (or string) is an isogram using JavasScript`.

In the scope of technical challenges, this is one of the simpler ones im my opinion because the algorithim doesn't stray far from the realm of simple human reasoning:

> Go through the letters. If you haven't seen a letter before, indicate that you've seen it. If you happen upon any letter twice, then it's not an isogram. Otherwise, it's an isogram.

So of course you'd write something like this:

```javascript
i=s=>s.split('').reduce((m,l)=>m&&m[l]!==true?m[l]=true&&m:false,{})
```

Just kidding. But we can get here!

Here's a human readable version of that algorithim, done in an imperitive style with an emphasis of mimicking the proceedures of the above:

```javascript
function isIsogram(string) {
  const memory = {};

  // 'Go through the letters.'
  for (let letter of sting.split('')) {
    if (memory[letter] !== true) { // 'If you haven't seen a letter before...'
      memory[letter] = true; // '...indicate that you've seen it.'
    } else { // 'If you happen upon any letter twice...
      // '...then it's not an isogram.'
      return false;
    }
  }
  // 'Otherwise, it's an isogram.'
  return true;
}
``` 

The proceedure of this is great, truth be told. It works in linear time (as it should), with a minimal number of operations and you'd be hard pressed to do anything but shave milliseconds off it's runtime. It's also space efficient, using boolean data types to indicate whether or not we've seen a letter of the word before.

This is code I would feel comfortable writing in a team setting, where other people have to understand my proceedure.

But this article is about making it *less* readable. For funsies! So we'll start trasforming this puppy.

### First step: target for loops

For and while loops of all kinds are easy to inline using JavasScript's native array methods. And if we're looking to gather a single value from a list, `reduce` does just that.

*For the uninitiated:* Reduce iterates over the array you called it on, passing along a 'memory' variable of sorts. Usually, the memory variable is the first item of the array, but if you pass in a second arguement to reduce, that item becomes the initial memory. 

Here I've transcribed our algorithim from the previous imperitive implementation to one that takes advantage of a first-order function, with couple key differences:

```javascript
function isIsogram(string) {
  return string.split('')
    .reduce(function(memory, letter) {
      // We have to take into account that `memory` may no longer be the object 
      // we initally passed in. Hence why we check first if its truthy.
      if (memory && memory[letter] !== true) {
        memory[letter] = true;
        return memory;
      } else {
        // Here's where we ditch the memory object and return false. 
        // No way it could be an isogram otherwise.
        return false;
      }
    }, {}); // We've moved the memory object to here...
}
```

Depending on how you count them, this could be an additional significant line of code. So we've effectively made our solution bigger, in order to set up our next change.

### Second step: get some ES6 in there

```javascript
const isIsogram = string => { 
  return string.split('')
    .reduce((memory, letter) => {
      if (memory && memory[letter] !== true) {
        memory[letter] = true;
        return memory;
      } else {
        return false;
      }
    }, {});
};
```

Swapping in arrow functions!

Again, no major changes in speed. But it sets us up for compression once more. Since an arrow function need only have an expression on it's right side, we can can swap out all that if-else madness with...

### Third step: the dreaded ternary 

Ternary operations are the closest thing to an expression conditional that JavasScript provides us. They're also needlessly cryptic and wonderfully terse.

*For the uninitiated:* Ternary operators follow this form:

```javascript
condition ? returned if condition is true : returned if false
```

The important part is that the sections to the right of the `?` are `return`ed. That's what makes a ternary statement an expression. And it's what allows us to compress our algorithim further:

```javascript
const isIsogram = string => {
  return string.split('')
    .reduce((memory, letter) =>
      memory && memory[letter] !== true 
        ? memory[letter] = true && memory
        : false      
    , {});
};
```

Wait, where'd that `&&` come from?

### Fourth step: bitwise for conditions

I fibbed earlier. There's another set of expressive conditional that JavasScript provides us: Bitwise operators. And since the ternary operator expects two expressions to follow the `?`, we needed another way to make our assignment to `memory[letter]` and then return the memory object. 

*For the uninitiated:* The `and` operator (`&&`) returns the rightmost truthy value or the leftmost falsy value. To illustrate:

```javascript
"Hello!" && 1; // returns 1
false && "Hello!"; // returns false
{} && "Hello!" && 1; // returns 1
"Hello!" && false && 1; // returns false
```

In the case of our algorithim, just writing `memory[letter] = true` would return true, so writing `memory[letter] = true && memory` returns memory. Fancy, that!

### Fifth step: uglify

Since our reduce is effectively written on one line (with whitespace to make it readable) we can easily rewrite it as an expression, dropping our return and our curlies.

```javascript
const isIsogram = string => 
  string.split('')
    .reduce((memory, letter) =>
      memory && memory[letter] !== true 
        ? memory[letter] = true && memory
        : false      
    , {});
```

We can also remove every semblance of good style by dropping our declaration and renaming all our variables.

```javascript
i = s => 
  s.split('')
    .reduce((m, l) =>
      m && m[l] !== true 
        ? m[l] = true && m
        : false      
    , {});
```

Once we axe the whitespace and ditch the semicolon, I'd say we're fully compressed!

```javascript
i=s=>s.split('').reduce((m,l)=>m&&m[l]!==true?m[l]=true&&m:false,{})
```

### Bonus section!

Here's some other answers for your consideration. 

The first is a quadratic time 

```javascript
// O(n^2)
const isIsogram = string => (
  !!string.split('')
    .reject(char => string.indexOf(char) === string.lastIndexOf(char))
    .length
);

// And uglifed
i=s=>!!s.split('').reject(c=>s.indexOf(c)===s.lastIndexOf(c)).length
```
```javascript
// O(n)
const isIsogram = string => {
  const counts = string.split('').reduce((obj, char) =>
    obj[char] ? obj[char]++ && obj : obj[char] = 1 && obj, {});

  return Object.keys(counts).reduce((prev, curr) =>
    prev || counts[curr] < 1 ? true : false, true);
};

i=(s,c)=>(c=s.split('').reduce((o,c)=>o[c]?o[c]++&&o:o[c]=1&&o,{}),Object.keys(c).reduce((p,d)=>p||c[d]<1?true:false,true))

```
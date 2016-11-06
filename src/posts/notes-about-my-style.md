---
title: Why I Write Javascript That Way
layout: post.pug
collection: posts
date: 
draft: true
---

My style stems from me being a lazy control freak, with .

I want something to 

### For Heaven's Sake

I really hate writing the C-style for loop. It's error prone, verbose, symbol heavy and -- lets just call it what it is -- *boilerplate*. And before you say it, snippets are still too much work.

If I need the index of each item, I'll use forEach

```javascript
for (let i = 0; i < list.length; i++) {
  //do something
}

for (let item of list) {
  // do something
}

list.forEach((item, index) => {
  // do something
})
```  

### Const and Let

The sooner we never have to teach anyone about hoisting, the better.

### Function Literals

### Semicolons
---
title: Memoize, Throttle and Other Functional Helpers
layout: post.pug
collection: posts
date:
draft: true
---

```javascript
const bind = (context, fn, ...bound) =>
  (...free) => fn.call(context, ...bound, ...free);
```

```javascript
const memoize = fn => {
  const memory = {};

  return (...args) => {
    const argString = JSON.stringify(args);

    if (!(argString in memory)) {
      memory[argString] = fn.call(null, ...args);
    }

    return memory[argString];
  };
};
```


```javascript
const throttle = (fn, interval) => {
  let called = false;

  return (...args) => {
    if (!called) {
      fn.apply(null, args);
      called = true;
      setTimeout(() => called = false, interval);
    }
  }
}
```
---
title: Converting Roman Numerals to a Number (and Back Again)
layout: post.pug
collection: posts
date: 
draft: true
---

Roman numerals! What are they good for? Movie sequels, mostly. But also brain teasers.

The algorithm for transforming

```javascript
const DICTIONARY = {
  I: 1,
  V: 5,
  X: 10,
  L: 50,
  C: 100,
  D: 500,
  M: 1000
};

const romanNumeralsToNumber = numerals => (
  numerals.split('')
    .map(n => DICTIONARY[n])
    .reduceRight((tracker, current) =>
      current > tracker.prev
        ? {total: tracker.total - current, prev: current}
        : {total: tracker.total + current, prev: current}
    , {total: 0, prev: 0})
    .total
);
```
---
title: Markdown Stress Test
layout: post.pug
collection: posts
date: 2016-10-1
---
> dear athetits.... if ___GOD___ dont exists how me a dog learned english? <cite>me a dog</cite>

# Markdown Test Content w/ Unsplash Images

This page is designed to stress test the basic content styles for this theme, starting with the default font for displaying text. This first section is wrapped in a p tag.

## Level 2 content heading

Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.

[Duis aute irure dolor]() in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. [Excepteur]() sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

### Level 3 content heading

Vestibulum vitae dictum lectus, elementum fringilla orci. Maecenas a est non lorem molestie aliquet. Duis laoreet pretium nisi a molestie.

#### Level 4 content heading

Morbi metus risus, volutpat lobortis dui a, placerat maximus purus. Fusce rutrum nisi ut porta pellentesque. Duis non hendrerit urna. Vestibulum eu cursus odio. Mauris pulvinar sagittis ante sit amet imperdiet.

---

Here are some simple bullet lists, without inner `<p>` tags.

##### Unordered list

- Unordered list item
- Unordered list item with a nested list
    - Nested unordered list item
    - Nested unordered list item
- Unordered list item
- Unordered list item

##### Ordered list

1. Ordered list item
2. Ordered list item with a nested list
    1. Ordered list item
    2. Ordered list item
3. Ordered list item
4. Ordered list item

##### Horizontal Rule

Here is an example of a horizontal rule

---

In HTML5 the HTML `<hr>` element represents a thematic break between paragraph-level elements (for example, a change of scene in a story, or a shift of topic with a section). In previous versions of HTML, it represented a horizontal rule. It may still be displayed as a horizontal rule in visual browsers, but is now defined in semantic terms, rather than presentational terms.


##### Preformatted Text

Typically displayed in a non-proportional font exactly as it is laid out in the file. Whitespaces inside this element are displayed as typed.

```html
<div class="code-example">
  <h2>This is some example code</h2>
  <p>It should serve as an example.</p>
</div>
```

##### Block Quote

> Indicates that the enclosed text is an extended quotation. Usually, this is rendered visually by indentation (see Notes for how to change it). A URL for the source of the quotation may be given using the cite attribute, while a text representation of the source can be given using the `cite` element.


##### Images

Here are some images marked up in a few different ways. This first example uses Markdown syntax like

```
    ![Alt text](/path/to/img.jpg "Optional title")
```


![This is a proper figure + figcaption - Multi-Markdown.](https://source.unsplash.com/2Q8zDWkj0Yw/400x225)



The following example uses an HTML `<img>` tag, followed by a markdown style line break, followed by a span of italic text:

<img src="https://source.unsplash.com/2Q8zDWkj0Yw/400x225">
_This is an implied caption._

Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.


##### Naked text

Here is a regular paragraph of text.

<div>This section of text is not wrapped in a <code>p</code> tag — just a plain <code>div</code> tag. Compare the style of this text with the text above. Pay attention to any differences in font-family, font-style, font-weight, font-size, line-spacing, letter-spacing, etc. If it looks different from the preceding paragraph in any way you should know the reason why. Because it is wrapped in a div, this section of text should not contain any default margin or padding. </div>

Here is a regular paragraph of text.

##### Image Series

<div class="thumbs">
<img src="https://source.unsplash.com/2Q8zDWkj0Yw/400x225" alt="">
<img src="https://source.unsplash.com/cFplR9ZGnAk/400x225" alt="">
<img src="https://source.unsplash.com/DSwBHyWKiVw/400x225" alt="">
<img src="https://source.unsplash.com/Yvaej69Nuyw/400x225" alt="">
<img src="https://source.unsplash.com/e-S-Pe2EmrE/400x225" alt="">
<img src="https://source.unsplash.com/74ytEYcOJDc/400x225" alt="">
<img src="https://source.unsplash.com/l61smgU3Y7w/400x225" alt="">
<img src="https://source.unsplash.com/Pk8t4cL2pkw/400x225" alt="">
</div>

#### Tables

Colons can be used to align columns.

| Tables        | Are           | Cool  |
| ------------- |:-------------:| -----:|
| col 3 is      | right-aligned | $1600 |
| col 2 is      | centered      |   $12 |
| zebra stripes | are neat      |    $1 |

The outer pipes (|) are optional, and you don't need to make the raw Markdown line up prettily. You can also use inline Markdown.

Markdown | Less | Pretty
--- | --- | ---
*Still* | `renders` | **nicely**
1 | 2 | 3


# Go
```go
// Comments too!
package main

import "fmt"
func main() {
    fmt.Println("hello world")
}
```

# Javascript
```javascript
// Comments too!
console.log('hello world');
```

# Rust
```rust
fn main() {
  // Comments too!
  println!("Hello World!");
}
```

# Ruby
```ruby
# Comments too!
puts 'hello world'
```

# Perl
```perl
# Comments too!
use strict;
use warnings;

print "hello world\n";
```
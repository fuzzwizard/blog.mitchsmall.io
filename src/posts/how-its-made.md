---
title: How This Blog Got Here
layout: post.pug
collection: posts
date: 2016-10-3
---
So it turns out I'm a fool.

When confronted with the option between quickly deploying a good-looking, ready-made blogging platform and struggling to develop a new toolchain and deploy my own server, I chose the latter. On the bright side, now I know I can do it. On the dim side, this took me _entirely_ too long.

## The Hard-Won Toolchain

### Metalsmith

The static site generator at it's heart is Metalsmith, a lightweight file processing system built in node. You'll often see it billed as a static site generator but it can do a lot more considering the plugin ecosystem behind it.

I struggled the most with maintaining a consistent file structure, as some plugins preferred the root directory over the source directory for where they sourced their data. Here's the structure I ended up employing:

```bash
.
├── layouts
├── scss
└── src
    ├── pages
    └── posts
```

And here's my relevant plugins:

```json
"metalsmith-babel": "^4.1.0",
"metalsmith-collections": "^0.7.0",
"metalsmith-define": "^2.0.1",
"metalsmith-drafts": "0.0.1",
"metalsmith-html-minifier": "^2.1.0",
"metalsmith-layouts": "^1.4.1",
"metalsmith-markdown": "^0.2.1",
"metalsmith-metallic": "^1.0.0",
"metalsmith-permalinks": "^0.1.0",
"metalsmith-sass": "^1.3.0",
"metalsmith-snippet": "^2.0.0"
```

Other than collections (which organizes my posts and pages into data structures that I can access within my templates), define (which handles my metadata, including CDNs), permalinks and snippets, these have more to do with how I style and structure my pages.

### Templating

For templating, I chose [Pug](http://www.pugjs.org), which was frankly a leap of faith. Back when it was called Jade, I'd given it a glance but nothing that would actually mean  that I 'knew' it. As it turns out, though, it's just HTML with the boring stuff removed, so it was no problem writing simple, semantic templates.

### Styling

Pretty straightforward: I'm using SCSS, processed through node-sass. Quite unlike Pug, I have a lot of experience with it so it. Rather than switching to Sass syntax to align with my choice of templating language

### Markdown

Because writing HTML is for squares. All posts are written in markdown and automatically processed through the Metalsmith pipeline.

### Post-processing

Babel is entirely superfluous at the given moment, since I've done next to no scripting for this blog other than rendering timestamps human-readable, but it's there. Metallic is here for syntax highlighting, and HTML Minifier does what it says on the tin.

### Server, Deployment and Development

I wrote a quick server (shoutout to Jon Deng's [article on the subject](https://medium.com/jondengdevelops/deploy-your-front-end-app-in-20-lines-of-code-24be44f8b51) for helping me realize how easy it is) and a github VPS to deliver it to a Digital Ocean droplet.

I also wrapped the Metalsmith build process in a glob-watcher because `metalsmith-watch` turned out to have a tendency of holding on to long-dead test posts.

__Update (2016-11-15):__ I added `just` as a task runner. [It's good as all hell.](https://github.com/casey/just)
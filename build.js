const metalsmith = require('metalsmith');

const htmlMinifier = require('metalsmith-html-minifier');
const collections = require('metalsmith-collections');
const permalinks = require('metalsmith-permalinks');
const snippets = require('metalsmith-snippet');
const markdown = require('metalsmith-markdown');
const metallic = require('metalsmith-metallic');
const layouts = require('metalsmith-layouts');
const drafts = require('metalsmith-drafts');
const define = require('metalsmith-define');
const babel = require('metalsmith-babel');
const sass = require('metalsmith-sass');

metalsmith(__dirname)
  .use(define({
    blog: {
      title: 'Things I\'ve Said, Unfortunately',
      description: 'Software maker. Word writer. Game player. Beverage drinker.',
      url: 'http://blog.mitchsmall.io'
    },
    widget: [
      { title: 'github', path: 'http://.github.com/fuzzwizard'},
      { title: 'portfolio', path: 'http://mitchsmall.io'}
    ],
    highlightjs: 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.7.0/styles/darcula.min.css',
    fontawesome: 'https://maxcdn.bootstrapcdn.com/font-awesome/4.6.3/css/font-awesome.min.css',
    normalize: 'https://cdnjs.cloudflare.com/ajax/libs/normalize/4.2.0/normalize.min.css',
    moment: require('moment')
  }))
  .use(sass({
    outputStyle: 'expanded',
    includePaths: ['scss']
  }))
  .use(drafts())
  .use(collections({
    posts: {
      sortBy: 'date',
      reverse: true
    },
    pages: {}
  }))
  .use(babel({
    presets: ['es2015']
  }))
  .use(metallic())
  .use(markdown({
    smartypants: true,
    gfm: true,
    tables: true
  }))
  .use(permalinks({
    path: ':title'
  }))
  .use(snippets({
    maxLength: 450,
    stripHtml: false
  }))
  .use(layouts({
    engine: 'pug',
    directory: 'layouts'
  }))
  .use(htmlMinifier())
  .source('./src')
  .destination('./build')
  .build((err) => {
    if (err) {
      throw new Error(err);
    }
  });
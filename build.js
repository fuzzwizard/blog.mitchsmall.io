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

const {defines} = require('./config.js');

metalsmith(__dirname)
  .use(define(defines))
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
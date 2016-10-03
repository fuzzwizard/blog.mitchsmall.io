const {DEFINES, PATHS} = require('./config.js');
const ARGS = process.argv.slice(2);

const Metalsmith = require('metalsmith');

const htmlMinifier  = require('metalsmith-html-minifier');
const collections   = require('metalsmith-collections');
const permalinks    = require('metalsmith-permalinks');
const snippets      = require('metalsmith-snippet');
const markdown      = require('metalsmith-markdown');
const metallic      = require('metalsmith-metallic');
const layouts       = require('metalsmith-layouts');
const drafts        = require('metalsmith-drafts');
const define        = require('metalsmith-define');
const babel         = require('metalsmith-babel');
const sass          = require('metalsmith-sass');

const colors  = require('colors');
const watch   = require('glob-watcher');

const build = (done) => {
  console.log(done
    ? `Changes detected.`.yellow
    : `Building...`.yellow);

  // TODO(Mitch): Vett the order of the .use statements and organize if possible.
  Metalsmith(__dirname)
    .use(define(DEFINES))
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
    .use(babel({ presets: ['es2015'] }))
    .use(htmlMinifier())
    .source(`./${PATHS.source}`)
    .destination(`./${PATHS.destination}`)
    .build((err) => {
      if (err) {
        throw new Error(err);
      }
      console.log('Build complete.'.yellow);
    });

  if (done) done();
}

const targets = [
  'src/**/*.md',
  'src/**/*.js',
  'src/pages/**/*.md',
  'src/posts/**/*.md',
  'layouts/**/*.pug',
  'scss/**/*.scss'
];

build(); // initial build

if (ARGS[0] === '--watch') {
  const str =
    'Watching for changes in:' +
    `${ targets.map(p => `\n\t${p}`) }`;

  console.log(str.yellow);
  watch(targets, build); // begin watch-build loop
}
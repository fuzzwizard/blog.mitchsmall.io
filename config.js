const defines = {
  blog: {
    title: 'Things I\'ve Said, Unfortunately',
    description: 'Software maker. Word writer. Game player. Beverage drinker.',
    url: 'http://blog.mitchsmall.io'
  },
  widget: [
    { title: 'github', path: 'http://.github.com/fuzzwizard'},
    { title: 'portfolio', path: 'http://mitchsmall.io'}
  ],
  CDN: {
    highlightjs: {
      url: 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.7.0/styles/darcula.min.css'
    },
    fontawesome: {
      url: 'https://maxcdn.bootstrapcdn.com/font-awesome/4.6.3/css/font-awesome.min.css'
    },
    normalize: {
      url: 'https://cdnjs.cloudflare.com/ajax/libs/normalize/4.2.0/normalize.min.css'
    },
    moment: {
      url: 'https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.15.1/moment.min.js',
      integrity: 'sha256-4PIvl58L9q7iwjT654TQJM+C/acEyoG738iL8B8nhXg='
    },
    jquery: {
      url: 'http://code.jquery.com/jquery-3.1.1.slim.js',
      integrity: 'sha256-5i/mQ300M779N2OVDrl16lbohwXNUdzL/R2aVUXyXWA='
    }
  }
};

exports.defines = defines;
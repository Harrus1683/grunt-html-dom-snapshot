'use strict';

const fs = require('fs');

function readPages(name) {
  return {
    expected: readPage('pages/' + name),
    actual: readPage('snapshots/' + name)
  }
}

function readPage(path) {
  const content = fs.readFileSync('test/' + path).toString();
  return content.replace(/\r|\n/g, '');
}

exports['html-dom-snapshot'] = {
  'single-target': function (test) {
    const pages = readPages('single-target.html');
    test.equal(pages.expected, pages.actual, 'single-target.html');
    test.done();
  },

  'static': function (test) {
    const pages = readPages('static.html');
    test.equal(pages.expected, pages.actual, 'static.html');
    test.done();
  },

  'delayed': function (test) {
    const pages = readPages('delayed.html'),
          expected = pages.expected.replace('<body></body>', '<body>delayed</body>');
    test.equal(expected, pages.actual, 'delayed.html');
    test.done();
  },

  'dynamic': function (test) {
    const pages = readPages('dynamic.html'),
          expected = pages.expected.replace('<body>', '<body class="dynamic">');
    test.equal(expected, pages.actual, 'dynamic.html');
    test.done();
  },

  'dynamic-reverse': function (test) {
    const pages = readPages('dynamic-reverse.html');
    test.equal(pages.expected, pages.actual, 'dynamic-reverse.html');
    test.done();
  },

  'dynamic-delayed': function (test) {
    const pages = readPages('dynamic-delayed.html'),
          expected = pages.expected.replace('<body></body>', '<body class="dynamic">delayed</body>');
    test.equal(expected, pages.actual, 'dynamic-delayed.html');
    test.done();
  },

  'dynamic-custom': function (test) {
    const pages = readPages('dynamic-custom.html'),
          expected = pages.expected.replace('<body>', '<body class="dynamic">');
    test.equal(expected, pages.actual, 'dynamic-custom.html');
    test.done();
  },

  'no-doctype': function (test) {
    const pages = readPages('no-doctype.html');
    test.equal(pages.expected, pages.actual, 'no-doctype.html');
    test.done();
  },

  'dynamic-multiple': function (test) {
    const original = readPage('pages/dynamic-multiple.html'),
          first = readPage('snapshots/dynamic-first.html'),
          second = readPage('snapshots/dynamic-second.html'),
          third = readPage('snapshots/dynamic-third.html');
    var expected = original;
    test.equal(expected, first, 'dynamic-first.html');
    expected = original.replace('<body class="first">', '<body class="first second">');
    test.equal(expected, second, 'dynamic-second.html');
    expected = original.replace('<body class="first">', '<body class="first second third">');
    test.equal(expected, third, 'dynamic-third.html');
    test.done();
  }
};

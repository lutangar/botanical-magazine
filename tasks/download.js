#!/usr/bin/env node
var fetch = require('node-fetch');
var cheerio = require('cheerio');
var fs = require('fs');
var slug = require('slug');

var downloadDir = './downloads/';

// fetch author's books
fetch('http://www.gutenberg.org/ebooks/author/7233')
  .then(function(response) {
    if (response.status == 403) {
      return console.warn('You\'ve been banned for 24h. Try again later.');
    }

    if (response.url == 'http://www.gutenberg.org/w/captcha/question/') {
      return console.warn('You\'ve been flag as robot. Try again later.');
    }

    return response.text();
  }).then(function(body) {
    $ = cheerio.load(body);

    var books = $('.booklink a.link[href]').map(function() {
      var bookId = $(this).attr('href').match('[0-9]+')[0];
      var uri = 'http://www.gutenberg.org/files/'+bookId+'/'+bookId+'-h/'+bookId+'-h.htm';
      var uriParts = uri.split('/');

      return {
        uri: uri,
        filename: downloadDir+uriParts[uriParts.length-1]
      };
    }).get();

    downloadBooks(books);
  });

function downloadBooks(books) {
  for (var i = 0; i < books.length; i++) {
    console.log(i);
    var book = books[i];
    fs.exists(book.filename, function (exists) {
      if (exists) {
        console.log('Book already exists', book.filename);
        return;
      } else {
        console.log('But Book dont', book.filename);
      }

      fetch(book.uri)
        .then(function(response) {
          if (response.status == 403) {
            return console.warn('You\'ve been banned for 24h, come back later.');
          }

          if (response.url == 'http://www.gutenberg.org/w/captcha/question/') {
            return console.warn('You\'ve been flag as robot. Try again later.');
          }

          return response.text();
        }).then(function(body) {
          fs.writeFile(book.filename, body, function(err) {
            if (err) {
              return console.error(err);
            }
          });
        });
    });
  }
}
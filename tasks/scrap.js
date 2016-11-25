#!/usr/bin/env node
var fetch = require('node-fetch');
var cheerio = require('cheerio');
var fs = require('fs');
var slug = require('slug');
var r = require('roman-decimal');

var downloadDir = './downloads/';

fs.readdir(downloadDir, function( err, files ) {
  if (err) {
    console.error('Could not list the directory.', err);
    process.exit(1);
  }

  var database = {};
  var flowers = [];
  database.volumes = [];
  files.forEach( function( file, index ) {
    fs.readFile(downloadDir+file, function (err, data) {
      if (err) {
        throw err;
      }

      if (!data) {
        console.warn('Empty file', file);
      }

      $ = cheerio.load(data);

      var volume = {};
      volume.number = 1;
      volume.gutembergId = file.match('[0-9]+')[0];
      volume.flowers = [];
      volume.title = 'The Botanical Magazine';
      volume.alternativeTitle = 'The Botanical Magazine';
      volume.author = 'William Curtis';
      volume.description = 'IN WHICH The most Ornamental Foreign Plants, cultivated in the Open Ground, ' +
        'the Green-House, and the Stove, are accurately represented in their natural Colours. ' +
        'TO WHICH ARE ADDED, Their Names, Class, Order, Generic and Specific Characters, according to the celebrated Linnæus; ' +
        'their Places of Growth, and Times of Flowering: TOGETHER WITH THE MOST APPROVED METHODS OF CULTURE. ' +
        'A WORK Intended for the Use of such Ladies, Gentlemen, and Gardeners, as wish to become scientifically acquainted with the Plants they cultivate.'
      ;

      volume.poem = $('.poem').text();

      database.preface = {
        paragraphs: [
          'The present periodical publication owes its commencement to the repeated solicitations of several Ladies and Gentlemen, Subscribers to the Author\'s Botanic Garden, who were frequently lamenting the want of a work, which might enable them, not only to acquire a systematic knowledge of the Foreign Plants growing in their gardens, but which might at the same time afford them the best information respecting their culture in fact, a work, in which Botany and Gardening (so far as relates to the culture of ornamental Plants) or the labours of Linnæus and Miller, might happily be combined.',
          'In compliance with their wishes, he has endeavoured to present them with the united information of both authors, and to illustrate each by a set of new figures, drawn always from the living plant, and coloured as near to nature, as the imperfection of colouring will admit.',
          'He does not mean, however, to confine himself solely to the Plants contained in the highly esteemed works of those luminaries of Botany and Gardening, but shall occasionally introduce new ones, as they may[Pg 004] flower in his own garden, or those of the curious in any part of Great-Britain.',
          'At the commencement of this publication, he had no design of entering on the province of the Florist, by giving figures of double or improved Flowers, which sometimes owe their origin to culture, more frequently to the sportings of nature; but the earnest entreaties of many of his Subscribers, have induced him so far to deviate from his original intention, as to promise them one, at least, of the Flowers most esteemed by Florists.',
          'The encouragement given to this work, great beyond the Author\'s warmest expectations, demands his most grateful acknowledgements, and will excite him to persevere in his humble endeavours to render Botany a lasting source of rational amusement; and public utility.',
        ],
        places: ['Botanic Garden', 'Lambeth-Marsh'],
        year: '1787',
      };

      var volumeNode = $('h3, p.center b').filter(function() {
        return $(this).text().match('VOL. ([IVXLCDM]+)') !== null;
      });

      console.log(volumeNode.text());

      volumeNode = volumeNode.first();

      var quote = volumeNode.nextAll('.center, .figcenter').first();
      // console.log(quote.text());

      var author = volumeNode.nextAll('.author').first();
      if (author.text() == '') {
        author = quote.find('.smcap')
      }

      volume.author = author.text();

      volume.quote = quote.text();

      console.log(volumeNode.text());
      volume.number = r.decimal(volumeNode.text().match('VOL. ([IVXLCDM]+)')[1]);
      volume.sameAs = `http://www.gutenberg.org/files/${volume.gutembergId}/${volume.gutembergId}-h/${volume.gutembergId}-h.htm`;

      // retrieve flower ids
      var ids = $('h2').filter(function(i, el) {
        return $(this).find('a[name]').length > 0 && $(this).text() !== 'INDEX.';
      });

      for (var i = 0; i < ids.length; i++) {
        var htmlId = ids.eq(i).find('a').attr('id');

        var pageElements = ids.eq(i).nextUntil('h2');
        var pageHtml = '<body>'+ ids.eq(i).toString() + '\r\n' + pageElements.map(function(i, el) {
            return $(this).toString();
          }).get().join('\r\n')+'</body>';

        var flower = {};
        var $ = cheerio.load(pageHtml);

        if ($('h2').text().match('[0-9]+') !== null) {
          flower.id = parseInt($('h2').text().match('[0-9]+')[0], 10);
        }

        flower.latinName = $('h2 a.span, p.center').first().text().split('.')[0];
        flower.commonName = $('p.center').first().text().split('.')[1];
        flower.slug = slug(flower.latinName, {
          lower: true,
          replacement: '-'
        });
        flower.volume = Math.floor(i/36)+1;
        flower.sameAs = `http://www.gutenberg.org/files/${volume.gutembergId}/${volume.gutembergId}-h/${volume.gutembergId}-h.htm#${htmlId}`;

        volume.id = flower.volume;
        volume.flowers.push(flower.id);

        var imageURL = $('div.figcenter a').attr('href');
        if (imageURL) {
          var imageParts = imageURL.split('.');

          var imageExtension = imageParts[imageParts.length - 1];
          flower.image = slug(flower.latinName, {
              lower: true,
              replacement: '_'
            }) + '.' + imageExtension;

          var imageFullURL = `http://www.gutenberg.org/files/${volume.gutembergId}/${volume.gutembergId}-h/${imageURL}`;
          fetch(imageFullURL)
            .then(function(res) {
              var dest = fs.createWriteStream(flower.image);
              res.body.pipe(dest);
            })
            .catch(function(err) {
              console.log(err);
            })
          ;
        }

        flower.classAndOrder = $(
          'h2 + p.center + p.center + p.center, ' +
          'h2 + p.center + p.center + div.blockquot'
        ).text().replace('.', '');
        flower.genericCharacters = $(
          'h2 ~ p.center + p.center + p.center + p.center + p.center,' +
          'h2 ~ p.center + p.center + p.center + p.center + div.blockquot'
        ).text().split('. ').filter((c) => c !== '' ) || [];
        flower.synonyms = $(
          'blockquote, h2 ~ p.center + p.center + p.center + p.center + div.blockquot + p.center + div.blockquot'
        ).text().split("\n\n").filter((c) => c !== '' ) || [];
        flower.description = $('h2 ~ p:not(.center)').filter(function (i, el) {
          return $(this).find('span.pagenum').length == 0;
        }).text().replace("\n", ' ').replace('  ', ' ');

        flower.pages = $('p > span.pagenum').map(function (i, el) {
          return parseInt($(this).text().match('[0-9]+'), 10);
        }).get() || [];

        flowers.push(flower);
      }

      if (flower) {
        if (flower.pages.length > 0) {
          volume.numberOfPages = flower.pages.reduce((p, v) => (p < v ? p : v));
        }
        database.flowers = flowers;
      }

      database.volumes.push(volume);

      fs.writeFile('database.json', JSON.stringify(database));
    });
  });
});

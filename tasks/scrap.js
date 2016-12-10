#!/usr/bin/env node
import fetch from 'node-fetch';
import cheerio from 'cheerio';
import fs from 'fs';
import slug from 'slug';
import r from 'roman-decimal';
import levenshtein from 'fast-levenshtein';

const downloadDir = './downloads/';
const imgDir = './public/img/flower/';

fs.readdir(downloadDir, (err, files ) => {
  if (err) {
    console.error('Could not list the directory.', err);
    process.exit(1);
  }

  const charmap = { 'æ': 'ae', 'œ': 'oe' };
  const database = {
    volumes: [],
    flowers: [],
    classes: [
      {
        id: 1,
        name: 'Monandria',
        description: 'Flowers with 1 stamen.',
        orders: [1, 2],
        classes: [],
        flowers: [],
      },
      {
        id: 2,
        name: 'Diandria',
        description: 'Flowers with 2 stamens.',
        orders: [1, 2, 3],
        classes: [],
        flowers: [],
      },
      {
        id: 3,
        name: 'Triandria',
        description: 'Flowers with 3 stamens.',
        orders: [1, 2, 3],
        classes: [],
        flowers: [],
      },
      {
        id: 4,
        name: 'Tetrandria',
        description: 'Flowers with 4 stamens.',
        orders: [1, 2, 3],
        classes: [],
        flowers: [],
      },
      {
        id: 5,
        name: 'Pentandria',
        description: 'Flowers with 5 stamens.',
        orders: [1, 2, 3, 4, 5, 6, 13],
        classes: [],
        flowers: [],
      },
      {
        id: 6,
        name: 'Hexandria',
        description: 'Flowers with 6 stamens.',
        orders: [1, 2, 3, 4, 6, 13],
        classes: [],
        flowers: [],
      },
      {
        id: 7,
        name: 'Heptandria',
        description: 'Flowers with 7 stamens.',
        orders: [1, 2, 3, 7],
        classes: [],
        flowers: [],
      },
      {
        id: 8,
        name: 'Octandria',
        description: 'Flowers with 8 stamens.',
        orders: [1, 2, 3, 4],
        classes: [],
        flowers: [],
      },
      {
        id: 9,
        name: 'Enneandria',
        description: 'Flowers with 9 stamens.',
        orders: [1, 3, 6],
        classes: [],
        flowers: [],
      },
      {
        id: 10,
        name: 'Decandria',
        description: 'Flowers with 10 stamens.',
        orders: [1, 2, 3, 5, 10],
        classes: [],
        flowers: [],
      },
      {
        id: 11,
        name: 'Dodecandria',
        description: 'Flowers with 12 stamens.',
        orders: [1, 2, 3, 4, 5, 12],
        classes: [],
        flowers: [],
      },
      {
        id: 12,
        name: 'Icosandria',
        description: 'Flowers with 20 (or more) stamens, perigynous.',
        orders: [1, 5, 13],
        classes: [],
        flowers: [],
      },
      {
        id: 13,
        name: 'Polyandria',
        description: 'Flowers with many stamens, inserted on the receptacle.',
        orders: [1, 2, 3, 4, 5, 6, 13],
        classes: [],
        flowers: [],
      },
      {
        id: 14,
        name: 'Didynamia',
        description: 'Flowers with 4 stamens, 2 long and 2 short.',
        orders: [141, 142],
        classes: [],
        flowers: [],
      },
      {
        id: 15,
        name: 'Tetradynamia',
        description: 'Flowers with 6 stamens, 4 long and 2 short',
        orders: [151, 152],
        classes: [],
        flowers: [],
      },
      {
        id: 16,
        name: 'Monadelphia',
        description: 'Flowers with the anthers separate, but the filaments united, at least at the base.',
        classes: [3, 5, 7, 8, 10, 11, 13],
        orders: [],
        flowers: [],
      },
      {
        id: 17,
        name: 'Diadelphia',
        description: 'Flowers with the stamens united in two separate groups.',
        classes: [5, 6, 8, 10],
        orders: [],
        flowers: [],
      },
      {
        id: 18,
        name: 'Polyadelphia',
        description: 'Flowers with the stamens united in several separate groups',
        classes: [11, 12, 13],
        orders: [],
        flowers: [],
      },
      {
        id: 19,
        name: 'Syngenesia',
        description: 'Flowers with 5 stamens, the anthers united at their edges',
        orders: [191, 192, 193, 194, 195, 196],
        classes: [],
        flowers: [],
      },
      {
        id: 20,
        name: 'Gynandria',
        description: 'Flowers with the stamens united to the pistils',
        classes: [1, 2, 3, 4, 5, 6, 8],
        orders: [],
        flowers: [],
      },
      {
        id: 21,
        name: 'Monoecia',
        description: 'Monoecious plants; Consists of those which have a male and female organs in separate flowers, but on the same plant.',
        classes: [1, 2, 3, 4, 5, 6, 13, 16],
        orders: [],
        flowers: [],
      },
      {
        id: 22,
        name: 'Dioecia',
        description: 'Dioecious plants;',
        classes: [1, 2, 3, 4, 5, 6, 13, 16],
        orders: [],
        flowers: [],
      },


      // polygamia
      {
        id: 23,
        name: 'Polygamia',
        description:
        'Polygamodioecious plants. Stamina and pistilla seperate in some flowers, united in others, either on the same plant, or on two or three distinct plants; such difference in the essential organs beings accompanied with a diversity in the accessory parts of the flowers.' +
        '(From roAus, many, and Yauos, a marriage.) Polygamy. The name of a class of in the sexual system of Linnaeus consisting of polygamous plants or plants having hermaphrodite and likewise male and female flowers or both. The orders of this division are according to the uniformity or plan which runs through this system distinguished upon the principles of Classes Monaccia Diascia and Triacia.',
        classes: [21, 22],
        orders: [],
        flowers: [],
      },
      {
        id: 24,
        name: 'Cryptogamia',
        description: 'The "flowerless" plants, including ferns, fungi, algae, and bryophytes',
        orders: [241, 242, 243, 244],
        classes: [],
        flowers: [],
      }
    ],
    orders: [
      // -gynia
      {
        id: 1,
        name: "Monogynia",
        description: "Flowers with only one pistil.",
        flowers: [],
      },
      {
        id: 2,
        name: "Digynia",
        description: "Flowers with two pistils.",
        flowers: [],
      },
      {
        id: 3,
        name: "Trigynia",
        description: "Flowers with three pistils.",
        flowers: [],
      },
      {
        id: 4,
        name: "Tetragynia",
        description: "Flowers with four pistils.",
        flowers: [],
      },
      {
        id: 5,
        name: "Pentagynia",
        description: "Flowers with five pistils.",
        flowers: [],
      },
      {
        id: 6,
        name: "Hexagynia",
        description: "Flowers with six pistils.",
        flowers: [],
      },
      {
        id: 7,
        name: "Heptagynia",
        description: "Flowers with seven pistils.",
        flowers: [],
      },
      {
        id: 10,
        name: "Decagynia",
        description: "Flowers with ten pistils.",
        flowers: [],
      },
      {
        id: 12,
        name: "Dodecagynia",
        description: "Flowers with twelve pistils.",
        flowers: [],
      },
      {
        id: 13,
        name: "Polygynia",
        description: "Flowers with many pistils.",
        flowers: [],
      },

      // -spermia
      {
        id: 141,
        name: "Gymnospermia",
        description: "(From γυμνός, naked, and σπέρμα, a seed.) The name of an order of the class Didynamia, of the sexual system of plants, embracing such as have added to the didynamial character, four naked seeds.",
        source: "Lexicon Medicum, Or, Medical Dictionary: Containing an Explanation of the ... By Robert Hooper",
        flowers: [],
      },
      {
        id: 142,
        name: "Angiospermia",
        description: "(From ἄγγος, a vessel, and σπέρμα, a seed.) The name of an order of plants in the class Didynamia of the sexual system of Linnaeus, the seeds of which are lodged in a pericarpium or seed-vessel",
        source: "Lexicon Medicum, Or, Medical Dictionary: Containing an Explanation of the ... By Robert Hooper",
        flowers: [],
      },

      // -gamia
      {
        id: 191,
        name: "Polygamia Æqualis",
        description: "The name of an order of Class Syngenesia of the sexual system of plants. The florets are all perfect or united, that is, each furnished with perfect stamens",
        flowers: [],
      },
      {
        id: 192,
        name: "Polygamia Frustranea",
        description: "Florets of the disk, with stamens and pistil : those of the radius with merely an abortive pistil, or with not even the rudiments of any.",
        flowers: [],
      },
      {
        id: 193,
        name: "Polygamia necessaria",
        description: "Florets of the disk, with stamens only, those of the radius with pistils only.",
        flowers: [],
      },
      {
        id: 194,
        name: "Polygamia segregata",
        description: "Several flowers, either simple or compound, but with united anthers, and with a proper calyx, included in one common calyx.",
        flowers: [],
      },
      {
        id: 195,
        name: "Polygamia Superflua",
        description: "Florets of the disk, with stamens and pistil : those of the radius with pistil only, but each, of both kinds, forming perfect seed.",
        flowers: [],
      },
      {
        id: 196,
        name: "Monogamia",
        flowers: [],
      },

      // sili-
      {
        id: 151,
        name: "Siliculosa",
        description: "Consisting of such as have a silicula. A silicula is a pouch or pod, that is scarcely longer than it is broad",
        source: "Lexicon Medicum, Or, Medical Dictionary: Containing an Explanation of the ... By Robert Hooper",
        flowers: [],
      },
      {
        id: 152,
        name: "Siliquosa",
        description:
          "(From siliqua, a pod) Cruciformis. The name of an order of plants in Linnaeus Fragments of a Ntural Method, consisting of such as have a siliqua or silicula, the flower tetradynamous and cruciate.\n" +
          "A siliqua is a long, dry membranaceous pericarpium, or seed-vessel, of two valves, separated by a linear receptacle, along the edges of each of which, the seeds are arranged alternately. The dissepiment is a partition dividing a siliqua and silicula into two loculaments, or cells.\n" +
          "Botanists distinguish,\n"+
          "1. The round pod in Fumario lutea, and Cheiranthus tricus pidatus.\n"+
          "2. The compressed, with level valves, in Cheiranthus.\n"+
          "3. The four-edged, in Erysimun; Cheiranthus crysimoides, and Brassica orientalis.\n"+
          "4. Articulate, in Raphanus raphanistrum.\n"+
          "5. The tortulose, which has elevated nodes here and there, in Raphanus sativus.\n"+
          "6. Rastrate, having the partition very prominent at the apex; as in Sinapis alba.\n",
        source: "Lexicon Medicum, Or, Medical Dictionary: Containing an Explanation of the ... By Robert Hooper",
        flowers: [],
      },

      // cryptogamia
      {
        id: 241,
        name: "Filices",
        description: '',
        flowers: [],
      },
      {
        id: 242,
        name: "Musei",
        description: '',
        flowers: [],
      },
      {
        id: 243,
        name: "Algæ",
        description: '',
        flowers: [],
      },
      {
        id: 244,
        name: "Fungi",
        description: '',
        flowers: [],
      }
    ]
  };

  database.classes = database.classes.map(c => {
    return { ...c, slug: slug(c.name, { lower: true, replacement: '-', charmap }) };
  });

  database.orders = database.orders.map(c => {
    return { ...c, slug: slug(c.name, { lower: true, replacement: '-', charmap }) };
  });

  files.forEach((file, index) => {
    fs.readFile(downloadDir+file, (err, data) => {
      // if (file !== '23579-h.htm') {
      //   return;
      // }

      if (err) {
        throw err;
      }

      if (!data) {
        console.warn('Empty file', file);
      }


      let $ = cheerio.load(data);

      const volume = {
        number: 1,
        gutembergId: file.match('[0-9]+')[0],
        flowers: [],
        title: 'The Botanical Magazine',
        alternativeTitle: 'The Botanical Magazine',
        author: 'William Curtis',
        description: 'IN WHICH The most Ornamental Foreign Plants, cultivated in the Open Ground, ' +
          'the Green-House, and the Stove, are accurately represented in their natural Colours. ' +
          'TO WHICH ARE ADDED, Their Names, Class, Order, Generic and Specific Characters, according to the celebrated Linnæus; ' +
          'their Places of Growth, and Times of Flowering: TOGETHER WITH THE MOST APPROVED METHODS OF CULTURE. ' +
          'A WORK Intended for the Use of such Ladies, Gentlemen, and Gardeners, as wish to become scientifically acquainted with the Plants they cultivate.',
        poem: $('.poem').text(),
    };

      let volumeNode = $('h3, p.center b')
        .filter(function() {
          return $(this).text().match('VOL. ([IVXLCDM]+)') !== null
        });

      volumeNode = volumeNode.first();

      const quote = volumeNode.nextAll('.center, .figcenter').first();
      // console.log(quote.text());

      let author = volumeNode.nextAll('.author').first();
      if (author.text() == '') {
        author = quote.find('.smcap')
      }

      volume.author = author.text();
      volume.quote = quote.text();

      volume.number = r.decimal(volumeNode.text().match('VOL. ([IVXLCDM]+)')[1]);
      volume.sameAs = `http://www.gutenberg.org/files/${volume.gutembergId}/${volume.gutembergId}-h/${volume.gutembergId}-h.htm`;

      let yearNode = $('p.center')
        .filter(function() {
          let matches =$(this).text().match('([M ]{1,2}[DCC ]{3,4}[XCIV ]+).');
          return matches !== null && matches[1].length > 2;
        });

      volume.datePublished = r.decimal(yearNode.text().match('([M ]{1,2}[DCC ]{3,4}[XCIV ]+).')[1].replace(' ', '').replace(' ', '').replace(' ', '').replace(' ', ''));

      // retrieve flower ids
      const ids = $('h2')
        .filter(function() { return $(this).text().match('[0-9]+') !== null && $(this).text() !== 'INDEX.'; });

      let i = 0;
      for (i; i < ids.length; i++) {
        const htmlId = ids.eq(i).find('a').attr('id');
        const pageElements = ids.eq(i).nextUntil('hr[style], hr.chap');
        const pageHtml = `
          <body>
            ${ids.eq(i).toString()}
            ${pageElements.map(function () { return $(this).toString().replace('æ', '&aelig;'); }).get().join('\r\n')}
          </body>
        `;

        const flower = {};
        $ = cheerio.load(pageHtml);

        if ($('h2').text().match('[0-9]+') !== null) {
          flower.id = parseInt($('h2').text().match('[0-9]+')[0], 10);
        }

        const allNames = $('h2 span.smcap, p.center').first().text().split('.').filter(name => name !== '').map(name => name.trim());
        // console.log(allNames);
        flower.latinName = allNames[0];
        flower.commonName = allNames[1];
        // console.log(flower.latinName);
        flower.slug = slug(flower.latinName, {
          lower: true,
          replacement: '-',
          charmap,
        });
        flower.volume = volume.number;
        flower.datePublished = volume.datePublished;
        flower.sameAs = `http://www.gutenberg.org/files/${volume.gutembergId}/${volume.gutembergId}-h/${volume.gutembergId}-h.htm#${htmlId}`;

        volume.id = flower.volume;
        volume.flowers.push(flower.id);

        const imageURL = $('div.figcenter a').attr('href');
        if (imageURL) {
          const imageParts = imageURL.split('.');

          const imageExtension = imageParts[imageParts.length - 1];
          flower.image = `${flower.id}_${slug(flower.latinName, { lower: true, replacement: '_', charmap })}.${imageExtension}`;

          const imagePath = `${imgDir}${flower.image }`;
          const imageFullURL = `http://www.gutenberg.org/files/${volume.gutembergId}/${volume.gutembergId}-h/${imageURL}`;

          fs.exists(imagePath, (exists) => {
            if (exists) {
              console.log(`Image ${imagePath} already exists`);
              return;
            } else {
              console.log(`But image ${imagePath}`);
            }

            fetch(imageFullURL)
              .then((res) => {
                const dest = fs.createWriteStream(imagePath);
                res.body.pipe(dest);
              })
              .catch((err) => {
                console.log(err);
              })
            ;
          });
        }

        flower.classAndOrder = $(
          'h2 + h3 + p.center, ' +
          'h2 + p + p.center span.smcap, ' +
          'h2 + p + p.center + p.center span.smcap, ' +
          'h2 + p + p.center + div.blockquot'
        )
          .text()
          .replace('.', '')
        ;

        const classAndOrderParts = flower.classAndOrder.split(' ');
        const className = classAndOrderParts.splice(0, 1)[0];
        const classe = database.classes.sort((a, b) => {
          let aLevenshtein = levenshtein.get(a.name, className);
          let bLevenshtein = levenshtein.get(b.name, className);
          if (aLevenshtein > bLevenshtein) {
            return 1;
          }

          if (aLevenshtein < bLevenshtein) {
            return -1;
          }

          return 0;
        })[0];
        classe.flowers.push(flower.id);

        flower.class = classe.id;

        const orderName = classAndOrderParts.join(' ');
        const order = database.orders.sort((a, b) => {
          let aLevenshtein = levenshtein.get(a.name, orderName);
          let bLevenshtein = levenshtein.get(b.name, orderName);
          if (aLevenshtein > bLevenshtein) {
            return 1;
          }

          if (aLevenshtein < bLevenshtein) {
            return -1;
          }

          return 0;
        })[0];

        order.flowers.push(flower.id);
        flower.order = order.id;

          flower.genericCharacters = $(
          'h2 + p + p.center + p + .hanging, ' +
          'h2 + h3 + p.center + h3 + .hanging, ' +
          'h2 + p + p.center + p.center + div.blockquot, ' +
          'h2 ~ p.center + p.center + p.center + p.center + p.center,' +
          'h2 ~ p.center + p.center + p.center + p.center + div.blockquot',
        )
          .text()
          .replace('Specific Character and Synonyms.', '')
          .replace('Specific Character.', '')
          .split(".\n\n")
          .filter(function(c) { return c !== ''; }) || []
        ;

        flower.synonyms = $(
          'h2 + p.center + p.center + p.center + div.blockquot + p.center + div.blockquot, ' +
          'blockquote, ' +
          'h2 + p + p.center + p + .hanging + p + .hanging, ' +
          'h2 + h3 + p.center + h3 + .hanging + h3 ~ .hanging, ' +
          'h2 ~ p.center + p.center + p.center + p.center + div.blockquot + p.center + div.blockquot'
        )
          .map(function() {
            console.log('caca', $(this).text());
            return $(this).text();
          })
          .get()
          .join(".\n\n")
          .split(".\n\n")
          .filter((c) => c !== '' ) || [];

        console.log($(
          'blockquote, ' +
          'h2 + h3 + p.center + h3 + .hanging + h3 ~ .hanging, ' +
          'h2 ~ p.center + p.center + p.center + p.center + div.blockquot + p.center + div.blockquot'
        ).text());

        flower.description = $('h2 ~ p:not(.center)')
          .filter(function() { return $(this).find('span.pagenum').length == 0 })
          .text()
          .replace(/(?:\r\n|\r|\n)/g, ' ')
          .replace('Class and Order.', '')
          .replace('Generic Character.', '')
          .replace('Specific Character and Synonyms.', '')
          .replace(/'  '/g, ' ')
          .replace(/\.([A-Z])/g, '.\n$1')
        ;

        flower.pages = $('p > span.pagenum')
          .map(function () { return parseInt($(this).text().match('[0-9]+'), 10); })
          .get() || []
        ;

        database.flowers.push(flower);

        volume.numberOfPages = flower.pages.length ? flower.pages.reduce((p, v) => (p < v ? p : v)) : 0;
      }

      database.volumes.push(volume);

      fs.writeFile('database.json', JSON.stringify(database));
    });
  });
});

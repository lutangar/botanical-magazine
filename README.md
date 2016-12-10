# [The Botanical Magazine](http://the.botanical-magazine.com)

> The most Ornamental **Foreign Plants**, cultivated in the Open Ground,
> the Green-House, and the Stove, are accurately represented in their natural Colours.
> https://en.wikipedia.org/wiki/Curtis's_Botanical_Magazine

I stumbled upon this periodical while randomly searching for botany material on http://www.gutenberg.org/
At first, I was astonished by the beauty of the original illustrations.
> some of which can be found in a far better quality on a few issues that were digitalized by Google

The content was *fairly* interesting but was a pain to navigate.
As this content has been freed, I decided to scrap what I could from Gutemberg for a start.
As I was refining the scrapping script, I finally achieved and came up with this quite complete *database*
of the **first ten volumes** or so.

This *database* come in the `Json` format and has been normalized to avoid any unnecessary data duplication:
````
{
  flowers: [],
  volumes: [],
  classes: [],
  orders: [],
}
```

These data could easily be used as dummy data to try out some of new techs out there.

The `orders` and `classes` used at this time to classify the flowers are rather obsolete, but it was nonetheless interesting to dive into these raw materials from the 18th century.

Here are few useful books that helped me understand the [Linnaean System of Botany](http://the.botanical-magazine.com/linnaean-system):
* https://books.google.fr/books?id=y1JDAQAAMAAJ
* https://books.google.fr/books?id=p91EAQAAMAAJ
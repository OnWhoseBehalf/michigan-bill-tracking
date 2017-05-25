/* This file handles a quarterly scraper class, which will be run every 3 months
*/

const baseUrl = 'http://legislature.mi.gov/doc.aspx?chapterindex';
var request = require('request');
var cheerio = require('cheerio');

class QuarterlyScraper {
  /* QuarterlyScraper handles all urls under the chapter index page
     (http://legislature.mi.gov/doc.aspx?chapterindex) and all urls under it
     to gather data on each law as 'base data' before having changes added to
     the law
  */

  constructor() {
    this.baseUrl = baseUrl;
    this.chapterObjects;
  }

  getChapters() {
    /* Finds the urls for chapters and creates objects out of them
    */
    request(this.baseUrl, function(err, resp, body) {
      if (err) {
        console.error(err);
        return;
      }

      try {
        // find the chapter table and all of its 'tr' rows
        var $ = cheerio.load(body);
        var table = $('table[id=frg_chapterindex_ChapterList_Results]');
        var chapterObjects = [];

        var rows = table.find('tr');
        $(rows).each(function(i, row) {
          if (i === 0) return;

          var $row = $(row);
          var cols = $row.find('td');
          // col 1 - document
          var url = $row.find('a').attr('href');
          var doc = $row.find('a').text();
          // col 2 - type
          var type = cols.eq(1).text();
          // col 3 - description
          var desc = cols.eq(2).text();

          chapterObjects.push(new Chapter(url, doc, type, desc));

        });
        // add chapterObjects to constructor to use it in other functions
        this.chapterObjects = chapterObjects;

      } catch (e) {
        console.error('There was an error.', e);
      }
    });
    }
}

class Chapter {
  constructor (url, doc, type, desc) {
    this.url = url;
    this.doc = doc;
    this.type = type;
    this.desc = desc;
  }
}

function runQuarterlyScraper() {
  q = new QuarterlyScraper();
  q.getChapters();
}

runQuarterlyScraper()

// TODO: Hook this file up to the other infrastructure
// Right now it'll have to be called on its own
var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs')

var count = 0;

const requestQueue = [];
var recordsSaved = 0;

function getChildrenAt(url, cb) {
  request(url, function(err, resp, body){
    if (err) {
      console.error(err);
      return;
    }

    try {
      $ = cheerio.load(resp.body);
      var tables = $('table');

      // Find the `table` with laws
      var table = tables.filter((i, t) => $(t).find('.header').eq(0).text() === 'Document');
      var rows = table.find('tr');

      if (!rows.length) {
        return;
      };

      $(rows).each(function(i, row){
        if (i === 0) return;

        var $row = $(row);
        var cols = $row.find('td');
        var title = $row.find('a').text();
        var link = $row.find('a').attr('href');
        var type = cols.eq(1).text();
        var entity = {
          title,
          link,
          type,
          description: cols.eq(2).text(),
          links: {},
        };

        if (type.toLowerCase() === 'section') {
          return cb(entity);
        }


        requestQueue.push(() => getChildrenAt(`https://www.legislature.mi.gov/${link}`, (innerEntity) => {
          if (innerEntity.title) {
            recordsSaved++;
            entity.links[innerEntity.title] = innerEntity;
          }
        }));

        cb(entity);
      });
    } catch(e) {
      console.error('There was an error.', e);
    }
  });
}

var laws = {
  links: {},
};

const address = 'http://legislature.mi.gov/doc.aspx?chapterindex';
// const address = 'http://legislature.mi.gov/doc.aspx?mcl-chap205';
// const address = 'http://legislature.mi.gov/doc.aspx?mcl-Constitution-I';
getChildrenAt(address, (builtLaw) => {
  laws.links[builtLaw.title] = builtLaw;
});

var written = false;
var requestsStarted = 0;
var interval = setInterval(() => {
  requestsStarted++;
  var req = requestQueue.shift();
  if (req) req();
}, 1000 * Math.random());

var firstData = new Date();

var interval = setInterval(() => {
  var totalRequests = requestQueue.length + requestsStarted;
  console.log(`${(new Date()) - firstData}ms`);
  console.log(`Waiting: ${requestQueue.length}, Ran: ${requestsStarted}, Total: ${totalRequests}`);
  // if (written) return clearInterval(interval);
  // written = true;
  var file = 'tmp/data.json';

  fs.writeFile(file, JSON.stringify(laws), 'utf8', function (err) {
    if (err)console.error(err)
  });
}, 21000);
// setTimeout(() => {
// }, 20000);

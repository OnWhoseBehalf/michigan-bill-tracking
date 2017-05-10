// TODO: Hook this file up to the other infrastructure
// Right now it'll have to be called on its own
var fs = require('fs')
const laws = require('./data/complete_data.json');

// Nodes
// {id: 1, label: 'Node 1'},
// {id: 2, label: 'Node 2'},

// Links
// {from: 1, to: 3},
// {from: 1, to: 2},

let nodes = [];
let allLinks = [];

function buildLinkNodes (links=[]) {
  const documentIds = Object.keys(links);
  nodes = [
    ...nodes,
    ...documentIds.map((id) => ({
      id: links[id].title,
      label: links[id].title,
    })),
  ];

  documentIds.forEach((id) => {
    console.log(id);
    const nextLinks = links[id].links;
    if (!nextLinks) return;
    buildLinkNodes(nextLinks);
    allLinks = [
      ...allLinks,
      ...Object.keys(nextLinks).map((innerId) => ({
        from: id,
        to: innerId,
      })),
    ];
  });
}

buildLinkNodes(laws.links);
fs.writeFile('data/nodes.json', JSON.stringify({ nodes }), 'utf8', function (err) {
  if (err)console.error(err);
});

fs.writeFile('data/links.json', JSON.stringify({ links: allLinks }), 'utf8', function (err) {
  if (err)console.error(err);
});

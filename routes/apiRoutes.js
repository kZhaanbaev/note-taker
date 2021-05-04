
const fs = require('fs');
const uniqid = require('uniqid');
const dbData = require('../db/db.json');

let data = dbData;


module.exports = (app) => {
  app.get('/api/notes', (req, res) => {
    res.json(data);
  });

  app.post('/api/notes', (req, res) => {
    const request = req.body;
    request.id = uniqid();

    data.push(request);

    fs.writeFile('./db/db.json', JSON.stringify(data), err => {
      if (err) {
        console.error(err);
        return;
      }
    })
    res.json(200);
  });

  app.delete('/api/notes/:id', (req, res) => {
    data = data.filter(each => each.id !== req.params.id);
    console.log(data);

    fs.writeFile('./db/db.json', JSON.stringify(data), err => {
      if (err) {
        console.error(err);
        return;
      }
    })
    res.json(data);
  });
};


const fs = require('fs');
const uniqid = require('uniqid');
const dbData = require('../db/db.json');


module.exports = (app) => {
  app.get('/api/notes', (req, res) => {
    res.json(dbData);
  });

  app.post('/api/notes', (req, res) => {
    const request = req.body;
    request.id = uniqid();

    const data = dbData;
    data.push(request);

    fs.writeFile('./db/db.json', JSON.stringify(data), err => {
      if (err) {
        console.error(err);
        return;
      }
    })
    res.json(200);
  });

//   // I added this below code so you could clear out the table while working with the functionality.
//   // Don"t worry about it!

//   app.post('/api/clear', (req, res) => {
//     // Empty out the arrays of data
//     tableData.length = 0;
//     waitListData.length = 0;

//     res.json({ ok: true });
//   });
};

const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.render('form');
});

app.post('/submit', (req, res) => {
  const { name, email } = req.body;
  res.render('success', { name, email });
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
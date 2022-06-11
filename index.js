const express = require('express'),
  morgan = require('morgan'),
  fs = require('fs'), // import built in node modules fs and path
  path = require('path');

  var __dirname = path.resolve();

const app = express();

// create a write stream (in append mode)
// a ‘log.txt’ file is created in root directory
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'log.txt'), {
  flags: 'a', });

//My top ten mocies
let topTenMovies = [
  {
    title: 'Fight Club',
    actor: 'Brad Pitt',
  },
  {
    title: 'The Dirty Dozen',
    actor: 'Lee Marvin',
  },
  {
    title: 'Diry Harry',
    actor: 'Clint Eastwood',
  },
  {
    title: 'Braveheart',
    actor: 'Mel Gibson',
  },
  {
    title: 'Goodfellas',
    actor: 'Ray Liotta',
  },
  {
    title: 'Saving Private Ryan',
    actor: 'Tom Hanks',
  },
  {
    title: 'The Good, the Bad and the Ugly',
    actor: 'Clint Eastwood',
  },
  {
    title: 'The Terminator',
    actor: 'Arnold Schwarzenegger',
  },
  {
    title: 'Avengers: Infinity War',
    actor: 'Robert Downey',
  },
  {
    title: 'The Shawshank Redemption',
    actor: 'Tim Robbins',
  },
];

//GET requests
app.get('/', (req, res) => {
  res.send('Welcome to myFlix!');
});

app.get('/movies', (req, res) => {
  res.json(topTenMovies);
});

app.get('/documentation', (req, res) => {
  res.sendFile('public/documentation.html', { root: __dirname });
});

// setup the logger
app.use(morgan('combined', { stream: accessLogStream }));

app.use(express.static('public'));

//Confirms the server is running
app.listen(8080, () => {
  console.log('Your app is listening on port 8080.');
});

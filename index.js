const express = require('express'),
  app = express(),
  bodyParser = require('body-parser'),
  uuid = require('uuid');

var __dirname = path.resolve();

app.use(bodyParser.json());

//users
let users = [
  {
    id: 1,
    name: 'Rick',
    favoriteMovies: [],
  },
];

//My top ten movies
let movies = [
  {
    'Title': 'Fight Club',
    'Description': 'An insomniac office worker and a devil-may-care soap maker form an underground fight club that evolves into much more.',
    'Genre': {
      'Name': 'Drama',
      'Description': 'In film and television, drama is a category or genre of narrative fiction (or semi-fiction) intended to be more serious than humorous in tone',
              },
    'Director': {
        'Name': 'David Fincher',
        'Bio': 'David Fincher was born in 1962 in Denver, Colorado, and was raised in Marin County, California. When he was 18 years old he went to work for John Korty at Korty Films in Mill Valley. He subsequently worked at ILM (Industrial Light and Magic) from 1981-1983. Fincher left ILM to direct TV commercials and music videos',
                },
  },
  {
    'Title': 'Brave Heart',
    'Description': '',
    'Genre': {
      'Name': '',
      'Description': '',
              },
    'Director': {
        'Name': ' ',
        'Bio': ' ',
                },
  },
  {
    'Title': 'The Dirty Dozen',
    'Description': '',
    'Genre': {
      'Name': '',
      'Description': '',
              },
    'Director': {
        'Name': ' ',
        'Bio': ' ',
                },
  },
];

//GET requests for homepage
app.get('/', (req, res) => {
  res.send('Welcome to myFlix!');
});

//GET request that will return all movies
app.get('/movies', (req, res) => {
  res.status(200).json(movies);
});

//GET request that will return movie data by title
app.get('/movies/:title', (req, res) => {
  const { title } = req.params;
  const movie = movies.find(movie => movie.Title === title);

  if (movie) {
    res.status(200).json(movie);
  } else {
    res.status(400).send('no such movie');
  }
});

app.get('/movies/genre/:genreName', (req, res) => {
  const { genreName } = req.params;
  const genre = movies.find(movie => movie.Genre.Name === genreName).Genre;

  if (genre) {
    res.status(200).json(genre);
  } else {
    res.status(400).send('no such genre');
  }
});

//GET request that will return director data name
app.get('/movies/directors/:directorName', (req, res) => {
  const { directorName } = req.params;
  const director = movies.find(movie => movie.Director.Name === directorName).Director;

  if (director) {
    res.status(200).json(director);
  } else {
    res.status(400).send('no such director');
  }
});

//POST request that allows new users to register
app.post('/users', (req, res) => {
  const newUser = req.body;

  if (newUser.name) {
    newUser.id = uuid.v4();
    users.push(newUser);
    res.status(201).json(newUser);
  } else {
    res.status(400).send('Please enter user name');
  }
});

//PUT request that allow users to update their user info
app.put('/users/:id', (req, res) => {
  const { id } = req.params;
  const updatedUser = req.body;

  let user = users.find(user => user.id == id);

  if (user) {
    user.name = updatedUser.name;
    res.status(200).json(user);
  } else {
    res.status(400).send('No such user');
  }
});

//POST request that allows users to add a movie to list of favorites
app.post('/users/:id/movieTitle', (req, res) => {
  const { id, movieTitle } = req.params;
  let user = users.find(user => user.id == id);

  if (user) {
    user.favoriteMovies.push(movieTitle);
    res.status(200).send(`${movieTitle} has been added to user ${id}'s array'`);
  } else {
    res.status(400).send('No such user');
  }
});

//DELETE request that allows users to delete a movie from the list of favorites
app.delete('/users/:id/movieTitle', (req, res) => {
  const { id, movieTitle } = req.params;
  let user = users.find(user => user.id == id);

  if (user) {
    user.favoriteMovies = user.favoriteMovies.filter(title => title !== movieTitle);
    res.status(200).send(`${movieTitle} has been deleted from user ${id}'s array`);
  } else {
    res.status(400).send('No such use');
  }
});

//DELETE request that allows exisiting users to deregister

app.delete('/users/:id', (req, res) => {
  const { id } = req.params;
  let user = users.find(user => user.id == id);

  if (user) {
    users = user.filter(user => user.id != id);
    res.status(200).send('User has been deleted');
  } else {
    res.status(400).send('No such user');
  }
});

//GET request that will dsisplay documentation
app.get('/documentation', (req, res) => {
  res.sendFile('public/documentation.html', { root: __dirname });
});

//app.use(express.static('public'));

//Confirms the server is running
app.listen(8080, () => {
  console.log('Your app is listening on port 8080.');
});

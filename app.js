// app.js
// require packages used in the project
const express = require('express')
const app = express()
const port = 3000
const movieList = require('./movieList.json')

// require handlebars in the project
const exphbs = require('express-handlebars')
const {
  response
} = require('express')

app.use(express.static('public'))


app.engine('handlebars', exphbs.engine({
  defaultLayout: 'main'
}))

app.set('view engine', 'handlebars')


// routes setting
app.get('/', (req, res) => {

  res.render('index', {
    movies: movieList.results
  })
})


app.get('/search', (req, res) => {

  const keyword = req.query.keyword

  let filterMovie = movieList.results.filter(movie => movie.title.toLowerCase().includes(keyword.toLowerCase()))

  res.render('index', {
    movies: filterMovie,
    keyword: keyword
  })
})


app.get('/movies/:movie_id', (req, res) => {

  const movie = movieList.results.find(movie => movie.id.toString() === req.params.movie_id)
  res.render('show', {
    movie
  })

})





// start and listen on the Express server
app.listen(port, () => {
  console.log(`Express is listening on http://localhost:${port}`)
})
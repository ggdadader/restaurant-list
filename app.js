// require packages used in the project
const express = require('express')
const app = express()
const port = 3000

// require express-handlebars here
const exphbs = require('express-handlebars')
const restaurantList = require('./restaurant.json')

// setting template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
// setting static files
app.use(express.static('public'))


// routes setting
app.get('/', (req, res) => {
  res.render('index',{restaurants: restaurantList.results})
})
app.get('/restaurants/:id', (req, res) => {
  const selectedRestaurant = restaurantList.results.find(restaurant => restaurant.id.toString() === req.params.id)
  res.render('show', { restaurant: selectedRestaurant })
})

app.get('/search', (req, res) => {
  const keyword = req.query.keyword
  const keywordList = keyword.split(' ').filter(item => item !== '')

  if (keywordList.length <= 0) {
    return res.redirect('/')
  }
  const restaurants = restaurantList.results.filter(item => {
   
    for (let i = 0; i < keywordList.length; i++) {
      if (item.name.includes(keywordList[i]) || item.category.includes(keywordList[i])) {
        return true
      }
    }
  })
  res.render('search', { keyword, restaurants })
})
  



// start and listen on the Express server
app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})

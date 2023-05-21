const search = document.getElementById('search')
const form = document.querySelector('form')
const recentSearches = document.getElementById('recent-searches')
const cityName = document.getElementById('city-name')
const temp = document.getElementById('temp')
const wind = document.getElementById('wind')
const humidity = document.getElementById('humidity')

// Get lat long coords
form.onsubmit = (e) => {
  e.preventDefault()
  console.log(search.value)
  fetch(
    `http://api.openweathermap.org/geo/1.0/direct?q=${search.value}&limit=5&appid=486060bafc6b2d129e48e59a2e9520a8`
  )
    .then((res) => console.log(res))
    .then((data) => console.log(data))
}

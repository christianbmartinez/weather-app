const search = document.getElementById('search')
const form = document.querySelector('form')
const recentSearches = document.getElementById('recent-searches')
const cityName = document.getElementById('city-name')
const temp = document.getElementById('temp')
const wind = document.getElementById('wind')
const humidity = document.getElementById('humidity')
let lat
let lon

// Fetch current weather on page load to show initial weather
window.onload = async () => {
  const response = await fetch(
    'http://api.openweathermap.org/data/2.5/weather?q=san+diego&appid=486060bafc6b2d129e48e59a2e9520a8&units=imperial'
  )
  const data = await response.json()
  console.log(data)
  cityName.textContent = `San Diego ${dayjs(new Date()).format('M/D/YYYY')}`
  temp.textContent = `Temp: ${data.main.temp}`
  wind.textContent = `Wind: ${data.wind.speed}`
  humidity.textContent = `Humidity: ${data.main.humidity}%`
}

// Fetch openweathermap api
form.onsubmit = async (e) => {
  e.preventDefault()
  const response = await fetch(
    `http://api.openweathermap.org/data/2.5/forecast?q=${search.value}&units=imperial&appid=486060bafc6b2d129e48e59a2e9520a8`
  )
  const data = await response.json()
  if (data.cod !== '200') {
    search.value = ''
    alert(`Error:${data.cod} That city wasn't found. Please try again!`)
  } else {
    console.log(data)
  }
}

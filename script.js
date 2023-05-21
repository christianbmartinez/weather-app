const search = document.getElementById('search')
const form = document.querySelector('form')
const recentSearches = document.getElementById('recent-searches')
const cityName = document.getElementById('city-name')
const temp = document.getElementById('temp')
const wind = document.getElementById('wind')
const humidity = document.getElementById('humidity')
const forecast = document.getElementById('forecast')
const forecastCity = document.getElementById('forecast-city')
let lat
let lon

// Fetch current weather on page load to show initial weather
window.onload = async () => {
  const response = await fetch(
    'http://api.openweathermap.org/data/2.5/weather?q=san+diego&appid=486060bafc6b2d129e48e59a2e9520a8&units=imperial'
  )
  const data = await response.json()
  cityName.textContent = `San Diego ${dayjs(new Date()).format('M/D/YYYY')}`
  temp.textContent = `Temp: ${data.main.temp}°F`
  wind.textContent = `Wind: ${data.wind.speed}mph`
  humidity.textContent = `Humidity: ${data.main.humidity}%`
}

// Fetch openweathermap forecast api for our app on form submit
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
    forecastCity.textContent = `5 Day forecast for ${data.city.name}`
    console.log(data)
    data.list.map((weather) => {
      console.log(weather)
      // We have a lot of data in the array for the same days.
      // I assumed its for morning, day, mid day, night, midnight.
      // In military time, if it's around mid day, lets return that weather data
      if (weather.dt_txt.includes('15:00:00')) {
        forecast.innerHTML += `
      <div class="col p-3">    
      <div class="row">
          <div class="card" style="width: auto; margin-right:1em;">
              <div class="card-body">
                  <h5 id="forecast-date">${dayjs(weather.dt_txt).format(
                    'M/D/YYYY'
                  )}</h5>
                  <img class="card-img-top my-2" src="/img/icons8-summer-48.png"  style='width: 25px; height: 25px;' alt="Card image cap">
                <p id="forecast-temp" class="card-text">Temp: ${
                  weather.main.temp
                }°F</p>
                <p id="forecast-wind" class="card-text">Wind: ${
                  weather.wind.speed
                }mph</p>
                <p id="forecast-humidity" class="card-text">Humidity: ${
                  weather.main.humidity
                }%</p>
              </div>
          </div>                              
      </div>
  </div>
      `
      } else {
        return
      }
    })
  }
}

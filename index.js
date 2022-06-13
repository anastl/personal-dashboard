setBackground()
setCrypto()
setInterval(setTime, 1000)
getCoordinates()

async function setWeather(position){
    const weatherDiv = document.getElementById('weather-div')
    try {
        const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric&appid=1ce7802e1b58ce94f0a0661ee19b4cea`)
        if (!res.ok)
            throw Error

        const data = await res.json()
        const weatherIconSrc = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
        const weather = `
            <img class="weather-icon" alt=${data.weather[0].description} src="${weatherIconSrc}">
            <p class="weather-temp" >${Math.round(data.main.temp)}°</p>
            <p class="weather-zone" >${data.name}</p>`
        weatherDiv.innerHTML = weather
    } catch (err) {
        console.log(err)
        setErrorMsgDiv(weatherDiv)
    }
}

function getCoordinates(){
    if('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(setWeather)
    } else {
        throw Error("Geolocation isn't avaliable")
    }
}

function setTime(){
    const today = new Date()
    const time = today.getHours() + (today.getMinutes() < 10 ? (":0" + today.getMinutes()) : (":" + today.getMinutes())) + (today.getHours()>11 ? " PM" : " AM")
    document.getElementById('time').textContent = time
}

async function setCrypto(){
    const cryptoDiv = document.getElementById('crypto-div')
    try {
        const res = await fetch(`https://api.coingecko.com/api/v3/coins/ethereum?localization=false&market_data=true&community_data=false&developer_data=false&sparkline=false`)
        if (!res.ok)
            throw Error
        const data = await res.json()

        cryptoDiv.innerHTML = `
            <div class="crypto-top">
                <img class="crypto-icon" alt="${data.name} icon" src="${data.image.small}">
                <h3 id="crypto-name">${data.name}</h3>
            </div>
            <p class="crypto-price" id="crypto-current">Current: <span class="crypto-current">$${data.market_data.current_price.usd}</span></p>
            <p class="crypto-price" id="crypto-high">24-hour high: <span class="crypto-high">$${data.market_data.high_24h.usd}</span></p>
            <p class="crypto-price" id="crypto-low">24-hour low: <span class="crypto-low">$${data.market_data.low_24h.usd}</span></p>
        `
    } catch (error) {
        console.log(error)
        setErrorMsgDiv(cryptoDiv)
    }
}

async function setBackground(){
    const ImgObj = await getImageObject()
    document.body.style.backgroundImage = `url(${ImgObj.url})`

    document.getElementById('author').textContent = `By: ${ImgObj.name}`
}

async function getImageObject(){
    try {
        const res = await fetch(`https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=nature`)
        if (!res.ok)
            throw Error
        const data = await res.json()
        const ImgObj = {
            url: data.urls.full, //change back to full
            name: data.user.name
        }
        return ImgObj
    } catch (error) {
        const ImgObj = {
            url: `https://images.unsplash.com/photo-1572099606223-6e29045d7de3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxNDI0NzB8MHwxfHJhbmRvbXx8fHx8fHx8fDE2NTQ5MTk1MTA&ixlib=rb-1.2.1&q=80&w=1080`,
            name: `By: Sabeer Darr`
        }
        return ImgObj
    }
}

function setErrorMsgDiv(div){
    div.textContent = "Something went wrong, please try again"
}
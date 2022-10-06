window.addEventListener('load', () => {
    let long;
    let lat;
    const temperatureDescription = document.querySelector(".temperature-description");
    const temperatureDegree = document.querySelector(".temperature-degree");
    const locationTimezone = document.querySelector(".location-timezone")
    const temperatureSection = document.querySelector(".temperature")
    const temperatureSectionSpan = document.querySelector(".temperature span");

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;
            console.log(position);
            console.log(lat, long);

            const proxy = 'https://cors-anywhere.herokuapp.com/';
            // const api = `${proxy} https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=79e8eba5a27f13668ab8fcba5d6eafb1`;
            const api = `${proxy} https://api.openweathermap.org/data/2.5/weather?${lat}&${long}&appid=79e8eba5a27f13668ab8fcba5d6eafb1`;

            console.log(api);
            console.log(temperatureDegree, temperatureDescription, locationTimezone);


            fetch(api)
            .then(response => {
                return response.json();
            })
            .then(data => {
                console.log(data);

                const {a, b, description, icon } = data.weather;
                const {h, i, temp_min, temp_max} = data.main;
                const {c, d, country, e, f, timezone, g, name} = data.sys;


                temperatureDegree.textContent = `Min:${temp_min} / Max: ${temp_max}`;
                temperatureDescription.textContent = description;
                locationTimezone.textContent = `Weather for ${name}, ${country}, Timezone ${timezone}`;

                console.log(temperatureDegree, temperatureDescription, locationTimezone);


                // formula for degrees
                let celsius = (temperature - 32) * (5 / 9);

                // set icon
                setIcons(icon, document.querySelector('.icon'));

                // change temp to degrees celsius
                temperatureSection.addEventListener('click', () => {
                  if(temperatureSectionSpan.textContent === F) {
                    temperatureSectionSpan.textContent = "C";
                    temperatureDegree.textContent = Math.floor(celsius);
                  } else {
                    temperatureSectionSpan.textContent = "F";
                    temperatureDegree.textContent = temp_min + temp_max;
                  }              
                });                
        })
        
    });
  }

  function setIcons(icon, iconId) {
    const skycons = new Skycons({color: "white"});
    const currentIcon = icon.replace(/-/g, "_").toUpperCase();
    skycons.play();
    return skycons.set(iconId, Skycons[currentIcon])

    
  }
});
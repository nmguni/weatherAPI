window.addEventListener('load', () => {
    let long;
    let lat;
    let temperatureDescription = document.querySelector('.temp-description');
    let temperatureDegree = document.querySelector('.temp-degree');
    let locationTimeZone = document.querySelector('.location-timezone');
    let tempSection = document.querySelector('.temperature');
    const tempSpan = document.querySelector('.temperature span');
    const currentTime = document.querySelector('.time');

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(Position => {
            long = Position.coords.longitude;
            lat = Position.coords.latitude;

            const proxy = "https://cors-anywhere.herokuapp.com/";
            const api = `${proxy}https://api.darksky.net/forecast/30a1df69001759d582d1a55244e6a5c3/${lat},${long}`;

            fetch(api)
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    // console.log(data);
                    const { temperature, summary, icon } = data.currently;
                    // set dom elements from the api
                    temperatureDegree.textContent = temperature;
                    temperatureDescription.textContent = summary;
                    locationTimeZone.textContent = data.timezone;
                    currentTime.textContent = data.uvIndex;
                    // formula for celsus
                    let celsius = (temperature - 32) * (5 / 9);
                    //set icons
                    setIcons(icon, document.querySelector('.icon'));



                    // //change temp to cel/feren
                    tempSection.addEventListener('click', () => {
                        if (tempSpan.textContent === "F") {
                            tempSpan.textContent = "C";
                            temperatureDegree.textContent = Math.floor(celsius);
                        } else {
                            tempSpan.textContent = "F";
                            temperatureDegree.textContent = temperature;
                        }
                    })


                });
        });
    }

    function setIcons(icon, iconID) {
        const skycons = new Skycons({ "color": "white" });
        const currentIcon = icon.replace(/-/g, "_").toUpperCase();
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon]);
    };

});
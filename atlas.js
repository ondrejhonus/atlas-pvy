fetch('https://restcountries.com/v3.1/region/europe')
    .then(response => response.json())
    .then(data => {
        data.forEach(country => {
            console.log(country.capital[0]);
            let stat = `<div class="col-xl-2 col-lg-3 col-md-4 col-sm-6">
            <div class="card">
                <a href="${country.maps.googleMaps}" target="_blank">
                <img class="card-img-top img-flag" src="${country.flags.svg}" alt="${country.flags.alt}"/>
                </a>
                <div class="card-body">
                    <h4 class="card-title">${country.name.common}</h4>
                    <p class="card-text">Population: ${country.population}</p>
                    <p>Capital : ${country.capital[0]}</p>
                </div>
            </div>
        </div>`;
        document.getElementById('staty').innerHTML += stat;
        });
});
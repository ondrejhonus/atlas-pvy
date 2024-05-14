// Fetch country data and render initial list
let countriesData = [];

fetch('https://restcountries.com/v3.1/region/europe')
    .then(response => response.json())
    .then(data => {
        countriesData = data;
        renderCountries(data);
    });

function renderCountries(data) {
    const statesElement = document.getElementById('states');
    statesElement.innerHTML = '';

    data.forEach(country => {
        let stat = `<div class="col-xl-2 col-lg-3 col-md-4 col-sm-6">
        <div class="card">
            <a href="${country.maps.googleMaps}" target="_blank">
            <img class="card-img-top img-flag" src="${country.flags.svg}" alt="${country.flags.alt}"/>
            </a>
            <div class="card-body">
                <h5 class="card-title strongaa">${country.name.common}</h4>
                <p class="card-text">Population: ${country.population}</p>
                <p>Capital : ${country.capital ? country.capital[0] : 'N/A'}</p>
            </div>
        </div>
    </div>`;
        statesElement.innerHTML += stat;
    });
}

// Add event listener to search input
document.getElementById('search').addEventListener('input', function (e) {
    const query = e.target.value.toLowerCase();
    const filteredCountries = countriesData.filter(country =>
        country.name.common.toLowerCase().includes(query)
    );
    renderCountries(filteredCountries);
});

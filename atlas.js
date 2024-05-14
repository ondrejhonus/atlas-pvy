let countriesData = [];
let googleAPI = "AIzaSyDNuEwBfccwIm6AqzMuh_z2DvbdIzs_l9M";

/*
GOOGLE MAP EMBED CODE

<div style="width: 35%; position: relative; padding-bottom: 20%;"><iframe
    src="https://www.google.com/maps/embed/v1/place?key=AIzaSyDNuEwBfccwIm6AqzMuh_z2DvbdIzs_l9M&q=${country.name.common}&center=${country.latlng}&zoom=${country.area*2/10000}"
    style="top: 0; left: 0; width: 100%; height: 100%; position: absolute; border: 0;"
    allowfullscreen></iframe></div>
 */

fetch("https://restcountries.com/v3.1/region/europe")
  .then((response) => response.json())
  .then((data) => {
    countriesData = data;
    renderCountries(data);
  });

function renderCountries(data) {
  const statesElement = document.getElementById("states");
  statesElement.innerHTML = "";

  data.forEach((country) => {
    let state = `<div class="col-xl-2 col-lg-3 col-md-4 col-sm-6 country animate__animated animate__fadeInUp animate__faster" 
    onclick="popup('${country.name.common}')">
        <div class="card country-card">
            <img class="card-img-top img-flag" src="${
              country.flags.svg
            }" alt="${country.flags.alt}"/>
            <div class="card-body">
                <h5 class="card-title strong">${country.name.common}</h4>
                <p class="card-text">Population: ${country.population}</p>
                <p>Capital : ${country.capital ? country.capital[0] : "N/A"}</p>
            </div>
        </div>
    </div>
    `;
    statesElement.innerHTML += state;
  });
}

function popup(state) {
  let popupElement = document.getElementById("popup");
  popupElement.innerHTML = "";
  let country = countriesData.find((jason) => (jason.name.common = state));
  let code = `<div class="modal modal-xl fade " id="${country.name.common}Modal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h1 class="modal-title fs-5" id="exampleModalLabel">${country.name.common}</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <iframe
            src="https://www.google.com/maps/embed/v1/place?key=AIzaSyDNuEwBfccwIm6AqzMuh_z2DvbdIzs_l9M&q=${country.name.common}"
            style="width: 100%; height: 500px; padding-top: 5em" allowfullscreen>
        </iframe>
            </div>
        </div>
    </div>
</div>
    `;
  popupElement.innerHTML += code;
  let countryModal = new bootstrap.Modal(document.getElementById(`${country.name.common}Modal`));
  countryModal.toggle();
}

document.getElementById("search").addEventListener("input", function (e) {
  const query = e.target.value.toLowerCase();
  const filteredCountries = countriesData.filter((country) =>
    country.name.common.toLowerCase().includes(query)
  );
  renderCountries(filteredCountries);
});

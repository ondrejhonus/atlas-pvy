let countriesData = [];
let googleAPI = "AIzaSyDNuEwBfccwIm6AqzMuh_z2DvbdIzs_l9M";

/*
GOOGLE MAP EMBED CODE

<div style="width: 35%; position: relative; padding-bottom: 20%;"><iframe
    src="https://www.google.com/maps/embed/v1/place?key=AIzaSyDNuEwBfccwIm6AqzMuh_z2DvbdIzs_l9M&q=${country.name.common}&center=${country.latlng}&zoom=${country.area*2/10000}"
    style="top: 0; left: 0; width: 100%; height: 100%; position: absolute; border: 0;"
    allowfullscreen></iframe></div>
 */

const regionSelect = document.getElementById("region");
let selectedRegion = regionSelect.value;

function convertNumbers(number, short) {
  if (number >= 1000 && number < 1000000 && !short){
    return parseFloat(number/1000).toFixed(2) + " thousand";
  }
  else if (number >= 1000000 && number < 1000000000 && !short){
    return parseFloat(number/1000000).toFixed(2) + " million";
  }
  else if (number >= 1000000000 && number < 1000000000000 && !short){
    return parseFloat(number/1000000000).toFixed(2) + " billion";
  }
  else if (number >= 1000 && number < 1000000 && short){
    return parseFloat(number/1000).toFixed(2) + "K";
  }
  else if (number >= 1000000 && number < 1000000000 && short){
    return parseFloat(number/1000000).toFixed(2) + "M";
  }
  else if (number >= 1000000000 && number < 1000000000000 && short){
    return parseFloat(number/1000000000).toFixed(2) + "B";
  }
  else{
    return number;
  }
}

function selectRegion(region = selectedRegion) {
  fetch(`https://restcountries.com/v3.1/region/${region}`)
    .then((response) => response.json())
    .then((data) => {
      countriesData = data;
      renderCountries(data);
    });
}
selectRegion();

regionSelect.addEventListener("change", function (e) {
  selectedRegion = e.target.value;
  selectRegion(selectedRegion);
});

function renderCountries(data) {
  const statesElement = document.getElementById("states");
  statesElement.innerHTML = "";

  data.forEach((country) => {
    let state = `<div class="col-xl-2 col-lg-3 col-md-4 col-sm-6 country" 
    onclick="popup('${country.name.common}')">
        <div class="card country-card">
            <img class="card-img-top img-flag" src="${
              country.flags.svg
            }" alt="${country.flags.alt}"/>
            <div class="card-body">
                <h5 class="card-title strong">${country.name.common}</h4>
                <p class="card-text">Population: ${convertNumbers(country.population, true)}</p>
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
  let currencies = Object.values(country.currencies).map(c => c.name);
  let code = `<div class="modal modal-xl fade " id="${country.name.common}Modal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h1 class="modal-title fs-5" id="exampleModalLabel">${country.name.common}</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
            <p>Region: ${country.region}</p>
            <p>Population: ${convertNumbers(country.population, false)}</p>
            <p>Area: ${country.area} km²</p>
            <p>Capital: ${country.capital ? country.capital[0] : "N/A"}</p>
            <p>Timezone: ${country.timezones}</p>
            <p>Neighbours: ${country.borders}</p>
            <p>Currencies: ${Object.values(currencies)}</p>
                <iframe
            src="https://www.google.com/maps/embed/v1/place?key=${googleAPI}&q=${country.name.common}"
            style="width: 100%; height: 500px; padding-top: 1em" allowfullscreen>
        </iframe>
            </div>
        </div>
    </div>
</div>
    `;
  popupElement.innerHTML += code;
  let countryModal = new bootstrap.Modal(
    document.getElementById(`${country.name.common}Modal`)
  );
  countryModal.toggle();
}

document.getElementById("search").addEventListener("input", function (e) {
  const query = e.target.value.toLowerCase();
  const filteredCountries = countriesData.filter((country) =>
    country.name.common.toLowerCase().includes(query)
  );
  renderCountries(filteredCountries);
});

document
  .getElementById("darkmode-check")
  .addEventListener("change", function (e) {
    const bodyElement = document.querySelector("body");
    const icons = document.querySelectorAll(".bi");
    const navbar = document.querySelector(".navbar");
    if (e.target.checked) {
      bodyElement.setAttribute("data-bs-theme", "light");
      bodyElement.removeAttribute("data-bs-theme", "dark");
      icons.forEach((icon) => {
        icon.classList.remove("text-light");
        icon.classList.add("text-dark");
      });
      navbar.classList.remove("navbar-border-light");
      navbar.classList.add("navbar-border-dark");
    } else {
      bodyElement.removeAttribute("data-bs-theme", "light");
      bodyElement.setAttribute("data-bs-theme", "dark");
      icons.forEach((icon) => {
        icon.classList.remove("text-dark");
        icon.classList.add("text-light");
      });
      navbar.classList.remove("navbar-border-dark");
      navbar.classList.add("navbar-border-light");
    }
  });

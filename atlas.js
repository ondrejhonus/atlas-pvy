fetch('https://restcountries.com/v3.1/region/europe')
    .then(response => response.json())
    .then(data => {

        console.log(data[0].flags.png)
        const img = document.createElement('img');
    })
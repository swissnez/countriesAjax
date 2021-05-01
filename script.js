'use strict';
const getCountryDataAndNeighbour = (country)=>{;

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

const request = new XMLHttpRequest(); // Old school AJAX call 

request.open('GET',`https://restcountries.eu/rest/v2/name/${country}`);
request.send();


const renderCountries = (data)=> {
    const html = `
    <article class="country">
      <img class="country__img" src="${data.flag}" />
      <div class="country__data">
        <h3 class="country__name">${data.name}</h3>
        <h4 class="country__region">${data.region}</h4>
        <p class="country__row"><span>👫</span>${data.population}</p>
        <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
        <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
      </div>
    </article>
    `;

    countriesContainer.insertAdjacentHTML("beforeend",html);
    countriesContainer.style.opacity = 1;
};




request.addEventListener("load",function(){

    let result = JSON.parse(this.responseText);
    let [data] = JSON.parse(this.responseText);
    console.log(data);

    const {name} = result[0]; //console.log(result[0].name);
    // COOKIES!
    localStorage.setItem("Countries",result);

    renderCountries(data);

});

};

getCountryDataAndNeighbour("ireland");
getCountryDataAndNeighbour("iceland");
getCountryDataAndNeighbour("sweden");

// const postCode = 'nn28uh'
// const postReq = new XMLHttpRequest();
// postReq.open("GET",`https://api.postcodes.io/postcodes/${postCode}`);
// postReq.send();

// postReq.addEventListener("load",function(){
//     console.log(JSON.parse(this.responseText));
//     let res = JSON.parse(this.responseText);
//     const {latitude,longitude} = res.result;
//     console.log(latitude);
// });

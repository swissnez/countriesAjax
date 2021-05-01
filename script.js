'use strict';
const getCountryDataAndNeighbour = (country)=>{



const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

const request = new XMLHttpRequest(); // Old school AJAX call 

request.open('GET',`https://restcountries.eu/rest/v2/name/${country}`);
request.send();


const renderCountries = (data,classname='')=> {
    const html = `
    <article class="country ${classname}">
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
    const [neighbours] = data.borders;
   
    // COOKIES!
    //localStorage.setItem("Countries",result);

    renderCountries(data);

    if(!neighbours) return;
    //-----   XHR OLD SCHOOL ------- 
    const req = new XMLHttpRequest();
    req.open("GET",`https://restcountries.eu/rest/v2/alpha/${neighbours}`);
    req.send();
    req.addEventListener('load',function(){
        let data = JSON.parse(this.responseText);
        renderCountries(data,'neighbour'); // Second argument is "classname e.g .neighbour"
    });

});


const getCountryData = function (country) {
    fetch(`https://restcountries.eu/rest/v2/name/${country}`)
    .then((response)=> response.json())
        .then((data)=> renderCountries(data[0]));
}("netherlands");

//getCountryData("iceland");
};








// getCountryDataAndNeighbour("ireland");
// getCountryDataAndNeighbour("iceland");
getCountryDataAndNeighbour("canada");


// const postCode = ''
// const postReq = new XMLHttpRequest();
// postReq.open("GET",`https://api.postcodes.io/postcodes/${postCode}`);
// postReq.send();

// postReq.addEventListener("load",function(){
//     console.log(JSON.parse(this.responseText));
//     let res = JSON.parse(this.responseText);
//     const {latitude,longitude} = res.result;
//     console.log(latitude);

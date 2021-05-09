'use strict';
const getCountryDataAndNeighbour = country =>{


// DOM selectors
const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');
const heading = document.querySelector('.heading');




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

    countriesContainer.insertAdjacentHTML("beforeend",html); //document.querySelector('.countries');
    countriesContainer.style.opacity = 1;
    heading.textContent = data.name;
};

const renderErr = (err)=>{
    console.error(err);
    countriesContainer.insertAdjacentText("beforeend",`Ooopps!!!😆 ${err}`);
};

const XmlReq = ()=>{
    const request = new XMLHttpRequest(); // Old school AJAX call 

    request.open('GET',`https://restcountries.eu/rest/v2/name/${country}`);
    request.send();

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
};

btn.addEventListener('click',()=> getCountryData(country));

// *** Fetch method *** 

const getCountryData = function (country) {
    fetch(`https://restcountries.eu/rest/v2/name/${country}`)
    .then(response=> {
        console.log(response);
        if(response.status>200 || !response.ok) throw new Error(`Country not found ${response.status}`);
        return response.json();
    })
        .then(data=> {
            renderCountries(data[0]);
            const neighbour = data[0].borders[0];
            if(!neighbour) return; // Exit if there's no neighbour
            return fetch(`https://restcountries.eu/rest/v2/alpha/${neighbour}`);
        })
        .then(response=>response.json())
        .then(dataNeighbour=>renderCountries(dataNeighbour,"neighbour"))
        .catch(err=>renderErr(err))
        .finally(()=>{
            countriesContainer.style.opacity = 1;
        });
};


};




// getCountryDataAndNeighbour("ireland");
// getCountryDataAndNeighbour("iceland");
getCountryDataAndNeighbour('switzerland');


// const postCode = ''
// const postReq = new XMLHttpRequest();
// postReq.open("GET",`https://api.postcodes.io/postcodes/${postCode}`);
// postReq.send();

// postReq.addEventListener("load",function(){
//     console.log(JSON.parse(this.responseText));
//     let res = JSON.parse(this.responseText);
//     const {latitude,longitude} = res.result;
//     console.log(latitude);

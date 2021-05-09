'use strict';



const ApiEndpoint = 'https://geocode.xyz/';
const testCoords = [51.50354,-0.12768];
const bodyFormat = '?geoit=json';

const containerFlag = document.querySelector(".container");
const inputCoordsLat = document.getElementById("coords-lat");
const inputCoordsLong = document.getElementById("coords-long");
const btn = document.querySelector(".btn");







const getInput=()=>{
    let coords = [inputCoordsLat.value,inputCoordsLong.value];
    return coords;
};


const errorDump = (err)=>{console.error(err);};



const getCoords =(coords) =>{
    
    fetch(`${ApiEndpoint}+${coords}+${bodyFormat}`).then(response=>{
        console.log(response);
        if(response.status > 200 || !response.ok) throw new Error(response.status); //throw new Error(`${response.status}`);
        return response.json();
    }).then(data=>{
        
        //let {lat} = data.inlatt;
        //let {long} = data.inlongt;
        //console.log(data.country);
        getCountry(data.country);
        let coords = [data.inlatt,data.inlongt];
        console.log(coords);
        return coords;
    }).catch(error=>errorDump(error));
    
    return coords;

};

// *** Execution starts here! 

btn.addEventListener("click",()=>{
    getCoords(getInput());
});


//let result = getCoords(getInput());



const getCountry = (country)=>{
    if(!country) return;
    fetch(`https://restcountries.eu/rest/v2/name/${country}`).then(response=>{
        //console.log(response);
        if(response.status>200 || !response.ok) throw new Error(`Country not found ${response.status}`);
        return response.json();
    }).then(data=>{
        renderFlag(data[0]);   
    }).catch(err=>{errorDump(err);});
    
    
    return country;

};

const renderFlag = (data)=>{
    console.log(data);
    const html =`
    <div class="card" style="width: 18rem;">
    <img src=${data.flag} class="card-img-top" alt="...">
    <div class="card-body">
      <h5 class="card-title">${data.name}</h5>
      <p class="card-text">${data.altSpellings}</p>
      <a href="#" class="card-link">${data.topLevelDomain}</a>
      <a href="#" class="btn btn-primary">${data.languages[0].name}</a>
    </div>
  </div>
    
    `;

    containerFlag.insertAdjacentHTML("afterend",html);

};



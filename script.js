// fetch("https://api.countrystatecity.in/v1/countries")
// .then(response => response.json())
// .then(data => console.log(JSON.stringify(data)));
// var headers = new Headers();
// headers.append("X-CSCAPI-KEY", "VG5UcXBLUzhTNmtPVjM1c2h6SDRHaXhXUUZmaWJDUTlLdjh0SlI2MQ==");


let selectCountry=document.getElementById("select-country");
let selectState=document.getElementById("select-state");
let selectCity=document.getElementById("select-city");

let selectedCountry="";

var requestOptions = {
  method: 'GET',
  headers: {'X-CSCAPI-KEY':'VG5UcXBLUzhTNmtPVjM1c2h6SDRHaXhXUUZmaWJDUTlLdjh0SlI2MQ=='},
};

//api call to fetch countries
fetch("https://api.countrystatecity.in/v1/countries",requestOptions)
.then(response => response.json())
.then(data => 
    {
        data.map((obj,index) => {
            let option = document.createElement("option");
            option.value=obj.iso2;
            option.text=obj.name;
            //load the countries to country dropdown
            selectCountry.appendChild(option);
        })
      
    });

    //api call to fetch states
    async function fetchState(event){

        //clear state dropdown everytime when country is changed
        var options = document.querySelectorAll('#select-state option');
        options.forEach(o => o.remove());

            //clear city dropdown everytime country is changed
            var options = document.querySelectorAll('#select-city option');
            options.forEach(o => o.remove());

        let country = event.target.value;
        selectedCountry=country;
        // console.log(`selected country ${country}`);
        await fetch(`https://api.countrystatecity.in/v1/countries/${country}/states`,requestOptions)
    .then(response => response.json())
    .then(data => 
        {
            data.map((obj,index) => {
                let option = document.createElement("option");
                option.value=obj.iso2;
                option.text=obj.name;
                //load the states to state dropdown
                selectState.appendChild(option);
            })
          
        });
    }
    
//fetch cities
async function fetchCities(event){
    let state= event.target.value;

        //clear city dropdown everytime country is changed
        var options = document.querySelectorAll('#select-city option');
        options.forEach(o => o.remove());

    await fetch(`https://api.countrystatecity.in/v1/countries/${selectedCountry}/states/${state}/cities`,requestOptions)
    .then(response => response.json())
    .then(data => 
        {
            data.map((obj,index) => {
                let option = document.createElement("option");
                option.value=obj.name;
                option.text=obj.name;
                //load the cities to city dropdown
                selectCity.appendChild(option);
            })
          
        });
}


let city_name=document.getElementById("city-name");
let state_name =document.getElementById("state-name");
let country_name=document.getElementById("country-name");

let icon=document.getElementById("icon");
let desc=document.getElementById("description");

let temp=document.getElementById("temperature");

let pressure =document.getElementById("pressure");
let precip =document.getElementById("precip");
let humidity = document.getElementById("humidity");

let wind_speed=document.getElementById("wind-speed");
let wind_degree =document.getElementById("wind-degree");
let wind_direction =document.getElementById("wind-direction");

function handle(event){
    event.preventDefault();
    //clear data before each request
    city_name.innerText="";
        state_name.innerText="";
        country_name.innerText="";

        const element = document.getElementsByClassName("weather-png")[0];
        if(element){
            element.remove();
        }

        desc.innerText="";
        temp.innerText="";

        pressure.innerText="";
        precip.innerText="";
        humidity.innerText="";

        wind_speed.innerText="";
        wind_degree.innerText="";
        wind_direction.innerText="";

        document.getElementsByClassName("weather-info")[0].style.display="none";
    
}

//below function will be executed on clicking "Get Data" button
//city is passed as query parameter
//this will call api.weatherstack.com api to get the weather data
async function getData(){
    let CITY = document.getElementById("select-city").value;
    console.log(`selected city ${CITY}`);
    let loadIcon =document.getElementsByClassName("spinner-border")[0];
    loadIcon.style.display="block";
    fetch(`http://api.weatherstack.com/current?access_key=${API}&query=${CITY}`)
    .then(response => response.json())
    .then(data => {
        if(data.success === false){
            city_name.innerText="City is not valid!!";
            loadIcon.style.display="none";
            document.getElementsByClassName("weather-info")[0].style.display="block";
        }
        else{
            // console.log(JSON.stringify(data));
        city_name.innerText=`${data.location.name},`;
        state_name.innerText=`${data.location.region},`;
        country_name.innerText=data.location.country;

        //get the corresponding weather icon and load it in img element
        let iconsrc=data.current.weather_icons;
        let imgTag=document.createElement('img');
        imgTag.src=iconsrc;
        imgTag.classList.add("weather-png");

        icon.appendChild(imgTag);

        desc.innerText=data.current.weather_descriptions;
        temp.innerText=`${data.current.temperature}°C`;

        //get weather data and load thme in respective elements
        pressure.innerText=`Pressure: ${ data.current.pressure} hPa`;
        precip.innerText=`Precipitation: ${ data.current.precip}°C`;
        humidity.innerText=`Humidity: ${ data.current.humidity}%`;

        wind_speed.innerText=`Wind Speed: ${ data.current.wind_speed}mph`;
        wind_degree.innerText=`Wind Degree: ${ data.current.wind_degree}`;
        wind_direction.innerText=`Wind Direction: ${ data.current.wind_dir}`;

        loadIcon.style.display="none";
        document.getElementsByClassName("weather-info")[0].style.display="block";
        }
        
    })
}
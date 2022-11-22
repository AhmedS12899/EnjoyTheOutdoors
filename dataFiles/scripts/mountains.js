"use strict";

window.onload = () => {
    //stored our dropdown in mountainDropList
    let mountainDropList = document.getElementById("mountainDropList");
    let cardDiv = document.getElementById("cardDiv");
    dropList(mountainDropList, mountainsArray);

    mountainDropList.onchange = () => {
        cardDisplay(mountainDropList, mountainsArray);
    }
}
//function to populate and create our dropdown
function dropList(list, array) {
    let option = document.createElement("option");
    option.text = "Select a Mountain";
    list.appendChild(option);
    for (let mountain of array) {
        let option = document.createElement("option");
        option.text = mountain.name;
        list.appendChild(option);
    }
}
//when this function is called it populate our cards with the corresponding mountain information
function cardDisplay(list, array) {
    let name = document.getElementById("cardTitle");
    let description = document.getElementById("cardDesc");
    let elev = document.getElementById("elevation");
    let cardImg = document.getElementById("cardImg");
    let sunrise = document.getElementById("sunrise");
    let sunset = document.getElementById("sunset");

    // function that can "fetch" the sunrise/sunset times
    for (let mountain of array) {
        if (list.value == "Select a Mountain") {
            cardDiv.style.display = "none";
        }
        else if (list.value == mountain.name) {
            cardImg.src = "images/" + mountain.img;
            name.innerHTML = mountain.name;
            description.innerHTML = mountain.desc;
            elev.innerHTML = "Elevation: " + mountain.elevation;
            getSunsetForMountain(mountain.coords.lat, mountain.coords.lng).then(data => {
                sunrise.innerHTML = "Sunrise: " + data.results.sunrise + " UTC";
                sunset.innerHTML = "Sunset: " + data.results.sunset + " UTC";
            });
            cardDiv.style.display = "block";
        }
    }
}
//API for fetching sunrise and sunset times
async function getSunsetForMountain(lat, lng) {
    let response = await fetch(
        `https://api.sunrise-sunset.org/json?lat=${lat}&lng=${lng}&date=today`);
    let data = await response.json();
    return data;
}

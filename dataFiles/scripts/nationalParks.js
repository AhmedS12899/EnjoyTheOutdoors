"use strict";

//stored our checkboxes in locationFilter and parkTypeFilter
let locationFilter = document.getElementById("locationCheck");
let parkTypeFilter = document.getElementById("parkTypeCheck");
let viewAllCheck = document.getElementById("viewAllCheck");

//stored our dropdowns in locationList and parkType
let locationList = document.getElementById("locationDrop");
let parkList = document.getElementById("parkType");

window.onload = () => {

    //onclick will display and populate our dropdown depending on whether the checkbox is checked or not
    locationFilter.onclick = () => {
        if (locationFilter.checked) {
            //add default option to our list asking user to select a location
            let locationHeader = document.createElement("option");
            locationHeader.text = 'Select a location';
            locationList.appendChild(locationHeader);
            createFilters(locationList, locationsArray);

            locationList.style.display = "block";
        }
        else {
            locationList.length = 0; //resets our dropdown when not selected
            displayTable();
            locationList.style.display = "none"; //hides dropdown when not selected
            if(!parkTypeFilter.checked && !locationFilter.checked){
                tableBody.innerHTML = "";
                document.getElementById("tableDiv").style.display = "none";
            }
        }
    }

    //onclick will display and populate our dropdown depending on whether the checkbox is checked or not
    parkTypeFilter.onclick = () => {
        if (parkTypeFilter.checked) {
            //add default option to our list asking user to select a park type
            let parkTypeHeader = document.createElement("option");
            parkTypeHeader.text = 'Select a type of Park';
            parkList.appendChild(parkTypeHeader);
            createFilters(parkList, parkTypesArray);

            parkList.style.display = "block";
        }
        else {

            parkList.length = 0;
            displayTable();
            parkList.style.display = "none";
            if(!parkTypeFilter.checked && !locationFilter.checked){
                tableBody.innerHTML = "";
                document.getElementById("tableDiv").style.display = "none";
            }
        }
    }
    //onlick will display all the parks in our table
    viewAllCheck.onclick = () => {
        if(viewAllCheck.checked){
            disableCheck(parkTypeFilter, locationFilter);
            displayTable();
        }
        else{
            if(!viewAllCheck.checked){
                tableBody.innerHTML = "";
                document.getElementById("tableDiv").style.display = "none";
            }
        }
    }
    locationList.onchange = displayTable;
    parkList.onchange = displayTable;
}

//when called will populate our lists depending on which array is being passed
function createFilters(list, array) {

    for (let items of array) {
        let option = document.createElement("option");
        option.text = items;
        list.appendChild(option);
    }
}

function displayTable() {
    document.getElementById("tableDiv").style.display="block";
    let tableBody = document.getElementById("tableBody");
    if (locationFilter.checked && parkTypeFilter.checked) {
        tableBody.innerHTML = "";
        for (let park of nationalParksArray) {
            if (locationList.value == park.State && park.LocationName.indexOf(parkList.value) != -1) {
                buildParkRow(tableBody, park);
            }
        }
    }
    else if (locationFilter.checked && !parkTypeFilter.checked) {
        tableBody.innerHTML = "";
        for (let park of nationalParksArray) {
            if (locationList.value == park.State) {
                buildParkRow(tableBody, park);
            }
        }
    }
    else if (parkTypeFilter.checked && !locationFilter.checked) {
        tableBody.innerHTML = "";
        for (let park of nationalParksArray) {
            if (park.LocationName.indexOf(parkList.value) != -1) {
                buildParkRow(tableBody, park);
            }
        }
    }
    else{
        for(let park of nationalParksArray){
            buildParkRow(tableBody, park);
        }
    }
}

function buildParkRow(tbody, park) {
    let row = tbody.insertRow();
    let tableLocationName = row.insertCell(0);
    if (park.Visit == undefined) {
        tableLocationName.innerHTML = park.LocationName;
    }
    else {
        let a = document.createElement("a");
        let textNode = document.createTextNode(park.LocationName);
        a.appendChild(textNode);
        a.href = park.Visit;
        tableLocationName.appendChild(a);
    }


    let tableAddress = row.insertCell(1);
    if (park.ZipCode == 0) {
        tableAddress.innerHTML = "";
    }
    else {
        tableAddress.innerHTML = park.Address;
    }

    let tableCity = row.insertCell(2);
    tableCity.innerHTML = park.City;

    let tableState = row.insertCell(3);
    tableState.innerHTML = park.State;

    let tableZip = row.insertCell(4);
    if (park.ZipCode == 0) {
        tableZip.innerHTML = "";
    }
    else {
        tableZip.innerHTML = park.ZipCode;
    }
}
function disableCheck(p, l){
    p.checked = false;
    parkList.style.display = "none";
    parkList.length = 0;

    l.checked = false;
    locationList.style.display = "none";
    locationList.length = 0;
}
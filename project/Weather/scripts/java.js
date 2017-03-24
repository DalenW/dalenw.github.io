var weatherData;

console.log("The scripts have started!");

//$("main").hide();

//myWeatherData();
getGeoLocation();

function setData(data) {
    console.log("Setting Data.");
    //reset the display search results 
    $("#searchResults").html("");
    //document.getElementById("searchBar").setAttribute("value", " "); //this kills the results display for some reason
    //$("main").show();

    $("#temperature").html(Math.round(data.current_observation.temp_f));
    $("#forcast").html(data.current_observation.weather);
    //$("#highLow").html()
    $("#location").html(data.location.city + ", " + data.location.state);
    $("#windData").html(data.current_observation.wind_mph + " MPH");
    $("#windDirection").html(data.current_observation.wind_dir);
    $("#precipitation").html(data.current_observation.precip_today_metric);
}

function weatherAPI(input) {
    console.log("Getting API. Input: " + input);
    console.log("https://api.wunderground.com/api/5b0759a252c90180/geolookup/conditions/q/" + input + ".json");
    $.ajax({
        url: "https://api.wunderground.com/api/5b0759a252c90180/geolookup/conditions/q/" + input + ".json",
        dataType: "jsonp",
        success: function (parsed_json) {
            console.log(parsed_json);
            setData(parsed_json);
        }
    });
}

function myWeatherData() {
    console.log("Parsing the JSON file.");
    $.ajax({
        url: "scripts/weather.json",
        dataType: "json",
        success: function (data) {
            console.log("Reading the JSON file.");
            console.log(data);
            weatherData = data;
            console.log(weatherData);
            setData("Franklin");
        }
    });
}

function getGeoLocation() {
    console.log('Getting Location...');
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            var lat = position.coords.latitude;
            var long = position.coords.longitude;
            console.log("Got location.");
            weatherAPI(lat + "," + long);
        });
    } else {
        console.log("Your browser doesn't support Geolocation or it is not enabled!");
    }

}

$("#searchBar").keyup(function () {
    var value = $("#searchBar").val();

    $.getJSON("//autocomplete.wunderground.com/aq?query=" + value + "&cb=?", function (data) {
        console.log("Search Results:");
        console.log(data);
        displaySearchResults(data);
    }); // end getJSON
});

function displaySearchResults(data) {
    console.log("Dsiplaying Search Results");

    var arrayLength = data.RESULTS.length;
    //console.log(arrayLength);
    if (arrayLength > 5)
        arrayLength = 5;

    var searchHTML = "";

    for (var i = 0; i < arrayLength; i++) {
        //"<p class=/"result/"><a onlick="weatherAPI()" href=/"#/">NAME</a></p>"

        var input = data.RESULTS[i].lat + "," + data.RESULTS[i].lon;

        searchHTML += "<p class=\"result\"><a href=\"javascript:weatherAPILL(" + input + ");\">" + data.RESULTS[i].name + "</a></p>";
    }
    $("#searchResults").html(searchHTML);
}

function weatherAPILL(lat, long) {
    weatherAPI(lat + "," + long);
}

function onSearchSubmit() {
    console.log("Submitted search form.");
    var value = $("#searchBar").val();

    if (value == "")
        getGeoLocation();
    else {
        $.getJSON("//autocomplete.wunderground.com/aq?query=" + value + "&cb=?", function (data) {
            weatherAPI(data.RESULTS[0].lat + "," + data.RESULTS[0].lon);
        });
    }

}
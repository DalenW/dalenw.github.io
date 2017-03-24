var weatherData;

console.log("The scripts have started!");

//$("main").hide();

//myWeatherData();
getGeoLocation();

function setData(data) {
    console.log("Setting Data.");
    //$("main").show();

    $("#temperature").html(Math.round(data.current_observation.temp_f));
    $("#forcast").html(data.current_observation.weather);
    //$("#highLow").html()
    $("#location").html(data.location.city + ", " + data.location.state);
    $("#windData").html(data.current_observation.wind_mph + " MPH");
    $("#windDirection").html(data.current_observation.wind_dir);
    $("precipitation").html(data.current_observation.precip_today_metric);
}

function weatherAPI(input) {
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

/*
function setData(city) {
    if (weatherData == null)
        console.log("WeatherData is null");
    else {
        console.log("Setting my weather data");

        var data;

        if (city == "Franklin")
            data = weatherData.Franklin;


        document.getElementById("title").innerHTML = data.City + ": Weather Home";
        document.getElementById("precipitation").innerHTML = data.Precip;
        document.getElementById("forcast").innerHTML = data.Summary;
        document.getElementById("windData").innerHTML = data.Wind + " MPH";
        document.getElementById("location").innerHTML = data.City + ", " + data.State;
        document.getElementById("highLow").innerHTML = "Hi / Low: " + data.High + " / " + data.Low;

        for(var i = 0; i < 24; i++)
            document.getElementById("t" + i).innerHTML = data.Hourly[i];
        
        document.getElementById("title").innerHTML = weatherData.Franklin.City + ": Weather Home";
        document.getElementById("precipitation").innerHTML = weatherData.Franklin.Precip;
        document.getElementById("forcast").innerHTML = weatherData.Franklin.Summary;
        document.getElementById("windData").innerHTML = weatherData.Franklin.Wind + " MPH";
        document.getElementById("windDirection").innerHTML = weatherData.Franklin.Direction;
        document.getElementById("location").innerHTML = weatherData.Franklin.City + ", " + weatherData.Franklin.State;
        document.getElementById("highLow").innerHTML = "Hi / Low: " + weatherData.Franklin.High + " / " + weatherData.Franklin.Low;

        for (var i = 0; i < 24; i++) {
            document.getElementById("t" + i).innerHTML = weatherData.Franklin.Hourly[i];
        }
    }
}
*/

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
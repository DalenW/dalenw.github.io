var weatherData;

myWeatherData();

function weatherAPI() {
    $.ajax({
        url: "http://api.wunderground.com/api/5b0759a252c90180/geolookup/conditions/q/IA/Cedar_Rapids.json",
        dataType: "jsonp",
        success: function (parsed_json) {
            var location = parsed_json['location']['city'];
            var temp_f = parsed_json['current_observation']['temp_f'];
            alert("Current temperature in " + location + " is: " + temp_f);
        }
    });
}

function myWeatherData() {
    $.ajax({
        url: "weather.json",
        dataType: "json",
        success: function (data) {
            console.log("Reading the JSON file");
            console.log(data);
            weatherData = data;
            console.log(weatherData);
            setData();
        }
    });
}

function setData() {
    if (weatherData == null)
        console.log("WeatherData is null");
    else {
        console.log("Setting my weather data");

        document.getElementById("title").innerHTML = weatherData.Franklin.City + ": Weather Home";
        document.getElementById("precipitation").innerHTML = weatherData.Franklin.Precip;
        document.getElementById("forcast").innerHTML = weatherData.Franklin.Summary;
        document.getElementById("windData").innerHTML = weatherData.Franklin.Wind + " MPH";
        document.getElementById("location").innerHTML = weatherData.Franklin.City + ", " + weatherData.Franklin.State;
        document.getElementById("highLow").innerHTML = "Hi / Low: " + weatherData.Franklin.High + " / " + weatherData.Franklin.Low;
    }
}

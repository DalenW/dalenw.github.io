//test editing the html content
document.getElementById("temperature").innerHTML = "90";

var weatherData;

$.ajax({
    url: "weather.json",
    success: function(data) {
        console.log(data);
        weatherData = JSON.parse(data);

        //console.log(weatherData);
    }
});

document.getElementById("precipitation").innerHTML = weatherData;
//read the json file


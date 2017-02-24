//test editing the html content
document.getElementById("temperature").innerHTML = "90";

//read the json file?
$.ajax({
    url: "weather.json",
    success: function(data) {
        var obj = JSON.parse(data);
    }
});


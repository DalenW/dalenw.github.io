getGeoLocation();



// Intercept the menu link clicks
$("#page-nav").on("click", "a", function (evt) {
  evt.preventDefault();
  // With the text value get the needed value from the weather.json file
  var jsonCity = $(this).text(); // Franklin, etc...
  console.log(jsonCity);
  $.ajax({
    url: "scripts/weather.json",
    dataType: "json",
    success: function (data) {
      console.log(data);
      console.log(data[jsonCity]);
      var zip = data[jsonCity].zip;
      console.log(zip);
      getData(zip);
    }
  });
});

// A function for changing a string to TitleCase
function toTitleCase(str) {
  return str.replace(/\w+/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}

// Get weather data from wunderground.com
function getData(input) {
  // Get the data from the wunderground API
  console.log("Input " + input)
  $.ajax({
    url: "http://api.wunderground.com/api/5b0759a252c90180/geolookup/conditions/q/" + input + ".json",
    dataType: "jsonp",
    success: function (data) {
      console.log(data);
      var location = data.location.city + ', ' + data.location.state;
      var temp_f = data.current_observation.temp_f;
      console.log('Location is: ' + location);
      console.log('Temp is: ' + temp_f);
      $("#cityDisplay").text(location);
      $("title").html(location + " | Weather Center");
      $("#currentTemp").html(Math.round(temp_f) + '°');
      $("#summary").text(toTitleCase(data.current_observation.icon));
      $("#cover").fadeOut(250);
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
      getData(lat + "," + long);
    });
  } else {
    console.log("Your browser doesn't support Geolocation or it is not enabled!");
  }

}
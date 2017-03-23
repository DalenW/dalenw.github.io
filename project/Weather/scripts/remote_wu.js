// Current Location Scripts
$(function () {

  var status = $('#status');

  (function getGeoLocation() {
    status.text('Getting Location...');
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        var lat = position.coords.latitude;
        var long = position.coords.longitude;

        // Call the getData function, send the lat and long
        getData(lat, long);

      });
    } else {
      status.text("Your browser doesn't support Geolocation or it is not enabled!");
    }

  })();

  // Get the data from the wunderground API
  function getData(lat, long) {
    $.ajax({
      url: "http://api.wunderground.com/api/5b0759a252c90180/geolookup/conditions/q/" + lat + "," + long + ".json",
      dataType: "jsonp",
      success: function (parsed_json) {
        console.log(parsed_json);
        success(parsed_json);
      }
    });
  }

  // A function for changing a string to TitleCase
  function toTitleCase(str) {
    return str.replace(/\w+/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  }

  function success(data) {
    console.log("Success. Settiing data.");
    $("#cover").fadeOut(250);

    //city and state
    $("#cityDisplay").html(data.location.city + ", " + data.location.state);

    //round current temp
    var temp = data.current_observation.temp_f;
    temp = Math.round(temp);
    $("#currentTemp").html(temp);

    //summary of the weather
    $("#summary").html(data.current_observation.weather);

    //additional data
    $("#add1").html("Feels like " + Math.round(data.current_observation.feelslike_f));
    $("#add2").html(data.current_observation.wind_string);
    $("#add3").html("Precip: " + data.current_observation.precip_today_metric);

    //last updated
    $("small").html(data.current_observation.observation_time);
  }
})
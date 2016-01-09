$(document).ready(function() {
  var thermostat = new Thermostat();
  updateTemperature();
  getWeather();
  $('#PSM_status').text('on');
  $('#thermostat').hide().fadeIn('slow');

  $('#temp_up').click(function() {
    thermostat.up();
    updateTemperature();
  });

  $('#temp_down').click(function() {
    thermostat.down();
    updateTemperature();
  });

  $('#reset').click(function() {
    thermostat.default();
    updateTemperature();
  });

  $('#power_save').click(function() {
    thermostat.toggle();
    updateTemperature();
    if(thermostat.power_save) {
      $('#PSM_status').text('on');
    } else {
      $('#PSM_status').text('off');
    }
  });

  $('button').hover(function () {
    $(this).css("opacity", 0.6);
  });

  function updateTemperature() {
    $('#temperature').text(thermostat.temperature);
    $('#therm').attr('class', thermostat.power_usage());
  }

  function getWeather() {
    $.get("http://api.openweathermap.org/data/2.5/weather?q=London,uk&units=metric&appid=5d24feaa9b01c3e76763d1de227881dd", function(data){
      $('#current-temp').text(Math.round(data.main.temp));
      $('#current-weather').text(data.weather[0].main);
      console.log(data);
    });
  }

  $("#city_select").submit(function(event){
    event.preventDefault();
    var city = $("#current_city").val();
    $.get("http://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=metric&appid=5d24feaa9b01c3e76763d1de227881dd", function(data){
      $('#current-temp').text(Math.round(data.main.temp));
      $('#current-weather').text(data.weather[0].main);
      console.log(data);
    });
  });

});

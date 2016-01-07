$(document).ready(function() {
  var thermostat = new Thermostat();
  updateTemperature();
  $('#PSM_status').text('on');

  $('#temp_up').on('click', function() {
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

  function updateTemperature() {
    $('#temperature').text(thermostat.temperature);
    $('#thermostat').attr('class', thermostat.power_usage());
  }
});

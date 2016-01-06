'use strict';

describe("Thermostat", function() {
  var thermo;

  beforeEach(function() {
    thermo = new Thermostat();
  });

  it("Thermostat temperature should start at 20", function() {
    expect(thermo.temp()).toEqual(20);
  });

  it("Should be able to increase temperature by 1", function() {
    thermo.up();
    expect(thermo.temp()).toEqual(21);
  });

  it("Should be able to decrease temperature by 1", function() {
    thermo.down();
    expect(thermo.temp()).toEqual(19);
  });

  it("Show display error if temperature is changed below minimum (10)", function() {
    for (var x = 0; x < 10; x++){
      thermo.down()};
    expect(function(){
      thermo.down();
    }).toThrow('Minimum temperature reached');
  });

  it("Should have a power save mode that can be switched on & off", function() {
    expect(thermo.power_save).toEqual(true);
    thermo.toggle();
    expect(thermo.power_save).toEqual(false);
    thermo.toggle();
    expect(thermo.power_save).toEqual(true);
  });

  it("If power save is on, max temperature is 25", function() {
    for (var x = 0; x < 5; x++) {
      thermo.up()};
    expect(function(){
      thermo.up();
    }).toThrow('Maximum temperature reached');
  });

  it("If power save is off, max temperature is 32", function() {
    thermo.toggle();
    for (var x = 0; x < 12; x++) {
      thermo.up()};
    expect(function(){
      thermo.up();
    }).toThrow('Maximum temperature reached');
  });

  it("Can reset thermostat temperature to 20", function() {
    thermo.up();
    thermo.up();
    thermo.up();
    thermo.default();
    expect(thermo.temp()).toEqual(20);
  });

  it("Displays low power usage when temperature is below 18", function(){
    for (var x = 0; x < 3; x++) {
      thermo.down()};
    expect(thermo.power_usage()).toEqual('Low power usage');
  });
  it("Displays medium power usage when temperature is between 18 & 25", function(){
    expect(thermo.power_usage()).toEqual('Medium power usage');
  });
  it("Displays high power usage when temperature is above 25", function(){
    thermo.toggle();
    for (var x = 0; x < 7; x++) {
      thermo.up()};
    expect(thermo.power_usage()).toEqual('High power usage');
  });

});

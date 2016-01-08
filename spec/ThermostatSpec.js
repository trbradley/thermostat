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

  it('Should have a minimum temperature of 10', function() {
    for (var x = 0; x < 12; x++){
      thermo.down();}
    expect(thermo.temperature).toEqual(10);
  });

  it("Should have a power save mode that can be switched on & off", function() {
    expect(thermo.power_save).toEqual(true);
    thermo.toggle();
    expect(thermo.power_save).toEqual(false);
    thermo.toggle();
    expect(thermo.power_save).toEqual(true);
  });

  it("has power save on by default, with a max temperature of 25", function() {
    for (var x = 0; x < 7; x++) {
      thermo.up(); }
      expect(thermo.temperature).toEqual(25);
  });

  it("can turn off power save, for a max temperature of 32", function() {
    thermo.toggle();
    for (var x = 0; x < 14; x++) {
      thermo.up(); }
    expect(thermo.temperature).toEqual(32);
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
      thermo.down(); }
    expect(thermo.power_usage()).toEqual('low-usage');
  });
  it("Displays medium power usage when temperature is between 18 & 25", function(){
    expect(thermo.power_usage()).toEqual('medium-usage');
  });
  it("Displays high power usage when temperature is above 25", function(){
    thermo.toggle();
    for (var x = 0; x < 7; x++) {
      thermo.up(); }
    expect(thermo.power_usage()).toEqual('high-usage');
  });

});

function Thermostat(){
  this.DEFAULT_TEMP = 20;
  this.MIN_TEMP = 10;
  this.PSM_MAX = 25;
  this.PSM_OFF_MAX = 32;
  this.LOW_POWER = 18;
  this.temperature = this.DEFAULT_TEMP;
  this.power_save = true;
}

Thermostat.prototype.temp = function() {
  return this.temperature;
};

Thermostat.prototype.up = function() {
  if (this._maxTemp())
    return;
  this.temperature += 1;
};

Thermostat.prototype.down = function() {
  if (this._minTemp())
    return;
  this.temperature -= 1;
};

Thermostat.prototype.toggle = function() {
  this.power_save = !this.power_save;
  if(this.power_save && this.temperature > this.PSM_MAX) {
    this.temperature = this.PSM_MAX;
  }
};

Thermostat.prototype.power_usage = function() {
  if (this._isLow()) return ("low-usage");
  if (this._isMed()) return ("medium-usage");
  return ("high-usage");
};

Thermostat.prototype.default = function() {
  this.temperature = this.DEFAULT_TEMP;
};

Thermostat.prototype._minTemp = function() {
  return this.temperature === this.MIN_TEMP;
};

Thermostat.prototype._maxTemp = function() {
  if (this.power_save) {return this.temperature >= this.PSM_MAX;}
  return this.temperature >= this.PSM_OFF_MAX;
};

Thermostat.prototype._isLow = function() {
  return this.temperature < this.LOW_POWER;
};
Thermostat.prototype._isMed = function() {
  return this.temperature < this.PSM_MAX;
};

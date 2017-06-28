var UI = require('./views/ui.js');
var CountryList = require("./models/countries.js");

var app = function() {
  new UI();
  new CountryList();
}

window.addEventListener('load', app);

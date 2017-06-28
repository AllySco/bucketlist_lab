/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

var UI = __webpack_require__(1);
var CountryList = __webpack_require__(2);

var app = function() {
  new UI();
  new CountryList();
}

window.addEventListener('load', app);


/***/ }),
/* 1 */
/***/ (function(module, exports) {

var UI = function(){


}



module.exports = UI;


/***/ }),
/* 2 */
/***/ (function(module, exports) {

var CountryList = function() {
  var url = "https://restcountries.eu/rest/v2";

  var request = new XMLHttpRequest();
  request.open("GET", url);
  request.addEventListener("load", function() {
    this.handleData(request.responseText);
  }.bind(this));
  request.send();
}

CountryList.prototype = {
handleData: function(countries) {
  var countriesData = JSON.parse(countries);
  this.createCountryDropdown(countriesData);
  this.populateCountriesDropdown(countriesData);
},
createCountryDropdown: function(countries) {
  var dropDown = document.querySelector("#select");
  var option = document.createElement("option");
  option.text = "Choose a Country";
  dropDown.options.add( option );

  option.disabled = true;
  option.selected = true;

  dropDown.addEventListener("change", function(event) {
  var value = event.target.selectedOptions[0].value;
  console.log("value", value);
  var country = this.findCountryByNumericCode( value, countries);
  // createCountry(country);
  // saveCountry(country)   ADD MONGO HERE
}.bind(this));

  var div = document.querySelector("#dropDownDiv");
  div.appendChild(dropDown);
},

populateCountriesDropdown: function(countries) {
  var select = document.querySelector("#select");
  for (country of countries) {
    var option = document.createElement( "option");
    option.value = country.numericCode;
    option.text = country.name;
    select.options.add(option);
  }
},

findCountryByNumericCode: function(value, countries) {
  for (country of countries) {
    if (country.numericCode == value ) {
      return country;
    }
  }
}
}
module.exports = CountryList;


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map
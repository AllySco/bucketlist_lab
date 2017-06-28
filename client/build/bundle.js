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
/***/ (function(module, exports, __webpack_require__) {

var BucketActivities = __webpack_require__(3);

var UI = function(){
  var bucketActivities = new BucketActivities();
  bucketActivities.all( function(allActivities) {
    this.render(allActivities);
  }.bind(this));
}

UI.prototype = {
  render: function(allActivities) {
      var container = document.querySelector("#bucket-list");
      var ul = document.createElement("ul");

      for(activity of allActivities) {
        var li = document.createElement("li");
        li.innerText = "Country: " +  activity.country + " - Activity: " + activity.activityText;
        ul.appendChild(li);
      }
      container.appendChild(ul);
  }
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
  this.createActivityInput(country);
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
},

createActivityInput: function(country) {
  var formTag = document.createElement('form');
  formTag.id = "activity-input-form";
  formTag.method = "POST";
  formTag.action = "/bucket"

  var labelTag = document.createElement('label');
  labelTag.for = "activity-field"
  labelTag.innerText = "Activity"

  var inputTag = document.createElement('input');
  inputTag.type = "text";
  inputTag.id = "activity-field";
  inputTag.name = "activity"
  inputTag.placeholder = "Why Not Bog Snorkling?";

  var submitButton = document.createElement('input');
  submitButton.type = "submit";
  submitButton.value = "Add to Bucket List";

  var targetDiv = document.querySelector("#input");

  formTag.appendChild(labelTag);
  formTag.appendChild(inputTag);
  formTag.appendChild(submitButton);
  targetDiv.appendChild(formTag);
}


}
module.exports = CountryList;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

var Activity = __webpack_require__(4)

var BucketActivities = function() {};

BucketActivities.prototype = {
  makeRequest: function(url, onRequestComplete) {
    var request = new XMLHttpRequest();
    request.open("GET", url);
    request.addEventListener("load", function() {
      if(request.status !== 200) return;
      var jsonString = request.responseText;
      var resultsData = JSON.parse(jsonString);
      onRequestComplete(resultsData);
    })
    request.send();
  },
  all: function(onActivitiesReady) {
      this.makeRequest("http://localhost:3000/bucket", function(allActivities) {
        onActivitiesReady(allActivities);
      });
  }

}




module.exports = BucketActivities;


/***/ }),
/* 4 */
/***/ (function(module, exports) {

var Activity = function(options) {
  this.country = options.country;
  this.activityText = options.activityText;
}


module.exports = Activity;


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map
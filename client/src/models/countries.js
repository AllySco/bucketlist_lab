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

'use strict';
const body = document.querySelector('body');
const nameInput = document.querySelector('.name');
const phoneNumber = document.querySelector('.number');
const submitButton = document.querySelector('.submit');
const nameValidationRE = /^([a-z]*\s[a-z]*((\s([a-z]*))?)$)/i;
const numberValidationRE = /(\+380)?(380)?0[- ]?\d\d[- ]?\d\d\d[- ]?\d\d[- ]?\d\d$/;
const checkboxInfo = document.querySelector('.checkbox');
const phoneRegionInfo = document.querySelector('.phone-region');
const regionSelection = document.querySelector('.region');

nameInput.addEventListener('change', validateName);
function validateName() {
  let valueName = nameInput.value.trim();
  if (!nameValidationRE.test(valueName) ) {
    nameInput.classList.add('invalid');
    nameInput.classList.remove('valid');
    return false;
  }
  nameInput.classList.add('valid');
}

phoneNumber.addEventListener('change',validateNumber);
function validateNumber() {
  let valueNumber = phoneNumber.value.trim();
  if (!numberValidationRE.test(valueNumber) ) {
    phoneNumber.classList.remove('valid');
    phoneNumber.classList.add('invalid');
    return false;
  }
  phoneNumber.classList.add('valid');
}

checkboxInfo.addEventListener('change', hideInfo);
function hideInfo () {
  phoneRegionInfo.hidden = !phoneRegionInfo.hidden;
}

const homeCityList = {
  Center: ['Select home city', 'Cherkasy', 'Dnipro', 'Kropyvnytskyi',
    'Poltava', 'Vinnytsia', 'Zhytomyr', 'Not in the list'],
  North: ['Select home city', 'Chernihiv', 'Sumy', 'Not in the list'],
  East: ['Select home city', 'Donetsk', 'Kharkiv', 'Luhansk', 'Not in the list'],
  South: ['Select home city', 'Kherson', 'Mykolaiv', 'Odesa', 'Zaporizhzhia', 'Not in the list'],
  West: ['Select home city', 'Chernivtsi', 'Ivano-Frankivsk', 'Khmelnytskyi',
    'Lutsk', 'Lviv', 'Rivne', 'Ternopil', 'Uzhhorod', 'Not in the list']
};

const form = document.querySelector('.form');
const selectCity = document.querySelector('.select-home');
const selectHomeCity = document.querySelector('.select-homecity');
selectHomeCity.classList.add('invisible');
regionSelection.addEventListener('change', showCityList);
function showCityList() {
  const citiesList = homeCityList[regionSelection.value];

  while (selectCity.hasChildNodes()) {
    selectCity.removeChild(selectCity.firstChild);
  }

  if (citiesList) {
    selectHomeCity.classList.remove('invisible');
    citiesList.forEach((option) =>{
      selectCity.insertAdjacentHTML('beforeend', `<option>${option}</option>>`)
    });
    selectCity.firstChild.selected = true;
    selectCity.firstChild.disabled = true;
    submitButton.disabled = true;
  } else {
    selectHomeCity.classList.add('invisible');
  }
}

form.addEventListener('input', changeButton);
submitButton.disabled = true;
function changeButton() {
  const validName = nameInput.classList.contains('valid');
  const validNumber = phoneNumber.classList.contains('valid');
  submitButton.disabled = true;
  if (checkboxInfo.checked) {
    submitButton.disabled = !validName;
  } else {

    submitButton.disabled = true;
    if (validName && validNumber && regionSelection.options[1]) {
      submitButton.disabled = false;
    } else
      submitButton.disabled = !(validName && validNumber
        && regionSelection.options[regionSelection.selectedIndex].value
        && selectCity.options[selectCity.selectedIndex]);
  }
}

var hours = ['10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM'];
var stores = [];

function Store(name, min, max, avgCookies, operatingHoursArr) {
  this.custMin = min;
  this.custMax = max;
  this.avgCookiePerCust = avgCookies;
  this.storeName = name;
  this.opHours = operatingHoursArr;

  stores.push(this);
}

Store.prototype.cookiePurchases = function(numCustomers, cookiesPerCust) {
  return Math.floor(numCustomers * cookiesPerCust);
};

Store.prototype.randomCustomer = function(min, max) {
  var rand = Math.floor(Math.random() * (max - min + 1)) + min;
  return rand;
};

Store.prototype.generateCookieData = function(operatingHours) {
  var storeData = [];
  for (var idx = 1; idx <= operatingHours; idx++) {
    var customers = this.randomCustomer(this.custMin, this.custMax);
    storeData.push(this.cookiePurchases(customers, this.avgCookiePerCust));
  }

  return storeData;
};

Store.prototype.calcTotalCookies = function(hourData) {
  var total = 0;
  for (var hour in hourData) {
    total += hourData[hour];
  }

  return total;
};

Store.prototype.render = function() {
  var mainEl = document.getElementById('storeData');
  var sectionEl = document.createElement('section');
  var storeNameEl = createSiteElm('h2', this.storeName);
  var hourListEl = createSiteElm('ul', '');
  var hourlyCookieData = this.generateCookieData(this.opHours.length);

  for (var hour in this.opHours) {
    var liEl = createSiteElm('li', this.opHours[hour] + ': ' + hourlyCookieData[hour]);
    hourListEl.appendChild(liEl);
  }

  totalCookiesEl = createSiteElm('li', 'Total Cookies: ' + this.calcTotalCookies(hourlyCookieData));
  totalCookiesEl.className = 'highlight ';
  hourListEl.appendChild(totalCookiesEl);
  sectionEl.appendChild(storeNameEl);
  sectionEl.appendChild(hourListEl);
  sectionEl.className = 'three-col';
  mainEl.appendChild(sectionEl);
};

function createSiteElm(elType, text) {
  var siteEl = document.createElement(elType);
  siteEl.textContent = text;
  return siteEl;
}

function renderStores(storesArr) {
  for (var store  in storesArr) {
    storesArr[store].render();
  }
}

function processForm(e) {
  e.preventDefault();
  var formEl = e.target;
  var formObj = {
    storeName: formEl.storeName.value,
    minCustomer: parseInt(formEl.minCustomer.value),
    maxCustomer: parseInt(formEl.maxCustomer.value),
    averageCookies: parseFloat(formEl.averageCookies.value),
  };
  var validCustomerRange = validateMinMax(formObj.minCustomer, formObj.maxCustomer);

  clearAlert();
  if (validCustomerRange) {
    addStore(formObj);
    resetForm(formEl); // we want to work with the element directly
  }
}

function addStore(form) {
  var store = new Store(form.storeName, form.minCustomer, form.maxCustomer, form.averageCookies, hours);
  store.render();
  storeLog(store);
  showAlert('success', 'Good Job! Store added.');
}

function storeLog(store) {
  for (var props in store) {
    if (store.hasOwnProperty(props)) {
      console.log(props + ':: ' + store[props]);
    }
  }
}

function resetForm(form) {
  for (var props in form) {
    if (form.hasOwnProperty(props)) {
      form[props].value = '';
    }
  }
}

function validateMinMax(min, max) {
  if (min > max) {
    showAlert('error', 'You idiot, min cannot be larger than max.');
    return false;
  } else if (isNaN(min) || isNaN(max)) {
    showAlert('error', 'You\'re a Mornon! You didn\' enter a number');
    return false;
  } else {
    return true;
  }
}

function showAlert(status, msg) {
  var alertEl = document.getElementById('formFeedback');
  var msgEl = createSiteElm('p', msg);
  msgEl.className = status;
  alertEl.appendChild(msgEl);
}

function clearAlert() {
  var alertEl = document.getElementById('formFeedback');
  var msgEl = alertEl.firstChild;
  alertEl.removeChild(msgEl);
}

function initStores(storesArr) {
  var pikePlace = new Store('Pike Place Market', 17, 88, 5.2, hours);
  var seaTac = new Store('SeaTac Airport', 6, 24, 1.2, hours);
  var southcenter = new Store('Southcenter Mall', 11, 28, 1.9, hours);
  var bellevueSquare = new Store('Bellevue Square', 20, 48, 3.3, hours);
  var alki = new Store('Alki', 3, 24, 2.6, hours);

  renderStores(stores);

  var formEl = document.getElementById('newStoreForm');
  formEl.addEventListener('submit', processForm, false);
}

window.onload = function() {
  initStores(stores);
};

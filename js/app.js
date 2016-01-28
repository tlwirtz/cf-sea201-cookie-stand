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
  var tabelEl = document.getElementById('storeDataTable');
  var rowEl = document.createElement('tr');
  var storeNameEl = createSiteElm('th', this.storeName, 'highlight');
  var hourlyCookieData = this.generateCookieData(this.opHours.length);

  rowEl.appendChild(storeNameEl);
  for (var hour in hourlyCookieData) {
    rowEl.appendChild(createSiteElm('td', hourlyCookieData[hour]));
  }

  rowEl.appendChild(createSiteElm('td', this.calcTotalCookies(hourlyCookieData)));
  tabelEl.appendChild(rowEl);
};

function createSiteElm(elType, text, className) {
  var siteEl = document.createElement(elType);
  siteEl.textContent = text;

  if (className !== undefined) {
    siteEl.className = className;
  }

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
  var validAvg = validateAvgCookies(formObj.averageCookies);
  var validStoreName = validateStoreName(formObj.storeName);

  clearAlert();
  if (validCustomerRange && validStoreName && validAvg) {
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

function validateAvgCookies(avgCookies) {
  if (isNaN(avgCookies)) {
    showAlert('error', 'Dude, you did not enter a number of average cookies');
    return false;
  }
  return true;
}

function validateStoreName(storeName) {
  if (storeName === '') {
    showAlert('error', 'You Suck! You didn\'t even give your store a name');
    return false;
  }

  return true;
}

function showAlert(status, msg) {
  var alertEl = document.getElementById('formFeedback');
  var msgEl = createSiteElm('p', msg, status);
  alertEl.appendChild(msgEl);
}

function clearAlert() {
  var alertEl = document.getElementById('formFeedback');
  var msgEl = alertEl.firstChild;
  alertEl.removeChild(msgEl);
}

function initTable() {
  var mainSection = document.getElementById('storeData');
  var tableEl = document.createElement('table');
  var theadEl = document.createElement('thead');
  theadEl.appendChild(createSiteElm('th', 'Store Name'));

  for (var hour in hours) {
    theadEl.appendChild(createSiteElm('th', hours[hour]));
    tableEl.appendChild(theadEl);
  }

  theadEl.appendChild(createSiteElm('th', 'Total'));
  tableEl.id = 'storeDataTable';
  mainSection.appendChild(tableEl);
}

function initStores(storesArr) {
  var pikePlace = new Store('Pike Place Market', 17, 88, 5.2, hours);
  var seaTac = new Store('SeaTac Airport', 6, 24, 1.2, hours);
  var southcenter = new Store('Southcenter Mall', 11, 28, 1.9, hours);
  var bellevueSquare = new Store('Bellevue Square', 20, 48, 3.3, hours);
  var alki = new Store('Alki', 3, 24, 2.6, hours);

  initTable();
  renderStores(stores);
  var formEl = document.getElementById('newStoreForm');
  formEl.addEventListener('submit', processForm, false);
}

window.onload = function() {
  initStores(stores);
};

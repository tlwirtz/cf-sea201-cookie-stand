var hours = ['10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM'];
var idCounter = 0;
var stores = [];

function Store(name, min, max, avgCookies, operatingHoursArr) {
  this.storeId = idCounter;
  this.custMin = min;
  this.custMax = max;
  this.avgCookiePerCust = avgCookies;
  this.storeName = name;
  this.opHours = operatingHoursArr;

  idCounter++;
  stores.push(this);
  console.log(this);
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
    custMin: parseInt(formEl.custMin.value),
    custMax: parseInt(formEl.custMax.value),
    avgCookiePerCust: parseFloat(formEl.avgCookiePerCust.value),
    storeId: parseInt(formEl.storeList.value),
  };
  var validCustomerRange = validateMinMax(formObj.custMin, formObj.custMax);
  var validAvg = validateAvgCookies(formObj.avgCookiePerCust);
  var validStoreName = validateStoreName(formObj.storeName);

  clearAlert();
  if (validCustomerRange && validStoreName && validAvg) {
    if (doesStoreExist(formObj.storeId)) {
      updateStore(formObj, getStore(formObj.storeId));
    } else {
      addStore(formObj);
      resetForm(formEl); // we want to work with the element directly
    }
  }
}

function addStore(form) {
  var store = new Store(form.storeName, form.custMin, form.custMax, form.avgCookiePerCust, hours);
  store.render();
  storeLog(store);
  showAlert('success', 'Good Job! Store added.');
}

function getStore(targetStoreId) {

  for (var store in stores) {
    if (stores[store].storeId === targetStoreId) {
      return stores[store];
    }
  }
}

function updateStore(newData, store) {
  for (var prop in newData) {
    console.log('my property: ' + prop);
    if (store.hasOwnProperty(prop)) {
      store[prop] = newData[prop];
    }
  }

  initTable();
  removeDataRows();
  renderStores(stores);
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
  alertEl.innerHTML = ''
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

function createOptionsList() {
  var liEl = document.getElementById('optionListHere');
  var selectEl = document.createElement('select');
  var optionEl = createSiteElm('option', 'New Store');
  optionEl.value = 'newStore';
  selectEl.name = 'storeList';
  selectEl.id = 'storeList';
  selectEl.appendChild(optionEl);

  for (var store in stores) {
    optionEl = createSiteElm('option', stores[store].storeName);
    optionEl.value = stores[store].storeId;
    selectEl.appendChild(optionEl);
  }

  liEl.appendChild(selectEl);
}

function onOptionListChange(event) {
  event.preventDefault();
  var targetStoreId = parseInt(event.target.value);

  if (doesStoreExist(targetStoreId)) {
    updateFieldValues(document.getElementById('newStoreForm'), getStore(targetStoreId));
  }
}

function doesStoreExist(targetStoreId) {
  for (var store in stores) {
    if (stores[store].storeId === targetStoreId) {
      return true;
    }
  }

  return false;
}

function updateFieldValues(form, store) {
  for (var prop in store) {
    if (form.hasOwnProperty(prop) && store.hasOwnProperty(prop)) {
      form[prop].value = store[prop];
    }
  }
}

function removeDataRows() {
  var tableEl = document.getElementById('storeDataTable');
  tableEl.parentNode.removeChild(tableEl);
}

function initStores(storesArr) {
  new Store('Pike Place Market', 17, 88, 5.2, hours);
  new Store('SeaTac Airport', 6, 24, 1.2, hours);
  new Store('Southcenter Mall', 11, 28, 1.9, hours);
  new Store('Bellevue Square', 20, 48, 3.3, hours);
  new Store('Alki', 3, 24, 2.6, hours);

  initTable();
  renderStores(stores);
  createOptionsList();
  var formEl = document.getElementById('newStoreForm');
  formEl.addEventListener('submit', processForm, false);

  var optionEl = document.getElementById('storeList');
  optionEl.addEventListener('change', onOptionListChange, false);
}

window.onload = function() {
  initStores(stores);
};

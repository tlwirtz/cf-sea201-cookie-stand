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
  return Math.random() * (max - min + 1) + min;
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

Store.prototype.createSiteElm = function(elType, text) {
  var siteEl = document.createElement(elType);
  siteEl.textContent = text;
  return siteEl;
};

Store.prototype.render = function() {
  var mainEl = document.getElementById('storeData');
  var sectionEl = document.createElement('section');
  var storeNameEl = this.createSiteElm('h2', this.storeName);
  var hourListEl = this.createSiteElm('ul', '');
  var hourlyCookieData = this.generateCookieData(this.opHours.length);

  for (var hour in this.opHours) {
    var liEl = this.createSiteElm('li', this.opHours[hour] + ': ' + hourlyCookieData[hour]);
    hourListEl.appendChild(liEl);
  }

  totalCookiesEl = this.createSiteElm('li', 'Total Cookies: ' + this.calcTotalCookies(hourlyCookieData));
  totalCookiesEl.className = 'highlight ';
  hourListEl.appendChild(totalCookiesEl);
  sectionEl.appendChild(storeNameEl);
  sectionEl.appendChild(hourListEl);
  sectionEl.className = 'three-col';
  mainEl.appendChild(sectionEl);
};

function renderStores(storesArr) {
  for (var store  in storesArr) {
    storesArr[store].render();
  }
}

function addStore(e) {
  e.preventDefault();
  var form = document.getElementById('newStoreForm');
  console.log('Here are my form values');
  console.log('Store Name:: ' + form.storeName.value);
  console.log('Im adding a store ' + this.target);
}

function initStores(storesArr) {
  var pikePlace = new Store('Pike Place Market', 17, 88, 5.2, hours);
  var seaTac = new Store('SeaTac Airport', 6, 24, 1.2, hours);
  var southcenter = new Store('Southcenter Mall', 11, 28, 1.9, hours);
  var bellevueSquare = new Store('Bellevue Square', 20, 48, 3.3, hours);
  var alki = new Store('Alki', 3, 24, 2.6, hours);

  renderStores(stores);

  var buttonEl = document.getElementById('addStoreButton');
  buttonEl.addEventListener('click', addStore, false);
}

window.onload = function() {
  initStores(stores);
};

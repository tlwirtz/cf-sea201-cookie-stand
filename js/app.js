// var stores = [];
var pikePlaceMarket = {
  custMin: 17,
  custMax:  88,
  avgCookiePerCust: 5.2,
  storeName: 'Pike Place Market',
  opHours: ['10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM'],
};

pikePlaceMarket.cookiePurchases = function(numCustomers, cookiesPerCust) {
  return Math.floor(numCustomers * cookiesPerCust);
};

pikePlaceMarket.randomCustomer = function(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

pikePlaceMarket.generateHourData = function(numHours) {
  var storeData = [];

  for (var idx = 1; idx <= numHours; idx++) {
    var customers = this.randomCustomer(this.custMin, this.custMax);
    storeData.push(this.cookiePurchases(customers, this.avgCookiePerCust));
  }

  return storeData;
};

pikePlaceMarket.calcTotalCookies = function(hourData) {
  var total = 0;
  for (var hour in hourData) {
    total += hourData[hour];
  }

  return total;
};

pikePlaceMarket.createSiteElm = function(elType, text) {
  var siteEl = document.createElement(elType);
  siteEl.textContent = text;
  return siteEl;
};

//loop through all of our stores & op hours and calculate the model data
pikePlaceMarket.render = function() {
  console.log('executing displayData()');
  var mainEl = document.getElementById('storeData');
  var sectionEl = document.createElement('section');
  var storeNameEl = this.createSiteElm('h2', this.storeName);
  var hourListEl = this.createSiteElm('ul', '');
  var hourData = this.generateHourData(this.opHours.length);

  for (var hour in this.opHours) {
    var liEl = this.createSiteElm('li', this.opHours[hour] + ': ' + hourData[hour]);
    hourListEl.appendChild(liEl);
  }

  //build our total
  totalCookiesEl = this.createSiteElm('li', 'Total Cookies: ' + this.calcTotalCookies(hourData));
  hourListEl.appendChild(totalCookiesEl);

  sectionEl.appendChild(storeNameEl);
  sectionEl.appendChild(hourListEl);
  mainEl.appendChild(sectionEl);
};

var seaTac = {
  custMin: 6,
  custMax:  24,
  avgCookiePerCust: 1.2,
  storeName: 'SeaTac Airport',
  opHours: ['10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM'],
};

seaTac.cookiePurchases = function(numCustomers, cookiesPerCust) {
  return Math.floor(numCustomers * cookiesPerCust);
};

seaTac.randomCustomer = function(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

seaTac.generateHourData = function(numHours) {
  var storeData = [];

  for (var idx = 1; idx <= numHours; idx++) {
    var customers = this.randomCustomer(this.custMin, this.custMax);
    storeData.push(this.cookiePurchases(customers, this.avgCookiePerCust));
  }

  return storeData;
};

seaTac.calcTotalCookies = function(hourData) {
  var total = 0;
  for (var hour in hourData) {
    total += hourData[hour];
  }

  return total;
};

seaTac.createSiteElm = function(elType, text) {
  var siteEl = document.createElement(elType);
  siteEl.textContent = text;
  return siteEl;
};

seaTac.render = function() {
  console.log('executing displayData()');
  var mainEl = document.getElementById('storeData');
  var sectionEl = document.createElement('section');
  var storeNameEl = this.createSiteElm('h2', this.storeName);
  var hourListEl = this.createSiteElm('ul', '');
  var hourData = this.generateHourData(this.opHours.length);

  for (var hour in this.opHours) {
    var liEl = this.createSiteElm('li', this.opHours[hour] + ': ' + hourData[hour]);
    hourListEl.appendChild(liEl);
  }

  //build our total
  totalCookiesEl = this.createSiteElm('li', 'Total Cookies: ' + this.calcTotalCookies(hourData));
  hourListEl.appendChild(totalCookiesEl);

  sectionEl.appendChild(storeNameEl);
  sectionEl.appendChild(hourListEl);
  mainEl.appendChild(sectionEl);
};

var southcenter = {
  custMin: 11,
  custMax:  38,
  avgCookiePerCust: 1.9,
  storeName: 'Southcenter',
  opHours: ['10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM'],
};

southcenter.cookiePurchases = function(numCustomers, cookiesPerCust) {
  return Math.floor(numCustomers * cookiesPerCust);
};

southcenter.randomCustomer = function(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

southcenter.generateHourData = function(numHours) {
  var storeData = [];

  for (var idx = 1; idx <= numHours; idx++) {
    var customers = this.randomCustomer(this.custMin, this.custMax);
    storeData.push(this.cookiePurchases(customers, this.avgCookiePerCust));
  }

  return storeData;
};

southcenter.calcTotalCookies = function(hourData) {
  var total = 0;
  for (var hour in hourData) {
    total += hourData[hour];
  }

  return total;
};

southcenter.createSiteElm = function(elType, text) {
  var siteEl = document.createElement(elType);
  siteEl.textContent = text;
  return siteEl;
};

southcenter.render = function() {
  console.log('executing displayData()');
  var mainEl = document.getElementById('storeData');
  var sectionEl = document.createElement('section');
  var storeNameEl = this.createSiteElm('h2', this.storeName);
  var hourListEl = this.createSiteElm('ul', '');
  var hourData = this.generateHourData(this.opHours.length);

  for (var hour in this.opHours) {
    var liEl = this.createSiteElm('li', this.opHours[hour] + ': ' + hourData[hour]);
    hourListEl.appendChild(liEl);
  }

  //build our total
  totalCookiesEl = this.createSiteElm('li', 'Total Cookies: ' + this.calcTotalCookies(hourData));
  hourListEl.appendChild(totalCookiesEl);

  sectionEl.appendChild(storeNameEl);
  sectionEl.appendChild(hourListEl);
  mainEl.appendChild(sectionEl);
};

var bellevueSquare = {
  custMin: 20,
  custMax:  48,
  avgCookiePerCust: 3.3,
  storeName: 'Bellevue Square',
  opHours: ['10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM'],
};

bellevueSquare.cookiePurchases = function(numCustomers, cookiesPerCust) {
  return Math.floor(numCustomers * cookiesPerCust);
};

bellevueSquare.randomCustomer = function(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

bellevueSquare.generateHourData = function(numHours) {
  var storeData = [];

  for (var idx = 1; idx <= numHours; idx++) {
    var customers = this.randomCustomer(this.custMin, this.custMax);
    storeData.push(this.cookiePurchases(customers, this.avgCookiePerCust));
  }

  return storeData;
};

bellevueSquare.calcTotalCookies = function(hourData) {
  var total = 0;
  for (var hour in hourData) {
    total += hourData[hour];
  }

  return total;
};

bellevueSquare.createSiteElm = function(elType, text) {
  var siteEl = document.createElement(elType);
  siteEl.textContent = text;
  return siteEl;
};

bellevueSquare.render = function() {
  console.log('executing displayData()');
  var mainEl = document.getElementById('storeData');
  var sectionEl = document.createElement('section');
  var storeNameEl = this.createSiteElm('h2', this.storeName);
  var hourListEl = this.createSiteElm('ul', '');
  var hourData = this.generateHourData(this.opHours.length);

  for (var hour in this.opHours) {
    var liEl = this.createSiteElm('li', this.opHours[hour] + ': ' + hourData[hour]);
    hourListEl.appendChild(liEl);
  }

  //build our total
  totalCookiesEl = this.createSiteElm('li', 'Total Cookies: ' + this.calcTotalCookies(hourData));
  hourListEl.appendChild(totalCookiesEl);

  sectionEl.appendChild(storeNameEl);
  sectionEl.appendChild(hourListEl);
  mainEl.appendChild(sectionEl);
};

var alki = {
  custMin: 3,
  custMax:  24,
  avgCookiePerCust: 2.6,
  storeName: 'Alki',
  opHours: ['10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM'],
};

alki.cookiePurchases = function(numCustomers, cookiesPerCust) {
  return Math.floor(numCustomers * cookiesPerCust);
};

alki.randomCustomer = function(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

alki.generateHourData = function(numHours) {
  var storeData = [];

  for (var idx = 1; idx <= numHours; idx++) {
    var customers = this.randomCustomer(this.custMin, this.custMax);
    storeData.push(this.cookiePurchases(customers, this.avgCookiePerCust));
  }

  return storeData;
};

alki.calcTotalCookies = function(hourData) {
  var total = 0;
  for (var hour in hourData) {
    total += hourData[hour];
  }

  return total;
};

alki.createSiteElm = function(elType, text) {
  var siteEl = document.createElement(elType);
  siteEl.textContent = text;
  return siteEl;
};

alki.render = function() {
  console.log('executing displayData()');
  var mainEl = document.getElementById('storeData');
  var sectionEl = document.createElement('section');
  var storeNameEl = this.createSiteElm('h2', this.storeName);
  var hourListEl = this.createSiteElm('ul', '');
  var hourData = this.generateHourData(this.opHours.length);

  for (var hour in this.opHours) {
    var liEl = this.createSiteElm('li', this.opHours[hour] + ': ' + hourData[hour]);
    hourListEl.appendChild(liEl);
  }

  //build our total
  totalCookiesEl = this.createSiteElm('li', 'Total Cookies: ' + this.calcTotalCookies(hourData));
  hourListEl.appendChild(totalCookiesEl);

  sectionEl.appendChild(storeNameEl);
  sectionEl.appendChild(hourListEl);
  mainEl.appendChild(sectionEl);
};

pikePlaceMarket.render();
seaTac.render();
southcenter.render();
bellevueSquare.render();
alki.render();

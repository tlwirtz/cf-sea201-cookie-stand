stores = [];
events = [];

function StoreAddress(location, phone, address1, address2, city, state, zip, storecode) {
  this.storeName = location;
  this.phone = phone;
  this.address1 = address1;
  this.address2 = address2;
  this.city = city;
  this.state = state;
  this.zip = zip;
  this.storeCode = storecode;

  stores.push(this);
}

StoreAddress.prototype.render = function() {
  console.log('rendering: ' + this.storeName);
  var storesEl = document.getElementById('stores');
  var storeBlockEl = createSiteElm('section', '', 'stores');
  storeBlockEl.id = this.storeCode;
  storeBlockEl.appendChild(this.createNameElm());
  storeBlockEl.appendChild(this.createPhoneElm());
  storeBlockEl.appendChild(this.createAddressBlock());
  storesEl.appendChild(storeBlockEl);
};

StoreAddress.prototype.createNameElm = function() {
  var paragraphEl = createSiteElm('p');
  paragraphEl.appendChild(createSiteElm('strong', this.storeName));
  return paragraphEl;
};

StoreAddress.prototype.createPhoneElm = function() {
  var paragraphEl = createSiteElm('p');
  paragraphEl.innerHTML = '<strong>Phone:</strong> ' + this.phone;
  return paragraphEl;
};

StoreAddress.prototype.createAddressBlock = function() {
  var addressElm = createSiteElm('address');
  addressElm.innerHTML = this.address1 + '<br />';
  if (this.address2 !== '') {
    addressElm.innerHTML += this.address2 + '<br />';
  }

  addressElm.innerHTML += this.city + ' ' + this.state + ' ' + this.zip;
  return addressElm;
};

function Event(eventName, eventLocation, date, time, eventDescrip) {
  this.eventName = eventName;
  this.eventLocation = eventLocation;
  this.date = date;
  this.time = time;
  this.eventDescrip = eventDescrip;

  events.push(this);
}

Event.prototype.render = function() {
  //some render stuff here.
  var eventListEl = document.getElementById('event-list');
  var eventSection = createSiteElm('section');
  var headingEl = createSiteElm('h2', this.eventName);
  var detailList = createSiteElm('ul', '', 'no-bullets');

  detailList.appendChild(this.buildEventAttribute('When: ', [this.date, this.time]));
  detailList.appendChild(this.buildEventAttribute('Where: ', [this.eventLocation]));
  detailList.appendChild(this.buildEventAttribute('What: ', [this.eventDescrip]));

  eventSection.appendChild(headingEl);
  eventSection.appendChild(detailList);
  eventListEl.appendChild(eventSection);
};

Event.prototype.buildEventAttribute = function(title, dataPoints) {
  var propertyList = createSiteElm('li');
  var detailList = createSiteElm('ul', '', 'no-bullets');

  for (var data in dataPoints) {
    detailList.appendChild(createSiteElm('li', dataPoints[data]));
  }

  propertyList.appendChild(createSiteElm('strong', title));
  propertyList.appendChild(detailList);
  return propertyList;
};

function createSiteElm(elType, text, className) {
  var siteEl = document.createElement(elType);
  siteEl.textContent = text;
  if (className !== undefined) {
    siteEl.className = className;
  }

  return siteEl;
}

function init() {
  new StoreAddress('Pike Place', '425-555-5555', '5020 cool street', 'unit 1', 'seattle', 'wa', '98270', 'pike-place');
  new StoreAddress('Alki', '425-555-5555', '5020 cool street', 'unit 1', 'seattle', 'wa', '98270', 'alki');
  new StoreAddress('SeaTac Airport', '425-555-5555', '5020 cool street', 'unit 1', 'seattle', 'wa', '98270', 'sea-tac');
  new StoreAddress('Bellevue Square', '425-555-5555', '5020 cool street', 'unit 1', 'seattle', 'wa', '98270', 'bellevue');
  new StoreAddress('Southcenter', '425-555-5555', '5020 cool street', 'unit 1', 'seattle', 'wa', '98270', 'southcenter');

  new Event('Fish Throw', 'Space Needle', 'March 01 2016', '1:00 PM - 5:00 PM', 'Throwing fish off the space needle. If you hit a bicyclist, you win a prize.');
  new Event('Pat\'s Pop Up Store', 'MOHAI', 'Feb 01 2016', '1:00 PM - 1:10 PM', 'An amazing pop up store. We will be offering limited edition cookies that will only be avaible at our pop-up store. Only a few lucky people will ever get to taste these amazing cookies.');

  for (var store in stores) {
    stores[store].render();
  }

  for (var event in events) {
    events[event].render();
  }
}

init();

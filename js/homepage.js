stores = [];
events = [];
items = [];

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

function Merchandise(itemName, itemPrice, itemDescrip, imageSrc) {
  this.itemName = itemName;
  this.itemPrice = itemPrice;
  this.itemDescrip = itemDescrip;
  this.imageSrc = imageSrc;

  items.push(this);
}

Merchandise.prototype.render = function() {
  var parentEl = document.getElementById('merch');
  var itemSectionEl = createSiteElm('section', '', 'three-col');
  var headingEl = createSiteElm('h2', this.itemName);
  var itemImg = createSiteElm('img', '', 'merch');
  itemImg.src = this.imageSrc;

  var attributeList = createSiteElm('ul', '', 'no-bullets');
  attributeList.appendChild(createSiteElm('li', this.itemPrice));
  attributeList.appendChild(createSiteElm('li', this.itemDescrip));

  itemSectionEl.appendChild(headingEl);
  itemSectionEl.appendChild(itemImg);
  itemSectionEl.appendChild(attributeList);

  parentEl.appendChild(itemSectionEl);
};

function storeAddresInit() {
  new StoreAddress('Pike Place', '425-555-5555', '5020 cool street', 'unit 1', 'seattle', 'wa', '98270', 'pike-place');
  new StoreAddress('Alki', '425-555-5555', '5020 cool street', 'unit 1', 'seattle', 'wa', '98270', 'alki');
  new StoreAddress('SeaTac Airport', '425-555-5555', '5020 cool street', 'unit 1', 'seattle', 'wa', '98270', 'sea-tac');
  new StoreAddress('Bellevue Square', '425-555-5555', '5020 cool street', 'unit 1', 'seattle', 'wa', '98270', 'bellevue');
  new StoreAddress('Southcenter', '425-555-5555', '5020 cool street', 'unit 1', 'seattle', 'wa', '98270', 'southcenter');
}

function renderStores(stores) {
  for (var store in stores) {
    stores[store].render();
  }
}

function eventsInit() {
  new Event('Fish Throw', 'Space Needle', 'March 01 2016', '1:00 PM - 5:00 PM', 'Throwing fish off the space needle. If you hit a bicyclist, you win a prize.');
  new Event('Pat\'s Pop Up Store', 'MOHAI', 'Feb 01 2016', '1:00 PM - 1:10 PM', 'An amazing pop up store. We will be offering limited edition cookies that will only be avaible at our pop-up store. Only a few lucky people will ever get to taste these amazing cookies.');
}

function renderEvents(events) {
  for (var event in events) {
    events[event].render();
  }
}

function merchInit() {
  var fakeDescript =  'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';
  var src = 'imgs/shirt.jpg';
  new Merchandise('Cool Shirt', '$25.00', fakeDescript, src);
  new Merchandise('Awesome Shirt', '$35.00', fakeDescript, src);
  new Merchandise('Groovy Shirt', '$12.00', fakeDescript, src);
}

function renderMerch(items) {
  for (var item in items) {
    items[item].render();
  }
}

function init() {
  storeAddresInit();
  renderStores(stores);
  eventsInit();
  renderEvents(events);
  merchInit();
  renderMerch(items);
}

init();

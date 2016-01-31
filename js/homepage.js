stores = [];
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

  for (var store in stores) {
    stores[store].render();
  }
}

init();

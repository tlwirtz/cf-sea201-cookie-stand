// var stores = [];
var pikePlaceMarket = {
  custMin: 17,
  custMax:  88,
  avgCookiePerCust: 5.2,
  storeName: 'Pike Place Market',
  opHours: ['10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM', '6:00 PM'],
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

function displayData(storesArr) {
  console.log('executing displayData()');
  for (var s in storesArr) {

    var store = storesArr[s];
    var storeEl = document.createElement('h2');
    storeEl.textContent = store.storeName;

    var sectionEl = document.getElementById('storeData');
    var hourListEl = document.createElement('ul');
    var hourData = store.generateHourData(store.opHours.length);

    for (var hour in store.opHours) {
      var liEl = document.createElement('li');
      liEl.textContent = store.opHours[hour] + ': ' + hourData[hour];
      console.log('This is my li ' + liEl);
      console.log('this is my ul ' + hourListEl);
      hourListEl.appendChild(liEl);
    }

    sectionEl.appendChild(storeEl);
    sectionEl.appendChild(hourListEl);
  }
}

displayData([pikePlaceMarket]);

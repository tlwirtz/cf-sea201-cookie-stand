var pikePlaceMarket = {
  custMin: 1,
  custMax:  1,
  avgCookiePerCust: 1,
};

pikePlaceMarket.cookiePurchases = function(numCustomers, cookiesPerCust) {
  return numCustomers * cookiesPerCust;
};

pikePlaceMarket.randomCustomer = function(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

# Pat's Awesome Cookie Stand

This cookie stand will blow your socks off.
There are many stores through-out the area and each one is represented by an object with some functions:

```javascript
store = {
  custMin: 3,
  custMax:  24,
  avgCookiePerCust: 2.6,
  storeName: 'Alki',
  opHours: ['10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM', '6:00 PM'],
};
```

The following methods are defined on each `Store` object.


`cookiePurchases(numCustomers, cookiesPerCust)` : returns number of cookies that will be purchased given a group of customers.

`randomCustomer(min, max)` : returns a random set of customers

`generateHourdata(numHours)` : takes the operating hours of the store and generates the amount of cookies expected to be sold given a random number of customers.

`calcTotalCookies(hourData)` : will calculate how many cookies will be sold on a given business day.

`createSiteElm(elType, text)` : shortcut method to create a new element and assign text content.

`render()` : glues everything together and prints to the DOM

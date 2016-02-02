# Pat's Awesome Cookie Stand

## Stores
This cookie stand will blow your socks off.
There are many stores through-out the area and each one is represented by an object with some functions:

```javascript
store = {
  storeId: 0,
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

## Sales Data

The sales data page ( `/sales.html` ) show predictions for each store. New stores can be added by selecting `Add New Store` for the drop down menu and filling in the form.

If you need to edit a store, simply select the store from the drop down menu. The form will populate with the store's current values, which you can then update.

If you don't fill in a required field, or input improper data, the site will do its best to inform you.

## Style Guide
The style guide ( `/style.html` ) is provided as a guide for the site's styling. Try to follow it the best you can.

## Homepage
The homepage ( `index.html` ) is Pat's main marketing tool for his site. The site will show merchandise for sale, upcoming events and information about Pat and his stores.

Events, merchandise and store information are all dynamically added via the `homepage.js` file. Events, merchandise and store information all have their own constructor functions which can be invoked to add an object.

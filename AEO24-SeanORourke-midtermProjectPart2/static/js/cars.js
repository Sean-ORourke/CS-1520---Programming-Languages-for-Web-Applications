// 1 Introduction
// In this second part of the midterm project, you will implement the JavaScript code that will interact with the webpage
// DOM elements to allow your page to respond to user interaction with some components of your page, mainly the type
// of car, its color, and insurance type.
// 2 The general requirements for your page
// These are the general requirements for your page:
// • The Car Type drop-down menu shall have the following hard-coded options: Ferrari, Lamborghini, and Mustang
// • The manufacturer of each car provides a set of available colors for that given car. The available colors are listed
// below:
// o Ferrari: Red, White, and Yellow
// o Lamborghini: Blue, Green, and Yellow
// o Mustang: Black, Silver, White
// • The Car Color drop-down menu shall be updated every time a car type is selected, based on the available colors
// shown above.
// • The Car Image shall be updated every time that either:
// o A new car type is selected: you can default to the car color to be the first one provided in the available
// colors.
// o Or when the user selects a different car color from the drop-down menu.
// • The car description text area shall be updated every time that either:
// o A new car type is selected
// o A new car color is selected
// o The insurance selection is changed
// • The description text area shall have a description of the car type, its description, chosen color, basic price, and
// the insurance cost (for a 3-year insurance, it is 30% of its basic price)
// 3 Code implementation hints
// 3.1 Create a Car class
// Create a JavaScript class that contains a single constructor with the following features:
// • Car type
// • Available car colors
// • Car description
// • Basic price
// • Available images
// Note: insurance is not really a part of a car, so it should not be part of the Car class.
// 3.2 Create three cars based on the Car class
// Create a function in your JavaScript file that creates 3 cars:
// • A Ferrari car
// • A Lamborghini car
// • A Mustang car
// You create three cars using the “new Car(...)”, which runs the Car constructor. You will need to provide the required
// inputs when calling the “new Car(...)”. The car description can be obtained by internet search. Grab any text for the
// description.
// 3.3 Setting Ferrari Car as the initial car
// As soon as your page is displayed, the Ferrari car, with the first available color picked shall be used in your application.
// This means that:
// • The car type drop-down menu shall be set to Ferrari
// • The car color drop-down menu shall be set to the Ferrari available colors (found in the Ferrari car you have
// created in Section 3.2). The default color shall be Red (the first color in the Ferrari’s available color array)
// • Set the insurance to 3-year type (for all the cars)
// • Update the car image to Red Ferrari
// • Update the purchase description accordingly
// 3.4 Create event listeners for your application
// 3.4.1 Create an event listener for the Car Type drop-down menu
// This listener shall run a function that:
// • Sets a new car object, such as “selectedCar” based on the selection in the car type drop-down menu (i.e., var
// selectedCar = chosen car from the drop-down menu).
// • Calls a function that calls functions that perform the following tasks:
// o One function resets the car color drop-down menu based on the selectedCar available colors
// o One function that updates the car image (in this case for the first color in the drop-down menu, also based
// on the selectedCar available images
// o One function that updates the purchase description
// 3.4.2 Create an event listener for the Car Color drop-down menu
// The listener shall run a function that calls functions that perform the following tasks::
// • One function that updates the car image (in this case for the first color in the drop-down menu, also based on
// the selectedCar available images
// • One function that updates the purchase description
// 3.4.3 Create an event listener for the Insurance options
// • Create event listeners for the 3-year insurance and no insurance options
// • Both event listeners should call a function that updates the purchase description and nothing else
// 4 Car types and Car images
// You can use other car types and/or car images. I do not really care about it. To tell you the truth I like to see projects that
// show different cars or motorcycles, cell phones, dolls, or whatever you would like to place there. Just do a quick internet
// search and download images of cars that you like most, and surprise me!

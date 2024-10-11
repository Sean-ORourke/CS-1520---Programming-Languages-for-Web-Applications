function createCar(carInfo) {

    //     This function creates a car object based on the carInfo input. The carInfo input is a single string containing the
    // following information "brand, price, engine horse power, engine number of gears, engine cc".
    // Inside this function you shall split the original string into pieces, create an engine object, and then create a car
    // object. The car object shall also have a variable associated with a printInfo() function. This variable will be used
    // to display the car info when using a console.log() method later. This function shall return the newly created car
    // object.

    let car = {};

    let carPartsArr = carInfo.split(", ");
    car["Brand"] = carPartsArr[0];
    car["Price"] = carPartsArr[1];
    car["Engine_Features"] = createEngine(carPartsArr[2], carPartsArr[3], carPartsArr[4]);
    car["string"] = `==== Car Info ==== \n Brand: ${car.Brand} \n Price: $${car.Price} \n Engine Features: Horse Power: ${car.Engine_Features.Horse_Power} HP, Gears: ${car.Engine_Features.Gears}, cc: ${car.Engine_Features.cc}cc \n\n`;

    return car;


}

function displayInfo(car) {
    //     A function that will print the car object features, including its engine, in the console. An example of a printout is
    // should below:
    // ==== Car Info ===="
    // Brand: Ford
    // Price: $30000
    // Engine Features: Horse Power: 45 HP, Gears: 6, cc: 2000cc

    console.log(car.string);
    // console.log(`==== Car Info ==== \n Brand: ${car.Brand} \n Price: $${car.Price} \n Engine Features: Horse Power: ${car.Engine_Features.Horse_Power} HP, Gears: ${car.Engine_Features.Gears}, cc: ${car.Engine_Features.cc}cc \n\n`);
    // console.log(`==== Car Info ==== \n Brand: ${car.Brand} \n Price: $${car.Price} \n Engine Features: ${car.Engine_Features}\n`);

}

function createEngine(horsePower, gears, cc) {

    //     A function that creates an engine based on the inputs horsepower, gears, and cc. This function shall return the
    // newly created engine (to be used when constructing a car object.

    let engine = {};
    engine["Horse_Power"] = horsePower;
    engine["Gears"] = gears;
    engine["cc"] = cc;

    return engine;
}

function createInventory() {

    //     In this function:
    // a) create an array of car info Strings. The Strings are given below
    // "Ford, 33000, 35, 6, 2000",
    // "Toyota, 23000, 40, 6, 2100",
    // "Mitsubishi, 44000, 45, 6, 2200",
    // "Nissan, 21000, 37, 6, 2300",
    // "GM, 25000, 39, 6, 2400",
    // "VW, 42000, 25, 6, 2500",

    let cars = ["Ford, 33000, 35, 6, 2000",
        "Toyota, 23000, 40, 6, 2100",
        "Mitsubishi, 44000, 45, 6, 2200",
        "Nissan, 21000, 37, 6, 2300",
        "GM, 25000, 39, 6, 2400",
        "VW, 42000, 25, 6, 2500",];

    let listOfCars = [];

    // b) Loop over this array and create car objects. While creating these car objects, place then in another list,
    // listOfCars.
    for (let car of cars) {
        listOfCars.push(createCar(car));
    }


    // c) This method shall return the listOfCars
    return listOfCars;



}

function printInventory(listOfCars) {
    // This function loops over the listOfCars and print their information by using the variable associated with a printInfo() function.

    for (let car of listOfCars) {
        displayInfo(car);
    }


}

function main() {
    let listOfCars = createInventory();
    printInventory(listOfCars);
}
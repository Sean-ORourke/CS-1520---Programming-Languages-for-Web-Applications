window.addEventListener("load", setup);

let all_cars;
let selectedCar;
let selectCarNumber;
let finalPrice;
let descriptionColor;
let hasInsurance;


class Car {
    constructor(type, color, description, basePrice, images) {
        this.type = type;
        this.color = color;
        this.description = description;
        this.basePrice = basePrice;
        this.images = images;

    }

}


async function setup() {
    all_cars = createCarObjects();
    selectedCar = all_cars[0];
    selectCarNumber = 0;
    console.log(all_cars);

    addEventListeners();

    updateScreen();
}

function createCarObjects() {

    let carList = [];

    let ferrari = new Car("Ferrari", ["Red", "White", "Yellow"], "ferrari is cool!", (111111111), ["./resources/images/redFerrarri.png", "./resources/images/whiteFerrarri.png", "./resources/images/yellowFerrarri.png"]);
    carList.push(ferrari);

    let lamborghini = new Car("Lamborghini", ["Blue", "Green", "Yellow"], "lamborghini is awesome!", (222222222), ["./resources/images/blueLamborghini.png", "./resources/images/greenLamborghini.png", "./resources/images/yellowLamborghini.png"]);
    carList.push(lamborghini);

    let mustang = new Car("Mustang", ["Black", "Silver", "White"], "mustang is radical!", (333333333), ["./resources/images/blackMustang.png", "./resources/images/silverMustang.png", "./resources/images/whiteMustang.png"]);
    carList.push(mustang);

    return carList;
}

function updateScreen() {

    document.getElementById("cars").value = all_cars[0].type;
    document.getElementById("colors").value = all_cars[0].color[0];
    document.getElementById('3yearins').checked = true;
    document.getElementById("car-pic").setAttribute("src", all_cars[0].images[0]);
    document.getElementById("comments").value = all_cars[0].description;
    descriptionColor = all_cars[0].color[0];
    hasInsurance = true;
    changeDescIns(true);
    updateDescription();

}


function addEventListeners() {
    document.getElementById("cars").addEventListener("change", () => {
        selectCar(document.getElementById("cars").value);
    });

    document.getElementById("colors").addEventListener("change", () => {
        selectColor(document.getElementById("colors").value);
    });

    document.getElementById("noins").addEventListener("change", () => {
        selectNoIns();
    });

    document.getElementById("3yearins").addEventListener("change", () => {
        select3YearIns();
    });
}

function selectNoIns() {
    hasInsurance = false;
    changeDescIns(false);
}

function select3YearIns() {
    hasInsurance = true;
    changeDescIns(true);
}

function changeDescIns(hasInsurance) {
    if (hasInsurance) {
        finalPrice = selectedCar.basePrice + (selectedCar.basePrice * 0.30);
        console.log(finalPrice);
    } else {
        finalPrice = selectedCar.basePrice;
    }

    document.getElementById("comments").value = selectedCar.description + finalPrice;
    updateDescription();

}

function selectColor(carColor) {

    updateColorImage(carColor);

    updateColorDescription(carColor);

}

function updateColorDescription(carColor) {
    document.getElementById("comments").value = selectedCar.description + " " + carColor;
    descriptionColor = carColor;
    updateDescription();
}

function updateColorImage(carColor) {
    for (var i = 0; i < selectedCar.color.length; i++) {
        if (carColor == selectedCar.color[i]) {
            document.getElementById("car-pic").setAttribute("src", selectedCar.images[i]);
            break;
        }
    }
}

function selectCar(carName) {

    for (var i = 0; i < all_cars.length; i++) {

        if (all_cars[i].type == carName) {
            selectedCar = all_cars[i];
            selectCarNumber = i;
            break;
        }

    }

    console.log("selectedCar value: " + selectedCar.type + " " + selectCarNumber);

    changeDescIns(hasInsurance);
    resetColors();
    updateImage();
    updateDescription();

}

function resetColors(carName) {

    const dropdown = document.getElementById('colors');

    // Clear all existing options
    dropdown.innerHTML = '';

    // Add new options
    const newOptions = [

        { value: selectedCar.color[0], text: selectedCar.color[0] },
        { value: selectedCar.color[1], text: selectedCar.color[1] },
        { value: selectedCar.color[2], text: selectedCar.color[2] }
    ];

    newOptions.forEach(option => {
        const newOption = document.createElement('option');
        newOption.value = option.value;
        newOption.text = option.text;
        dropdown.appendChild(newOption);
    });

    descriptionColor = selectedCar.color[0];

}

function updateImage() {
    document.getElementById("car-pic").setAttribute("src", selectedCar.images[0]);

}

function updateDescription() {
    document.getElementById("comments").value = "Car: " + " " + selectedCar.type + "\nDescription: " + selectedCar.description + "\nSelected color: " + descriptionColor + "\nPrice: " + finalPrice;
}

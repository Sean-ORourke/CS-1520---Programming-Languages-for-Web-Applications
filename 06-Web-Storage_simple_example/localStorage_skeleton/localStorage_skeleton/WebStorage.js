window.addEventListener("load", setup);

function setup() {
    createDOMReferences();
    addDOMEventListeners();
}

// one way to define a JavaScript function
function createDOMReferences() {
    // reference for the view contents of the local storage
    viewContentsButton = document.getElementById("viewContentsOfLocalStorageButton");

    // references for the Input fieldset
    insertKeyTextInputField = document.getElementById("insertKeyTextInputField");
    inserValueTextInputField = document.getElementById("insertValueTextInputField");
    insertItemIntoLocalStorageButton = document.getElementById("insertItemIntoLocalStorageButton");

    // references for the Delete fieldset
    deleteKeyTextInputField = document.getElementById("deleteKeyTextInputField");
    deleteItemButton = document.getElementById("deleteItemButton");
    clearStorageButton = document.getElementById("clearStorageButton");

    // reference for the Web Storage display fieldset
    outputListArea = document.getElementById("outputListArea");
}

// another way to define a JavaScript function: using fat arrow
function addDOMEventListeners() {
    viewContentsButton.addEventListener("click", viewAllEntriesFunction);
    insertItemIntoLocalStorageButton.addEventListener("click", insertItemFunction);
    deleteItemButton.addEventListener("click", deleteItemFunction);
    clearStorageButton.addEventListener("click", clearStorageFunction);
}

function viewAllEntriesFunction() {

}

function insertItemFunction() {

}

function deleteItemFunction() {

}

function clearStorageFunction() {

}
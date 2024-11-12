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
    insertValueTextInputField = document.getElementById("insertValueTextInputField");
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
    outputListArea.innerHTML = "";
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        const value = localStorage.getItem(key);
        const entry = document.createElement('p');
        entry.textContent = `Key: ${key} - Value: ${value}`;
        outputListArea.appendChild(entry);
    }
}

function insertItemFunction() {

    localStorage.setItem(insertKeyTextInputField.value, insertValueTextInputField.value);

}

function deleteItemFunction() {

    localStorage.removeItem(deleteKeyTextInputField.value);

}

function clearStorageFunction() {

    localStorage.clear();

}
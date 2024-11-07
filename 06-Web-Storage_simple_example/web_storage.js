let key = "banana";
let value = "2 dozens";
localStorage.setItem(key, value);
sessionStorage.setItem(key, value);

localStorage.setItem("apple", "5 units");
localStorage.setItem("eggs", "3 dozens");

console.log(localStorage.getItem("apple"));

console.log(localStorage.key(1));

let number_of_pair = localStorage.length;

for (let index = 0; index < number_of_pair; index++) {
    let key = localStorage.key(index);
    let value = localStorage.getItem(key);
    console.log(key, value);
}

// localStorage.removeItem("eggs");

// localStorage.clear();

document.cookie = "name=Kyle";

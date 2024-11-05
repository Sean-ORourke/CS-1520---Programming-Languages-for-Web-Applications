window.addEventListener("load", addEventListeners);

var smartphoneURL = new URL("http://localhost:8000/blogs");

function addEventListeners() {
    let viewAllBlogsButton = document.getElementById("viewAllBlogEntriesButton");
    viewAllBlogsButton.addEventListener("click", retrieveAndDisplayAllBlogEntries);

    let viewABlogButton = document.getElementById("getOneBlogEntryButton");
    viewABlogButton.addEventListener("click", retrieveAndDisplayOneBlogEntry);

    let addNewBlogButton = document.getElementById("addNewBlogButton");
    addNewBlogButton.addEventListener("click", addOneBlogEntry);

    let updateExistingBlogButton = document.getElementById("updateExistingBlogButton");
    updateExistingBlogButton.addEventListener("click", updateExistingBlog);

    // ADD EVENT LISTENER FOR THE DELETE BUTTON HERE
    let deleteBlogButton = document.getElementById("deleteExistingBlogButton");
    deleteBlogButton.addEventListener("click", deleteExistingBlog);
}

async function retrieveAndDisplayAllBlogEntries() {
    // issuing an HTTP Get request to get all the blogs
    let blogs = await httpGetRequest(smartphoneURL);

    // cleaning up the output display for the new data
    let outputWindow = document.getElementById("displayDivId");
    outputWindow.innerHTML = "";

    // looping over all the blogs and creating the necessary HTML elements
    // 1 - Brigadeiro
    // by Mrs. Cozinheiras
    for (let blog of blogs) {
        // div
        let divElement = document.createElement("div");

        //    h2  title
        let titleElement = document.createElement("h2");
        // titleElement.innerText = blod.id + " - " + blog.title;
        titleElement.innerText = `${blog.id} - ${blog.Brand}`;

        //    h3  author
        let authorElement = document.createElement("h3");
        authorElement.innerText = `${blog.Price}`;

        // append h2 and h3 in the div
        divElement.append(titleElement, authorElement);

        // append div into the outputWindow div
        outputWindow.append(divElement);
    }
}

async function retrieveAndDisplayOneBlogEntry() {

    // getting a hold on the blogNumber input element
    let oneBlogNumberElement = document.getElementById("blogNumberTextInput");
    let oneBlogNumber = oneBlogNumberElement.value;

    // issuing an HTTP Get Request with "/blogNumber" added to the blogURL
    let blog = await httpGetRequest(`${smartphoneURL}/${oneBlogNumber}`);

    // div
    let divElement = document.createElement("div");

    //    h2  title
    let titleElement = document.createElement("p");
    // titleElement.innerText = blod.id + " - " + blog.title;
    titleElement.innerText = `${blog.id} - ${blog.Brand}`;

    //    h3  author
    let authorElement = document.createElement("h3");
    authorElement.innerText = `${blog.Price}`;

    // creating the article text
    let articleElement = document.createElement("p");
    articleElement.innerText = `${blog.Price}\n\n${blog.Screen}\n\n${blog.Pixels}\n\n${blog.Resolution}\n\n${blog.Storage}\n\n${blog.Ram}\n\n${blog.Battery}\n\n${blog.Weight}`;

    // appending the elements into the temp div
    divElement.append(titleElement, articleElement);

    // appending the divElement to the DOM
    let outputWindow = document.getElementById("displayDivId");
    outputWindow.innerHTML = "";
    outputWindow.append(divElement);

    // clean up the blog number text input
    oneBlogNumberElement.value = "";
}

async function addOneBlogEntry() {
    // getting a hold on the blog elements title, author, and article from the page
    
    let brandElement = document.getElementById("insertNewBrandTextInput");
    let priceElement = document.getElementById("insertNewPriceTextInput");
    let screenSizeElement = document.getElementById("insertNewScreenSizeTextInput");
    let pixelsElement = document.getElementById("insertNewPixelsTextInput");
    let screenResolutionElement = document.getElementById("insertNewScreenResolutionTextInput");
    let storageElement = document.getElementById("insertNewStorageTextInput");
    let ramSizeElement = document.getElementById("insertNewRAMSizeTextInput");
    let batteryCapacityElement = document.getElementById("insertNewBatteryCapacityTextInput");
    let weightElement = document.getElementById("insertNewWeightTextInput");

    // getting a hold in their values
    let brand = brandElement.value;
    let price = priceElement.value;
    let screen = screenSizeElement.value;
    let pixels = pixelsElement.value;
    let resolution = screenResolutionElement.value;
    let storage = storageElement.value;
    let ram = ramSizeElement.value;
    let battery = batteryCapacityElement.value;
    let weight = weightElement.value;

    // creating a blog object
    let newBlog = {
        "Brand": brand,
        "Price": price,
        "Screen": screen,
        "Pixels": pixels,
        "Resolution": resolution,
        "Storage": storage,
        "Ram": ram,
        "Battery": battery,
        "Weight": weight
    }

    // issuing an HTTP Post Request
    await httpPostRequest(smartphoneURL, newBlog);

    // emptying the display area
    brandElement.value = "";
    priceElement.value = "";
    screenSizeElement.value = "";

    let outputWindow = document.getElementById("displayDivId");
    outputWindow.innerHTML = "";

}

async function updateExistingBlog() {
    // getting a hold on the blog number to be updated
    let smartphoneIDElement = document.getElementById("updateExistingSmartphoneIDTextInput");
    let brandElement = document.getElementById("updateExistingBrandTextInput");
    let priceElement = document.getElementById("updateExistingPriceTextInput");
    let screenSizeElement = document.getElementById("updateExistingScreenSizeTextInput");
    let pixelsElement = document.getElementById("updateExistingPixelsTextInput");
    let screenResolutionElement = document.getElementById("updateExistingScreenResolutionTextInput");
    let storageElement = document.getElementById("updateExistingStorageTextInput");
    let ramSizeElement = document.getElementById("updateExistingRAMSizeTextInput");
    let batteryCapacityElement = document.getElementById("updateExistingBatteryCapacityTextInput");
    let weightElement = document.getElementById("updateExistingWeightTextInput");

    // getting a hold in their values
    let idNumber = smartphoneIDElement.value;
    let brand = brandElement.value;
    let price = priceElement.value;
    let screenSize = screenSizeElement.value;
    let pixels = pixelsElement.value;
    let screenResolution = screenResolutionElement.value;
    let storage = storageElement.value;
    let ramSize = ramSizeElement.value;
    let batteryCapacity = batteryCapacityElement.value;
    let weight = weightElement.value;

    // getting the fields that need to be updated
    let updateFields = {};
    if (brand != "") {
        updateFields["Brand"] = brand;
    }
    if (price != "") {
        updateFields["Price"] = price;
    }
    if (screenSize != "") {
        updateFields["Screen"] = screenSize;
    }
    if (pixels != "") {
        updateFields["Pixels"] = pixels;
    }
    if (screenResolution != "") {
        updateFields["Resolution"] = screenResolution;
    }
    if (storage != "") {
        updateFields["Storage"] = storage;
    }
    if (ramSize != "") {
        updateFields["Ram"] = ramSize;
    }
    if (batteryCapacity != "") {
        updateFields["Battery"] = batteryCapacity;
    }
    if (weight != "") {
        updateFields["Weight"] = weight;
    }



    //issuing patch request
    await httpPatchRequest(`${smartphoneURL}/${idNumber}`, updateFields);


    // cleaning up the input fields
    smartphoneIDElement.value = "";
    brandElement.value = "";
    priceElement.value = "";
    screenSize.value = "";

    let outputWindow = document.getElementById("displayDivId");
    outputWindow.innerHTML = "";
}

async function deleteExistingBlog() {
    // getting the number of the blog to be deleted
    let blogNumberElement = document.getElementById("deleteExistingBlogNumberTextInput");
    let blogNumber = blogNumberElement.value;

    // issuing a delete request for that given blog number
    httpDeleteRequest(`${smartphoneURL}/${blogNumber}`);
    // emptying the display area
    blogNumberElement.value = "";
    let outputWindow = document.getElementById("displayDivId");
    outputWindow.innerHTML = "";


}

async function httpGetRequest(theUrl) {
    return await fetch(theUrl)
        .then(response => {
            return response.json();
        })
        .then(data => {
            return data;
        })
        .catch(error => console.error('Error:', error));
};

async function httpPostRequest(theUrl, newBlog) {
    return await fetch(theUrl, {
        method: 'POST',
        body: JSON.stringify(newBlog),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        }
    })
        .catch(error => console.error('Error:', error));
}

async function httpPatchRequest(theUrl, updatedField) {
    return await fetch(theUrl, {
        method: 'PATCH',
        body: JSON.stringify(updatedField),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        }
    })
        .catch(error => console.error('Error:', error));
}

async function httpDeleteRequest(theUrl) {
    return await fetch(theUrl, {
        method: 'DELETE'
    })
        .catch(error => console.error('Error:', error));
}

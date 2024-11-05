window.addEventListener("load", addEventListeners);

var blogURL = new URL("http://localhost:8000/blogs");

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
   let deleteExistingBlog = document.getElementById ""
}

async function retrieveAndDisplayAllBlogEntries() {
    // issuing an HTTP Get request to get all the blogs
    let blogs = await httpGetRequest(blogURL);
    // cleaning up the output display for the new data
    let outputWindow = document.getElementById("displayDivId");
    outputWindow.innerHTML = "";

    // looping over all the blogs and creating the necessary HTML elements
    for (let blog of blogs) {
        // div
        let divElement = document.createElement("div");
        //h2 title
        let titleElement = document.createElement("h2");
        // titleElement.innerText = blog.id + " - " + blog.title;
        titleElement.innerText = `${blog.id} - ${blog.title}`;
        //h3 author
        let authorElement = document.createElement("h3");
        // titleElement.innerText = blog.id + " - " + blog.title;
        authorElement.innerText = `by ${blog.author}`;

        //append h2 and h3 in div
        divElement.append(titleElement, authorElement);
        //append div into outputWindow div
        outputWindow.append(divElement);
    }
}

async function retrieveAndDisplayOneBlogEntry() {
    // getting a hold on the blogNumber input element
    let oneBlogNumberElement = document.getElementById(blogNumberTextInput);
    let oneBlogNumber = oneBlogNumberElement.value;

    // issuing an HTTP Get Request with "/blogNumber" added to the blogURL
    let blog = await httpGetRequest(`${blogURL}/${oneBlogNumber}`);
    // creating the div
        // div
        let divElement = document.createElement("div");
        //h2 title
        let titleElement = document.createElement("h2");
        // titleElement.innerText = blog.id + " - " + blog.title;
        titleElement.innerText = `${blog.id} - ${blog.title}`;
        //h3 author
        let authorElement = document.createElement("h3");
        // titleElement.innerText = blog.id + " - " + blog.title;
        authorElement.innerText = `by ${blog.author}`;

        let articleElement = document.createElement("p");
        articleElement.innerText



    // creating the title

    // creating the author

    // creating the article texts

    // appending the elements into the temp div
    divElement.append(titleElement, aithor,  )

    // appending the divElement to the DOM


    // clean up the blog number text input
    oneBlogNumberElement.innerText = ""
;
}

async function addOneBlogEntry() {
    // getting a hold on the blog elements title, author, and article from the page

    // getting a hold in their values

    // creating a blog object

    // issuing an HTTP Post Request

    // emptying the display area

}

async function updateExistingBlog() {
    // getting a hold on the blog number to be updated


    // getting a hold on all the fields in the page


    // getting the fields that need to be updated

    // cleaning up the input fields

}

async function deleteExistingBlog() {
    // getting the number of the blog to be deleted

    // issuing a delete request for that given blog number

    // emptying the display area

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

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
    let deleteBlogButton = document.getElementById("deleteExistingBlogButton");
    deleteBlogButton.addEventListener("click", deleteExistingBlog);
}

async function retrieveAndDisplayAllBlogEntries() {
    // issuing an HTTP Get request to get all the blogs
    let blogs = await httpGetRequest(blogURL);

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
        titleElement.innerText = `${blog.id} - ${blog.title}`;

        //    h3  author
        let authorElement = document.createElement("h3");
        authorElement.innerText = `by ${blog.author}`;

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
    let blog = await httpGetRequest(`${blogURL}/${oneBlogNumber}`);

    // div
    let divElement = document.createElement("div");

    //    h2  title
    let titleElement = document.createElement("h2");
    // titleElement.innerText = blod.id + " - " + blog.title;
    titleElement.innerText = `${blog.id} - ${blog.title}`;

    //    h3  author
    let authorElement = document.createElement("h3");
    authorElement.innerText = `by ${blog.author}`;

    // creating the article text
    let articleElement = document.createElement("p");
    articleElement.innerText = blog.article;

    // appending the elements into the temp div
    divElement.append(titleElement, authorElement, articleElement);

    // appending the divElement to the DOM
    let outputWindow = document.getElementById("displayDivId");
    outputWindow.innerHTML = "";
    outputWindow.append(divElement);

    // clean up the blog number text input
    oneBlogNumberElement.value = "";
}

async function addOneBlogEntry() {
    // getting a hold on the blog elements title, author, and article from the page
    let titleElement = document.getElementById("insertNewBlogTitleTextInput");
    let authorElement = document.getElementById("insertNewBlogAuthorTextInput");
    let articleElement = document.getElementById("insertNewBlogArticleTextInput");

    // getting a hold in their values
    let title = titleElement.value;
    let author = authorElement.value;
    let article = articleElement.value;

    // creating a blog object
    let newBlog = {
        "title": title,
        "author": author,
        "article": article
    }

    // issuing an HTTP Post Request
    await httpPostRequest(blogURL, newBlog);

    // emptying the display area
    titleElement.value = "";
    authorElement.value = "";
    articleElement.value = "";

    let outputWindow = document.getElementById("displayDivId");
    outputWindow.innerHTML = "";

}

async function updateExistingBlog() {
    // getting a hold on the blog number to be updated
    let blogNumberElement = document.getElementById("updateExistingBlogNumberTextInput");
    let titleElement = document.getElementById("updateExistingBlogTitleTextInput");
    let authorElement = document.getElementById("updateExistingBlogAuthorTextInput");
    let articleElement = document.getElementById("updateExistingBlogArticleTextInput");

    // getting a hold in their values
    let blogNumber = blogNumberElement.value;
    let title = titleElement.value;
    let author = authorElement.value;
    let article = articleElement.value;

    // getting the fields that need to be updated
    let updateFields = {};
    if (title != "") {
        updateFields["title"] = title;
    }
    if (author != "") {
        updateFields["author"] = author;
    }
    if (article != "") {
        updateFields["article"] = article;
    }

    //issuing patch request
    await httpPatchRequest(`${blogURL}/${blogNumber}`, updateFields);


    // cleaning up the input fields
    blogNumberElement.value = "";
    titleElement.value = "";
    authorElement.value = "";
    articleElement.value = "";

    let outputWindow = document.getElementById("displayDivId");
    outputWindow.innerHTML = "";
}

async function deleteExistingBlog() {
    // getting the number of the blog to be deleted
    let blogNumberElement = document.getElementById("deleteExistingBlogNumberTextInput");
    let blogNumber = blogNumberElement.value;

    // issuing a delete request for that given blog number
    httpDeleteRequest(`${blogURL}/${blogNumber}`);
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

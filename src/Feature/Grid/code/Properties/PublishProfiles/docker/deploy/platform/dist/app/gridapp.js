$(document).ready(function () {
    new gridjs.Grid({
        columns: ['Name', 'Age', 'Email', 'Actions','Delete'],
        server: {
            url: '/grid/gridapplication/data?id=' + itemId + '&database=' + database,
            then: data => data.Data.map(item => [item[0], item[1], item[2], gridjs.html(`<a>Link to</a>`), gridjs.html(`<button onClick='deleteRow(this)'>Delete</button>`)])
        }
    }).render(document.getElementById("gridapp"));
});

function deleteRow(element) {
    console.log(element);
    var row = $("button").closest("tr");
    var id = $("button").closest("tr").children()[0].innerText;

    postData('/grid/gridapplication/data?id=' + id)
        .then(data => {
            console.log(data); // JSON data parsed by `data.json()` call
        });
}

async function postData(url = '', data = {}) {
    // Default options are marked with *
    const response = await fetch(url, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
    return response.json(); // parses JSON response into native JavaScript objects
}


﻿$(document).ready(function () {
    new gridjs.Grid({
        columns: ['ID', 'Name'].concat(fields.split(',')).concat(['Actions']),
        server: {
            url: '/grid/gridapplication/data?id=' + itemId + '&database=' + database + '&fields=' + fields,
            then: data => data.Data.map(item => [...item, gridjs.html(editButton + deleteButton)])
        }
    }).render(document.getElementById("gridapp"));
});

var editButton = "<button class='btn-edit' onClick='editRow(this)'>Edit</button>";
var deleteButton = "<button class='btn-delete' onClick='deleteRow(this)'>Delete</button>";
var saveButton = "<button class='btn-save' onClick='saveRow(this)'>Save</button>";
var cancelButton = "<button class='btn-cancel' onClick='cancelEdit(this)'>Cancel</button>";

function editRow(element) {
    var row = $(element).closest("tr");
    var tableCells = row.find("td:not(:last)");

    tableCells.slice(2).each(function () {
        $(this).data('value', $(this).html());
        $(this).html('<input type="text" class="td-input">');
        $(this).find('input').val($(this).data('value'));
    });
    $(element).replaceWith(saveButton);
    $('.btn-delete').replaceWith(cancelButton);

}

function cancelEdit(element) {
    var row = $(element).closest("tr");
    var tableCells = row.find("td:not(:last)");

    tableCells.slice(2).each(function () { 
        $(this).html($(this).data('value'));
        $(this).removeData('value');
    });
    $(element).replaceWith(deleteButton);
    $('.btn-save').replaceWith(editButton);
}

function deleteRow(element) {
    console.log(element);
    var row = $("button.btn-delete").closest("tr");
    var id = $("button.btn-delete").closest("tr").children()[0].innerText;

    postData('/grid/gridapplication/delete?id=' + id + '&database=' + database)
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
        credentials: 'include', // include, *same-origin, omit
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


$(document).ready(function () {
    new gridjs.Grid({
        columns: ['ID', 'Name'].concat(fields.split(',')).concat(['Actions']),
        sort: true,
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

function saveRow(element) {
    var row = $(element).closest("tr");
    var tableCells = row.find("td:not(:last)");
    var fieldValues = new Array;

    tableCells.each(function () {
        if ($(this).find("input").val()) {
            fieldValues.push($(this).find("input").val());
        }
        else {
            fieldValues.push($(this).html());
        }
    })
    var concattedArray = fieldValues.associate(['ID', 'Name'].concat(fields.split(',')));

    postData('/grid/gridapplication/save?id=' + concattedArray.ID + '&database=' + database, concattedArray);
}

function editRow(element) {
    var row = $(element).closest("tr");
    var tableCells = row.find("td:not(:last)");

    tableCells.slice(2).each(function () {
        $(this).data('value', $(this).html());
        $(this).html('<input type="text" class="td-input">');
        $(this).find('input').val($(this).data('value'));
    });
    $(element).replaceWith(saveButton);
    row.find('.btn-delete').replaceWith(cancelButton);
}

function cancelEdit(element) {
    var row = $(element).closest("tr");
    var tableCells = row.find("td:not(:last)");

    tableCells.slice(2).each(function () { 
        $(this).html($(this).data('value'));
        $(this).removeData('value');
    });
    $(element).replaceWith(deleteButton);
    row.find('.btn-save').replaceWith(editButton);
}

function deleteRow(element) {
    var row = $("button.btn-delete").closest("tr");
    var id = $("button.btn-delete").closest("tr").children()[0].innerText;

    postData('/grid/gridapplication/delete?id=' + id + '&database=' + database)
        .then(function (data) { 
            row.remove();
        });
}

async function postData(url = '', data = {}) {
    const response = await fetch(url, {
        method: 'POST', 
        mode: 'cors', 
        cache: 'no-cache', 
        credentials: 'include', 
        headers: {
            'Content-Type': 'application/json'
        },
        redirect: 'follow', 
        referrerPolicy: 'no-referrer', 
        body: JSON.stringify(data) 
    });
    return response; 
}

Array.prototype.associate = function (arr) {
    var index,
        output = Object.create(null);
    for (index = 0; index < this.length; index++) {
        output[arr[index]] = this[index];
    }
    return output;
};
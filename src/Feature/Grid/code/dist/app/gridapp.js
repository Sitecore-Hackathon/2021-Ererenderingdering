$(document).ready(function () {
    new gridjs.Grid({
        columns: ['Name', 'Age', 'Email', 'Actions'],
        server: {
            url: '/grid/gridapplication/data?id=' + itemId + '&database=' + database,
            then: data => data.Data.map(item => [item[0], item[1], item[2], gridjs.html(`<a>Link to</a>`)])
        }
    }).render(document.getElementById("gridapp"));
});
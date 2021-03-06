$(document).ready(function () {
    $("div.gridapp").Grid({
        columns: ['Name', 'Age', 'Email'],
        server: {
            url: '/grid/gridapplication/data?id=' + itemId + '&database='+ database,
            then: data => data.Data.map(item => [item[0], item[1], item[2], item[3], item[4], item[5]])
        }
    });
});
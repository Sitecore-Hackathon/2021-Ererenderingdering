$(document).ready(function () {
    $("div.gridapp").Grid({
        columns: ['Name', 'Age', 'Email'],
        server: {
            url: 'https://hackathon101sc.dev.local/grid/gridapplication/data?id={11111111-1111-1111-1111-111111111111}&database=master',
            then: data => data.Data.map(item => [item[0], item[1], item[2]])
        }
    });
});
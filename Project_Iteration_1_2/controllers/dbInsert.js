$(document).ready(function () {

    $('.queryColumn input').change(function () {
        updateQuery();
        $("#querySubmitForm").css("display", "block");
    });

});

function showSuccessMessage() {
    $("#main-title + .box").css("display", "block");
    $("#successMsg").css("display", "block");
    $("#successMsg").html("Record has been successfully inserted.");
}

/* --------------- */
/* --- Display --- */
/* --------------- */

function displayColumns() {
    showInputAndQuery();

    if (columnArray != "") {
        $("#tableName option[value='select']").prop("selected", false);
        $("#tableName option[value='" + columnArray[0][2] + "']").prop("selected", true);
        var resultHtml = "";
        for (let i = 1; i < columnArray.length; i++) {
            let display = columnArray[i][0];
            let value = columnArray[i][1];

            resultHtml += `<div class='queryColumn'>`;
            resultHtml += `<label for='${value}'>${display}</label>`;
            resultHtml += `<input type='text' name='${value}' id='db-${value}' placeholder='Enter value'>`;
            resultHtml += `</div>`;
        }
        $("#inputValues").html(resultHtml);
    }
}

/* ------------- */
/* --- Query --- */
/* ------------- */

function resetQuery() {
    if (columnArray != "") {
        queryDisplay = `INSERT INTO <div class="bold">${columnArray[0][0]}</div>`;
        querySQL = `INSERT INTO ${columnArray[0][1]}`;
        updateQueryDisplay();
    }
}

function updateQuery() {
    resetQuery();

    var disColArr = [];
    var sqlColArr = [];
    var valArr = [];

    $(".queryColumn").each(function (index, domEle) {
        let value = $(this).children("input").val();

        // Getting used columns
        if (value != "") {
            disColArr.push(columnArray[index + 1][0]);
            sqlColArr.push(columnArray[index + 1][1]);
            valArr.push(value);
        }
    });

    if (disColArr.length > 0) {
        // Part 1 of query
        queryDisplay += "(";
        querySQL += "(";

        for (let i = 0; i < disColArr.length; i++) {
            if (i != 0) {
                queryDisplay += ", ";
                querySQL += ", ";
            }
            queryDisplay += disColArr[i];
            querySQL += sqlColArr[i];
        }

        // Part 2 of Query
        queryDisplay += ") VALUES (";
        querySQL += ") VALUES (";

        for (let i = 0; i < valArr.length; i++) {
            if (i != 0) {
                queryDisplay += ", ";
                querySQL += ", ";
            }
            queryDisplay += `'<div class="bold">${valArr[i]}</div>'`;
            querySQL += `'${valArr[i]}'`;
        }

        queryDisplay += ");";
        querySQL += ");";
    }
    updateQueryDisplay();
}
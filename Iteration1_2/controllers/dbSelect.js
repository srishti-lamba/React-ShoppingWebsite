var resultTableName = "";

$(document).ready(function () {

    $('.queryColumn').change(function () {
        updateQuery();
    });

    $('#inputColumnsBtn input[type="checkbox"]').change(function () {
        updateQuery();
    });

});

function showSuccessMessage() {
    $("#main-title + .box").css("display", "block");
    $("#successMsg").css("display", "block");
    $("#successMsg").html("Here are the query results:");
}

/* --------------- */
/* --- Display --- */
/* --------------- */

function displayColumnSelector() {
    $("#inputColumns").css("display", "block");
    showInputAndQuery();

    if (columnArray != "") {
        var resultHtml = "";
        for (let i = 1; i < columnArray.length; i++) {
            let display = columnArray[i][0];
            let value = columnArray[i][1];

            resultHtml += `<input type="checkbox" id="col-${value}" name="${value}" value="${value}">`;
            resultHtml += `<label for='col-${value}'>${display}</label>`;
        }
        $("#inputColumnsBtn").html(resultHtml);
    }
}

function displayColumns() {

    if (columnArray != "") {
        $("#tableName option[value='select']").prop("selected", false);
        $("#tableName option[value='" + columnArray[0][2] + "']").prop("selected", true);
        var resultHtml = "";
        for (let i = 1; i < columnArray.length; i++) {
            let display = columnArray[i][0];
            let value = columnArray[i][1];

            resultHtml += `<div class='queryColumn'>`;
            resultHtml += `<label for='${value}'>${display}</label>`;
            resultHtml += `<div class='queryColumnBtn'>
                                    <input type="radio" name="queryColumnBtn-${value}" value="<"  id="db-${value}-<" ><label        for="db-${value}-<" >\<</label>
                                    <input type="radio" name="queryColumnBtn-${value}" value="<=" id="db-${value}-<="><label        for="db-${value}-<=">\<=</label>
                                    <input type="radio" name="queryColumnBtn-${value}" value="="  id="db-${value}-=" checked><label for="db-${value}-=" >=</label>
                                    <input type="radio" name="queryColumnBtn-${value}" value="!=" id="db-${value}-!="><label        for="db-${value}-!=">!=</label>
                                    <input type="radio" name="queryColumnBtn-${value}" value=">=" id="db-${value}->="><label        for="db-${value}->=">>=</label>
                                    <input type="radio" name="queryColumnBtn-${value}" value=">"  id="db-${value}->" ><label        for="db-${value}->" >></label>
                               </div>`;
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
        queryDisplay = `SELECT * FROM <div class="bold">${columnArray[0][0]}</div>`;
        querySQL = `SELECT * FROM ${columnArray[0][1]}`;
        updateQueryDisplay();
    }
}

function updateQuery() {
    resetQuery();

    // Getting selected columns
    var selDisColArr = [];
    var selSqlColArr = [];

    $("#inputColumnsBtn input[type='checkbox']").each(function (index, domEle) {
        let dis = columnArray[index + 1][0];
        let sql = columnArray[index + 1][1];
        let isChecked = $(this).prop("checked");

        if (isChecked == true) {
            selDisColArr.push(dis);
            selSqlColArr.push(sql);
        }
    });

    // Getting conditions
    var disColArr = [];
    var sqlColArr = [];
    var valArr = [];
    var cmpArr = [];

    $(".queryColumn").each(function (index, domEle) {
        let dis = columnArray[index + 1][0];
        let sql = columnArray[index + 1][1];
        let value = $(this).children("input").val();
        let comp = $(`input[name='queryColumnBtn-${sql}']:checked`).val();

        if (value != "") {
            disColArr.push(dis);
            sqlColArr.push(sql);
            valArr.push(value);
            cmpArr.push(comp);
        }
    });

    // Appending selected columns
    if (selDisColArr.length > 0) {
        $("#querySubmitForm").css("display", "block");
        queryDisplay = `SELECT `;
        querySQL = `SELECT `;

        for (let i = 0; i < selDisColArr.length; i++) {
            if (i != 0) {
                queryDisplay += ", ";
                querySQL += ", ";
            }
            queryDisplay += `<div class="bold">${selDisColArr[i]}</div>`;
            querySQL += `${selSqlColArr[i]}`;
        }

        queryDisplay += ` FROM <div class="bold">${columnArray[0][0]}</div>`;
        querySQL += ` FROM ${columnArray[0][1]}`;
    }


    // Appending conditions
    if (disColArr.length > 0) {
        $("#querySubmitForm").css("display", "block");
        queryDisplay += " WHERE ";
        querySQL += " WHERE ";

        for (let i = 0; i < disColArr.length; i++) {
            if (i != 0) {
                queryDisplay += " AND ";
                querySQL += " AND ";
            }
            queryDisplay += `(${disColArr[i]} ${cmpArr[i]} '<div class="bold">${valArr[i]}</div>')`;
            querySQL += `(${sqlColArr[i]} ${cmpArr[i]} '${valArr[i]}')`;
        }

        queryDisplay += ";";
        querySQL += ";";
    }
    updateQueryDisplay();
}

/* -------------- */
/* --- Submit --- */
/* -------------- */

function submitQuerySelect() {
    $("#querySubmit").val(querySQL);
    $("#querySubmit-tableName").val(columnArray[0][2]);
    $("#querySubmitForm").submit();
}

function showQueryResult(tableHtml) {
    $("#resultTableView").css("display", "block");
    $("#resultTableView table").html(tableHtml);
    $("#resultTableView p").html(columnArray[0][0].toUpperCase() + " TABLE");
}
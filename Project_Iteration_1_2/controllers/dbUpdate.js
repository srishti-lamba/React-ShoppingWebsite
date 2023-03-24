$(document).ready(function () {

    $('.queryColumn').change(function () {
        updateQuery();
    });

    $('#inputColumnsBtn input[type="checkbox"]').change(function () {
        updateQuery();
    });

});

function showSuccessMessage() {
    $("#successMsg").html("Record(s) have been successfully updated.");
}

/* --------------- */
/* --- Display --- */
/* --------------- */

function displayInputs() {
    $("#inputValuesForm").css("display", "block");

    if (columnArray != "") {
        $("#tableName option[value='select']").prop("selected", false);
        $("#tableName option[value='" + columnArray[0][2] + "']").prop("selected", true);
        var resultHtml = "";
        for (let i = 1; i < columnArray.length; i++) {
            let display = columnArray[i][0];
            let value = columnArray[i][1];

            resultHtml += `<div class='queryColumn queryColumnInput'>`;
            resultHtml += `<label for='${value}'>${display}</label>`;
            resultHtml += `<input type='text' name='${value}' id='db-${value}' placeholder='Enter value'>`;
            resultHtml += `</div>`;
        }
        $("#inputValues").html(resultHtml);

        if ($("#tableView table").width() > $('#tableView').parent().width()) {
            $("#tableView table").css("width", "100%");
        }

        displayConditions();
    }
}

function displayConditions() {
    $("#inputValuesForm").css("display", "block");

    if (columnArray != "") {
        $("#tableName option[value='select']").prop("selected", false);
        $("#tableName option[value='" + columnArray[0][2] + "']").prop("selected", true);
        var resultHtml = "";
        for (let i = 1; i < columnArray.length; i++) {
            let display = columnArray[i][0];
            let value = columnArray[i][1];

            resultHtml += `<div class='queryColumn queryColumnCondition'>`;
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
        $("#conditionValues").html(resultHtml);
    }
}

/* ------------- */
/* --- Query --- */
/* ------------- */

function resetQuery() {
    if (columnArray != "") {
        queryDisplay = `UPDATE <div class="bold">${columnArray[0][0]}</div>`;
        querySQL = `UPDATE ${columnArray[0][1]}`;
        updateQueryDisplay();
    }
}

function updateQuery() {
    resetQuery();

    // Getting input
    var disColArr = [];
    var sqlColArr = [];
    var valArr = [];

    $(".queryColumnInput").each(function (index, domEle) {
        let dis = columnArray[index + 1][0];
        let sql = columnArray[index + 1][1];
        let value = $(this).children("input").val();
        let comp = $(`input[name='queryColumnBtn-${sql}']:checked`).val();

        // Getting used columns
        if (value != "") {
            disColArr.push(dis);
            sqlColArr.push(sql);
            valArr.push(value);
        }
    });

    // Appending input
    if (disColArr.length > 0) {
        $("#querySubmitForm").css("display", "block");
        queryDisplay += " SET ";
        querySQL += " SET ";

        for (let i = 0; i < disColArr.length; i++) {
            if (i != 0) {
                queryDisplay += ", ";
                querySQL += ", ";
            }
            queryDisplay += `${disColArr[i]} = '<div class="bold">${valArr[i]}</div>'`;
            querySQL += `${sqlColArr[i]} = '${valArr[i]}'`;
        }

        // Getting conditions
        var conDisColArr = [];
        var conSqlColArr = [];
        var conValArr = [];
        var cmpArr = [];

        $(".queryColumnCondition").each(function (index, domEle) {
            let dis = columnArray[index + 1][0];
            let sql = columnArray[index + 1][1];
            let value = $(this).children("input").val();
            let comp = $(`input[name='queryColumnBtn-${sql}']:checked`).val();

            // Getting used columns
            if (value != "") {
                conDisColArr.push(dis);
                conSqlColArr.push(sql);
                conValArr.push(value);
                cmpArr.push(comp);
            }
        });

        // Appending conditions
        if (conDisColArr.length > 0) {
            $("#querySubmitForm").css("display", "block");
            queryDisplay += " WHERE ";
            querySQL += " WHERE ";

            for (let i = 0; i < conDisColArr.length; i++) {
                if (i != 0) {
                    queryDisplay += " AND ";
                    querySQL += " AND ";
                }
                queryDisplay += `(${conDisColArr[i]} ${cmpArr[i]} '<div class="bold">${conValArr[i]}</div>')`;
                querySQL += `(${conSqlColArr[i]} ${cmpArr[i]} '${conValArr[i]}')`;
            }
        }

        queryDisplay += ";";
        querySQL += ";";
        updateQueryDisplay();
    }
}
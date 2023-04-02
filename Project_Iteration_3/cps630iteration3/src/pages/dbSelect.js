import React, {useState, useEffect} from "react";
import NavBar from "../components/navBar";
import Login from "../components/login";
import { selectUser } from "../features/userSlice";
import { useSelector } from "react-redux";
import axios from "axios";
import { 
        getDbColumns, getDbRows, setPageHeight, 
        setQuery, updateQueryDiv, 
        showPage, showSuccessMsg, showErrorMsg, resetResults 
    } from '../functions/dbMaintain.js';

const Select = ({showLogin, toggleLogin}) => {
    const user = useSelector(selectUser);
    const [table, setTable] = useState(null)
    const [columnArray, setColumnArray] = useState([])
    const [tableRows, setTableRows] = useState([])
    const [resultTableColumns, setResultTableColumns] = useState([])
    const [resultTableRows, setResultTableRows] = useState([])
    const [queryDisplay, setQueryDisplay] = useState("")
    const [querySQL, setQuerySQL] = useState("")
    const [successMsg, setSuccessMsg] = useState("")
    const [errorMsg, setErrorMsg] = useState("")

    // Page height
    useEffect(() => {
        setPageHeight()
    }, [])

    // Get Columns and Rows
    useEffect(() => {
        if (table != null) {

            resetResults(successMsg, errorMsg, setSuccessMsg, setErrorMsg)
            resetTable()
            if ((successMsg != "") && (errorMsg != "")) resetPage()

            // Columns
            let newColumnArray = getDbColumns(table)
            setColumnArray(newColumnArray)

            // Rows
            getDbRows(newColumnArray, setTableRows)
        }
    }, [table])

    // Display Elements
    useEffect (() => {
        showPage(columnArray, getDisplayDefault, getSqlDefault, setQueryDisplay, setQuerySQL)
    }, [columnArray])

    // Result Table
    useEffect (() => {
        if ((resultTableRows.length > 0) && (resultTableColumns.length > 0)) {
            document.getElementById("resultTableView").style.display = "block"
        }
    }, [resultTableRows])

    // Success Message
    useEffect (() => {
        showSuccessMsg(successMsg)
    }, [successMsg])

    // Error
    useEffect (() => {
        showErrorMsg(errorMsg)
    }, [errorMsg])

    // -------------
    // --- Query ---
    // -------------

    // Update display when query changes
    useEffect (() => {
        updateQueryDiv(queryDisplay, getDisplayDefault)
    }, [queryDisplay])

    function getDisplayDefault() 
        { return `SELECT * FROM <div class="bold">${columnArray[0][0]}</div>` }

    function getSqlDefault() 
        { return `SELECT * FROM ${columnArray[0][1]}` }

    // Update query
    function updateQuery() {
        if (columnArray != "") {

            let newDisplay = getDisplayDefault()
            let newSQL = getSqlDefault()

            // Getting selected columns
            var selDisColArr = []
            var selSqlColArr = []

            let inputColArr = document.querySelectorAll("#inputColumnsBtn input[type='checkbox']")
            for (let i = 0; i < inputColArr.length; i++) {
                let dis = columnArray[i + 1][0]
                let sql = columnArray[i + 1][1]
                let isChecked = inputColArr[i].checked

                if (isChecked == true) {
                    selDisColArr.push(dis)
                    selSqlColArr.push(sql)
                }
            };

            // Getting conditions
            var disColArr = []
            var sqlColArr = []
            var valArr = []
            var cmpArr = []

            let queryColArr = document.getElementsByClassName("queryColumn")
            for (let i = 0; i < queryColArr.length; i++) {
                let dis = columnArray[i + 1][0]
                let sql = columnArray[i + 1][1]
                let value = queryColArr[i].querySelector(":scope > input").value
                let comp = queryColArr[i].querySelector(`:scope .queryColumnBtn input[name='queryColumnBtn-${sql}']:checked + label`).innerHTML

                if (value != "") {
                    disColArr.push(dis)
                    sqlColArr.push(sql)
                    valArr.push(value)
                    cmpArr.push(comp)
                }
            };

            // Appending selected columns
            if (selDisColArr.length > 0) {
                newDisplay = `SELECT `
                newSQL = `SELECT `

                for (let i = 0; i < selDisColArr.length; i++) {
                    if (i != 0) {
                        newDisplay += ", "
                        newSQL += ", "
                    }
                    newDisplay += `<div class="bold">${selDisColArr[i]}</div>`
                    newSQL += `${selSqlColArr[i]}`
                }

                newDisplay += ` FROM <div class="bold">${columnArray[0][0]}</div>`
                newSQL += ` FROM ${columnArray[0][1]}`
            }


            // Appending conditions
            if (disColArr.length > 0) {
                newDisplay += " WHERE "
                newSQL += " WHERE "

                for (let i = 0; i < disColArr.length; i++) {
                    if (i != 0) {
                        newDisplay += " AND "
                        newSQL += " AND "
                    }
                    newDisplay += `(${disColArr[i]} ${cmpArr[i]} '<div class="bold">${valArr[i]}</div>')`
                    newSQL += `(${sqlColArr[i]} ${cmpArr[i]} '${valArr[i]}')`
                }
            }

            // End
            if ((selDisColArr.length > 0) || (disColArr.length > 0)) {
                newDisplay += ";"
                newSQL += ";"

                setQuery(newDisplay, newSQL, setQueryDisplay, setQuerySQL)
            }
        }
    }

    const submitQuery = () => {
        if(querySQL == getSqlDefault()) {
            setErrorMsg("Fields cannot all be empty")
            return
        }
        const url = "http://localhost/CPS630-Project-Iteration3-PHPScripts/dbMaintainSelectQuery.php"
        let fdata = new FormData()
        fdata.append('query', querySQL);

        //Send Request
        axios.post(url, fdata)
        .then(res=> {
            // Columns
            let newResultTableColumns = []
            res.data[0].forEach( (item) => {
                newResultTableColumns.push(getDisplayFromSQL(item))
            })
            setResultTableColumns(newResultTableColumns)

            // Rows
            setResultTableRows(res.data[1]);

            // Fix page
            setSuccessMsg("Query results:")
            hidePage()
        })
    }

    function getDisplayFromSQL(sql) {
        let display = "";

        columnArray.slice(1).forEach( (column) => {
            if (column[1] == sql) {
                display = column[0];
                return;
            }
        })
        return display;
    }

    // -------------
    // --- Reset ---
    // -------------

    function resetPage() {
        document.getElementById("tableName").value = "select"
        setTable(null)
        setColumnArray([])
        setTableRows([])
        setQuery("", "", setQueryDisplay, setQuerySQL)
    }

    function hidePage() {
        ["inputValuesForm", "queryDiv", "tableView", "querySubmitForm", "inputColumns"].map(
            (formName) => document.getElementById(formName).style.display = "none"
        )
    }

    function resetTable() {
        if (resultTableRows.length > 0 || resultTableColumns.length > 0) {
            setResultTableColumns([])
            setResultTableRows([])
        }
        document.getElementById("resultTableView").style.display = "none"
    }

    user !== null && toggleLogin(false)
    
    // ------------
    // --- HTML ---
    // ------------

    return (
        <>
            <NavBar toggleLogin={toggleLogin}/>
            {showLogin ? <Login setShowLogin={toggleLogin}/> : <></>}
            {showLogin ? <div onClick={() => toggleLogin(false)} className='overlay'></div> : <></>}

            <div id='main-image'>

                <article id="main-title">
                    <h1>DATABASE: Select</h1>
                </article>

                <div className="box">
                    <div id="errorMsg" key={"errorMsg"}>{errorMsg}</div>
                    <div id="successMsg" key={"successMsg"}>{successMsg}</div>
                </div>
                <div id="resultTableView" className="box">
                    {resultTableRows.length > 0 ? <p key={"trName"}>{`${table.toUpperCase()} TABLE`}</p> : <></>}
                    <table className="db-table">
                        <thead>
                            <tr>
                                {resultTableColumns.length > 0 && resultTableColumns.map((field, i) => {
                                    return <th key={`trHead-${i}`}>{field}</th>
                                })}
                            </tr>
                        </thead>
                        <tbody>
                            {resultTableRows.length > 0 && resultTableRows.map((row, i) => {
                                return(
                                    <tr key={`trRow-${i}`}>
                                        {Object.keys(row).map((item, x) => {
                                            return(
                                            <td key={`trCell-${i}-${x}`}>
                                                {row[item]}
                                            </td>)
                                        })}
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>

                <form id="tableNameForm" className="box">
                    <label>Table name: </label>
                    <select className="tableName" id="tableName" defaultValue={"select"} onChange={(e) => setTable(e.target.value)}>
                        <option value="select" disabled hidden>Select table name</option>
                        <option value="users">Users</option>
                        <option value="items">Items</option>
                        <option value="orders">Orders</option>
                        <option value="locations">Locations</option>
                        <option value="trucks">Trucks</option>
                        <option value="trips">Trips</option>
                        <option value="reviews">Reviews</option>
                        <option value="coupons">Coupons</option>
                    </select>
                </form>

                <div id="inputColumns" className="box" >
                    <label>Columns:</label>
                    <div id="inputColumnsBtn">
                        {columnArray.length > 0 && columnArray.map((field, i) => {
                            if (i > 0) {
                                return (
                                    <div key={`inputColumns-${i}`}>
                                        <input type='checkbox' onChange={(e) => updateQuery()} id={`col-${field[1]}`} name={`${field[1]}`} value={`${field[1]}`} key={`inputColumnsBtn-${i}`}/>
                                        <label htmlFor={`col-${field[1]}`} key={`inputColumnsLabel-${i}`}>
                                            {field[0]}
                                        </label>
                                    </div>
                                )
                            }
                        })}
                    </div>
                </div>

                <div id="inputValuesForm" className="box">
                    <label htmlFor="inputValues">Conditions:</label>
                    <div id="inputValues">
                            {columnArray.length > 0 && columnArray.slice(1).map((field, i) => {
                                return (
                                    <div className="queryColumn" key={`queryColumn-${i}`}>
                                        <label key={`queryColumnLabel-${i}`}>{field[0]}</label>
                                        <div className="queryColumnBtn" key={`queryColumnBtn-${i}`}>
                                            <input type='radio' name={`queryColumnBtn-${field[1]}`} id={`db-${field[1]}-<`}  onChange={updateQuery}               /> <label htmlFor={`db-${field[1]}-<`} >{"<"}</label>
                                            <input type='radio' name={`queryColumnBtn-${field[1]}`} id={`db-${field[1]}-<=`} onChange={updateQuery}               /> <label htmlFor={`db-${field[1]}-<=`}>{"<="}</label>
                                            <input type='radio' name={`queryColumnBtn-${field[1]}`} id={`db-${field[1]}-=`}  onChange={updateQuery} defaultChecked/> <label htmlFor={`db-${field[1]}-=`} >{"="}</label>
                                            <input type='radio' name={`queryColumnBtn-${field[1]}`} id={`db-${field[1]}-!=`} onChange={updateQuery}               /> <label htmlFor={`db-${field[1]}-!=`}>{"!="}</label>
                                            <input type='radio' name={`queryColumnBtn-${field[1]}`} id={`db-${field[1]}->=`} onChange={updateQuery}               /> <label htmlFor={`db-${field[1]}->=`}>{">="}</label>
                                            <input type='radio' name={`queryColumnBtn-${field[1]}`} id={`db-${field[1]}->`}  onChange={updateQuery}               /> <label htmlFor={`db-${field[1]}->`} >{">"}</label>
                                        </div>
                                        <input 
                                            placeholder="Enter Value" 
                                            type="text" 
                                            key={`queryColumnInput-${i}`}
                                            onChange={(e) => updateQuery()}
                                            defaultValue=""
                                            />
                                    </div>
                                )
                            })}
                    </div>  
                </div>      

                <div id="queryDiv" className="box">
                    <p id="queryDisplay"></p>
                    
                    <div id="querySubmitForm">
                        <button id="querySubmitBtn" onClick={submitQuery}>Run Query</button>
                    </div>
                </div>

                <div id="tableView" className="box">
                    {columnArray.length > 0 ? <p key={"tName"}>{`${table.toUpperCase()} TABLE`}</p> : <></>}
                    <table className="db-table">
                        <thead>
                            <tr>
                                {columnArray.length > 0 && columnArray.slice(1).map((field, i) => {
                                    return <th key={`tHead-${i}`}>{field[0]}</th>
                                })}
                            </tr>
                        </thead>
                        <tbody>
                            {typeof(tableRows) === "object" && tableRows.map((row, i) => {
                                row = JSON.parse(row)
                                return(
                                    <tr key={`tRow-${i}`}>
                                        {Object.keys(row).map((item, x) => {
                                            return(
                                            <td key={`tCell-${i}-${x}`}>
                                                {row[item]}
                                            </td>)
                                        })}
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}


export default Select;
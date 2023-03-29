import React, {useState, useEffect} from "react";
import NavBar from "../components/navBar";
import Login from "../components/login";
import { selectUser } from "../features/userSlice";
import { useSelector } from "react-redux";
import axios, { all } from "axios";
import { getDbColumns } from '../functions/dbMaintain.js';

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
    function setMinHeight() {
        let navHeight = document.getElementsByTagName("header")[0].offsetHeight
        document.getElementById("main-image").style.minHeight = (document.documentElement.clientHeight - navHeight) + "px"
        document.getElementsByTagName("body")[0].style.height = (document.documentElement.clientHeight - 1) + "px"
    };
    useEffect(() => {
        window.addEventListener('resize', setMinHeight)
        if (document.readyState === 'complete') {
            setMinHeight();
          } else {
            window.addEventListener('load', setMinHeight);
            return () => window.removeEventListener('load', setMinHeight);
          }
    }, [])

    // Get Columns and Rows
    useEffect(() => {
        if (table != null) {

            resetResults()
            resetTable()
            if ((successMsg != "") && (errorMsg != "")) resetPage()

            // Columns
            let newColumnArray = getDbColumns(table)
            setColumnArray(newColumnArray)

            // Assure table exists
            let fileName = newColumnArray[0][3]
            const urlFile = `http://localhost/CPS630-Project-Iteration3-PHPScripts/${fileName}`;
            axios.post(urlFile).then(resFile  => {

                    // Rows
                    let tableName = newColumnArray[0][1].toLowerCase()
                    const urlRow = `http://localhost/CPS630-Project-Iteration3-PHPScripts/getTableRows.php?table=${tableName}`;
                    axios.get(urlRow)
                    .then(res  => {
                        setTableRows(res.data)
                    })
                    .catch(err => {
                        console.log(err)
                    })

                })
            .catch(err => {
                console.log(err)
            })

        }
    }, [table])

    // Display Elements
    useEffect (() => {
        if (columnArray.length > 0) {
            ["inputValuesForm", "queryDiv", "tableView", "inputColumns"].map(
                (formName) => document.getElementById(formName).style.display = "block"
            )
            setQueryDisplay(getDisplayDefault())
            setQuerySQL(getSqlDefault() )
        }
    }, [columnArray])

    // -------------
    // --- Query ---
    // -------------

    // Update display when query changes
    useEffect (() => {
        if (queryDisplay.length > 1) {
            document.getElementById("queryDisplay").innerHTML = queryDisplay
            if (queryDisplay != getDisplayDefault()) {
                document.getElementById("querySubmitForm").style.display = "block"
            }
        }
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

                setQuery(newDisplay, newSQL)
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

    function setQuery(oldDisplayQuery, oldSqlQuery) {
        let newDisplayQuery = oldDisplayQuery
        let newSqlQuery = oldSqlQuery

        // <
        newDisplayQuery = newDisplayQuery.replace("&lt;", "<");
        newSqlQuery = newSqlQuery.replace("&lt;", "<");

        // >
        newDisplayQuery = newDisplayQuery.replace("&gt;", ">");
        newSqlQuery = newSqlQuery.replace("&gt;", ">");

        setQueryDisplay(newDisplayQuery)
        setQuerySQL(newSqlQuery)
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
        setQueryDisplay("")
        setQuerySQL("");
    }

    function hidePage() {
        setColumnArray([]);

        ["inputValuesForm", "queryDiv", "tableView", "querySubmitForm", "inputColumns"].map(
            (formName) => document.getElementById(formName).style.display = "none"
        )
    }

    function resetResults() {
        if (successMsg.length > 0 || errorMsg.length > 0) {
            setSuccessMsg("")
            setErrorMsg("")
        }

        ["#main-title + .box", "#successMsg", "#errorMsg"].map(
            (formName) => document.querySelector(formName).style.display = "none"
        )
    }

    function resetTable() {
        if (resultTableRows.length > 0 || resultTableColumns.length > 0) {
            setResultTableColumns([])
            setResultTableRows([])
        }
        document.getElementById("resultTableView").style.display = "none"
    }

    // Result Table
    useEffect (() => {
        if ((resultTableRows.length > 1) && (resultTableColumns.length > 1) && (columnArray.length < 1)) {
            document.getElementById("resultTableView").style.display = "block"
        }
    }, [resultTableRows])

    // Success Message
    useEffect (() => {
        if (successMsg.length > 0) {
            document.querySelector("#main-title + .box").style.display = "block"
            document.getElementById("successMsg").style.display = "block"
        }
    }, [successMsg])

    // Error
    useEffect (() => {
        if (successMsg.length > 0) {
            document.querySelector("#main-title + .box").style.display = "block"
            document.getElementById("errorMsg").style.display = "block"
        }
    }, [errorMsg])

    {user !== null && toggleLogin(false)}
    
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
import React, {useState, useEffect} from "react";
import NavBar from "../components/navBar";
import Login from "../components/login";
import { selectUser } from "../features/userSlice";
import { useSelector } from "react-redux";
import { 
        getDbColumns, getDbRows, setPageHeight, 
        setQuery, submitQuery, updateQueryDiv, 
        resetPage, showPage, 
        showSuccessMsg, showErrorMsg, resetResults 
    } from '../functions/dbMaintain.js';

const Update = ({showLogin, toggleLogin}) => {
    const user = useSelector(selectUser)
    const [table, setTable] = useState(null)
    const [columnArray, setColumnArray] = useState([])
    const [tableRows, setTableRows] = useState([])
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

    function getDisplayDefault() {
        return `UPDATE <div class="bold">${columnArray[0][0]}</div>`
    }

    function getSqlDefault() {
        return `UPDATE ${columnArray[0][1]}`
    }

    function runQueryClicked () {
        submitQuery (querySQL, setQuery, setQuerySQL, setQueryDisplay, getSqlDefault, 
            setErrorMsg, setSuccessMsg, 
            setTable, setColumnArray, setTableRows, resetPage)
    }

    // Update query
    function updateQuery() {
        if (columnArray !== "") {

            let newDisplay = getDisplayDefault()
            let newSQL = getSqlDefault() 

            // Getting input
            var disColArr = [];
            var sqlColArr = [];
            var valArr = [];

            let queryColInputArr = document.getElementsByClassName("queryColumnInput")
            for (let i = 0; i < queryColInputArr.length; i++) {
                let dis = columnArray[i + 1][0];
                let sql = columnArray[i + 1][1];
                let value = queryColInputArr[i].querySelector(":scope > input").value

                // Getting used columns
                if (value !== "") {
                    disColArr.push(dis);
                    sqlColArr.push(sql);
                    valArr.push(value);
                }
            };

            // Appending input
            if (disColArr.length > 0) {
                newDisplay += " SET ";
                newSQL += " SET ";

                for (let i = 0; i < disColArr.length; i++) {
                    if (i !== 0) {
                        newDisplay += ", ";
                        newSQL += ", ";
                    }
                    newDisplay += `${disColArr[i]} = '<div class="bold">${valArr[i]}</div>'`;
                    newSQL += `${sqlColArr[i]} = '${valArr[i]}'`;
                }

                // Getting conditions
                var conDisColArr = [];
                var conSqlColArr = [];
                var conValArr = [];
                var cmpArr = [];

                let queryColCondArr = document.getElementsByClassName("queryColumnCondition")
                for (let i = 0; i < queryColCondArr.length; i++) {
                    let dis = columnArray[i + 1][0];
                    let sql = columnArray[i + 1][1];
                    let value = queryColCondArr[i].querySelector(":scope > input").value
                    let comp = queryColCondArr[i].querySelector(`:scope .queryColumnBtn input[name='queryColumnBtn-${sql}']:checked + label`).innerHTML

                    // Getting used columns
                    if (value !== "") {
                        conDisColArr.push(dis);
                        conSqlColArr.push(sql);
                        conValArr.push(value);
                        cmpArr.push(comp);
                    }
                };

                // Appending conditions
                if (conDisColArr.length > 0) {
                    newDisplay += " WHERE ";
                    newSQL += " WHERE ";

                    for (let i = 0; i < conDisColArr.length; i++) {
                        if (i !== 0) {
                            newDisplay += " AND ";
                            newSQL += " AND ";
                        }
                        newDisplay += `(${conDisColArr[i]} ${cmpArr[i]} '<div class="bold">${conValArr[i]}</div>')`;
                        newSQL += `(${conSqlColArr[i]} ${cmpArr[i]} '${conValArr[i]}')`;
                    }
                }

                newDisplay += ";";
                newSQL += ";";
                    
                setQuery(newDisplay, newSQL, setQueryDisplay, setQuerySQL)
            }            
        }
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
                    <h1>DATABASE: Update</h1>
                </article>

                <div className="box">
                    <div id="errorMsg" key={"errorMsg"}>{errorMsg}</div>
                    <div id="successMsg" key={"successMsg"}>{successMsg}</div>
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

                <div id="inputValuesForm">

                    <div className="box">
                        <label htmlFor="inputValues">New Values:</label>
                        <div id="inputValues">
                            {columnArray.length > 0 && columnArray.slice(1).map((field, i) => {
                                return (
                                    <div className="queryColumn queryColumnInput" key={`queryColumnValues-${i}`}>
                                        <label key={`queryColumnValuesLabel-${i}`}>{field[0]}</label>
                                        <input  
                                            type="text"
                                            id = {'db-${value}'}
                                            name = {'${field}'}
                                            placeholder="Enter Value"
                                            key={`queryColumnValuesInput-${i}`}
                                            onChange={() => updateQuery()}
                                            />
                                    </div>
                                )
                            })}
                        </div>
                    </div>

                    <div className="box">
                        <label htmlFor="conditionValues">Conditions:</label>
                        <div id="conditionValues">
                            {columnArray.length > 0 && columnArray.slice(1).map((field, i) => {
                                return (
                                    <div className="queryColumn queryColumnCondition" key={`queryColumnCondition-${i}`}>
                                        <label key={`queryColumnConditionLabel-${i}`} htmlFor={'db-${value}'}>{field[0]}</label>
                                        <div className="queryColumnBtn" key={`queryColumnConditionBtn-${i}`}>
                                            <input type='radio' name={`queryColumnBtn-${field[1]}`} id={`db-${field[1]}-<`}  onChange={updateQuery}               /> <label htmlFor={`db-${field[1]}-<`} >{"<"}</label>
                                            <input type='radio' name={`queryColumnBtn-${field[1]}`} id={`db-${field[1]}-<=`} onChange={updateQuery}               /> <label htmlFor={`db-${field[1]}-<=`}>{"<="}</label>
                                            <input type='radio' name={`queryColumnBtn-${field[1]}`} id={`db-${field[1]}-=`}  onChange={updateQuery} defaultChecked/> <label htmlFor={`db-${field[1]}-=`} >{"="}</label>
                                            <input type='radio' name={`queryColumnBtn-${field[1]}`} id={`db-${field[1]}-!=`} onChange={updateQuery}               /> <label htmlFor={`db-${field[1]}-!=`}>{"!="}</label>
                                            <input type='radio' name={`queryColumnBtn-${field[1]}`} id={`db-${field[1]}->=`} onChange={updateQuery}               /> <label htmlFor={`db-${field[1]}->=`}>{">="}</label>
                                            <input type='radio' name={`queryColumnBtn-${field[1]}`} id={`db-${field[1]}->`}  onChange={updateQuery}               /> <label htmlFor={`db-${field[1]}->`} >{">"}</label>
                                        </div>
                                        <input 
                                            type="text" 
                                            name={'${value}'}
                                            id={'db-${value}'}
                                            placeholder="Enter Value"
                                            key={`queryColumnConditionInput-${i}`}
                                            onChange={(e) => updateQuery()}
                                            defaultValue=""
                                            />
                                    </div>
                                )
                            })}
                        </div>  
                    </div>
                </div>

                <div id="queryDiv" className="box">
                    <p id="queryDisplay"></p>
                    
                    <div id="querySubmitForm">
                        <button id="querySubmitBtn" onClick={runQueryClicked}>Run Query</button>
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

export default Update;
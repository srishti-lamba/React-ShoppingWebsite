import React, { useEffect, useState} from "react";
import NavBar from "../components/navBar";
import Login from "../components/login";
import { selectUser } from "../features/userSlice";
import { useSelector } from "react-redux";
import './dbMaintain.css';
import { 
        getDbColumns, getDbRows, setPageHeight, 
        setQuery, submitQuery, updateQueryDiv, 
        resetPage, showPage, 
        showSuccessMsg, showErrorMsg, resetResults 
    } from '../functions/dbMaintain.js';

const Insert = ({showLogin, toggleLogin}) => {
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

    function getDisplayDefault() 
        { return `INSERT INTO <div class="bold">${columnArray[0][0]}</div>` }

    function getSqlDefault() 
        { return `INSERT INTO ${columnArray[0][1]}` }

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

            let disColArr = []
            let sqlColArr = []
            let valArr = []
        
            let queryColArr = document.getElementsByClassName("queryColumn")
            for (var i = 0; i < queryColArr.length; i++) {
                let value = queryColArr[i].querySelector(":scope > input").value
        
                // Getting used columns
                if (value !== "") {
                    disColArr.push(columnArray[i + 1][0])
                    sqlColArr.push(columnArray[i + 1][1])
                    valArr.push(value)
                }
            }
        
            if (disColArr.length > 0) {
                // Part 1 of query
                newDisplay += "("
                newSQL += "("
        
                for (let i = 0; i < disColArr.length; i++) {
                    if (i !== 0) {
                        newDisplay += ", "
                        newSQL += ", "
                    }
                    newDisplay += disColArr[i]
                    newSQL += sqlColArr[i]
                }
        
                // Part 2 of Query
                newDisplay += ") VALUES ("
                newSQL += ") VALUES ("
        
                for (let i = 0; i < valArr.length; i++) {
                    if (i !== 0) {
                        newDisplay += ", ";
                        newSQL += ", ";
                    }
                    newDisplay += `'<div class="bold">${valArr[i]}</div>'`
                    newSQL += `'${valArr[i]}'`
                }
        
                newDisplay += ");"
                newSQL += ");"
            }

            setQuery(newDisplay, newSQL, setQueryDisplay, setQuerySQL)
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
                    <h1>DATABASE: Insert</h1>
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

                <div id="inputValuesForm" className="box">
                    <label htmlFor="inputValues">Values to insert:</label>
                    <div id="inputValues">
                        {columnArray.length > 0 && columnArray.slice(1).map((field, i) => {
                            return (
                                <div className="queryColumn" key={`queryColumn-${i}`}>
                                    <label key={`queryColumnLabel-${i}`}>{field[0]}</label>
                                    <input 
                                        placeholder="Enter Value" 
                                        type="text"
                                        key={`queryColumnInput-${i}`}
                                        onChange={() => updateQuery()}
                                        />
                                </div>
                            )
                        })}
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

export default Insert;
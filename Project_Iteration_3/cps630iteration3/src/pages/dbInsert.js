import React, { useEffect, useState} from "react";
import NavBar from "../components/navBar";
import Login from "../components/login";
import { selectUser } from "../features/userSlice";
import { useSelector } from "react-redux";
import './dbMaintain.css';
import axios from "axios";
import { getDbColumns } from '../functions/dbMaintain.js';

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
            ["inputValuesForm", "queryDiv", "tableView"].map(
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
        { return `INSERT INTO <div class="bold">${columnArray[0][0]}</div>` }

    function getSqlDefault() 
        { return `INSERT INTO ${columnArray[0][1]}` }

    // Update query
    function updateQuery() {
        if (columnArray != "") {

            let newDisplay = getDisplayDefault()
            let newSQL = getSqlDefault() 

            let disColArr = []
            let sqlColArr = []
            let valArr = []
        
            let queryColArr = document.getElementsByClassName("queryColumn")
            for (var i = 0; i < queryColArr.length; i++) {
                let value = queryColArr[i].querySelector(":scope > input").value
        
                // Getting used columns
                if (value != "") {
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
                    if (i != 0) {
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
                    if (i != 0) {
                        newDisplay += ", ";
                        newSQL += ", ";
                    }
                    newDisplay += `'<div class="bold">${valArr[i]}</div>'`
                    newSQL += `'${valArr[i]}'`
                }
        
                newDisplay += ");"
                newSQL += ");"
            }

            setQueryDisplay(newDisplay)
            setQuerySQL(newSQL)
        }
    }

    const submitQuery = () => {
        if(querySQL == getSqlDefault() ) {
            setErrorMsg("Fields cannot all be empty")
            return
        }
        const url = "http://localhost/CPS630-Project-Iteration3-PHPScripts/dbMaintainExecuteQuery.php"
        let fdata = new FormData()
        fdata.append('query', querySQL);
        axios.post(url, fdata)
        .then(res=> {
            setSuccessMsg(res.data);
            resetPage()
        })
    }

    function resetPage() {
        document.getElementById("tableName").value = "select"
        setTable(null)
        setColumnArray([])
        setTableRows([])
        setQueryDisplay("")
        setQuerySQL("");

        ["inputValuesForm", "queryDiv", "tableView", "querySubmitForm"].map(
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
                    <h1 className="title">DATABASE: Insert</h1>
                </article>

                <div className="box">
                    <div id="errorMsg" key={"errorMsg"}>{errorMsg}</div>
                    <div id="successMsg" key={"successMsg"}>{successMsg}</div>
                </div>

                <form id="tableNameForm" className="box">
                    <label>Table name: </label>
                    <select className="tableName" id="tableName" defaultValue={"select"} onChange={(e) => setTable(e.target.value)}>
                        <option value="select" disabled hidden>Select table name</option>
                        <option onClick={() => setTable('users')} value="users">Users</option>
                        <option onClick={() => setTable('items')} value="items">Items</option>
                        <option onClick={() => setTable('orders')} value="orders">Orders</option>
                        <option onClick={() => setTable('locations')} value="locations">Locations</option>
                        <option onClick={() => setTable('trucks')} value="trucks">Trucks</option>
                        <option onClick={() => setTable('trips')} value="trips">Trips</option>
                        <option onClick={() => setTable('reviews')} value="reviews">Reviews</option>
                    </select>
                </form>

                <div id="inputValuesForm" className="box">
                    <label htmlFor="inputValues">Values to insert:</label>
                    <div id="inputValues">
                        {columnArray.length > 0 && columnArray.map((field, i) => {
                            if (i > 0) {
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
                            }
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
                    <table>
                        <thead>
                            <tr>
                                {columnArray.length > 0 && columnArray.map((field, i) => {
                                    if (i > 0) {
                                        return <th key={`tHead-${i}`}>{field[0]}</th>
                                    }
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
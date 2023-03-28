import React, { useEffect, useState} from "react";
import NavBar from "../components/navBar";
import Login from "../components/login";
import { selectUser } from "../features/userSlice";
import { useSelector } from "react-redux";
import './dbMaintain.css';
import axios from "axios";
import { getDbColumns } from '../functions/dbMaintain.js';

const Insert = ({showLogin, toggleLogin}) => {
    const user = useSelector(selectUser);
    const [userMessage, setUserMessage] = useState("");
    const [table, setTable] = useState(null);
    const [columnArray, setColumnArray] = useState([])
    const [colNames, setColNames] = useState([]);
    const [inputFieldValues, setInputFieldValues] = useState([])
    const [tableRows, setTableRows] = useState([]);
    const [queryDisplay, setQueryDisplay] = useState("");
    const [querySQL, setQuerySQL] = useState("");

    // Page height
    function setMinHeight() {
        var navHeight = document.getElementsByTagName("header")[0].offsetHeight
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

            // Columns
            let newColumnArray = getDbColumns(table)
            setColumnArray(newColumnArray)
            setInputFieldValues(Array(newColumnArray.length - 1).fill(""))

            // Rows
            let tableName = newColumnArray[0][1]
            const url = `http://localhost/CPS630-Project-Iteration3-PHPScripts/getTableRows.php?table=${tableName}`;
            axios.get(url)
            .then(res  => {
                setTableRows(res.data)
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
        }
        resetQuery()
    }, [columnArray])

    // -------------
    // --- Query ---
    // -------------

    function resetQuery() {
        if (columnArray != "") {
            setQueryDisplay(`INSERT INTO <div class="bold">${columnArray[0][0]}</div>`)
            setQuerySQL(`INSERT INTO ${columnArray[0][1]}`)
        }
    }

    const updateInputFields = (e, i) => {
        let newInputFieldValues = [...inputFieldValues]
        newInputFieldValues[i] = e.target.value
        setInputFieldValues(newInputFieldValues)
    }

    const submitQuery = () => {
        let allempty = true;
        inputFieldValues.forEach(item => {
            if(item !== ""){
                allempty = false;
            }
        })

        if(allempty) {
            setUserMessage("Fields cannot all be empty");
            return;
        }
        const url = "http://localhost/CPS630-Project-Iteration3-PHPScripts/dbMaintainExecuteQuery.php";
        let queryPart1 = `INSERT INTO ${table} (`;
        let queryPart2 = ` VALUES(`;
        let fdata = new FormData();

        colNames.forEach((name, i) => {
            let processedName = processUserInput(name, inputFieldValues[i])
            if(inputFieldValues[i] !== "") {
                if(queryPart1 === `INSERT INTO ${table} (`){
                    queryPart1 += `${name}`;
                    queryPart2 += `${processedName}`
                }
                else {
                    queryPart1 += ", " + `${name}`;
                    queryPart2 += ", " + `${processedName}`
                }
            }  
        })

        let query = queryPart1 + ")" + queryPart2 + ");";

        console.log(query)

        fdata.append('query', query);
        axios.post(url, fdata)
        .then(res=> {
            //console.log(res.data)
            setUserMessage(res.data);
        })
    }

    const processUserInput = (colName, field) => {
        if(table === 'branchLocations') {
            if(colName === 'latitude' || colName === 'longitude' || colName === 'location_id') {
                return Number(field)
            } 

            return `'${field}'`;
        }

        else if(table === 'items') {
            if(colName === 'price' || colName === 'department_code' || colName === 'item_id') {
                return Number(field)
            } 
            return `'${field}'`;
        } 

        else if (table === 'orders') {
            if(colName === 'userId' || colName === 'tripId' || colName === 'receiptId' || colName === 'orderId' || colName === 'totalPrice') {
                return Number(field);
            }

            return `'${field}'`;
        } else if (table === 'trips') {
            if(colName === 'tripId' || colName === 'truckId') {
                return Number(field)
            } 
            return `'${field}'`;
        } else if (table === 'users') {
            if(colName === 'balance' || colName === 'isAdmin' || colName === 'user_id') {
                return Number(field)
            } 
            return `'${field}'`;
        } else if (table === 'trucks') {
            if(colName === 'truckId') {
                return Number(field)
            }
            return `'${field}'`;
        }
         else {
            return `'${field}'`;
        }
    }

    {user !== null && toggleLogin(false)}
    
    return (
        <>
            <NavBar toggleLogin={toggleLogin}/>
            {showLogin ? <Login setShowLogin={toggleLogin}/> : <></>}
            {showLogin ? <div onClick={() => toggleLogin(false)} className='overlay'></div> : <></>}

            <div id='main-image'>

                <article id="main-title">
                    <h1 className="title">DATABASE: Insert</h1>
                </article>

                {userMessage.length > 0 ? <p style={{color:'green', textAlign:'center'}}>{userMessage}</p> : <></>}

                <div className="box">
                    <div className="errorMsg"></div>
                    <div className="successMsg"></div>
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
                                            value={inputFieldValues[i]}
                                            onChange={(e) => updateInputFields(e, i)}
                                            />
                                    </div>
                                )
                            }
                        })}
                    </div>
                </div>


                <div id="queryDiv" className="box">
                    <p id="queryDisplay" key={"queryDisplay"}>{queryDisplay}</p>
                    
                    <div id="querySubmitForm">
                        <input type="text" name="querySubmit" id="querySubmit"/>
                        <button id="querySubmitBtn" type="button" name="querySubmitBtn" onClick={submitQuery}>Run Query</button>
                    </div>
                </div>

                <div id="tableView" className="box">
                {columnArray.length > 0 ? <p key={"tName"}>{`${table.toUpperCase()} TABLE`}</p> : <></>}
                    <table>
                        <thead>
                            <tr>
                                {columnArray.length > 0 && columnArray.map((field, i) => {
                                    if (i > 0) {
                                            return(
                                            <th key={`tHead-${i}`}>{field[0]}</th>
                                        )
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
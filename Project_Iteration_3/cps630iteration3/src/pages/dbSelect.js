import React, {useState, useEffect} from "react";
import NavBar from "../components/navBar";
import Login from "../components/login";
import { selectUser } from "../features/userSlice";
import { useSelector } from "react-redux";
import axios, { all } from "axios";
import { getDbColumns } from '../functions/dbMaintain.js';

const Select = ({showLogin, toggleLogin}) => {
    const user = useSelector(selectUser);
    // const [userMessage, setUserMessage] = useState("");
    // const [table, setTable] = useState(null);
    // const [colNames, setColNames] = useState([]);
    // const [inputFieldValues, setInputFieldValues] = useState([]);
    // const [colsSelected, setColsSelected] = useState([]);
    // const [operations, setOperations] = useState([])
    // const [tableRows, setTableRows] = useState([]);
    // const [queryOutput, setQueryOutput] = useState([]);
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
        }
    }

    // const updateColsSelected = (field, i) => {
    //     let newColsSelected = [...colsSelected]
    //     newColsSelected[i] = field
    //     setColsSelected(newColsSelected)
    // }

    // const submitQuery = () => {
    //     const url = "http://localhost/CPS630-Project-Iteration3-PHPScripts/dbInsert.php";
    //     let allempty = true;
    //     let query = "";
    //     let fdata = new FormData()
    //     colsSelected.forEach(item => {
    //         if(item !== ""){
    //             allempty = false;
    //         }
    //     })

    //     let queryPart1 ="SELECT *";
    //     let queryPart2 = `FROM ${table}`;
    //     let queryPart3 = ` WHERE `;

    //     if(allempty) {
    //         queryPart1 = `SELECT * `;
    //     } else {
    //         queryPart1 = `SELECT `;
    //     }

    //     colsSelected.forEach((name, i) => {
    //         if(name !== "") {
    //             if(queryPart1 === "SELECT ") {
    //                 queryPart1 += `${name} `; 
    //             } else {
    //                 queryPart1 += `, ${name} `;
    //             }
    //         }  
    //     })

    //     allempty = true;

    //     inputFieldValues.forEach(item => {
    //         if(item !== "") {
    //             allempty = false;
    //         }
    //     })

    //     if(allempty) {
    //         query = queryPart1 + queryPart2;
    //     } else {
    //         colNames.forEach((name, i) => {
    //             let processedName = processUserInput(name, inputFieldValues[i]);
    //             if(inputFieldValues[i] !== "") {
    //                 if(queryPart3 === " WHERE ") {
    //                     queryPart3 += `${name} ${operations[i]} ${processedName}`
    //                 } else {
    //                     queryPart3 += ` AND ${name} ${operations[i]} ${processedName}`
    //                 }
    //             }
    
    //         })

    //         query = queryPart1 + queryPart2 + queryPart3 + ";";
    //     }

        
    //     console.log(query);

    //     fdata.append('query', query);
    //     axios.post(url, fdata)
    //     .then(res=> {
    //         console.log(res)
    //         setQueryOutput(res.data);
    //     })
    // }

    const submitQuery = () => {
        if(querySQL == getSqlDefault()) {
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

    // const showQueryOutput = () => {

    //     let allempty = true
    //     colsSelected.forEach(item => {
    //         if(item.length > 0) {
    //             allempty = false;
    //         }
    //     })

    //     return (
    //         <div>
    //             <p>Query Output:</p>
    //             <table>
    //                 <thead>
    //                     <tr>
    //                         {!allempty ? colsSelected.map((col, i) => {
    //                             return <th key={i}>{col}</th>
    //                         }) : colNames.map((name, i) => {
    //                             return <th key={i}>{name}</th>
    //                         })}
    //                     </tr>
    //                 </thead>
    //                 <tbody>
    //                     {queryOutput.map((elem, i) => {
    //                         return(
    //                             <tr>
    //                                 {Object.keys(elem).map((item, i) => {
    //                                     return <td key={i*10}>{elem[item]}</td>
    //                                 })}
    //                             </tr>
    //                         )
    //                     })}
    //                 </tbody>
    //             </table>
    //         </div>
    //     )
    // }
    
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

                <div id="inputColumns" className="box" >
                    <label>Columns:</label>
                    <div id="inputColumnsBtn">
                        {columnArray.length > 0 && columnArray.map((field, i) => {
                            if (i > 0) {
                                return (
                                    <>
                                        <input type='checkbox' id={`col-${field[1]}`} name={`${field[1]}`} value={`${field[1]}`}/>
                                        <label onClick={(e) => updateQuery()} htmlFor={`col-${field[1]}`} key={`inputColumns-${i}`}>
                                            {field[0]}
                                        </label>
                                    </>
                                )
                            }
                        })}
                    </div>
                </div>

                <div id="inputValuesForm" className="box">
                    <label htmlFor="inputValues">Conditions:</label>
                    <div className="inputValues">
                            {columnArray.length > 0 && columnArray.map((field, i) => {
                                if (i > 0) {
                                    return (
                                        <div className="queryColumn" key={`queryColumn-${i}`} onChange={updateQuery}>
                                            <label key={`queryColumnLabel-${i}`} onChange={updateQuery}>{field[0]}</label>
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
                    <table className="db-table">
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


export default Select;
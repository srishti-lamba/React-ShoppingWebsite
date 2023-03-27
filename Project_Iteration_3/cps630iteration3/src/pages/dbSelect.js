import React, {useState, useEffect} from "react";
import NavBar from "../components/navBar";
import Login from "../components/login";
import { selectUser } from "../features/userSlice";
import { useSelector } from "react-redux";
import axios, { all } from "axios";

const Select = ({showLogin, toggleLogin}) => {
    const user = useSelector(selectUser);
    const [userMessage, setUserMessage] = useState("");
    const [table, setTable] = useState(null);
    const [colNames, setColNames] = useState([]);
    const [inputFieldValues, setInputFieldValues] = useState([]);
    const [colsSelected, setColsSelected] = useState([]);
    const [operations, setOperations] = useState([])
    const [tableRows, setTableRows] = useState([]);
    const [queryOutput, setQueryOutput] = useState([]);

    useEffect(() => {
        setQueryOutput([])
    }, [])

    //get table col names
    useEffect(() => {
        const url = `http://localhost/CPS630-Project-Iteration3-PHPScripts/getTableCols.php?table=${table}`;
        axios.get(url)
        .then(res => {
            let cols = []
            let inputs = []
            let initialOperations = []
            let initialColsSelected = []
            res.data.forEach(element => {
                cols.push(element)
                inputs.push("")
                initialOperations.push("=")
                initialColsSelected.push("")
            });
            setColNames(cols);
            setInputFieldValues(inputs)
            setOperations(initialOperations)
            setColsSelected(initialColsSelected)
        }).catch(err => {
            console.log(err)
        })
    }, [table])

    useEffect(() => {
        const url = `http://localhost/CPS630-Project-Iteration3-PHPScripts/getTableRows.php?table=${table}`;
        axios.get(url)
        .then(res  => {
            setTableRows(res.data)
        })
        .catch(err => {
            console.log(err)
        })
    }, [table])

    const updateInputFields = (e, i) => {
        let newInputFieldValues = [...inputFieldValues]
        newInputFieldValues[i] = e.target.value
        setInputFieldValues(newInputFieldValues)
    }

    const updateOperations = (i, operator) => {
        let newOperations = [...operations]
        newOperations[i] = operator;
        setOperations(newOperations)
    }

    const updateColsSelected = (field, i) => {
        let newColsSelected = [...colsSelected]
        newColsSelected[i] = field
        setColsSelected(newColsSelected)
    }

    const submitQuery = () => {
        const url = "http://localhost/CPS630-Project-Iteration3-PHPScripts/dbInsert.php";
        let allempty = true;
        let query = "";
        let fdata = new FormData()
        colsSelected.forEach(item => {
            if(item !== ""){
                allempty = false;
            }
        })

        let queryPart1 ="SELECT *";
        let queryPart2 = `FROM ${table}`;
        let queryPart3 = ` WHERE `;

        if(allempty) {
            queryPart1 = `SELECT * `;
        } else {
            queryPart1 = `SELECT `;
        }

        colsSelected.forEach((name, i) => {
            if(name !== "") {
                if(queryPart1 === "SELECT ") {
                    queryPart1 += `${name} `; 
                } else {
                    queryPart1 += `, ${name} `;
                }
            }  
        })

        allempty = true;

        inputFieldValues.forEach(item => {
            if(item !== "") {
                allempty = false;
            }
        })

        if(allempty) {
            query = queryPart1 + queryPart2;
        } else {
            colNames.forEach((name, i) => {
                let processedName = processUserInput(name, inputFieldValues[i]);
                if(inputFieldValues[i] !== "") {
                    if(queryPart3 === " WHERE ") {
                        queryPart3 += `${name} ${operations[i]} ${processedName}`
                    } else {
                        queryPart3 += ` AND ${name} ${operations[i]} ${processedName}`
                    }
                }
    
            })

            query = queryPart1 + queryPart2 + queryPart3 + ";";
        }

        
        console.log(query);

        fdata.append('query', query);
        axios.post(url, fdata)
        .then(res=> {
            console.log(res)
            setQueryOutput(res.data);
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

    const showQueryOutput = () => {

        let allempty = true
        colsSelected.forEach(item => {
            if(item.length > 0) {
                allempty = false;
            }
        })

        return (
            <div>
                <p>Query Output:</p>
                <table>
                    <thead>
                        <tr>
                            {!allempty ? colsSelected.map((col, i) => {
                                return <th key={i}>{col}</th>
                            }) : colNames.map((name, i) => {
                                return <th key={i}>{name}</th>
                            })}
                        </tr>
                    </thead>
                    <tbody>
                        {queryOutput.map((elem, i) => {
                            return(
                                <tr>
                                    {Object.keys(elem).map((item, i) => {
                                        return <td key={i}>{elem[item]}</td>
                                    })}
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        )
    }
    
    return (
        <>
            <NavBar toggleLogin={toggleLogin}/>
            {showLogin ? <Login setShowLogin={toggleLogin}/> : <></>}
            {showLogin ? <div onClick={() => toggleLogin(false)} className='overlay'></div> : <></>}

            <div className='pageBox'>

                <article>
                    <h1 className="title">DATABASE: Select</h1>
                </article>

                {userMessage.length > 0 ? <p style={{color:'green', textAlign:'center'}}>{userMessage}</p> : <></>}

                <div className="box">
                    <div className="errorMsg"></div>
                    <div className="successMsg"></div>
                </div>

                <form className="tableNameForm box">
                    <label>Table name:</label>
                    <select className="tableName">
                        <option value="select" disabled selected hidden>Select table name</option>
                        <option onClick={() => setTable('users')} value="users">Users</option>
                        <option onClick={() => setTable('items')} value="items">Items</option>
                        <option onClick={() => setTable('orders')} value="orders">Orders</option>
                        <option onClick={() => setTable('branchLocations')} value="locations">Locations</option>
                        <option onClick={() => setTable('trucks')} value="trucks">Trucks</option>
                        <option onClick={() => setTable('trips')} value="trips">Trips</option>
                        <option onClick={() => setTable('reviews')} value="reviews">Reviews</option>
                    </select>
                </form>

                <div id="inputColumnsBtn">
                    <label>
                        Columns:
                    </label>
                    {colNames.length > 0 && colNames.map((field, i) => {
                        return (
                            <>
                                <input type='checkbox' />
                                <label onClick={(e) => updateColsSelected(field, i)} className="" key={i}>
                                    {field}
                                </label>
                            </>
                        )
                    })}
                </div>

                <div className="inputValuesForForm">
                    <div className="inputValues">
                        <label for="inputValues">Conditions:</label>
                        <div className="queryColumn">
                            {colNames.length > 0 && colNames.map((field, i) => {
                                return (
                                    <>
                                        <label>{field}</label>
                                        <div style={{display:'flex', flexDirection:'row'}}>
                                        <input id="queryColumnBtn" type='radio' style={{display:'none'}} />
                                        <label value="<" id="queryColumnBtn" onClick={(e) => updateOperations(i, "<")}>{"<"}</label>
                                        <label value="<=" id="queryColumnBtn" onClick={(e) => updateOperations(i, "<=")}>{"<="}</label>
                                        <label value="=" id="queryColumnBtn" onClick={(e) => updateOperations(i, "=")}>{"="}</label>
                                        <label value="!=" id="queryColumnBtn" onClick={(e) => updateOperations(i, "!=")}>{"!="}</label>
                                        <label value=">=" id="queryColumnBtn" onClick={(e) => updateOperations(i, ">=")}>{">="}</label>
                                        <label value=">" id="queryColumnBtn" onClick={(e) => updateOperations(i, ">")}>{">"}</label>
                                        </div>
                                        <input 
                                            placeholder="Enter Value" 
                                            type="text" 
                                            key={i} 
                                            value={inputFieldValues[i]}
                                            onChange={(e) => updateInputFields(e, i)}
                                            />
                                    </>
                                )
                            })}
                        </div>
                    </div>  
                </div>      

                {table !== null ? 
                <div id="queryDiv" className="box">
                    <p id="queryDisplay"></p>
                    <button type="button" onClick={submitQuery}>Run Query</button>
                </div> : <></>}

                <div className="tableView" class="box">
                    {queryOutput.length > 0 && showQueryOutput()}
                    <table>
                        <thead>
                            <tr>
                                {colNames.length > 0 && colNames.map((field, i) => {
                                    return(
                                        <>
                                            <td key={i}>{field}</td>
                                        </>
                                    )
                                })}
                            </tr>
                        </thead>
                        <tbody>
                            {typeof(tableRows) === "object" && tableRows.map((row, i) => {
                                row = JSON.parse(row)
                                return(
                                    <tr key={i}>
                                        {Object.keys(row).map((key, i) => {
                                            return(
                                            <td key={i}>
                                                {row[key]}
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
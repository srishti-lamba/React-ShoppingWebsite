import React, {useState, useEffect} from "react";
import NavBar from "../components/navBar";
import Login from "../components/login";
import { selectUser } from "../features/userSlice";
import { useSelector } from "react-redux";
import axios from "axios";

const Delete = ({showLogin, toggleLogin}) => {
    const user = useSelector(selectUser);
    const [userMessage, setUserMessage] = useState("");
    const [table, setTable] = useState(null);
    const [colNames, setColNames] = useState([]);
    const [inputFieldValues, setInputFieldValues] = useState([])
    const [operations, setOperations] = useState([])
    const [tableRows, setTableRows] = useState([]);

    //get table col names
    useEffect(() => {
        if (table != null) {
            const url = `http://localhost/CPS630-Project-Iteration3-PHPScripts/getTableCols.php?table=${table}`;
            axios.get(url)
            .then(res => {
                let cols = []
                let inputs = []
                let initialOperations = []
                res.data.forEach(element => {
                    cols.push(element)
                    inputs.push("")
                    initialOperations.push("=")
                });
                setColNames(cols);
                setInputFieldValues(inputs)
                setOperations(initialOperations)
            }).catch(err => {
                console.log(err)
            })
        }
    }, [table])

    useEffect(() => {
        if (table != null) {
            const url = `http://localhost/CPS630-Project-Iteration3-PHPScripts/getTableRows.php?table=${table}`;
            axios.get(url)
            .then(res  => {
                setTableRows(res.data)
            })
            .catch(err => {
                console.log(err)
            })
        }
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
        const url = "http://localhost/CPS630-Project-Iteration3-PHPScripts/dbMaintainExecuteQuery.php";;
        let query = `DELETE FROM ${table} WHERE `;
        let fdata = new FormData();

        colNames.forEach((name, i) => {
            let processedName = processUserInput(name, inputFieldValues[i])
            if(inputFieldValues[i] !== "") {
                if(query === `DELETE FROM ${table} WHERE `){
                    query+= `${name} ${operations[i]} ${processedName}`; 
                }
                else {
                    query += ` AND ${name} ${operations[i]} ${processedName}`;
                }
            }  
        })

        query += ";";

        console.log(query);

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

            <div className='pageBox'>

                <article>
                    <h1 className="title">DATABASE: Delete</h1>
                </article>

                {userMessage.length > 0 ? <p style={{color:'green', textAlign:'center'}}>{userMessage}</p> : <></>}

                <div className="box">
                    <div className="errorMsg"></div>
                    <div className="successMsg"></div>
                </div>

                <form className="tableNameForm box">
                    <label>Table name:</label>
                    <select className="tableName" defaultValue={"select"}>
                        <option value="select" disabled hidden>Select table name</option>
                        <option onClick={() => setTable('users')} value="users">Users</option>
                        <option onClick={() => setTable('items')} value="items">Items</option>
                        <option onClick={() => setTable('orders')} value="orders">Orders</option>
                        <option onClick={() => setTable('branchLocations')} value="locations">Locations</option>
                        <option onClick={() => setTable('trucks')} value="trucks">Trucks</option>
                        <option onClick={() => setTable('trips')} value="trips">Trips</option>
                        <option onClick={() => setTable('reviews')} value="reviews">Reviews</option>
                    </select>
                </form>

                <div className="inputValuesForForm">
                    <div className="inputValues">
                        <label htmlFor="inputValues">Values to delete:</label>
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

                <div className="tableView box">
                    <p></p>
                    <table>
                        <thead>
                            <tr>
                                {colNames.length > 0 && colNames.map((field, i) => {
                                    return(
                                        <>
                                            <td key={i*10}>{field}</td>
                                        </>
                                    )
                                })}
                            </tr>
                        </thead>
                        <tbody>
                            {typeof(tableRows) === "object" && tableRows.map((row, i) => {
                                row = JSON.parse(row)
                                return(
                                    <tr key={i*100}>
                                        {Object.keys(row).map((key, i) => {
                                            return(
                                            <td key={i*1000}>
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

export default Delete;
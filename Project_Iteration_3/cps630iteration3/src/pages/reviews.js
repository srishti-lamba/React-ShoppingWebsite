import React, {useState, useEffect } from "react";
import NavBar from "../components/navBar";
import Login from "../components/login";
import { selectUser } from "../features/userSlice";
import { useSelector } from "react-redux";
import axios from "axios";
import ProductCard from "../components/productCard";
import { useNavigate } from "react-router-dom";
import './reviews.css';
import { setPageHeight} from '../functions/dbMaintain.js';

const Reviews = ({showLogin, toggleLogin}) => {
    
    const user = useSelector(selectUser);

    const [searchItemID, setSearchItemID] = useState("");
    const [searchItemName, setSearchItemName] = useState("");
    const [searchItemImg, setSearchItemImg] = useState("");

    const [items, setItems] = useState([])
    const [reviews, setReviews] = useState([])
    const [showPage, setShowPage] = useState(false)

    user !== null && toggleLogin(false)

    // Get item names
    useEffect(() => {
        setupDatabase();

        const url = "http://localhost/CPS630-Project-Iteration3-PHPScripts/getProducts.php"
        axios.get(url)
        .then(res => {
            let products = res.data
            setItems(products)
        })
        .catch(err => {
            console.log(err)
        })
    }, [])

    // Setup document
    useEffect(() => {

        // Page height
        setPageHeight();

        // Form input enter
        ["keypress", "keydown", "keyup"].map( eventName => {
            
            document.querySelectorAll("#writeReviewForm input")[0].addEventListener(eventName, (e) => {
                if (e.keyCode == 13) {
                    e.preventDefault()
                }
            });
        });

        // Star rating
        let starLabel = document.querySelectorAll("#reviewStars label")
        starLabel.forEach( star => star.style.color = "lightgray")

        let starBtn = document.querySelectorAll("input[type='radio'][name='reviewRating']")
        starBtn.forEach( star => {
            star.addEventListener("change", () => {
                let value = star.value;
                document.getElementById("reviewStarsText").innerHTML = `${value} stars`
    
                starLabel.forEach( star => star.style.color = "")
            })
        } )

    }, [])

    // Setup Database tables
    function setupDatabase() {
        let fileArray = ["CreateAndPopulateUsersTable.php", 
                          "CreateAndPopulateItemsTable.php",
                          "CreateAndPopulateReviewsTable.php"
                        ]
        
        fileArray.forEach((fileName) => {
            let url = "http://localhost/CPS630-Project-Iteration3-PHPScripts/" + fileName
            let fdata = new FormData();
            axios.post(url, fdata)
            .catch((err) => {
                console.log(err)
            })
        })
    }

    // -------------------
    // --- Submit Form ---
    // -------------------
    
    function submitReviewSearch() {
        console.log("submitReviewSearch itemName: " + searchItemName)
        console.log("submitReviewSearch showPage: " + showPage)
        
        if (searchItemName === "") {
            showElements(showPage)
            return
        }


        // Get Reviews
        const url = "http://localhost/CPS630-Project-Iteration3-PHPScripts/getReviews.php";
        let fdata = new FormData();
        fdata.append('searchItem', searchItemName)
        axios.post(url, fdata)
        .then(res=> {
            console.log("Searched")
            setReviews(res.data)
            setShowPage(true)
            showElements(true)
        })
        .catch((err) => {
            //setErrorMsg(err.response.statusText)
        })
    }

    function submitReviewWrite() {
        let reviewRating = 0
        if (document.querySelector("input[type='radio'][name='reviewRating']:checked") !== null ) {
            reviewRating = document.querySelector("input[type='radio'][name='reviewRating']:checked").value
        }
    
        const url = "http://localhost/CPS630-Project-Iteration3-PHPScripts/writeReview.php"
        let fdata = new FormData();

        let reviewTitle = document.getElementById("reviewTitle").value
        let reviewContent = document.getElementById("reviewContent").value
        let oldSearchItemName = searchItemName

        fdata.append('reviewUserID', user.user.id)
        fdata.append('reviewItemID', searchItemID)
        fdata.append('reviewTitle', reviewTitle)
        fdata.append('reviewContent', reviewContent)
        fdata.append('reviewRating', reviewContent)
        fdata.append('reviewRating', reviewRating)

        console.log("Posting Request")

        axios.post(url, fdata)
        .then(res => {
            console.log("old itemName: " + oldSearchItemName)
            console.log("current itemName: " + searchItemName)
            //setSearchItemName(oldSearchItemName)
            submitReviewSearch()
        })
        .catch((err) => {
            console.log(err)
            //setErrorMsg(err.response.statusText)
        })
    }

    // --------------
    // --- Search ---
    // --------------

    useEffect(() => {
        submitReviewSearch()
    }, [searchItemName])

    function handleSearch(e) {
        for (var i=0; i < items.length; i++) {
            if (e.target.value == items[i].productName) {
                setSearchItemID(items[i].item_id)
                setSearchItemName(items[i].productName)
                setSearchItemImg(items[i].image_url)
            }
        }
        document.getElementById("productImg").style.visibility = "visible"
    }

    // ------------------------
    // --- Fill Information ---
    // ------------------------

    function showElements(show) {
        let elemArr = ["reviewItem", "reviewCards", "writeReviewForm"]
        
        if (show === true) {
            // Show elements
            elemArr.map( elem => {
                console.log("show")
                document.getElementById(elem).style.display = "block"
            })
        }
        else {
            // Hide elements
            elemArr.map( elem => {
                console.log("hide")
                document.getElementById(elem).style.display = "none"
            })
        }
    }

    function fillDatalist(data) {
        document.getElementById("searchItemList").html(data);
    }

    function fillItemInfo(itemName, itemURL) {
        document.getElementById("reviewItem").css("display", "block");
        document.getElementById("reviewItem").getElementsByTagName("h4").html(itemName);
        document.getElementById("reviewItem").getElementsByTagName("img").attr("src", itemURL);
    }

    function fillReviews(data) {        
        document.getElementById("reviewCards").html(data);
    }

    function showWriteReview(userID, itemID, itemName, itemURL) {

        document.getElementById("reviewUserID").val(userID);
        document.getElementById("reviewItemID").val(itemID);
        document.getElementById("reviewItemName").val(itemName);
        document.getElementById("reviewItemURL").val(itemURL);

        document.getElementById("writeReviewForm").css("display", "block");
    }

    function showSuccessMsg() {
        document.getElementById("reviewSearchForm").getElementsByClassName("box").css("display", "block");
        document.getElementById("successMsg").css("display", "block");
    }

    function showErrorMsg(msg) {
        document.getElementById("reviewSearchForm").getElementsByClassName("box").css("display", "block");
        document.getElementById("errorMsg").css("display", "block");
        document.getElementById("errorMsg").html(msg);
    }
    
    return (
        <>
            <NavBar toggleLogin={toggleLogin}/>
            {showLogin ? <Login setShowLogin={toggleLogin}/> : <></>}
            {showLogin ? <div onClick={() => toggleLogin(false)} className='overlay'></div> : <></>}

            <title>Reviews</title>
            <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"/>

            {/*--- Page ---*/}
            <div id="main-image">

                {/*--- Title ---*/}
                <article id="main-title">
                    <h1>Reviews</h1>
                </article>

                {/*--- Search ---*/}
                <form id="emptyForm" ></form>
                <form id="reviewSearchForm" className="box">
                    <select className="searchItemList" id="reviewSearch" defaultValue={"select"} onChange={e => {handleSearch(e);}}>
                        <option value="select" disabled hidden>Select item to search</option>
                        {items.map((item, i) => {
                            return(
                                <option key={`searchItemList-${i}`}>
                                    {item.productName}
                                </option>
                            )
                        })}
                    </select>
                </form>

                {/*--- Result ---*/}
                <div id="postMsg" className="box">
                <div id="successMsg">Your review has been posted.</div>
                    <div id="errorMsg"></div>
                </div>

                {/*--- Item ---*/}
                <div id="reviewItem" className="box">
                    <h4>{searchItemName}</h4>
                    <img id="productImg" src={searchItemImg} alt="product"/>
                </div>

                {/*--- Review Cards ---*/}
                <div id="reviewCards">
                    {reviews.length > 0 && reviews.map((field, i) => {
                        let userName = field[1]
                        let starNum = field[6]
                        let title = field[7]
                        let content = field[8]

                        let starArr = []
                        for(let i=0; i<5; i++){
                            (i <= starNum 
                                ? starArr.push("<i class='fa fa-star star-checked'></i>") 
                                : starArr.push("<i class='fa fa-star star-unchecked'></i>")
                            )
                        }
                        return (
                            <div className='card box' key={`reviewCard-${i}`}>
                                <div className='user-container'>
                                    <img src='https://cdn-icons-png.flaticon.com/512/1144/1144760.png'/>
                                    <div className='reviewInfo' key={`reviewInfo-${i}`}>
                                        <h3 key={`reviewInfo-userName-${i}`}>{userName}</h3>
                                        {['1','2','3','4','5'].map((i) => {
                                            let starClass = "fa fa-star " + ( i <= starNum ? "star-checked" : "star-unchecked" )
                                            return (<i className= {starClass} key={`reviewInfo-star${starNum}-${i}`}></i>)
                                        })}
                                        <span className='visuallyHidden' key={`reviewInfo-starNum-${i}`}>{`${starNum} stars`}</span>
                                    </div>
                                </div>
                                <h4 key={`reviewInfo-title-${i}`}>{title}</h4>
                                <p className='review' key={`reviewInfo-content-${i}`}>{content}</p>
                            </div>
                        )
                    })}
                </div>  

                {/*--- Write Cards ---*/}
                <form id="writeReviewForm" className="box">
                    <div className="box">
                        <h4>WRITE A REVIEW</h4>
                        <input id="reviewUserID" type="text" name="reviewUserID"/>
                        <input id="reviewItemID" type="text" name="reviewItemID" />
                        <input id="reviewItemName" type="text" name="reviewItemName"/>
                        <input id="reviewItemURL" type="text" name="reviewItemURL" ></input>
                    
                    
                    <div id="reviewStars">

                        <input type="radio" id="star1" name="reviewRating" value="1" />
                        <label htmlFor="star1" title="text" className="star"> <span className="visuallyHidden">1</span> <i className="fa fa-star fa-lg"></i> </label>

                        <input type="radio" id="star2" name="reviewRating" value="2" />
                        <label htmlFor="star2" title="text" className="star"> <span className="visuallyHidden">2</span> <i className="fa fa-star fa-lg"></i> </label>

                        <input type="radio" id="star3" name="reviewRating" value="3" />
                        <label htmlFor="star3" title="text" className="star"> <span className="visuallyHidden">3</span> <i className="fa fa-star fa-lg"></i> </label>

                        <input type="radio" id="star4" name="reviewRating" value="4" />
                        <label htmlFor="star4" title="text" className="star"> <span className="visuallyHidden">4</span> <i className="fa fa-star fa-lg"></i> </label>

                        <input type="radio" id="star5" name="reviewRating" value="5" />
                        <label htmlFor="star5" title="text" className="star"> <span className="visuallyHidden">5</span> <i className="fa fa-star fa-lg"></i> </label>

                        <span id="reviewStarsText" className="visuallyHidden"></span>
                    </div>

                    <div>
                        <label htmlFor="reviewTitle">Title:</label>
                        <input id="reviewTitle" type="text" name="reviewTitle" placeholder="Enter title..."/>
                    </div>

                    <div>
                        <label htmlFor="reviewContent">Review:</label>
                        <textarea id="reviewContent" name="reviewContent" rows="10" maxLength="1000" placeholder="Write review..."></textarea>
                    </div>

                    <button className="submit" name="reviewWrite" value="reviewWrite" onClick={submitReviewWrite}>Submit</button> 
                    </div> 
                </form>
            </div>
        </>
    )
}

export default Reviews;
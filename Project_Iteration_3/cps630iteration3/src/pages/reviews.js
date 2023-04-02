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
        setupDatabase()
        getItemNames()
        setPageHeight()
        makeStarsGrey()
        makeStarsNotGreyOnChange()
    }, [])

    // -------------------
    // --- Submit Form ---
    // -------------------
    
    function submitReviewSearch() {
        
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
            setReviews(res.data)
            setShowPage(true)
            showElements(true)
        })
        .catch((err) => {
            //setErrorMsg(err.response.statusText)
        })
    }

    function submitReviewWrite(event) {
        event.preventDefault()

        // Get form values
        let reviewRatingDiv = document.querySelector("input[type='radio'][name='reviewRating']:checked")
        let reviewTitleDiv = document.getElementById("reviewTitle")
        let reviewContentDiv = document.getElementById("reviewContent")

        let reviewRating = 0
        if (reviewRatingDiv !== null ) reviewRating = reviewRatingDiv.value

        let reviewTitle = reviewTitleDiv.value
        let reviewContent = reviewContentDiv.value

        // Assure fields are filled
        if ((reviewTitle === "") && (reviewContent === "")) {
            showSuccessMsg(false)
            showErrorMsg(true)
            window.scrollTo(0, 0)
            return
        }

        // Create post request
        const url = "http://localhost/CPS630-Project-Iteration3-PHPScripts/writeReview.php"
        let fdata = new FormData();
        fdata.append('reviewUserID', user.user.id)
        fdata.append('reviewItemID', searchItemID)
        fdata.append('reviewTitle', reviewTitle)
        fdata.append('reviewContent', reviewContent)
        fdata.append('reviewRating', reviewContent)
        fdata.append('reviewRating', reviewRating)

        // Send post request
        axios.post(url, fdata)
        .then(() => {

            // Reset field values
            if (reviewRatingDiv !== null) reviewRatingDiv.checked = false
            reviewTitleDiv.value = ""
            reviewContentDiv.value = ""
            makeStarsGrey()

            // Update reviews
            submitReviewSearch()

            // Show results
            showErrorMsg(false)
            showSuccessMsg(true)
            window.scrollTo(0, 0)

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
        showSuccessMsg(false)
        showErrorMsg(false)
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

    // ------------
    // --- Show ---
    // ------------

    function showElements(show) {
        let elemArr = ["reviewItem", "reviewCards"]
        let display = (show === true ? "block" : "none")
        
        // Show / Hide elments
        elemArr.map( elem => document.getElementById(elem).style.display = display )

        // Show Write Review Form only if logged in
        if (user !== null) document.getElementById("writeReviewForm").style.display = display
    }

    function showSuccessMsg(show) {
        let display = (show === true ? "block" : "none")
        document.getElementById("resultMsg").style.display = display
        document.getElementById("successMsg").style.display = display
    }

    function showErrorMsg(show) {
        let display = (show === true ? "block" : "none")
        document.getElementById("resultMsg").style.display = display
        document.getElementById("errorMsg").style.display = display
    }

    // ------------------------
    // --- Helper Functions ---
    // ------------------------

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

    function getItemNames() {
        const url = "http://localhost/CPS630-Project-Iteration3-PHPScripts/getProducts.php"
        axios.get(url)
        .then(res => {
            let products = res.data
            setItems(products)
        })
        .catch(err => {
            console.log(err)
        })
    }

    function makeStarsGrey() {
        let starLabel = document.querySelectorAll("#reviewStars label")
        starLabel.forEach( star => star.style.color = "lightgray")
    }

    function makeStarsNotGreyOnChange() {
        let starLabel = document.querySelectorAll("#reviewStars label")
        let starBtn = document.querySelectorAll("input[type='radio'][name='reviewRating']")
        
        starBtn.forEach( star => {
            star.addEventListener("change", () => {
                let value = star.value;
                document.getElementById("reviewStarsText").innerHTML = `${value} stars`
    
                starLabel.forEach( star => star.style.color = "")
            })
        } )
    }

    // ------------
    // --- Show ---
    // ------------
    
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
                <div id="reviewSearchForm" className="box">
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
                </div>

                {/*--- Result ---*/}
                <div id="resultMsg" className="box">
                    <div id="successMsg">Your review has been posted.</div>
                    <div id="errorMsg">Please fill all fields to submit a review.</div>
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
                <div id="writeReviewForm">
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
                </div>
            </div>
        </>
    )
}

export default Reviews;
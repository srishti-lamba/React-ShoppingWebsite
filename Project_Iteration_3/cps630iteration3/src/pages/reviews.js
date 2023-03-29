import React, {useState, useEffect } from "react";
import NavBar from "../components/navBar";
import Login from "../components/login";
import { selectUser } from "../features/userSlice";
import { useSelector } from "react-redux";
import axios from "axios";
import ProductCard from "../components/productCard";
import { useNavigate } from "react-router-dom";
import './reviews.css';

const Reviews = ({showLogin, toggleLogin}) => {
    const user = useSelector(selectUser);
    const [searchItem, setSearchItem] = useState("");

    const [reviewUserID, setReviewUserID] = useState("");
    const [reviewItemID, setReviewItemID] = useState("");
    const [reviewTitle, setReviewTitle] = useState("");
    const [reviewContent, setReviewContent] = useState("");
    const [source, setSource] = useState("");
    const [items, setItems] = useState([])
    const [sourceImg, setSourceImg] = useState("");
    const [reviews, setReviews] = useState([])

    const [selectedItemName, setSelectedItemName] = useState("");

    {user !== null && toggleLogin(false)}

    useEffect(() => {
        setupDatabase();

        const url = "http://localhost/CPS630-Project-Iteration3-PHPScripts/getProducts.php"
        axios.get(`${url}?category=%`)
        .then(res => {
            let products = res.data
            setItems(products)
            setSource(JSON.parse(products).productName)
            setItems.append()
        })
        .catch(err => {
            console.log(err)
        })
    }, [])

    document.addEventListener("DOMContentLoaded", () => {
        function setMinHeight() {
            var navHeight = document.getElementById("header").offsetHeight;
            document.getElementById("main-image").css("min-height", window.height() - navHeight);
        };

        window.resize(function () {
            setMinHeight();
        });

        // Form input enter
        document.getElementById("reviewSearchForm").getElementsByTagName("input")[0].bind('keypress keydown keyup', function (e) {
            if (e.keyCode == 13) {
                e.preventDefault();
                submitReviewSearch();
            }
        });
        document.getElementById("writeReviewForm").getElementsByTagName("input")[0].bind('keypress keydown keyup', function (e) {
            if (e.keyCode == 13) {
                e.preventDefault();
            }
        });
        
        // Search check
        document.getElementById('reviewSearchForm').getElementsByTagName("input").blur(function(){
            checkSearchInput();
        });

        // Star rating
        document.getElementById('reviewStars').getElementsByTagName("label").css("color", "lightgray");

        // $("input[type='radio'][name='reviewRating']").change(function () {
        //     let value = this.val();
        //     document.getElementById("reviewStarsText").html(`${value} stars`);
    
        //     document.getElementById("reviewStars").getElementsByTagName("label").css("color", "");
        // });
        
        setMinHeight();
    });

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
    
    function submitReviewSearch(data = "") {
        const url = "http://localhost/CPS630-Project-Iteration3-PHPScripts/getReviews.php";
        let fdata = new FormData();
        fdata.append('searchItem', searchItem)
        console.log(searchItem)
        axios.post(url, fdata)
        .then(res=> {
            setReviews(res.data)
            console.log(res.data)
        })
        .catch((err) => {
            //setErrorMsg(err.response.statusText)
        })
    }

    function submitReviewWrite() {
        if (document.querySelectorAll("input[type='radio'][name='reviewRating']:checked").length === 0 ) {
            document.getElementById("input[type='radio'][name='reviewRating']");
        }
    
        const url = "http://localhost/CPS630-Project-Iteration3-PHPScripts/getReviews.php";
        let fdata = new FormData();
        fdata.append('reviewUserID', reviewUserID)
        fdata.append('reviewItemID', reviewItemID)
        fdata.append('reviewTitle', reviewTitle)
        fdata.append('reviewContent', reviewContent)

        axios.post(url, fdata)
        .catch((err) => {
            //setErrorMsg(err.response.statusText)
        })
    }

    useEffect(() => {
        if (searchItem.length > 0) submitReviewSearch()
    }, [searchItem])

    // --------------------
    // --- Search Check ---
    // --------------------

    function checkSearchInput() {
        var searchVal = document.getElementById('reviewSearchForm').getElementsByClassName("input").val();
        var foundMatch = false;
        document.getElementById('searchItemList').getElementsByClassName("option").each(function(index, domEle) {
            let optionVal = this.val().toLowerCase();
    
            if ( searchVal.toLowerCase() === optionVal.toLowerCase() ) {
                foundMatch = true;
                return false; //break
            }
        });
    
        if (foundMatch === false) {
            document.getElementById('reviewSearchForm').getElementsByClassName("input").val("");
        }
    }    

    // ------------------------
    // --- Fill Information ---
    // ------------------------

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

    function handleSearch(e) {
        setSource(e.target.value)
        for (var i=0; i < items.length; i++) {
            if (e.target.value == JSON.parse(items[i]).productName) {
                setSourceImg(JSON.parse(items[i]).image_url)
            }
        }
        document.getElementById("productImg").style.visibility = "visible"
        setSearchItem(e.target.value)
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
                <form id="reviewSearchForm" className="box" action="./getReviews.php" method="POST">
                    {/* <label htmlFor="searchItemList">Search:</label> */}
                    {/* <input list="searchItemList" name="searchItem" placeholder="Enter item to search..." value={searchItem} onChange={e => setSearchItem(e.target.value)}/> */}

                    <label htmlFor="searchItemList" >Enter item to search....</label>
                    <select className="searchItemList" value={source} onChange={e => {handleSearch(e);}}>
                        {items.map((item, i) => {
                            return(
                                <option key={i}>
                                    {JSON.parse(item).productName}
                                </option>
                            )
                        })}
                    </select>
                    <button type="button" className="reg-button" name="reviewSearch" value="reviewSearch" onClick={submitReviewSearch}>Go</button>
                </form>

                {/*--- Result ---*/}
                <div id="postMsg" className="box">
                <div id="successMsg">Your review has been posted.</div>
                    <div id="errorMsg"></div>
                </div>

                {/*--- Item ---*/}
                <div id="reviewItem" className="box">
                    <h4>{source}</h4>
                    <img id="productImg" src={sourceImg} alt="product"/>
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
                            <div className='card box'>
                                <div className='user-container'>
                                    <img src='https://cdn-icons-png.flaticon.com/512/1144/1144760.png'/>
                                    <div className='reviewInfo'>
                                        <h3>{userName}</h3>
                                        {starArr.length > 0 && starArr.map((field, i) => {
                                            return (<div dangerouslySetInnerHTML={{__html: field}}/>)
                                        })}
                                        <span className='visuallyHidden'>{`${starNum} stars`}</span>
                                    </div>
                                </div>
                                <h4>{title}</h4>
                                <p className='review'>{content}</p>
                            </div>
                        )
                    })}
                </div>  

                {/*--- Write Cards ---*/}
                <form id="writeReviewForm" className="box" action="../phpScripts/getReviews.php" method="POST">
                    <div className="box">
                        <h4>WRITE A REVIEW</h4>
                        <input id="reviewUserID" type="text" name="reviewUserID"/>
                        <input id="reviewItemID" type="text" name="reviewItemID" />
                        <input id="reviewItemName" type="text" name="reviewItemName"/>
                        <input id="reviewItemURL" type="text" name="reviewItemURL" ></input>
                    
                    
                    <div id="reviewStars">
                        <p>Rating:</p>

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

                    <button className="submit" name="reviewWrite" value="reviewWrite" onClick={submitReviewWrite()}>Submit</button> 
                    </div> 
                </form>
            </div>
        </>
    )
}

export default Reviews;
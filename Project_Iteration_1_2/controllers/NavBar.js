$(document).ready(function() {
    $("#username").click(function(){
        $('#errMsg').css({"display": 'none'});
        $('#errMsg2').css({"display": 'none'});
    });
    $("#password").click(function(){
        $('#errMsg').css({"display": 'none'});
        $('#errMsg2').css({"display": 'none'});
    });
    $(".cart").click(function(){
        window.location.href = "./processUserOrder.php";
    });
    $(".sign-up").click(function(){
        window.location.href = "./register.php";
    });
    $(".dbMaintain").mouseleave( function(){
        $(".dbMaintain-options").css("display", "none");
    });
    $(".dbMaintain-btn").mouseenter( function(){
        $(".dbMaintain-options").css("display", "block");
    });
});

// Screen Dim

function toggleOffOverlay(){
    $('#overlay').css({"display": 'none'});
    $('#loginWindow').css({"display": 'none'});
    $('#searchWindow').css({"display": 'none'});
}

// Login

function openLogin() {
    $('#overlay').css({"display": 'block'});
    $('#loginWindow').css({"display": 'block'});
}

function submitLogin(){
    if($("#username").val() == "" || $("#password").val() == ""){
        $('#errMsg2').css({"display": 'block'});
    }
    else{
        $("#loginForm").submit();
    }
}

function displayLoginError(){
    openLogin();
    $('#errMsg').css({"display": 'block'});
}

// Search

function openSearch() {
    $('#overlay').css({"display": 'block'});
    $('#searchWindow').css({"display": 'block'});
}

function submitSearch() {
    $("#searchForm").submit();
}

function displaySearch(resultHtml) {
    openSearch();
    var tableHtml = 
    `<table>
        <thead>
            <tr>
                <th>User ID</th>
                <th>Order ID</th>
                <th>Date</th>
                <th>Total</th>
                <th>Status</th>
            </tr>
        </thead>
        <tbody>`
            + resultHtml +
        `</tbody>
    </table>`;
    $("#searchTable").html(tableHtml);
}

// Dropdown

function toggleDropdown() {
    if ( $(".dbMaintain-options").css("display") == "none" )
        { $(".dbMaintain-options").css("display", "block"); }
    else 
        { $(".dbMaintain-options").css("display", "none"); }
}
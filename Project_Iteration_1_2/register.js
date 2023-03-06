$(document).ready(function() {
    $("#reg-password").keyup(function() {
        comparePasswords($(this).val(), $("#reg-password2").val());
    });
    $("#reg-password2").keyup(function() {
        comparePasswords($("#reg-password").val(), $(this).val());
    });
});

function comparePasswords(password, password2){
    if(!(password===password2)){
        $(".register-err").text("Passwords don't match!");
        $(".register-err").css("display", "block");
        $("#reg-password").css("border", "1px red solid");
        $("#reg-password2").css("border", "1px red solid");
    }
    else{
        $(".register-err").css("display", "none");
        $("#reg-password").css("border", "1px black solid");
        $("#reg-password2").css("border", "1px black solid");
    }
}

function displayErrorMessage(msg){
    $(".register-err").text(msg);
    $(".register-err").css("display", "block");
}

function displayRegisterSuccess(){
    $(".register-success").css("display", "block");
}

function hideRegisterSuccess(){
    $(".register-success").css("display", "none");
}

function validateForm(){
    $(".register-form").submit();
}
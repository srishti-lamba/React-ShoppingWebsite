<?php
    session_start();
    session_destroy();
    //header('Location: ' . $_SERVER['HTTP_REFERER']);
    header('Location: ' . substr($_SERVER['HTTP_REFERER'], 0, strrpos($_SERVER['HTTP_REFERER'], "/")) . '/home.php');
?>
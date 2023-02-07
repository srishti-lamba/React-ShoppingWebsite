<?php 
    session_start();
?>
<!DOCTYPE html>
<html>
<head>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Art Work Database</title>
    <link rel="stylesheet" href="./Lab2-Part1-Team6.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.1/jquery.min.js"></script>
    <script>
        $(document).ready(function() {
            $("#clear").click(function(){
                $("#form").trigger("reset");
            });
        })
    </script>
</head>

<body>
    <header>
        <h1>Art Work Database</h1>
        <p>Description TBD</p>
    </header>
    <?php
        //Creates a session array database called artworks
        require('initalizeArray.php');
        //print_r ($_SESSION['artworks']);
    ?>
    <form id="form" action="./Lab2-Part1-Team6.php" method="post">
        <div style="float:left;">
            <label for="genre">Genre:</label>
            <select name="genre" id="genre">
                <option value="abstract">Abstract</option>
                <option value="baroque">Baroque</option>
                <option value="gothic">Gothic</option>
                <option value="renaissance">Renaissance</option>
            </select>
        </div>

        <div class="left">
            <label for="type">Type:</label>
            <select name="type" id="type">
                <optgroup label="Painting">
                    <option value="landscape">Landscape</option>
                    <option value="portrait">Portrait</option>
                </optgroup>
                <option value="sculpture">Sculpture</option>
            </select>
        </div>

        <div class="left">
            <label for="specification">Specification:</label>
            <select name="specification" id="specification">
                <option value="commercial">Commercial</option>
                <option value="non-commercial">Non-commercial</option>
                <option value="derivative-work">Derivative Work</option>
                <option value="non-derivative-work">Non-Derivative Work</option>
            </select>
        </div>

        <div class="left">
            <label for="year">Year:</label>
            <input name="year" id="year" type="number" class="textbox" value=""/>
        </div>

        <div class="left">
            <label for="museum">Museum:</label>
            <input name="museum" id="museum" type="text" class="textbox" value=""/>
        </div>
        <button type="button" id="clear" class="right">Clear Record</button>
        <button class="right">Save Record</button>
    </form>
</body>
</html>
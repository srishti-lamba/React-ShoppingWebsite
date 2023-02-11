<?php
    
    session_start();
    if(!isset($_SESSION['artworks']) ){
        $_SESSION['artworks'] = array();
    }
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
        <input class="right" type="submit" name="action" value="Clear Record" id="clear"  />
        <input class="right" type="submit" name="action" value="Save Record"/>
    </form>

</body>
</html>

<?php 
    if($_POST['action'] == "Clear Record") {
        $_SESSION['artworks'] = array();
    }
    else if ($_POST['action'] == "Save Record" && isset($_POST['genre'], 
    $_POST['type'], 
    $_POST['specification'],
    $_POST['year'],
    $_POST['museum'])) {
        $newArtwork = [$_POST['genre'], $_POST['type'], $_POST['specification'], $_POST['year'], $_POST['museum']];
        array_push($_SESSION['artworks'], $newArtwork);
        //print_r($_SESSION['artworks']);
        // for($i=0; $i<count($_SESSION['artworks']); $i++){
        //     print_r($_SESSION['artworks'][$i]);
        //     echo "\n";
        // }
    } 

    
?>

<?php
        if(count($_SESSION['artworks']) > 0) {
            echo "<table><tr><th>Genre</th><th>Type</th><th>Specification</th><th>Year</th><th>Museum</th></tr>";
            for($i=0; $i<count($_SESSION['artworks']); $i++){
                echo "<tr><td>".$_SESSION['artworks'][$i][0]."</td><td>".$_SESSION['artworks'][$i][1]."</td><td>".$_SESSION['artworks'][$i][2]."</td><td>".$_SESSION['artworks'][$i][3]."</td><td>".$_SESSION['artworks'][$i][4]."</td></tr>";
            }
            echo "</table>";
        }
        
?>
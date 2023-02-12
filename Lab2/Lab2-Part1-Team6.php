<?php

    class artObject {
        public $genre;
        public $type;
        public $specification;
        public $year;
        public $museum;
        
        function __construct($genre, $type, $specification, $year, $museum){
            $this->genre = $genre;
            $this->type = $type;
            $this->specification = $specification;
            $this->year = $year;
            $this->museum = $museum;
        }
    }
    
    session_start();
    if(!isset($_SESSION['artworks']) ){
        $_SESSION['artworks'] = array();
    }

    if(isset($_POST['action']) && $_POST['action'] == "Clear Records") {
        $_SESSION['artworks'] = array();
    }
    else if (isset($_POST['action'],
            $_POST['genre'], 
            $_POST['type'], 
            $_POST['specification'],
            $_POST['year'],
            $_POST['museum']) && $_POST['action'] == "Save Record" ) {

        $newArtwork = new artObject($_POST['genre'], $_POST['type'], $_POST['specification'], $_POST['year'], $_POST['museum']);
        array_push($_SESSION['artworks'], $newArtwork);
    } 

    $artArray = $_SESSION['artworks'];

?>


<!DOCTYPE html>
<html>
<head>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Art Work Database</title>
    <style>
        <?php include 'Lab2-Part1-Team6.css';?>
    </style>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.1/jquery.min.js"></script>


    <script>
        $(document).ready(function() {
            $("#clear").click(function(){
                $("#form").trigger("reset");
            });
        })
        //Part C forming live record
        function updateLiveRecord(){
            $("#genre-live").text($('#genre').val());
            $("#type-live").text($('#type').val());
            $("#specification-live").text($('#specification').val());
            $('#year-live').text($('#year').val());
            $('#museum-live').text($('#museum').val());
        }
    </script>
</head>

<body>
    <header>
        <h1>Art Work Database</h1>
        <p>Art work database that allows you to store records of abstract, gothic, baroque and Renaissance style paintings and 
            sculptures. The year the art was made and the museum the art can be found can also be included in the record</p>
    </header>
    <form class="form" id="form" action="./Lab2-Part1-Team6.php" method="post">
        <div class="left-side-form">
            <div>
                <label for="genre">Genre:</label>
                <select name="genre" id="genre" onchange="updateLiveRecord();">
                    <option value="abstract">Abstract</option>
                    <option value="baroque">Baroque</option>
                    <option value="gothic">Gothic</option>
                    <option value="renaissance">Renaissance</option>
                </select>
            </div>

            <div>
                <label for="type">Type:</label>
                <select name="type" id="type" onchange="updateLiveRecord();">
                    <optgroup label="Painting">
                        <option value="landscape">Landscape</option>
                        <option value="portrait">Portrait</option>
                    </optgroup>
                    <option value="sculpture">Sculpture</option>
                </select>
            </div>

            <div>
                <label for="specification">Specification:</label>
                <select name="specification" id="specification" onchange="updateLiveRecord();">
                    <option value="commercial">Commercial</option>
                    <option value="non-commercial">Non-commercial</option>
                    <option value="derivative-work">Derivative Work</option>
                    <option value="non-derivative-work">Non-Derivative Work</option>
                </select>
            </div>

            <div>
                <label for="year">Year:</label>
                <input name="year" id="year" type="number" class="textbox" value="" onkeyup="updateLiveRecord()"/>
            </div>

            <div>
                <label for="museum">Museum:</label>
                <input name="museum" id="museum" type="text" class="textbox" value="" onkeyup="updateLiveRecord()"/>
                
            </div>
            <input class="form-button" type="button" id="clear" value="Clear Form" />
        </div>

        <div class="right-side-form">
            <input class="form-button" type="submit" name="action" value="Clear Records" />
            <input class="form-button" type="submit" name="action" value="Save Record"/>
        </div>
    </form>

    
    <div>
        <h3>Based off your current inputs here is the record that will be submitted to the database:</h3>
        <table>
            <tr>
                <th>Index</th>
                <th>Genre</th>
                <th>Type</th>
                <th>Specification</th>
                <th>Year</th>
                <th>Museum</th>
            </tr>
            <tr>
                <td><?php echo count($artArray);?></td>
                <td id="genre-live">abstract</td>
                <td id="type-live">landscape</td>
                <td id="specification-live">commercial</td>
                <td id="year-live"></td>
                <td id="museum-live"></td>
            </tr>
        </table>
    </div>

    <div>

    <?php
        
        if(count($artArray) > 0){
            echo "<h3>Saved Records:</h3>";
            echo "<table><tr><th>Index</th><th>Genre</th><th>Type</th><th>Specification</th><th>Year</th><th>Museum</th></tr>";
            for ($x = 0; $x < count($artArray); $x++) {
                $artWork = $artArray[$x];
                echo "<tr>";
                echo "<td>$x</td>";
                echo "<td>"; echo $artWork->genre; echo "</td>";
                echo "<td>"; echo $artWork->type; echo "</td>";
                echo "<td>"; echo $artWork->specification; echo "</td>";
                echo "<td>"; echo $artWork->year; echo "</td>";
                echo "<td>"; echo $artWork->museum; echo "</td>";
                echo "</tr>";
            }

            echo "</table>";
        }
    ?>

    </div>
    
    
</body>
</html>
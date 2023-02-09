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
    //start sessions
    session_start();
    //Create array database of artObjects with empty dummy records
    if(!isset($_SESSION['artworks'])){
        $art1 = new artObject("Gothic", "LandScape","Commercial","1978","Basel Museum");
        $art2 = new artObject("Abstract", "Portrait","Non-Derivative Work","1990","Kon-Tiki Museum");
        $art3 = new artObject("Baroque", "Sculpture","Derivative Work","1780","Frietmuseum");
        $artworks = array();
        array_push($artworks, $art1, $art2, $art3);
        $_SESSION['artworks'] = $artworks;
    }
    
    //If all post parameters are set, update array database (save record)
    if (isset($_POST['genre'], 
              $_POST['type'], 
              $_POST['specification'],
              $_POST['year'],
              $_POST['museum'])) {
        $art = new artObject($_POST['genre'], $_POST['type'], $_POST['specification'], $_POST['year'], $_POST['museum']);
        array_push($_SESSION['artworks'], $art);
    }
    
?>

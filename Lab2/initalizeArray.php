<?php
    class artObject {
        public $genre;
        public $type;
        public $specification;
        public $year;
        public $museum;
    }
    //Create array database of artObjects with empty dummy records
    if(!isset($_SESSION['artworks'])){
        $artworks = array();
        $art1 = new artObject();
        $art2 = new artObject();
        $art3 = new artObject();
        array_push($artworks, $art1, $art2, $art3);
        $_SESSION['artworks'] = $artworks;
    }
    
    //If all post parameters are set, update array database (save record)
    if (isset($_POST['genre'], 
              $_POST['type'], 
              $_POST['specification'],
              $_POST['year'],
              $_POST['museum'])) {
        $art = new artObject();
        $art -> genre = $_POST['genre'];
        $art -> type = $_POST['type'];
        $art -> specification = $_POST['specification'];
        $art -> year = $_POST['year'];
        $art -> museum = $_POST['museum'];
        array_push($_SESSION['artworks'], $art);
    }
    
?>

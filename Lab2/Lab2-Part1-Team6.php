<head>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Art Work Database</title>
    <link rel="stylesheet" href="./styles.css">
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

    <h1>Art Work Database</h1>
    <p>Description TBD</p>

    <form id="form">
    <div style="float:left;">
        <label for="genre">Genre:</label>
        <select name="genre" id="genre">
            <option value="0">Abstract</option>
            <option value="1">Baroque</option>
            <option value="2">Gothic</option>
            <option value="3">Renaissance</option>
        </select>
    </div>

    <div style="float:left;">
        <label for="type">Type:</label>
        <select name="type" id="type">
            <optgroup label="Painting">
                <option value="0">Landscape</option>
                <option value="1">Portrait</option>
            </optgroup>
            <option value="2">Sculpture</option>
        </select>
    </div>

    <div style="float:left;">
        <label for="specification">Specification:</label>
        <select name="specification" id="specification">
            <option value="0">Commercial</option>
            <option value="1">Non-commercial</option>
            <option value="2">Derivative Work</option>
            <option value="3">Non-Derivative Work</option>
        </select>
    </div>

    <div style="float:left;">
        <label for="year">Year:</label>
        <input name="year" id="year" type="text" class="textbox" value=""/>
    </div>

    <div style="float:left;">
        <label for="museum">Museum:</label>
        <input name="museum" id="museum" type="text" class="textbox" value=""/>
        <button type="button" id="clear">Clear Record</button>
        <button type="button" >Save Record</button>
    </div>
    </form>

</body>
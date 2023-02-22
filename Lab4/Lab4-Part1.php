<!DOCTYPE html>
<head>
    <TITLE>how to detect browser using PHP </TITLE>
</head>
<body>
    <h1> Display Cross Browsers Compatibility Issues line1</h1>
    <p> Display Cross Browsers Compatibility Issues line2</p>

    <?php
        echo " Trying to detect Browser name! . <br/>";
        function brdetect( )
        {
            $res = $_SERVER['HTTP_USER_AGENT'];
            echo $res . "<br/><br/>";

            if ( strpos ($res, "Chrome") == true)
                echo "Browser: Google Chrome";
            else if ( strpos ($res, "Firefox") == true)
                echo "Browser: Firefox";
            else if ( strpos ($res, "Trident") == true)
                echo "Browser: Internet Explorer";
            else echo "Browser: unkown";
        }
        brdetect( );
    ?>

</body>
</html>
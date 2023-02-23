<!DOCTYPE html>
<head>
    <TITLE>How to detect browser using PHP </TITLE>
    <link rel="stylesheet" href="Lab4-Team6.css">
</head>
<body>
    <h1> Display Cross Browsers Compatibility Issues - PHP Method</h1>
    <p> This page utilizes $_SERVER['HTTP_USER_AGENT'] in PHP to detect the browser.</p>

    <?php
        echo " Trying to detect Browser name! <br/><br/>";
        function brdetect( )
        {
            $res = $_SERVER['HTTP_USER_AGENT'];
            echo $res . "<br/><br/>";

            if ( strpos ($res, "Trident") || strpos ($res, "MSIE") || strpos ($res, "IE"))
                echo "Browser: Internet Explorer";
            else if ( strpos ($res, "Edg"))
                echo "Browser: Microsoft Edge";
            else if ( strpos ($res, "Chrome"))
                echo "Browser: Google Chrome";
            else if ( strpos ($res, "Firefox"))
                echo "Browser: Firefox";
            else if ( strpos ($res, "Safari"))
                echo "Browser: Safari";
            else echo "Browser: unknown";
        }
        brdetect( );
    ?>

</body>
</html>
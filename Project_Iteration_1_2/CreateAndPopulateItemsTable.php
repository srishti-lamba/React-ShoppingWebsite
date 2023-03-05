<?php
    $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = "mysql";

    $conn = new mysqli($servername, $username, $password, $dbname);

    $query = "CREATE TABLE Item(
        Item_id int(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        productName varchar(50) NOT NULL,
        Price float(2) not null,
        category varchar(20) not null,
        made_in varchar(20) not null,
        department_code int(2) not null,
        image_url varchar(512) not null);";
    

    $query2 = "insert into item (productName, price, category, made_in, department_code, image_url) values ('Sofa', 700, 'Living Room', 'Canada', 1, 'https://cdn.shopify.com/s/files/1/2660/5106/products/Hi_Res_JPEG-Ava_58D35050_Sofa_3Q_b3f9ae86-16d9-41b0-8502-cde2693f5df0_medium.progressive.jpg?v=1663774964');";
    $query3 = "insert into item (productName, price, category, made_in, department_code, image_url) values ('HEMNES Coffee Table', 249.00, 'Living Room', 'China', 1, 'https://www.ikea.com/ca/en/images/products/hemnes-coffee-table-black-brown__0837153_pe601368_s5.jpg')";
    $query4 = "insert into item (productName, price, category, made_in, department_code, image_url) values ('BRIMNES TV Bench', 199.00, 'Living Room', 'China', 1, 'https://www.ikea.com/ca/en/images/products/brimnes-tv-bench-black__0851278_pe725293_s5.jpg')";
    $query5 = "insert into item (productName, price, category, made_in, department_code, image_url) values ('GLOSTAD Loveseat', 249.00, 'Living Room', 'United States', 1, 'https://www.ikea.com/ca/en/images/products/glostad-loveseat-knisa-medium-blue__0987359_pe817504_s5.jpg')";
    $query6 = "insert into item (productName, price, category, made_in, department_code, image_url) values ('MALM Pull Up Storage Bed', 699.00, 'Bedroom', 'China', 1, 'https://www.ikea.com/ca/en/images/products/malm-pull-up-storage-bed-black-brown__1154402_pe886049_s5.jpg?f=s')";
    $query7 = "insert into item (productName, price, category, made_in, department_code, image_url) values ('HEMNES Nightstand', 79.00, 'Bedroom', 'China', 1, 'https://www.ikea.com/ca/en/images/products/hemnes-nightstand-white-stain__0380136_pe555081_s5.jpg?f=s')";
    $query8 = "insert into item (productName, price, category, made_in, department_code, image_url) values ('MALM 6-Drawer Dresser', 279.00, 'Bedroom', 'China', 1, 'https://www.ikea.com/ca/en/images/products/malm-6-drawer-dresser-black-brown__1154387_pe886016_s5.jpg?f=s')";
    $query9 = "insert into item (productName, price, category, made_in, department_code, image_url) values ('Beauty4U Full Length Mirror Floor Mirror', 246.61, 'Bedroom', 'China', 1, 'https://m.media-amazon.com/images/I/71zbt32XAJL._AC_SL1500_.jpg')";
    $query10 = "insert into item (productName, price, category, made_in, department_code, image_url) values ('Rustic Farmhouse Dinning Room Table', 1500.00, 'Dining Room', 'Canada', 1, 'https://i.etsystatic.com/12628434/r/il/da97f3/3300346963/il_fullxfull.3300346963_scc6.jpg')";
    $query11 = "insert into item (productName, price, category, made_in, department_code, image_url) values ('LOMMARP Cabinet With Glass Doors', 549.00, 'Dining Room', 'United States', 1, 'https://www.ikea.com/ca/en/images/products/lommarp-cabinet-with-glass-doors-dark-blue-green__0740569_pe742075_s5.jpg')";
    $query12 = "insert into item (productName, price, category, made_in, department_code, image_url) values ('KURA Reversible Bed', 299.00, 'Kids Room', 'China', 1, 'https://www.ikea.com/ca/en/images/products/kura-reversible-bed-white-pine__0937447_pe793736_s5.jpg')";
    $query13 = "insert into item (productName, price, category, made_in, department_code, image_url) values ('Kids Desk', 749.99, 'Kids Room', 'China', 1, 'https://secure.img1-cg.wfcdn.com/im/62817136/resize-h600-w600%5Ecompr-r85/1355/135550686/Guidecraft+Taiga+44%22+W+Kids+Desk+with+Hutch+and+Chair+Set.jpg')";
    $query14 = "insert into item (productName, price, category, made_in, department_code, image_url) values ('SEDETA Home Office Desk', 651.88, 'Home Office', 'China', 1, 'https://m.media-amazon.com/images/I/81WFP8Ys8ZL._AC_SL1500_.jpg')";
    $query15 = "insert into item (productName, price, category, made_in, department_code, image_url) values ('XUER Ergonomic Office Chair', 150.00, 'Home Office', 'China', 1, 'https://m.media-amazon.com/images/I/81KGPhfAC3L._AC_SX466_.jpg')";
    $query16 = "insert into item (productName, price, category, made_in, department_code, image_url) values ('HSH Solid Wood Bookshelf', 549.82, 'Home Office', 'China', 1, 'https://m.media-amazon.com/images/I/71tq-TnCm0S._AC_SL1200_.jpg')";
    try {
        mysqli_query($conn, $query);
        $conn-> query($query2);
        $conn-> query($query3);
        $conn-> query($query4);
        $conn-> query($query5);
        $conn-> query($query6);
        $conn-> query($query7);
        $conn-> query($query8);
        $conn-> query($query9);
        $conn-> query($query10);
        $conn-> query($query11);
        $conn-> query($query12);
        $conn-> query($query13);
        $conn-> query($query14);
        $conn-> query($query15);
        $conn-> query($query16);
        echo "Query executed successfully";
    } 
    catch(mysqli_sql_exception $exception) {
    }
?>
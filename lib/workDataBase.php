<?php
    $mysqli = @new mysqli('localhost', 'root', '', 'onlineShop');
    if($mysqli->connect_errno) exit('Ошибка соединения с БД');
    $mysqli->set_charset('utf-8');

    if(isset($_POST['v'])) {
        if($_POST['v'] == null){
            $result = $mysqli->query("SELECT * FROM `categories`");
            $cats = [];
            while(($row = $result->fetch_assoc()) != false)
                $cats[] = $row;
            $result = $mysqli->query("SELECT * FROM `products`");
            $products = [];
            while(($row = $result->fetch_assoc()) != false)
                $products[] = $row;
            $data = count($cats) && count($products) ? array('categories' => $cats, 'products' => $products) : array('error' => 'Нету категорий или продуктов!');
            echo json_encode($data);
        }
    }
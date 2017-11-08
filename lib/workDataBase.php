<?php

    $mysqli = @new mysqli("DB_HOST", "DB_USER", "DB_PASSWORD", "DB_NAME");
    if($mysqli->connect_errno) exit("Ошибка соединения с БД");
    $mysqli->set_charset("DB_CHARSET");

    if(isset($_POST['v'])) {
        if($_POST['v'] == 'null'){
            //$result = $mysqli->query("SELECT `id`, `name`, `cat`, `age`, `about`, `image`, `count`, `boss_count` FROM `kap_add_people` WHERE `accept` = '".$_GET['select_people_admin']."' ORDER BY `count` DESC ");
            return array('result', 'okey');
        }
    }
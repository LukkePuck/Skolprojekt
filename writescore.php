<?php
$v = $_GET['score'];
echo "$v";
$db = new PDO("mysql:host=localhost;dbname={$dbprefix}PROJEKT;charset=utf8",
    $username, $password);
    
?>
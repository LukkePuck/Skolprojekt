<?php
include '../config.php';
$db = new PDO("mysql:host=localhost;dbname={$dbprefix}PROJEKT;charset=utf8",
    $username, $password);
$v = $_GET['score'];
echo "$v";
    
?>
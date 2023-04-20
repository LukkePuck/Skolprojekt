<?php
session_start();
include '../config.php';
$db = new PDO("mysql:host=localhost;dbname={$dbprefix}PROJEKT;charset=utf8",
    $username, $password);

    $user = $_SESSION['user'];
    
    $value = $_POST['value'];
// Code to insert $value into the database


    $sql = "INSERT INTO Score (username,score) VALUES('$user','$value')";
    $ps = $db->prepare($sql);
    $ps->execute();
?>
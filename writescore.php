<?php
session_start();
include '../config.php';
$db = new PDO("mysql:host=localhost;dbname={$dbprefix}PROJEKT;charset=utf8",
    $username, $password);
$scorechecker = 0;
    $user = $_SESSION['user'];
    $score = $_GET['score'];
    // $value = $_POST['value'];
    // if ($value == null) {
    //     $value = 0;
    //     }

    // echo '<h1>welcome ' . $_SESSION['user'] . '</h1>';
    
    // echo '<h1>Your points are ' . $score . '</h1>';
if ($scorechecker == 0){

    $sql = "INSERT INTO Score (username,score) VALUES('$user','$score')";
    $ps = $db->prepare($sql);
    $ps->execute();
    $scorechecker += 1;
}
?>
<?php
session_start();
include '../config.php';
$db = new PDO("mysql:host=localhost;dbname={$dbprefix}PROJEKT;charset=utf8",
    $username, $password);
<<<<<<< HEAD
$scorechecker = 0;
=======

>>>>>>> 7e7f9ba244f1892f3516f2b5ad76e81ffe3bfb34
    $user = $_SESSION['user'];
    $score = $_GET['score'];
    // $value = $_POST['value'];
    // if ($value == null) {
    //     $value = 0;
    //     }

    // echo '<h1>welcome ' . $_SESSION['user'] . '</h1>';
<<<<<<< HEAD
    
    // echo '<h1>Your points are ' . $score . '</h1>';
if ($scorechecker == 0){
=======
    // echo '<h1>Your points are ' . $value . '</h1>';

>>>>>>> 7e7f9ba244f1892f3516f2b5ad76e81ffe3bfb34

    $sql = "INSERT INTO Score (username,score) VALUES('$user','$score')";
    $ps = $db->prepare($sql);
    $ps->execute();
<<<<<<< HEAD
    $scorechecker += 1;
}
=======
>>>>>>> 7e7f9ba244f1892f3516f2b5ad76e81ffe3bfb34
?>
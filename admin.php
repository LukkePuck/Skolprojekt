<?php
session_start();
include '../config.php';
$db = new PDO("mysql:host=localhost;dbname={$dbprefix}PROJEKT;charset=utf8",
    $username, $password);

if (isset($_POST['home'])){
header("location: index.php");
}
if (isset($_POST['nytt'])){
    $user = $_POST['user'];
    $pass = $_POST['pass'];
    $sql = "INSERT INTO username (username,passw,poäng,totalpoints,toppoints) VALUES('$user','$pass','0','0','0')";
    
    echo "Data added successfully.";
    }
    
            
    
    






    

?>






<!DOCTYPE html>
<html lang="sv">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin</title>
</head>
<body>
    <form method='post'>
        <label for="user">Användarnamn</label>
        <br>
        <input name='user' ></input>
        <br>
        <label for='pass'>lösenord</label>
        <br>
        <input type='pass' name='pass'></input>
        <br>
        <button name='nytt' >Skapa nytt konto</button>
        <br>
        <button type="home" name="home">Ångra</button>
    </form>
</body>
</html>
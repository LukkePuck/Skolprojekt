<?php 
session_start();
include '../config.php';
if (isset($_POST['submit'])){
    if ($_POST['pass']=="1234"){
        $_SESSION['username'] =$_POST['user'];
        $_SESSION['L']=true;
        header("location: hub.php");
        exit();
    }
}
if (isset($_POST['nytt'])){
    header("location: admin.php");
}





?>
<html>
    <head>
<title>Projekt</title>
    </head>
    <body>
    <form method="post">
        <label for="user">Användarnamn</label>
        <br>
        <input type="text" name="user">
        <br>
        <label for="pass">Lösenord:</label>
        <br>
        <input type="password" name="pass">
        <br>
        <button type=submit name="submit">Logga in</button>
        <br>
        <button type=submit name="nytt">Skapa nytt konto</button>

    </body>
</html>
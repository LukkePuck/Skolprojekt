<?php 
session_start();
if (isset($_POST['submit'])){
    if ($_POST['pass']=="1234"){
        $_SESSION['username'] =$_POST['user'];
        $_SESSION['L']=true;
        header("location: homepage.php");
        exit();
    }
}

include '../config.php';




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

    </body>
</html>
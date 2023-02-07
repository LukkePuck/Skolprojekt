<?php
session_start();
    if (isset($_POST['home'])){
    header("location: index.php");
    }


?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin</title>
</head>
<body>
    <form method="post">
        <label for="user">Användarnamn</label>
        <br>
        <input type="text" name="user"  ></input>
        <br>
        <label for="pass">lösenord</label>
        <br>
        <input type="password" name="pass"></input>
        <br>
        <button type="nytt" name="nytt">Skapa nytt konto</button>
        <br>
        <button type="home" name="home">Ångra</button>
    </form>
</body>
</html>
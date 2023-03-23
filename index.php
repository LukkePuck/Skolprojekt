<?php 
session_start();
include '../config.php';
$db = new PDO("mysql:host=localhost;dbname={$dbprefix}PROJEKT;charset=utf8",
    $username, $password);

    if (isset($_POST['submit'])){
        $user = $_POST['user'];
        $pass = $_POST['pass'];
        $_SESSION['user']= $user;

    $sql = "SELECT * FROM username WHERE username='$user' AND password='$pass'";
    $ps = $db->prepare($sql);
    $ps->execute();

    if ($ps->fetch()){    

        echo "login Successful";
        header("location: hub.php");
        exit();
    }
    else {
        echo "login failed";
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
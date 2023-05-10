<?php 
session_start();
include '../config.php';
$db = new PDO("mysql:host=localhost;dbname={$dbprefix}PROJEKT;charset=utf8",
    $username, $password);

    if (isset($_POST['submit'])){
        $user = $_POST['user'];
        $pass = $_POST['pass'];
        $_SESSION['user'] = $user;

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
<link rel="stylesheet" href="index.css">
    </head>
    <body>
        <div>
            <H1>Lucas Och Leos Webbplats</H1>
            <form method="post">
            <div class="button">
                <div class="button">

                    <label for="user" class="text">Användarnamn</label>
                    <br>
                    <input type="text" name="user">
                </div>
                <div class="button">
                    <label for="pass" class="text">Lösenord:</label>
                    <br>
                    <input type="password" name="pass">
                </div>
                <button type=submit name="submit">Logga in</button>            
                <button type=submit name="nytt">Skapa nytt konto</button>
            </div>
        </div>

    </body>
</html>
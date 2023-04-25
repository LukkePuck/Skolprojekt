<!DOCTYPE html>
<?php
session_start();



if (isset($_POST['submit'])){
header("location: homepage.php");
exit();
}

?>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>HUB</title>
    <link rel="stylesheet" href="hub.css">
</head>
<body>
    <?php
    echo '<h1> Welcome ' . $_SESSION['user'] . '</h1>';
    echo '<h1> Your points are '.$value .'</h1>';
    ?>
    <form method="post"> 
    <button id="knapp" type=submit name="submit">Spelsidan</button>
    </form>
</body>
</html>
<!DOCTYPE html>
<?php
session_start();
include '../config.php';
$db = new PDO("mysql:host=localhost;dbname={$dbprefix}PROJEKT;charset=utf8",
    $username, $password);
$sql = "SELECT * FROM score WHERE username='$username'";
$ps = $db->prepare($sql);
$ps->execute();

while ($row = $ps->fetch()) {
    $_GET['user'] = $row['username'];
    $score = $row['score'];

    echo "$username  $score";
}

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
<<<<<<< HEAD
=======
    echo '<h1> Your points are '.$value .'</h1>';
>>>>>>> 7e7f9ba244f1892f3516f2b5ad76e81ffe3bfb34
    ?>
    <form method="post"> 
    <button id="knapp" type=submit name="submit">Spelsidan</button>
    </form>
</body>
</html>
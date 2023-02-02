<?php
$v = $_GET['score'];

if (strlen($v) > 0) {
    echo "Hej $v!";
} else {
    echo "Hej du okände!";
}
$db = new PDO("mysql:host=localhost;dbname={$dbprefix}PROJEKT;charset=utf8",
    $username, $password);
    INSERT INTO `username` (`användare`, `lösenord`, `poäng`, `totalpoäng`, `toppoäng`) VALUES ('Leo', '1234', '0', '0', '0');
?>
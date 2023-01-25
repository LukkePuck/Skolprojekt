<?php
$v = $_GET['score'];

if (strlen($v) > 0) {
    echo "Hej $v!";
} else {
    echo "Hej du okände!";
}
?>
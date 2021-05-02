<?php

include_once "../config.php";

// variabili valorizzate tramite POST
$username = $_POST['username'];
$password = $_POST['password'];
$psw_hashed = password_hash($password, PASSWORD_DEFAULT);
// password_verify($password, $psw_hashed)

// query di inserimento preparata
$sql = "INSERT INTO operatore_sanitario (username, password, id_presidio) VALUES ($username, $psw_hashed, 1)";

$pdo->query($sql);

?>

<!DOCTYPE html>
<html>
<head>
    <title>Prenotazione</title>
    <link rel="stylesheet" href="../style.css">
</head>
<body>
<h1>Pagina operatore temp</h1>
registrazione avvenuta con successo
</div>
</body>
</html>

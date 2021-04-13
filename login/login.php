<?php
require '../vendor/autoload.php';
include_once "../config.php";

use League\Plates\Engine;

//Viene creato l'oggetto per la gestione dei template
$templates = new Engine('../view','tpl');

// variabili valorizzate tramite POST
$username = $_POST['username'];
$password = $_POST['password'];
// password_verify($password, $psw_hashed)

// query di inserimento preparata
$sql = "SELECT * FROM utenti WHERE username = '$username'";

$stmt = $pdo->query($sql);

$riga = $stmt->fetch();

if ($riga == false) {
    echo $templates->render('login_fallito', ['username' => $username]);
}
else {
    $pass_hash = $riga['password'];

    // la password è corretta
    if (password_verify($password, $pass_hash)) {
        $_SESSION['username'] = $username;
        echo $templates->render('login_effettuato', ['username' => $username]);
    }
    //la password è sbagliata
    else {
        echo $templates->render('login_fallito', ['username' => $username]);
    }
}

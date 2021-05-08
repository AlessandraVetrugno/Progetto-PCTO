<?php

include_once "../config.php";

// variabili valorizzate tramite POST
$password = $_POST['password'];
$id_presidio = $_POST['id_presidio'];
$psw_hashed = password_hash($password, PASSWORD_DEFAULT);
$codice = strtoupper(uniqid());
// password_verify($password, $psw_hashed)

// query di inserimento preparata
$sql = "INSERT INTO operatore_sanitario (codice, password, id_presidio) VALUES (:codice, :password, :id_presidio)";

$stmt = $pdo->prepare($sql);
$stmt->execute([
   'codice' => $codice,
   'password'=> $psw_hashed,
   'id_presidio'=>$id_presidio
]);


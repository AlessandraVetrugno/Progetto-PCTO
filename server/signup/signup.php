<?php

include_once "../config.php";

$dati = file_get_contents("php://input");
$dati = json_decode($dati, true);

// variabili valorizzate tramite POST
$id_presidio = $dati['id_presidio'];
$ruolo = $dati['ruolo'];
$password = '';
if($ruolo == 'operatore_sanitario'){
    $password = strtoupper(uniqid('OPER_'));
    $sql = "INSERT INTO operatore_sanitario (codice, password, id_presidio)
        VALUES (:codice, :password, :id_presidio)";
    $stmt = $pdo->prepare($sql);
} else if($ruolo == 'amministratore_presidio'){
    $password = strtoupper(uniqid('ADMIN_'));
    $sql = "INSERT INTO amministratore_presidio (codice, password, id_presidio)
        VALUES (:codice, :password, :id_presidio)";
    $stmt = $pdo->prepare($sql);
}
$psw_hashed = password_hash($password, PASSWORD_DEFAULT);
$codice = strtoupper(substr(uniqid(), 0,-2));

// query di inserimento preparata

$stmt->execute([
   'codice' => $codice,
   'password'=> $psw_hashed,
   'id_presidio'=>$id_presidio
]);


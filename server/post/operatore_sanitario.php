<?php

include_once '../config.php';

$response = array();
$response['status'] = 0;

$sql = 'INSERT INTO operatore_sanitario (codice, password, id_presidio) VALUES (:codice, :password, :id_presidio)';

$stmt = $pdo->prepare($sql);

$dati = file_get_contents("php://input");
$dati = json_decode($dati, true);

$id_presidio = $dati['presidio'];

// genero un codice utente, lo riduco ad una stringa di 11 caratteri (13 => 11) e
// la imposto al maiuscolo
$codice = strtoupper(substr(uniqid(), 0,-2));

// genero la password
$password = uniqid();

$pass_hash = password_hash($password, PASSWORD_DEFAULT);
$stmt->execute([
    'codice' => $codice,
    'password' => $pass_hash,
    'id_presidio' => $id_presidio
]);

$stmt_dati = $pdo->query("SELECT * FROM operatore_sanitario WHERE codice = '$codice'");
$dati_operatore_sanitario = $stmt_dati->fetch(PDO::FETCH_ASSOC);

if ($dati_operatore_sanitario != null){
    $dati = [];
    $dati['password'] = $password;
    $dati['codice'] = $dati_operatore_sanitario['codice'];

    $response['status'] = 1;
    $response['dati'] = $dati;
}

echo json_encode($response);
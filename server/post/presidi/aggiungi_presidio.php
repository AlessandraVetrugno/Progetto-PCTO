<?php

include_once '../../config.php';

$response = array();
$response['status'] = 0;

$sql = 'INSERT INTO presidio (nome, id_provincia) VALUES (:nome, :id_provincia)';

$sql_admin = 'INSERT INTO amministratore_presidio (codice, password, id_presidio) VALUES (:codice, :password, :id_presidio)';

$stmt = $pdo -> prepare($sql);
$stmt_admin = $pdo -> prepare($sql_admin);

$dati = file_get_contents("php://input");
$dati = json_decode($dati, true);

$id_provincia = $dati['provincia'];
$nome_presidio = $dati['presidio'];
//$indirizzo = $dati['indirizzo'];

$stmt ->execute([
    'nome' => $nome_presidio,
    'id_provincia' => $id_provincia
]);

$presidio = $pdo -> query("SELECT * FROM presidio WHERE nome = '$nome_presidio'");
$presidio = $presidio -> fetch(PDO::FETCH_ASSOC);
if($presidio != null){

    // genero un codice utente, lo riduco ad una stringa di 11 caratteri (13 => 11) e
    // la imposto al maiuscolo
    $codice = strtoupper(substr(uniqid(), 0,-2));

    // genero la password
    $password = uniqid();

    $id_presidio = $presidio['id'];
    $pass_hash = password_hash($password, PASSWORD_DEFAULT);
    $stmt_admin->execute([
        'codice' => $codice,
        'password' => $pass_hash,
        'id_presidio' => $id_presidio
    ]);

    $stmt_dati = $pdo->query("SELECT * FROM amministratore_presidio WHERE codice = '$codice'");
    $dati_amministratore_presidio = $stmt_dati->fetch(PDO::FETCH_ASSOC);

    if ($dati_amministratore_presidio != null){
        $dati = [];
        $dati['password'] = $password;
        $dati['codice'] = $dati_amministratore_presidio['codice'];
        $dati['presidio'] = $presidio;

        $result['status'] = 1;
        $result['dati'] = $dati;
    }
}

echo json_encode($result);
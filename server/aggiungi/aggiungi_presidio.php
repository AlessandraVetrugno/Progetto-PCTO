<?php

include_once '../config.php';

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
$presidio->fetch(PDO::FETCH_ASSOC);
if($presidio != null){

    $codice = strtoupper(uniqid());
    $password = vstrtoupper(uniqid());
    $id_presidio = $presidio['id'];
    $pass_hash = password_hash('ADMIN_'.$password, PASSWORD_DEFAULT);
    $stmt_admin -> execute([
        'codice' => $codice,
        'password' => $pass_hash,
        'id_presidio' => $id_presidio
    ]);
    $stmt_dati = $pdo -> query("SELECT * FROM amministratore_presidio WHERE codice = '$codice'");
    $stmt_dati->fetch(PDO::FETCH_ASSOC);

    if($stmt_dati != null){
        $response['status'] = 1;
        $response['dati'] = $stmt_dati;
    }
}

echo json_encode($response);
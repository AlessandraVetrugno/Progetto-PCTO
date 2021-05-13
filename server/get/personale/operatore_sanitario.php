<?php
include_once '../../config.php';

$response = array();
$response['status'] = 0;

$req_data = $_GET;
//prendo il codice dell'operatore dall'array get
$codice = $req_data['codice'];

$sql = 'SELECT * FROM amministratore_presidio WHERE amministratore_presidio.codice = :codice';

//preparo la query
$stmt = $pdo->prepare($sql);

//eseguo la query
$stmt->execute(['codice'=>$codice]);
$dati = $stmt->fetch(PDO::FETCH_ASSOC);

if($dati != null){
    $response['dati'] = $dati;
    $response['status'] = 1;
}

echo json_encode($response);


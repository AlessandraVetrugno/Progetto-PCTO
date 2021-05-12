<?php

include_once '../config.php';

$response = array();
$response['status'] = 0;
$dati = null;

$req_data = $_GET;
//prende il nome della regione dal vettore get
$nome_regione = $_GET['regione'];

$sql = 'SELECT regione.nome FROM regione';

//preparo la query
$stmt = $pdo -> prepare($sql);

//eseguo la query
$stmt->execute([
    'nome_regione'=>$nome_regione
]);

$dati = $stmt->fetch(PDO::FETCH_ASSOC);

if($dati != null){
    $response['dati'] = $dati;
    $response['status'] = 1;
}

echo json_encode($response);

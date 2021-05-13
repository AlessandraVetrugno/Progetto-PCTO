<?php

include_once '../../config.php';

$response = array();
$response['status'] = 0;
$dati = null;

$req_data = $_GET;
//prendo il nome della provincia e della regione dal vettore get
$nome_regione = $_GET['regione'];

//esegui se la regione non è specificata
if($nome_regione == null){
     $sql = 'SELECT provincia.nome FROM provincia';

     //preparo la query
     $stmt = $pdo -> query($sql);
     $dati = $stmt->fetch(PDO::FETCH_ASSOC);

     //esegui se la regione è specificata
 } else {

     $sql = 'SELECT provincia.nome FROM provincia, regione 
             WHERE provincia.id_regione = regione.id AND regione.nome = :nome_regione';
     $stmt = $pdo->prepare($sql);

     $stmt->execute([
         'nome_regione' => $nome_regione
     ]);

    $dati = $stmt->fetch(PDO::FETCH_ASSOC);
 }

if ($dati != null){
    $response['dati'] = $dati;
    $response['status'] = 1;
}

echo json_encode($response);
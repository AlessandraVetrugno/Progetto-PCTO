<?php
include_once '../config.php';

$response = array();
$response['status'] = 0;

$nome_presidio = $_GET['nome_presidio'];

//prendo tutte le prenotazioni di un presidio dato il nome
$sql = 'SELECT prenotazione.id, prenotazione.codice_fiscale, prenotazione.data, prenotazione.codice, 
        prenotazione.eseguito, prenotazione.note, prenotazione.annullato, prenotazione.id_presidio 
        FROM presidio, prenotazione
        WHERE presidio.nome = :nome_presidio AND presidio.id = prenotazione.id_presidio AND prenotazione.annullato = false';
$stmt = $pdo->prepare($sql);

$stmt->execute(['nome_presidio'=>$nome_presidio]);
$dati = $stmt->fetchAll(PDO::FETCH_ASSOC);

if($dati != null){
    $response['dati'] = $dati;
    $response['status'] = 1;
}

echo json_encode($response);



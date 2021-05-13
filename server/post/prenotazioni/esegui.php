<?php

include_once "../../config.php";
$response = array();
$response['status'] = 0;

//post
$dati = file_get_contents("php://input");
$dati = json_decode($dati, true);

// variabili valorizzate tramite POST
$codice = $dati['codice'];
$note = $dati['note'];

$sql = "UPDATE prenotazione 
        SET eseguito = true, note = :note
        WHERE codice = :codice AND prenotazione.annullato = false";

// eseguiamo la query
$stmt = $pdo->prepare($sql);
$stmt->execute([
    'codice'=>$codice,
    'note'=>$note
]);

echo json_encode($response);


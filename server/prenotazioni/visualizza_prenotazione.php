<?php

include_once "../config.php";

$response = array();
$response['status'] = 0;

// variabili valorizzate tramite POST
$codice_fiscale = $_POST['codice_fiscale'];
$codice_prenotazione = $_POST['codice_prenotazione'];

$sql = 'SELECT prenotazione.id, prenotazione.codice_fiscale, prenotazione.data, prenotazione.codice,
        prenotazione.eseguito, prenotazione.note, prenotazione.annullato, presidio.nome AS nome_presidio,
        provincia.nome AS nome_provincia
        FROM prenotazione, presidio, provincia
        WHERE prenotazione.codice_fiscale = :codice_fiscale AND prenotazione.codice = :codice 
          AND prenotazione.id_presidio = presidio.id AND presidio.id_provincia = provincia.id AND prenotazione.annullato = false';

$stmt = $pdo ->prepare($sql);
$stmt->execute([
    'codice_fiscale'=>$codice_fiscale,
    'codice'=>$codice_prenotazione
]);
$dati = $stmt->fetch();

if($dati != null){
  $response['prenotazione'] = $dati;
  $response['status'] = 1;
}

echo json_encode($response);
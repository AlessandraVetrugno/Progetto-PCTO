<?php
include_once '../config.php';

$response = array();
$response['status'] = 0;

//prendo tutte le prenotazioni per il giorno corrente
$sql = 'SELECT prenotazione.id, prenotazione.codice_fiscale, prenotazione.data, prenotazione.codice, prenotazione.eseguito,
       prenotazione.note, prenotazione.annullato, presidio.nome AS nome_presidio, presidio.indirizzo AS indirizzo_presidio,
       provincia.nome AS nome_provincia
FROM prenotazione, presidio, provincia
WHERE prenotazione.data = CURDATE() AND prenotazione.id_presidio = presidio.id AND presidio.id_provincia = provincia.id
    AND prenotazione.annullato = false';

$stmt = $pdo->query($sql);

$result = $stmt->fetchAll(PDO::FETCH_ASSOC);
if($result != null){
    $result = array_map('convertiDataMappa', $result);
    $today = convertiData(date('d-m-Y'));

    $response['result'] = $result;
    $response['today'] = $today;
    $response['status'] = 1;
}

echo json_encode($response);
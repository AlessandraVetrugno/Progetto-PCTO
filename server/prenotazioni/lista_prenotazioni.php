<?php
include_once '../config.php';

$response = array();
$response['status'] = 0;

$req_data = $_GET;
$id_presidio = $req_data['id_presidio'];

//prendo tutte le prenotazioni di un presidio dato il suo ID
$sql = 'SELECT prenotazione.*
        FROM prenotazione
        WHERE prenotazione.id_presidio = :id_presidio
        AND prenotazione.data >= CURDATE()
        ORDER BY prenotazione.data ASC';

// se l'amministratore è di sistema e slegato da qualsiasi presidio
if (!isset($req_data['id_presidio'])) {
    $sql = 'SELECT prenotazione.*
            FROM prenotazione
            WHERE prenotazione.data >= CURDATE()
            ORDER BY prenotazione.data ASC';
    $stmt = $pdo->prepare($sql);
    $stmt->execute();
} else {
    $stmt = $pdo->prepare($sql);
    $stmt->execute(['id_presidio' => $id_presidio]);
}

$dati = $stmt->fetchAll(PDO::FETCH_ASSOC);

if($dati != null){
    $response['dati'] = $dati;
    $response['status'] = 1;
}

echo json_encode($response);



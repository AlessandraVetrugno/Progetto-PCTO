<?php

include_once '../config.php';

$response = array();
$response['status'] = 0;

$req_data = $_GET;
//prendo l'id del presidio
$presidio = $req_data['id_presidio'];

$sql = 'SELECT prenotazione.data, COUNT(*) AS n_prenotazioni
        FROM prenotazione
        WHERE  prenotazione.data >= CURDATE() AND  prenotazione.id_presidio = :id_presidio
        GROUP BY prenotazione.data
        HAVING n_prenotazioni > 5
        ORDER BY prenotazione.data ASC';

//preparo la query
$stmt = $pdo->prepare($sql);

//eseguo la query
$stmt->execute([
    'id_presidio'=>$presidio
]);

//riempio il vettore di date
$dates = array();
while ($row = $stmt -> fetch(PDO::FETCH_ASSOC)) $dates[] = $row['data'];

$response['dati'] = $dates;
$response['status'] = 1;

echo json_encode($response);
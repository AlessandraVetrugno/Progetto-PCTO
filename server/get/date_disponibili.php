<?php

//funzione che torna un array di date disponibili, ovvero ci sono meno di 5 tamponi prenotati
function datesPrenotable($dates, $step = '+1 day', $format = 'Y-m-d') {
    $dates_permitted = [];
    $current = strtotime( date('Y-m-d') );
    for ($i = 0; $i < 10; $current = strtotime( $step, $current )) {
        $day = date( $format, $current );
        if (!key_exists($day, $dates) || $dates[$day]['n_prenotazioni'] < 5) {
            $dates_permitted[]['data'] = date( $format, $current );
            $i++;
        }
    }
    return $dates_permitted;
}

include_once '../config.php';
$response = array();
$response['status'] = 0;

//query
$sql= "SELECT prenotazione.data, COUNT(*) AS n_prenotazioni
FROM prenotazione
WHERE prenotazione.data >= CURDATE() AND prenotazione.id_presidio = :id_presidio
GROUP BY prenotazione.data
HAVING n_prenotazioni < 5
ORDER BY prenotazione.data ASC";

//preparo la query
$stmt = $pdo->prepare($sql);

$req_data = $_GET;
//prendo il nome del presidio, della provincia e della regione dal vettore get
$presidio = $req_data['presidio'];

//eseguo la query
$stmt->execute([
    'id_presidio'=>$presidio
]);

//riempio il vettore di date
$dates = array();
while ($row = $stmt -> fetch(PDO::FETCH_ASSOC)) $dates[$row['data']] = $row;

if($dates != null){
    $response['dati'] = datesPrenotable($dates);
    $response['status'] = 1;
}
echo json_encode($response);

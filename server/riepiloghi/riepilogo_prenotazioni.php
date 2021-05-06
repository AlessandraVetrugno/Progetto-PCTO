<?php

include_once "../config.php";

$giorno1 = $_POST['giorno1'];
$giorno2 = $_POST['giorno2'];

// query di inserimento preparata
$sql = "SELECT prenotazione.data, COUNT(*) AS n_prenotazioni
        FROM prenotazione 
        WHERE prenotazione.data BETWEEN :giorno1 AND :giorno2 AND prenotazione.annullato = false
        GROUP BY prenotazione.data
        ORDER BY prenotazione.data DESC";

$stmt = $pdo->prepare($sql);

$stmt -> execute([
    'giorno1'=>$giorno1,
    'giorno2'=>$giorno2
]);
// estraggo le righe di risposta che finiranno come vettori
$result = $stmt->fetchAll();

$date = array_map('convertiDataMappa', $result);
$intervallo = ['inizio' => convertiData($giorno1), 'fine' => convertiData($giorno2)];

$result = array();
$result['date'] = $date;
$result['intervallo'] = $intervallo;

echo json_encode($result);

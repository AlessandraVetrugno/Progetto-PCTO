<?php

include_once "../../config.php";

//risposta
$response = array();
$response['status'] = 0;


$req_data = $_GET;

//variabili valorizzate tramite POST
$giorno1 = $req_data['giorno1'];
$giorno2 = $req_data['giorno2'];

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
$result = $stmt->fetchAll(PDO::FETCH_ASSOC);

if($result != null){
    $date = array_map('convertiDataMappa', $result);
    $intervallo = ['inizio' => convertiData($giorno1), 'fine' => convertiData($giorno2)];

    $response['date'] = $date;
    $response['intervallo'] = $intervallo;
    $response['status'] = 1;
}

echo json_encode($result);

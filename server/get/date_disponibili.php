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

include_once 'config.php';

//query
$sql= "SELECT prenotazione.data, COUNT(*) AS n_prenotazioni
       FROM prenotazione, presidio, provincia, regione
       WHERE prenotazione.data >= CURDATE() AND presidio.nome = :nome_presidio
            AND presidio.id_provincia = provincia.id AND provincia.nome = :nome_provincia
            AND provincia.id_regione = regione.id AND regione.nome = :nome_regione
       GROUP BY prenotazione.data
       ORDER BY prenotazione.data ASC";

//preparo la query
$stmt = $pdo->prepare($sql);

//prendo il nome del presidio, della provincia e della regione dal vettore get
$nome_presidio = $_GET['presidio'];
$nome_provincia = $_GET['provincia'];
$nome_regione = $_GET['regione'];

//eseguo la query
$stmt->execute([
    'nome_presidio'=>$nome_presidio,
    'nome_provincia'=>$nome_provincia,
    'nome_regione'=>$nome_regione
]);

//riempio il vettore di date
$dates = array();
while ($row = $stmt -> fetch(PDO::FETCH_ASSOC)) $dates[$row['data']] = $row;

echo json_encode(datesPrenotable($dates));

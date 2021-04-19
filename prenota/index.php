<?php
require '../vendor/autoload.php';
include_once "../config.php";

use League\Plates\Engine;

//Viene creato l'oggetto per la gestione dei template
$templates = new Engine('../view','tpl');

// date prenotate
$sql= "
                SELECT prenotazione.data, COUNT(*) AS n_prenotazioni
                FROM prenotazione 
                WHERE prenotazione.data >= CURDATE()
                GROUP BY prenotazione.data
                ORDER BY prenotazione.data ASC
                ";
$stmt = $pdo->query($sql);

$dates = array();
while ($row = $stmt -> fetch(PDO::FETCH_ASSOC)) $dates[$row['data']] = $row;

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

$dates_prenotable = [];

foreach (datesPrenotable($dates) as $date){
    $date['giorno_testo'] = convertiData($date['data']);
    $dates_prenotable[] = $date;
}

echo $templates->render('prenota', ['dates' => $dates_prenotable]);
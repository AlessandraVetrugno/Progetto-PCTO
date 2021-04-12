<?php
require '../vendor/autoload.php';
include_once "../config.php";

use League\Plates\Engine;

//Viene creato l'oggetto per la gestione dei template
$templates = new Engine('../view','tpl');

// date prenotate
$sql= "
                SELECT prenotazioni.giorno, COUNT(*) AS n_prenotazioni
                FROM prenotazioni 
                WHERE prenotazioni.giorno >= CURDATE()
                GROUP BY prenotazioni.giorno
                ORDER BY prenotazioni.giorno ASC
                ";
$stmt = $pdo->query($sql);

$dates = array();
while ($row = $stmt -> fetch(PDO::FETCH_ASSOC)) $dates[$row['giorno']] = $row;

function datesPrenotable($dates, $step = '+1 day', $format = 'Y-m-d') {
    $dates_permitted = [];
    $current = strtotime( date('Y-m-d') );
    for ($i = 0; $i < 10; $current = strtotime( $step, $current )) {
        $day = date( $format, $current );
        if (!key_exists($day, $dates) || $dates[$day]['n_prenotazioni'] < 5) {
            $dates_permitted[]['giorno'] = date( $format, $current );
            $i++;
        }
    }
    return $dates_permitted;
}

$dates_prenotable = [];

foreach (datesPrenotable($dates) as $date){
    $date['giorno_testo'] = convertiData($date['giorno']);
    $dates_prenotable[] = $date;
}

echo $templates->render('prenota', ['dates' => $dates_prenotable]);
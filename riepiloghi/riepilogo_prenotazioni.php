<?php

require '../vendor/autoload.php';
include_once "../config.php";

$giorno1 = $_POST['giorno1'];
$giorno2 = $_POST['giorno2'];

// query di inserimento preparata
$sql = "SELECT prenotazioni.giorno, COUNT(*) AS n_prenotazioni
        FROM prenotazioni 
        WHERE prenotazioni.giorno BETWEEN '$giorno1' AND '$giorno2'
        GROUP BY prenotazioni.giorno
        ORDER BY prenotazioni.giorno DESC";

use League\Plates\Engine;

// viene creato l'oggetto per la gestione dei template
$templates = new Engine('../view', 'tpl');

$stmt = $pdo->query($sql);

// estraggo le righe di risposta che finiranno come vettori
$result = $stmt->fetchAll();

$result = array_map('convertiDataMappa', $result);
$intervallo = ['inizio' => convertiData($giorno1), 'fine' => convertiData($giorno2)];

// rendo un template che mi visualizza le tabelle
echo $templates->render('riepilogo_prenotazioni', ['result' => $result, 'intervallo' => $intervallo]);
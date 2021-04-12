<?php

require 'vendor/autoload.php';
include_once "config.php";

// query di inserimento preparata
$sql = "SELECT * FROM prenotazioni WHERE prenotazioni.giorno = CURDATE()";

use League\Plates\Engine;

// viene creato l'oggetto per la gestione dei template
$templates = new Engine('./view', 'tpl');

$stmt = $pdo->query($sql);

// estraggo le righe di risposta che finiranno come vettori
$result = $stmt->fetchAll();

$result = array_map('convertiDataMappa', $result);
$today = convertiData(date('d-m-Y'));

// rendo un template che mi visualizza le tabelle
echo $templates->render('lista_prenotazioni_giornaliere', ['result' => $result, 'today' => $today]);
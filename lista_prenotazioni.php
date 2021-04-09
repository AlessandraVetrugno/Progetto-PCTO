<?php

require 'vendor/autoload.php';
include_once "config.php";

// query di inserimento preparata
$sql = "SELECT * FROM prenotazioni";

use League\Plates\Engine;

// viene creato l'oggetto per la gestione dei template
$templates = new Engine('./view', 'tpl');

$stmt = $pdo->query($sql);

// estraggo le righe di risposta che finiranno come vettori
$result = $stmt->fetchAll();

$result = array_map('convertiDataMappa', $result);

// rendo un template che mi visualizza le tabelle
echo $templates->render('lista_prenotazioni', ['result' => $result]);
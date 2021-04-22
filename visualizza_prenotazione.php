<?php

require 'vendor/autoload.php';
include_once "config.php";

use League\Plates\Engine;

// viene creato l'oggetto per la gestione dei template
$templates = new Engine('./view', 'tpl');

// variabili valorizzate tramite POST
$codice_fiscale = $_POST['codice_fiscale'];
$codice_prenotazione = $_POST['codice_prenotazione'];

// query di inserimento preparata
$sql = "SELECT * FROM prenotazione
        WHERE prenotazione.codice = '$codice_prenotazione'";

$stmt = $pdo->query($sql);

$prenotazione = $stmt->fetchAll(PDO::FETCH_ASSOC)[0];

$prenotazione['data'] = convertiData($prenotazione['data']);

$annullaPrenotazione = function () {
    GLOBAL $codice_fiscale;
    echo "ciao";
    GLOBAL $pdo;
    $sql = "UPDATE prenotazione 
            SET prenotazione.annullato = true
            WHERE prenotazione.codice = '$codice_fiscale'";
    $pdo->query($sql);
};

// rendo un template che mi visualizza le tabelle
echo $templates->render('visualizza_prenotazione', ['result' => $prenotazione]);

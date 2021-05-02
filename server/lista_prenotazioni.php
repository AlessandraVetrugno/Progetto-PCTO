<?php

require 'vendor/autoload.php';
include_once "config.php";

use League\Plates\Engine;

// viene creato l'oggetto per la gestione dei template
$templates = new Engine('./view', 'tpl');

// query di inserimento preparata
$sql = "SELECT * 
        FROM prenotazione
        ORDER BY data DESC";

$stmt = $pdo->query($sql);

// estraggo le righe di risposta che finiranno come vettori
$result = $stmt->fetchAll();

$result = array_map('convertiDataMappa', $result);

// se sei una persona che ha fatto il login
/*
if(isset($_SESSION['username'])){
    $username = $_SESSION['username'];

    // rendo un template che mi visualizza le tabelle
    echo $templates->render('lista_prenotazioni',
        [
            'result' => $result,
            'username' => $username
        ]);
}
else {
    echo $templates->render('utente_non_autorizzato');
}
*/

echo $templates->render('lista_prenotazioni',
    [
        'result' => $result
    ]);
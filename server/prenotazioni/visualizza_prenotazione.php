<?php

include_once "config.php";

use League\Plates\Engine;
// variabili valorizzate tramite POST
$codice_fiscale = $_POST['codice_fiscale'];
$codice_prenotazione = $_POST['codice_prenotazione'];

$sql = 'SELECT * FROM prenotazione WHERE prenotazione.codice_fiscale = :codice_fiscale AND prenotazione.codice = :codice';

$stmt = $pdo ->prepare($sql);
$stmt->execute([
    'codice_fiscale'=>$codice_fiscale,
    'codice'=>$codice_prenotazione
]);
echo json_encode($stmt->fetch());
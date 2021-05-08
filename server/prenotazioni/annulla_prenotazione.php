<?php

include_once "../config.php";

$dati = file_get_contents("php://input");
$dati = json_decode($dati, true);

// variabili valorizzate tramite POST
$codice_prenotazione = $dati['codice_prenotazione'];

$sql = 'UPDATE prenotazione 
        SET prenotazione.annullato = true
        WHERE prenotazione.codice = :codice';

$stmt = $pdo->prepare($sql);
$stmt->execute(['codice'=>$codice_prenotazione]);

// ridirige il browser verso la pagina indicata nella location
//header('Location:./prenotazioni/index.php');
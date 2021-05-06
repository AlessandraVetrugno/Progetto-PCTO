<?php

include_once "config.php";

// variabili valorizzate tramite POST
$codice_prenotazione = $_POST['codice_prenotazione'];

$sql = "UPDATE prenotazione 
        SET prenotazione.annullato = true
        WHERE prenotazione.codice = :codice";

$stmt = $pdo->prepare($sql);
$stmt->execute(['codice'=>$codice_prenotazione]);

// ridirige il browser verso la pagina indicata nella location
//header('Location:./prenotazioni/index.php');
<?php

include_once "config.php";

// variabili valorizzate tramite POST
$codice_prenotazione = $_POST['codice_prenotazione'];

$sql = "UPDATE prenotazioni 
            SET prenotazioni.annullato = true
            WHERE prenotazioni.codice = '$codice_prenotazione'";
$pdo->query($sql);

// ridirige il browser verso la pagina indicata nella location
header('Location:prenota');
exit(0);
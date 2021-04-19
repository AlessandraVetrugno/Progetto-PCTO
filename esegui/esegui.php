<?php

include_once "../config.php";

// variabili valorizzate tramite POST
$codice = $_POST['codice'];
$note = $_POST['note'];

// controllo sul numero di persone per giorno
$sql = "UPDATE prenotazione 
        SET eseguito = true, note = '$note'
        WHERE codice = '$codice'";

// eseguiamo la query
$pdo->query($sql);

// ridirige il browser verso la pagina indicata nella location
header('Location:../lista_prenotazioni.php');
exit(0);
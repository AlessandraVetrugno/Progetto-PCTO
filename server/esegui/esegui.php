<?php

include_once "../config.php";

// variabili valorizzate tramite POST
$codice = $_POST['codice'];
$note = $_POST['note'];

$sql = "UPDATE prenotazione 
        SET eseguito = true, note = :note
        WHERE codice = :codice";

// eseguiamo la query
$stmt = $pdo->prepare($sql);
$stmt->execute([
    'codice'=>$codice,
    'note'=>$note
]);

// ridirige il browser verso la pagina indicata nella location
header('Location:../lista_prenotazioni.php');

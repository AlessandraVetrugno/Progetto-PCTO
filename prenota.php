<?php

include_once "config.php";

// variabili valorizzate tramite POST
$codice_fiscale = $_POST['codice'];
$giorno = $_POST['giorno'];

// query di inserimento preparata
$sql = "INSERT INTO prenotazioni VALUES (NULL, :codice_fiscale, :giorno)";

// inviamo la query al database che la tiene pronta
$stmt = $pdo->prepare($sql);

// inviamo i dati concreti che verranno messi al posto dei segnaposto
$stmt->execute(
    [
        'codice_fiscale' => $codice_fiscale,
        'giorno' => $giorno
    ]
);

// ridirige il browser verso la pagina indicata nella location
header('Location:lista_prenotazioni.php');
exit(0);
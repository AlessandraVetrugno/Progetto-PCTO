<?php

// dice a livello dello script che gli errori verranno mostrati e che non verranno loggati
ini_set('display_errors', 1);
ini_set('log_errors', 1);

$host = 'localhost';
$db = 'prenotazioni';
$user = 'root';
$pass = '';
$charset = 'utf8';

// stringa di connessione
$dsn = "mysql:host=$host;dbname=$db;charset=$charset";

$pdo = new PDO($dsn, $user, $pass);

// variabili al momento costanti, poi verranno prese tramite POST
$codice_fiscale = 'NFDZRS49D12A759V';
$giorno = '2021-03-06';

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
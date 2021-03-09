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
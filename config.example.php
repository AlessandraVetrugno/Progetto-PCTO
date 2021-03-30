<?php

// Esempio di un file di configurazione.
// Creare un file config.php e inserire le seguenti righe
// adattandole alla propria configurazione

// dice a livello dello script che gli errori verranno mostrati e che non verranno loggati
ini_set('display_errors', 0);
ini_set('log_errors', 1);

$host = 'your_host';
$db = 'your_db';
$user = 'your_username';
$pass = 'your_password';
$charset = 'utf8';

// stringa di connessione
$dsn = "mysql:host=$host;dbname=$db;charset=$charset";

$pdo = new PDO($dsn, $user, $pass);
$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

// funzioni usate frequentemente (si potrebbero anche mettere in un file 'scripts' ed includerlo
$mesi = ['gennaio', 'febbraio', 'marzo', 'aprile', 'maggio', 'giugno', 'luglio', 'agosto', 'settembre', 'ottobre', 'novembre', 'dicembre'];

function convertiData($data) {
    GLOBAL $mesi;
    $giorno = date("d", strtotime($data));
    $mese = date("m", strtotime($data));
    $anno = date("Y", strtotime($data));
    return $giorno.' '.$mesi[(int) $mese - 1].' '.$anno;

}

function convertiDataMappa($row) {
    $row['giorno'] = convertiData($row['giorno']);
    return $row;
}
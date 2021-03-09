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

// query di inserimento preparata
$sql = "SELECT * FROM prenotazioni";

$stmt = $pdo->query($sql);

$result = $stmt->fetchAll();

echo "<pre>";
var_dump($result);
echo "</pre>";
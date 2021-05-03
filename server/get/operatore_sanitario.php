<?php
include_once 'config.php';

//prendo il codice dell'operatore dall'array get
$codice = $_GET['codice'];

$sql = 'SELECT * FROM amministratore_presidio WHERE amministratore_presidio.codice = :codice';

//preparo la query
$stmt = $pdo->prepare($sql);

//eseguo la query
$stmt->execute(['codice'=>$codice]);

echo json_encode($stmt->fetch());


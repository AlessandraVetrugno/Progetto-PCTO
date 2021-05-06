<?php
include_once 'config.php';

//prendo tutte le prenotazioni per il giorno corrente
$sql = "SELECT * FROM prenotazione WHERE prenotazione.data = CURDATE()";
$stmt = $pdo->query($sql);

$result = $stmt->fetchAll(PDO::FETCH_ASSOC);

$result = array_map('convertiDataMappa', $result);
$today = convertiData(date('d-m-Y'));

$dati = array();
$dati['result'] = $result;
$dati['today']=$today;

echo json_encode($dati);
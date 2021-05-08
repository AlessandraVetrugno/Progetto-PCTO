<?php
include_once "../config.php";

$dati = file_get_contents("php://input");
$dati = json_decode($dati, true);

// variabili valorizzate tramite POST
$codice_fiscale = $dati['codice_fiscale'];
$data = $dati['data'];
$nome_presidio = $dati['presidio'];
$nome_provincia = $dati['provincia'];
$nome_regione = $dati['regione'];


$codice = strtoupper(uniqid());
//$headerMsg = array('class'=>'error', 'message'=>'Prenotazione fallita');
//$firstLine = "Sono state effettuate troppe prenotazioni per questa giornata, scegli un altro giorno";

// query di inserimento preparata
$sql = "INSERT INTO prenotazione (codice_fiscale, codice, data, id_presidio)
        VALUES (:codice_fiscale, :codice_prenotazione, :data,
        (SELECT presidio.id FROM presidio, provincia, regione
         WHERE presidio.nome = :nome_presidio
           AND presidio.id_provincia = provincia.id AND provincia.nome = :nome_provincia
           AND provincia.id_regione = regione.id AND regione.nome = :nome_regione))";

//$headerMsg['class'] = 'success';
//$headerMsg['message'] = 'Prenotazione avvenuta con successo';

// inviamo la query al database che la tiene pronta
$stmt = $pdo->prepare($sql);
// inviamo i dati concreti che verranno messi al posto dei segnaposto
$stmt->execute(
    [
        'codice_fiscale' => $codice_fiscale,
'codice_prenotazione' => $codice,
'data' => $data,
        'nome_presidio' => $nome_presidio,
        'nome_provincia' => $nome_provincia,
        'nome_regione' => $nome_regione
    ]
);

echo json_encode('coglioni non vado');

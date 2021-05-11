<?php

include_once "../config.php";

$response = array();
$response['status'] = 0;

$req_data = $_GET;

// variabili ottenute dal corpo della richiesta GET
$codice_fiscale = $req_data['codice_fiscale'];
$codice_prenotazione = $req_data['codice_prenotazione'];

$sql = 'SELECT prenotazione.*, presidio.nome AS nome_presidio,
        provincia.nome AS nome_provincia, regione.nome AS nome_regione
        FROM prenotazione INNER JOIN presidio 
            ON prenotazione.id_presidio = presidio.id
             INNER JOIN provincia 
                 ON presidio.id_provincia = provincia.id
                INNER JOIN regione
                    ON provincia.id_regione = regione.id
        WHERE prenotazione.codice_fiscale = :codice_fiscale AND prenotazione.codice = :codice_prenotazione';

$stmt = $pdo ->prepare($sql);

$stmt->execute([
    'codice_fiscale'=>$codice_fiscale,
    'codice_prenotazione'=>$codice_prenotazione
]);

$dati = $stmt->fetch(PDO::FETCH_ASSOC);

if($dati != null){
  $response['dati'] = $dati;
  $response['status'] = 1;
}

// invio la risposta al client
echo json_encode($response);
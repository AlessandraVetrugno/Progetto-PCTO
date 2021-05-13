<?php

include_once '../../config.php';

$response = array();
$response['status'] = 0;
$dati = null;

$req_data = $_GET;
//prendo il nome del presidio, della provincia e della regione
$nome_provincia = $req_data['provincia'];
$nome_regione = $req_data['regione'];

//se il nome della regione non è specificato esegui una ricerca per provincia e presidio
if($nome_regione == null){

    $sql = 'SELECT presidio.nome FROM presidio, provincia 
            WHERE presidio.id_provincia = provincia.id 
              AND provincia.nome = :nome_provincia';

    //preparo la query
    $stmt = $pdo -> prepare($sql);

    //eseguo la query
    $stmt->execute([
        'nome_provincia'=>$nome_provincia
    ]);
    $dati = $stmt->fetch(PDO::FETCH_ASSOC);

    //se anche il nome della provincia non è specificato allora fai una ricerca solo per presidio
} else if($nome_provincia == null){

    $sql = 'SELECT presidio.nome FROM presidio';
    $stmt = $pdo -> query($sql);

    $dati = $stmt->fetch(PDO::FETCH_ASSOC);

    //se tutti i parametri sono specificati allora fai una ricerca completa tra presidi, province e regioni
} else {

    $sql = 'SELECT presidio.nome FROM presidio, provincia, regione 
            WHERE presidio.id_provincia = provincia.id AND provincia.nome = :nome_provincia
                AND provincia.id_regione = regione.id 
                AND regione.nome = :nome_regione';
    $stmt = $pdo->prepare($sql);
    $stmt->execute([
        'nome_provincia' => $nome_provincia,
        'nome_regione' => $nome_regione
    ]);

    $dati = $stmt->fetch(PDO::FETCH_ASSOC);
}

if($dati != null){
    $response['dati'] = $dati;
    $response['status'] = 1;
}

echo json_encode($response);
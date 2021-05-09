<?php

include_once '../config.php';

$response = array();
$response['status'] = 0;

$sql ='SELECT regione.id, regione.nome FROM regione ';
$reg = $pdo->query($sql);
$regioni = $reg->fetchAll(PDO::FETCH_ASSOC);
$sql_province = 'SELECT provincia.id, provincia.nome FROM provincia WHERE provincia.id_regione = :id_regione';
$sql_presidi = 'SELECT presidio.id, presidio.nome FROM presidio WHERE presidio.id_provincia = :id_provincia';

$province = $pdo->prepare($sql_province);
$presidi = $pdo->prepare($sql_presidi);

foreach ($regioni as $regione){
    $province->execute(['id_regione'=>$regione['id']]);
    $prov = $province->fetchAll(PDO::FETCH_ASSOC);
    foreach ($prov as $provincia){
        $presidi->execute(['id_provincia'=>$provincia['id']]);
        $provincia['presidi'] = $presidi->fetchAll(PDO::FETCH_ASSOC);
        $regione['province'][] = $provincia;
    }
    $response['dati'][] = $regione;
}


echo json_encode($response);
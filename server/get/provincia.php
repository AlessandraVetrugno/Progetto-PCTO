<?php

include_once 'config.php';

//prendo il nome della provincia e della regione dal vettore get
$nome_provincia = $_GET['provincia'];
$nome_regione = $_GET['regione'];

//esegui se la regione non è specificata
if($nome_regione == null){
     $sql = 'SELECT * FROM provincia WHERE provincia.nome = :nome_provincia';

     //preparo la query
     $stmt = $pdo -> prepare($sql);

     //eseguo la query
     $stmt->execute([
         'nome_provincia'=>$nome_provincia
     ]);

     echo json_encode($stmt->fetch());

     //esegui se la regione è specificata
 } else {

     $sql = 'SELECT * FROM provincia, regione WHERE provincia.nome = :nome_provincia
            AND provincia.id_regione = regione.id AND regione.nome = :nome_regione';
     $stmt = $pdo->prepare($sql);

     $stmt->execute([
         'nome_provincia' => $nome_provincia,
         'nome_regione' => $nome_regione
     ]);

     echo json_encode($stmt->fetch());
 }
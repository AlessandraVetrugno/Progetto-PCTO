<?php

include_once 'config.php';

//prendo il nome della provincia e della regione dal vettore get
$nome_regione = $_GET['regione'];

//esegui se la regione non è specificata
if($nome_regione == null){
     $sql = 'SELECT provincia.nome FROM provincia';

     //preparo la query
     $stmt = $pdo -> query($sql);

     echo json_encode($stmt->fetch());

     //esegui se la regione è specificata
 } else {

     $sql = 'SELECT provincia.nome FROM provincia, regione 
             WHERE provincia.id_regione = regione.id AND regione.nome = :nome_regione';
     $stmt = $pdo->prepare($sql);

     $stmt->execute([
         'nome_regione' => $nome_regione
     ]);

     echo json_encode($stmt->fetch());
 }
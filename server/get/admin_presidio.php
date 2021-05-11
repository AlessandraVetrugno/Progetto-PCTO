<?php
 include_once '../config.php';

 $response = array();
 $response['status'] = 0;

 $req_data = $_GET;
 //prendo il codice dell'amministratore dall'array get
 $credenziali = $req_data['credenziali'];

 $sql = 'SELECT id, username, codice, id_presidio
         FROM amministratore_presidio
         WHERE amministratore_presidio.codice = :codice OR amministratore_presidio.username = :username';

 //preparo la query
 $stmt = $pdo->prepare($sql);

 //eseguo la query
 $stmt->execute([
     'codice'=>$credenziali,
     'username'=>$credenziali
     ]);
 $dati = $stmt -> fetch(PDO::FETCH_ASSOC);
if($dati != null) {
    $response['dati'] = $dati;
    $response['status'] = 1;
}
 echo json_encode($response);

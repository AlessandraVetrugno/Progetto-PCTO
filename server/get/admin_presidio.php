<?php
 include_once '../config.php';

 //prendo il codice dell'amministratore dall'array get
 $credenziali = $_GET['credenziali'];

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

 echo json_encode($stmt->fetch());

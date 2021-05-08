<?php
include_once "../config.php";

$dati = file_get_contents("php://input");
$dati = json_decode($dati, true);

//array di risposta di default lo stato della risposta è 0 cioè non è andata a buon fine
$response = array();
$response['status'] = 0;

// variabili valorizzate tramite POST
$credenziali = $dati['credenziali'];
$password = $dati['password'];

// query di inserimento preparate
$sql_admin_sys = "SELECT * FROM amministratore_sistema WHERE codice = :codice OR username = :username";
$sql_admin_pres = "SELECT * FROM amministratore_presidio WHERE codice = :codice OR username = :username";
$sql_op_san = "SELECT * FROM operatore_sanitario WHERE codice = :codice OR username = :username";

//eseguo la query per le credenziali da amministratore di sistema
$stmt = $pdo->prepare($sql_admin_sys);
$stmt->execute([
    'codice' => $credenziali,
    'username' => $credenziali
]);
$riga = $stmt -> fetch();

    if ($riga == false) {
    //eseguo la query per le credenziali da amministratore presidio
    $stmt = $pdo->prepare($sql_admin_pres);
    $stmt->execute([
        'codice' => $credenziali,
        'username' => $credenziali
    ]);
    $riga = $stmt -> fetch();

    if ($riga == false) {
        //eseguo la query per le credenziali da operatore sanitario
        $stmt = $pdo->prepare($sql_op_san);
        $stmt->execute([
            'codice' => $credenziali,
            'username'=> $credenziali
        ]);
        $riga = $stmt -> fetch();

        if ($riga == false) {
            //non esiste l'utente
            //invio la risposta con status 0
            echo json_encode($response);

        } else {
            $pass_hash = $riga['password'];

            // la password è corretta per l'operatore_sanitario
            if (password_verify($password, $pass_hash)) {
                $response['codice'] = $credenziali;
                $response['ruolo'] = 'operatore';
                $response['status'] = 1;
                echo json_encode($response);
            }

            else {
                //la password è sbagliata
                //invio la risposta con status 0
                echo json_encode($response);
            }
        }
    } else {
        $pass_hash = $riga['password'];

        // la password è corretta per l'amministratore_presidio
        if (password_verify($password, $pass_hash)) {
            $response['codice'] = $credenziali;
            $response['ruolo'] = 'operatore';
            $response['status'] = 1;
            echo json_encode($response);
        }

        else {
            //la password è sbagliata
            //invio la risposta con status 0
            echo json_encode($response);
        }
    }
} else {
    $pass_hash = $riga['password'];

    // la password è corretta amministratore_sistema
    if (password_verify($password, $pass_hash)) {
        $response['codice'] = $credenziali;
        $response['ruolo'] = 'operatore';
        $response['status'] = 1;
        echo json_encode($response);
    }

    else {
        //la password è sbagliata
        //invio la risposta con status 0
        echo json_encode($response);
    }
}


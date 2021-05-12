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
$sql_presidio = "SELECT * FROM presidio WHERE id = :id_presidio";

// inizializzo le variabili da aggiornare se l'accesso sarà verificato
$verified = false;
$ruolo = null;

//eseguo la query per le credenziali da amministratore di sistema
$stmt = $pdo->prepare($sql_admin_sys);
$stmt->execute([
    'codice' => $credenziali,
    'username' => $credenziali
]);

$riga = $stmt -> fetch(PDO::FETCH_ASSOC);

if ($riga) {
    $pass_hash = $riga['password'];

    // la password è corretta
    if (password_verify($password, $pass_hash)) {
        $verified = true;
        $ruolo = 'amministratore_sistema';
    }
} else {
    //eseguo la query per le credenziali da amministratore presidio
    $stmt = $pdo->prepare($sql_admin_pres);
    $stmt->execute([
        'codice' => $credenziali,
        'username' => $credenziali
    ]);
    $riga = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($riga) {
        $pass_hash = $riga['password'];

        // la password è corretta
        if (password_verify($password, $pass_hash)) {
            $verified = true;
            $ruolo = 'amministratore_presidio';
        }
    } else {
        //eseguo la query per le credenziali da amministratore presidio
        $stmt = $pdo->prepare($sql_admin_pres);
        $stmt->execute([
            'codice' => $credenziali,
            'username' => $credenziali
        ]);
        $riga = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($riga) {
            $pass_hash = $riga['password'];

            // la password è corretta
            if (password_verify($password, $pass_hash)) {
                $verified = true;
                $ruolo = 'amministratore_presidio';
            }
        } else {
            //eseguo la query per le credenziali da operatore sanitario
            $stmt = $pdo->prepare($sql_op_san);
            $stmt->execute([
                'codice' => $credenziali,
                'username'=> $credenziali
            ]);
            $riga = $stmt -> fetch(PDO::FETCH_ASSOC);

            if ($riga) {
                // verifico che la password sia corretta per gli operatori sanitari
                $pass_hash = $riga['password'];

                // la password è corretta
                if (password_verify($password, $pass_hash)) {
                    $verified = true;
                    $ruolo = 'operatore';
                }
            }
        }
    }
}

// carico i dati se le credenziali sono verificate
if ($verified) {
    $dati = [];
    $dati['username'] = $riga['username'];
    $dati['codice'] = $riga['codice'];
    $dati['ruolo'] = $ruolo;
    $dati['presidio'] = getDatiPresidio($riga['id_presidio']);
    $response['dati'] = $dati;
    $response['status'] = 1;
}

echo json_encode($response);

function getDatiPresidio ($id_presidio) {
    GLOBAL $stmt;
    GLOBAL $pdo;
    $sql_presidio = "SELECT * FROM presidio WHERE id = '$id_presidio'";
    $stmt = $pdo->prepare($sql_presidio);
    $stmt->execute();
    return $stmt -> fetchAll(PDO::FETCH_ASSOC)[0];
}
<?php
require '../vendor/autoload.php';
include_once "../config.php";

use League\Plates\Engine;

//Viene creato l'oggetto per la gestione dei template
$templates = new Engine('../view','tpl');

// variabili valorizzate tramite POST
$codice = $_POST['codice'];
$password = $_POST['password'];
// password_verify($password, $psw_hashed)

// query di inserimento preparate
$sql_admin_sys = "SELECT * FROM amministratore_sistema WHERE codice = :codice";
$sql_admin_pres = "SELECT * FROM amministratore_presidio WHERE codice = :codice";
$sql_op_san = "SELECT * FROM operatore_sanitario WHERE codice = :codice";

//eseguo la query per le credenziali da amministratore di sistema
$stmt = $pdo->prepare($sql_admin_sys);
$stmt->execute([
    'codice' => $codice
]);
$riga = $stmt -> fetch();
    if ($riga == false) {

    //eseguo la query per le credenziali da amministratore presidio
    $stmt = $pdo->prepare($sql_admin_pres);
    $stmt->execute([
        'codice' => $codice
    ]);
    $riga = $stmt -> fetch();
    if ($riga == false) {
        //eseguo la query per le credenziali da operatore sanitario
        $stmt = $pdo->prepare($sql_op_san);
        $stmt->execute([
            'codice' => $codice
        ]);
        $riga = $stmt -> fetch();
        if ($riga == false) {
            //eseguo il template login fallito nel caso non esista l'utente
            echo $templates->render('login_fallito', ['codice' => $codice]);

        } else {
            $pass_hash = $riga['password'];

            // la password è corretta per l'operatore_  sanitario
            if (password_verify($password, $pass_hash)) {
                $_SESSION['codice'] = $codice;
                $_SESSION['ruolo'] = 'operatore';
                echo $templates->render('login_effettuato', ['codice' => $codice, 'username' => $riga['username'], 'ruolo' => 'operatore']);
            }
            //la password è sbagliata
            else {
                echo $templates->render('login_fallito', ['codice' => $codice]);
            }
        }
    } else {
        $pass_hash = $riga['password'];

        // la password è corretta per l'amministratore_presidio
        if (password_verify($password, $pass_hash)) {
            $_SESSION['codice'] = $codice;
            $_SESSION['ruolo'] = 'amministratore_presidio';
            echo $templates->render('login_effettuato', ['username' => $riga['username']]);
        }
        //la password è sbagliata
        else {
            echo $templates->render('login_fallito', ['codice' => $codice]);
        }
    }
} else {
    $pass_hash = $riga['password'];

    // la password è corretta amministratore_sistema
    if (password_verify($password, $pass_hash)) {
        $_SESSION['codice'] = $codice;
        $_SESSION['ruolo'] = 'amministratore_sistema';
        echo $templates->render('login_effettuato', ['username' => $riga['username']]);
    }
    //la password è sbagliata
    else {
        echo $templates->render('login_fallito', ['codice' => $codice]);
    }
}


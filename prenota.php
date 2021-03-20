<?php

include_once "config.php";

// variabili valorizzate tramite POST
$codice_fiscale = $_POST['codice_fiscale'];
$giorno = $_POST['giorno'];
$codice = strtoupper(uniqid());
$headerMessage = "Prenotazione fallita";
$firstLine = "Sono state effettuate troppe prenotazioni per questa giornata, scegli un altro giorno";

// query di inserimento preparata
$sql = "INSERT INTO prenotazioni VALUES (NULL, :codice_fiscale, :giorno, :codice)";

$sql_numero= "SELECT COUNT(*) AS n_prenotazioni FROM prenotazioni WHERE prenotazioni.giorno = '$giorno'";

$n_prenotazioni = $pdo->query($sql_numero)->fetchAll()[0]["n_prenotazioni"];

if ($n_prenotazioni <= 5) {
    $headerMessage = "Prenotazione avvenuta con successo";
    // inviamo la query al database che la tiene pronta
    $stmt = $pdo->prepare($sql);

    // inviamo i dati concreti che verranno messi al posto dei segnaposto
    $stmt->execute(
        [
            'codice_fiscale' => $codice_fiscale,
            'giorno' => $giorno,
            'codice' => $codice
        ]
    );
    $firstLine = "Il codice della tua prenotazione è il seguente: $codice";
}

?>

<!DOCTYPE html>
<html>
<head>
    <title>Prenotazione</title>
</head>
<body>
<h1><?php echo $headerMessage ?></h1>
<p><?php echo $firstLine ?></p>
</body>
</html>

<?php

include_once "config.php";

// variabili valorizzate tramite POST
$codice_fiscale = $_POST['codice_fiscale'];
$giorno = $_POST['giorno'];
$codice = strtoupper(uniqid());

// query di inserimento preparata
$sql = "INSERT INTO prenotazioni VALUES (NULL, :codice_fiscale, :giorno, :codice)";

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

?>

<!DOCTYPE html>
<html>
<head>
    <title>Prenotazione</title>
</head>
<body>
    <h1>Prenotazione avvenuta con successo</h1>
    <p>Il codice della tua prenotazione è il seguente: <?php echo $codice; ?></p>
</body>
</html>

<?php
include_once "../config.php";

// date prenotate
$sql= "
                SELECT prenotazioni.giorno, COUNT(*) AS n_prenotazioni
                FROM prenotazioni 
                WHERE prenotazioni.giorno >= CURDATE()
                GROUP BY prenotazioni.giorno
                ORDER BY prenotazioni.giorno ASC
                ";
$stmt = $pdo->query($sql);

$dates = array();
while ($row = $stmt -> fetch(PDO::FETCH_ASSOC)) $dates[$row['giorno']] = $row;

function datesPrenotable($dates, $step = '+1 day', $format = 'Y-m-d') {
    $dates_permitted = [];
    $current = strtotime( date('Y-m-d') );
    for ($i = 0; $i < 10; $current = strtotime( $step, $current )) {
        $day = date( $format, $current );
        if (!key_exists($day, $dates) || $dates[$day]['n_prenotazioni'] < 5) {
            $dates_permitted[]['giorno'] = date( $format, $current );
            $i++;
        }
    }
    return $dates_permitted;
}

$dates_prenotable = datesPrenotable($dates);
?>

<!DOCTYPE html>
<html lang="it">
<head>
    <meta charset="UTF-8">
    <title>Prenotazioni</title>

    <!-- mini.css framework -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/mini.css/3.0.1/mini-default.min.css">
    <!-- Scritti da me -->
    <link rel="stylesheet" href="../assets/styles/main.css">
</head>
<body>
<h1>Portale prenotazioni</h1>
<form action="prenota.php" method="POST">
    <fieldset>
        <legend>Inserisci la prenotazione</legend>
        <label>Codice</label>
        <input type="text" placeholder="Codice fiscale" name="codice_fiscale">
        <label>Giorno</label>
        <select name="giorno" placeholder="Giorno scelto">
            <?php foreach($dates_prenotable as $date): ?>
                <option value=<?= $date['giorno'] ?>><?= convertiData($date['giorno']) ?></option>
            <?php endforeach ?>
        </select>
        <input type="submit" value="Invia la tua richiesta">
    </fieldset>
</form>

<form action="../visualizza_prenotazione.php" method="POST">
    <fieldset>
        <legend>Visualizza una prenotazione</legend>
        <label>Codice fiscale</label>
        <input type="text" placeholder="Codice fiscale" name="codice_fiscale">
        <label>Codice prenotazione</label>
        <input type="text" placeholder="Codice prenotazione" name="codice_prenotazione">
        <input type="submit" value="Visualizza la tua prenotazione">
    </fieldset>
</form>
</body>
</html>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Prenotazioni</title>

    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/mini.css/3.0.1/mini-default.min.css">
</head>
<body>
    <h1>Portale prenotazioni</h1>
    <h3>Lista delle prenotazioni del <?php echo $today ?></h3>
    <table>
        <tr>
            <th>CODICE FISCALE</th>
            <th>CODICE PRENOTAZIONE</th>
        </tr>
        <?php foreach($result as $row): ?>
            <tr>
                <td><?php echo $row['codice_fiscale'] ?></td>
                <td><?php echo $row['codice'] ?></td>
            </tr>
        <?php endforeach ?>
    </table>
</body>
</html>
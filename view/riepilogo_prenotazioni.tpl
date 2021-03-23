<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Prenotazioni</title>

    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/mini.css/3.0.1/mini-default.min.css">
    <!-- Chartjs -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.9.4/Chart.css">
</head>
<body>
    <h1>Portale operatore</h1>
    <h3>Numero delle prenotazioni dal <?php echo $intervallo['inizio'] ?> al <?php echo $intervallo['fine'] ?></h3>
    <table id="tabella">
        <tr>
            <th>Giorno</th>
            <th>Numero delle prenotazioni</th>
        </tr>
        <?php foreach($result as $row): ?>
            <tr>
                <td><?php echo $row['giorno'] ?></td>
                <td><?php echo $row['n_prenotazioni'] ?></td>
            </tr>
        <?php endforeach ?>
    </table>
    <canvas id="grafico-riepiloghi"></canvas>

    <!-- Chart JS -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.9.4/Chart.bundle.min.js"></script>
    <!-- Scritti da me -->
    <script src="./grafico_riepilogo_prenotazioni.js"></script>
</body>
</html>
<?php $this->layout('main_chart', ['argomento' => "Numero delle prenotazioni dal $intervallo[inizio] al $intervallo[fine]"]) ?>

<table id="tabella">
    <tr>
        <th>Giorno</th>
        <th>Numero delle prenotazioni</th>
    </tr>
    <?php foreach($result as $row): ?>
        <tr>
            <td><?php echo $row['data'] ?></td>
            <td><?php echo $row['n_prenotazioni'] ?></td>
        </tr>
    <?php endforeach ?>
</table>
<canvas id="grafico-riepiloghi"></canvas>

<!-- Chart JS -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.9.4/Chart.bundle.min.js"></script>
<!-- Scritti da me -->
<script src="./grafico_riepilogo_prenotazioni.js"></script>
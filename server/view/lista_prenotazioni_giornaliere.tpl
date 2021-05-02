<?php $this->layout('main', ['argomento' => "Lista delle prenotazioni del $today"]) ?>

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
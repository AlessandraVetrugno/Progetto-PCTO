<?php $this->layout('main', ['argomento' => 'Lista delle prenotazioni']) ?>

<table>
    <tr>
        <th>CODICE FISCALE</th>
        <th>CODICE PRENOTAZIONE</th>
        <th>GIORNO</th>
    </tr>
    <?php foreach($result as $row): ?>
        <tr>
            <td><?php echo $row['codice_fiscale'] ?></td>
            <td><?php echo $row['codice'] ?></td>
            <td><?php echo $row['giorno'] ?></td>
        </tr>
    <?php endforeach ?>
</table>
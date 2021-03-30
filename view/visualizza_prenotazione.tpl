<?php $this->layout('main', ['argomento' => "Prenotazione $result[codice]"]) ?>

<table>
    <tr>
        <th>CODICE FISCALE</th>
        <th>CODICE PRENOTAZIONE</th>
        <th>GIORNO</th>
    </tr>
    <tr>
        <td><?= $result['codice_fiscale'] ?></td>
        <td><?= $result['codice'] ?></td>
        <td><?= $result['giorno'] ?></td>
    </tr>
</table>

<td><?= $result['annullato'] ?></td>
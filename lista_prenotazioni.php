<?php

include_once "config.php";

// query di inserimento preparata
$sql = "SELECT * FROM prenotazioni";

$stmt = $pdo->query($sql);

$table= ' <table>
    <tr>
      <th>CODICE FISCALE</th>
      <th>GIORNO</th>
    </tr>';

while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {

    $table .= "
    <tr>
        <td>$row[codice_fiscale]</td>
        <td>$row[giorno]</td>
    </tr>
    ";
}

$table .= '</table>';

echo $table;
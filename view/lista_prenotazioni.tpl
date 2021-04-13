<?php $this->layout('main', ['argomento' => 'Lista delle prenotazioni']) ?>

<h2>Ciao <?= $username ?></h2>
<table class="hoverable striped">
    <thead>
        <tr>
            <th>CODICE FISCALE</th>
            <th>CODICE PRENOTAZIONE</th>
            <th>GIORNO</th>
            <th>NOTE</th>
            <th>ANNULLATO</th>
        </tr>
    </thead>
    <tbody>
        <?php foreach($result as $row): ?>
            <tr>
                <td data-label="Codice fiscale"><?= $row['codice_fiscale'] ?></td>
                <td data-label="Codice prenotazione"><?= $row['codice'] ?></td>
                <td data-label="Giorno"><?= $row['giorno'] ?></td>
                <td data-label="Note"><?= $row['note'] ?></td>
                <td data-label="Annullato">
                    <mark class=<?php if ($row['annullato']) echo "secondary"; else echo "tertiary"; ?> >
                        <?php
                        $annullato = "No";
                        if($row['annullato'])
                            $annullato = "Sì";
                        echo $annullato;
                        ?>
                    </mark>
                </td>

            </tr>
        <?php endforeach ?>
    </tbody>
</table>
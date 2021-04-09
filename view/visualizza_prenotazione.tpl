<?php $this->layout('main', ['argomento' => "Prenotazione $result[codice]"]) ?>

<div class="visualizza-prenotazione">
    <table class="horizontal">
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
            <tr>
                <td data-label="Codice fiscale"><?= $result['codice_fiscale'] ?></td>
                <td data-label="Codice prenotazione"><?= $result['codice'] ?></td>
                <td data-label="Giorno"><?= $result['giorno'] ?></td>
                <td data-label="Note"><?= $result['note'] ?> &nbsp;</td>
                <td data-label="Annullato">
                    <mark class=<?php if ($result['annullato']) echo "secondary"; else echo "tertiary"; ?> >
                    <?php
                            $annullato = "No";
                            if($result['annullato'])
                                $annullato = "Sì";
                            echo $annullato;
                            ?>
                    </mark>
                </td>
            </tr>
        </tbody>
    </table>

    <?php if(!$result['annullato'])
        echo '<form action="annulla_prenotazione.php" method="POST">
            <button type="submit" name="codice_prenotazione" value='.$result['codice'].' class="secondary">Annulla la prenotazione</button>
        </form>';
    ?>

    <!-- <?php if(!$result['annullato'])
        echo "<button class=secondary onClick=<?php call_user_func('annullaPrenotazione') ?> >annulla prenotazione</button>";
    ?> -->

</div>
<?php $this->layout('main', ['argomento' => 'Portale delle prenotazioni', 'rootPathRef' => '../' ]) ?>

<form action="../prenota/prenota.php" method="POST">
    <fieldset>
        <legend>Inserisci la prenotazione</legend>
        <label>Codice</label>
        <input type="text" placeholder="Codice fiscale" name="codice_fiscale">
        <label>Giorno</label>
        <select name="giorno" placeholder="Giorno scelto">
            <?php foreach($dates as $date): ?>
                <option value=<?= $date['giorno'] ?>><?= $date['giorno_testo'] ?></option>
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
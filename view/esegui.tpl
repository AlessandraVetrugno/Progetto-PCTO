<?php $this->layout('main',['argomento' => 'Esegui un tampone']); ?>

<form action="../esegui/esegui.php" method="post">
    <fieldset>
        <legend>Inserisci le informazioni relative al tampone</legend>
        <label for="codice">Codice univoco</label>
        <input type="text" id="codice" placeholder="Codice univoco" name="codice">
        <label for="note">Note</label>
        <textarea id="note" placeholder="Note" name="note"></textarea>
        <input type="submit" value="Registra il tampone">
    </fieldset>
</form>
<?php $this->layout('main', ['argomento' => 'Login effettuato', 'rootPathRef' => '../' ]) ?>
<div>
    <p>Login effettuato con successo per <mark><?= $codice.' '.$username.' '.$ruolo?></mark></p>
    <button class='btn'><a href="../esegui/index.php">Prosegui</a></button>
</div>
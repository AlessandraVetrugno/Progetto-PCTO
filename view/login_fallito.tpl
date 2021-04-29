<?php $this->layout('main', ['argomento' => 'Login fallito', 'rootPathRef' => '../' ]) ?>

<div>
    <p>Login fallito per <mark><?= $codice ?></mark></p>
    <button class="btn"><a href="../login/index.php">Torna indietro</a></button>
</div>
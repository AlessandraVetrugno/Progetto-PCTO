<?php $this->layout('main', ['argomento' => 'Accedi al portale', 'rootPathRef' => '../' ]) ?>

<form action="../login/login.php" method="POST" class="signup" name="signup">
    <fieldset>
        <legend>Log In</legend>
        <label for="user">Il tuo codice</label>
        <input type="text" id="user" name="codice" placeholder="Username" required>
        <label for="password">La tua password</label>
        <input type="password" id="password" name="password" placeholder="password" required>
        <input type="submit" value="Accedi" />
    </fieldset>
</form>
<?php $this->layout('main', ['argomento' => 'Registrati al portale', 'rootPathRef' => '../' ]) ?>

<form action="../signup/signup.php" method="POST"
      onsubmit="return verificaCredenziali()"
      class="signup" name="signup">
    <fieldset>
        <legend>Sign Up</legend>
        <label for="user">Il tuo username</label>
        <input type="text" id="user" name="username" placeholder="Username" required>
        <label for="password">La tua password</label>
        <input type="password" id="password" name="password" placeholder="password" required>
        <label for="check-password">Conferma la password</label>
        <input type="password" id="check-password" name="check-password" placeholder="password" required>
        <input type="submit" value="Registrati" />
    </fieldset>
</form>

<script src="../signup/script.js"></script>
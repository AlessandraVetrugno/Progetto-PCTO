<!DOCTYPE html>
<html lang="it">
<head>
    <meta charset="UTF-8">
    <title>Prenotazioni</title>

    <!-- mini.css framework -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/mini.css/3.0.1/mini-default.min.css">
    <!-- Scritti da me -->
    <link rel="stylesheet"
          href=<?php if (!isset($rootPathRef)) $rootPathRef = ""; echo $rootPathRef."assets/styles/main.css"; ?> >
</head>
<body>
    <header>
        <?php if(isset($_SESSION['username'])): ?>
            Ciao <?= $_SESSION['username'] ?> - <a href="../logout/logout.php"> Logout </a>
        <?php endif; ?>
    </header>
    <h1 class="titolo"><?= $argomento ?></h1>
    <?= $this->section('content') ?>

</body>
</html>
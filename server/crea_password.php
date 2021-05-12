<?php
//echo password_hash('GinoBartali',PASSWORD_DEFAULT);
//GinoBartali
//ADMIN_federico
//ADMIN_nizar
//AlbertoAngelo
//echo $codice = strtoupper(uniqid());
include_once 'config.php';

$stmt = $pdo->query('SELECT CURDATE() FROM test');
$stmt = $stmt->fetch(PDO::FETCH_ASSOC);
echo 'data'. ' '. $stmt['CURDATE()'];




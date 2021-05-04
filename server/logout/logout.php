<?php

include_once "../config.php";

// distrugge il file con le informazioni di sessione
session_destroy();
// distrugge eventuali informazioni in memoria RAM
$_SESSION = array();

<?php

session_start();
function pdo(): PDO
{
    static $pdo;
    $dbname = 'sofia';
    $username = 'root';
    $password = '';
    $host = 'localhost';
    if (!$pdo) {
        $pdo = new PDO(
        "mysql:dbname=$dbname;host=$host",
        $username,
        $password
        );
    }
    return $pdo;
}

function flash(?string $message = null)
{
    if ($message) {
        $_SESSION['flash'] = $message;
    } else {
        if (!empty($_SESSION['flash'])) { ?>
          <div class="alert alert-danger mb-3">
              <?=$_SESSION['flash']?>
          </div>
        <?php }
        unset($_SESSION['flash']);
    }
}

function check_auth(): bool
{
    return !!($_SESSION['user_id'] ?? false);
}
?>
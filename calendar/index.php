<?php
session_start();
require_once __DIR__.'/pdo.php';
$have_acc = 1;
$val = 'Зарегистрироваться';
$name = 'register';
$title = 'Регистрация пользователя';
$a = 'Уже есть аккаунт';
if(isset($_GET['have_acc']) && $_GET['have_acc'] == 1){
    $have_acc = 0;
    $val = 'Войти';
    $name = 'enter';
    $title = 'Вход пользователя';
    $a = 'Зарегистрироваться';
}
$_SESSION['user_id'] = '';
 ?>
<!DOCTYPE html>
 <html>
    <head>
         <meta charset="UTF-8">
         <title><?=$title?></title>
          <link rel="stylesheet" type="text/css" href="style/index.css">
    </head>
    <body>
        <h1><?=$title?></h1>
        <form method="POST" action="">
        <?php
         if ($val == 'Зарегистрироваться'){
            echo '<label for="name">Имя:</label><input type="text" id="name" name="name" require><br><br>';
         }else{
            flash();
         }
          ?>       
            <label for="login">Логин:</label>
            <input type="text" id="login" name="login" require><br><br>
            <label for="password">Пароль:</label>
            <input type="password" id="password" name="password" require><br><br>
            <button type="submit" name=<?=$name?>><?=$val?></button><br><br>
        </form>
        <a href="index.php?have_acc=<?=$have_acc?>"><?=$a?></a>
        <?php
        if (isset($_POST['register'])){
            $name = $_POST['name'];
            $login = $_POST['login'];
            $password = password_hash($_POST['password'], PASSWORD_DEFAULT);

            $sql = pdo()->prepare("INSERT INTO `users` (`name`, `login`, `password`) VALUES (:name, :login , :password)");
            $sql->execute([
                ':name' => $_POST['name'],
                ':login' => $_POST['login'],
                ':password' => password_hash($_POST['password'], PASSWORD_DEFAULT),
            ]);
            header("Location: index.php?have_acc=1");  
        }
        
        if (isset($_POST['enter'])){
            
            $sql = pdo()->prepare("SELECT `id`, `name`, `password` FROM `users` WHERE `login` = :login");
            $sql->execute([':login' => $_POST['login']]);
            if ($sql->rowCount() == 0) {
                flash('Неверный логин');
                header('Location: index.php?have_acc=1');
                die;
            }
            $user = $sql->fetch(PDO::FETCH_ASSOC);
            if (password_verify($_POST['password'], $user['password'])) {
                $_SESSION['user_id'] = $user['id'];
                header("Location: tasks.php");
            }else{
                flash('Пароль неверен');
                header('Location: index.php?have_acc=1');
            }
        }
        ?>
    </body>
 </html>
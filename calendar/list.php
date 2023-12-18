<?php
session_start();
require_once __DIR__.'/pdo.php';
date_default_timezone_set('Asia/Irkutsk');
if (check_auth()) {
  $sql = pdo()->prepare("SELECT `name` FROM `users` WHERE `id` = :id");
  $sql->execute(['id' => $_SESSION['user_id']]);
  $user = $sql->fetch(PDO::FETCH_ASSOC);
}
?>

<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Мои Задачи</title>
  <link rel="stylesheet" type="text/css" href="style/list.css">
</head>
<body>
  <?php
$stylebut = array('style="color: white;background-color:  rgb(158, 81, 184);border: 2px solid rgb(63, 18, 78);"', '', '', '', '');

$d = '';
if (isset($_POST['current'])){
  $sql = pdo()->prepare("SELECT * FROM `calendar` WHERE `user_id` = {$_SESSION['user_id']} and (CONCAT(`date`, ' ', `time`) + INTERVAL `duration` HOUR) > (NOW() + INTERVAL 5 HOUR) and `status` = 0;");
  $stylebut = array('', 'style="color: white;background-color:  rgb(158, 81, 184);border: 2px solid rgb(63, 18, 78);"', '', '', '');
} else if(isset($_POST['completed'])){
  $sql = pdo()->prepare("SELECT * FROM `calendar` WHERE `user_id` = {$_SESSION['user_id']} and `status` = 1;");
  $stylebut = array('', '', 'style="color: white;background-color:  rgb(158, 81, 184);border: 2px solid rgb(63, 18, 78);"', '', '');
}else if (isset($_POST['overdue'])){
  $sql = pdo()->prepare("SELECT * FROM `calendar` WHERE `user_id` = {$_SESSION['user_id']} and (CONCAT(`date`, ' ', `time`) + INTERVAL `duration` HOUR) < (NOW() + INTERVAL 5 HOUR) and `status` = 0;");
  $stylebut = array('', '', '', 'style="color: white;background-color:  rgb(158, 81, 184);border: 2px solid rgb(63, 18, 78);"', '');
}else if (!empty($_POST['date']) && !isset($_POST['all'])){  
  $sql = pdo()->prepare("SELECT * FROM `calendar` WHERE `user_id` = {$_SESSION['user_id']} and `date` = '{$_POST['date']}';");
  $stylebut = array('', '', '', '', 'style="color: white;background-color:  rgb(158, 81, 184);border: 2px solid rgb(63, 18, 78);"');
  $d = $_POST['date'];
}
else{
  $sql = pdo()->prepare("SELECT * FROM `calendar` WHERE `user_id` = {$_SESSION['user_id']};");
}

$_POST['date'] = '';
$sql->execute();
$data = $sql->fetchAll(PDO::FETCH_ASSOC);
  ?>
  <h1>Мои Задачи</h1>
  <p class='name'><?=$user['name']?></p>
  <a class='exit' href="index.php?have_acc=1">Выйти</a>
  <form method="POST" action="">
  <button type="submit" name="all" <?= $stylebut[0] ?>>Все</button>
  <button type="submit" name="current" <?= $stylebut[1] ?>>Текущие задачи</button>
  <button type="submit" name="completed" <?= $stylebut[2] ?>>Выполненные задачи</button>
  <button type="submit" name="overdue" <?= $stylebut[3] ?>>Просроченные задачи</button>
  <label <?= $stylebut[4] ?>>На конкретную дату:<input type="date" name="date" onchange="this.form.submit()" value="<?= $d?>"></label>
  </form>
  <?php
  echo '<table><tr>';
  $lala = ["Статус", "Тема", "Тип", "Место", "Дата и время", "Комментарий"];
  foreach($lala as $th){
    echo "<th>$th</th>";
  }
  echo '</tr>';
  foreach($data as $datum){
    echo '<tr>';
    if ($datum['status'] == 1){
      echo "<td>Выполнена</td>";
    }else{
      echo "<td>Нет</td>";
    }
    $time = substr($datum['time'], 0, 5);
    echo "<td><a href='tasks.php?id={$datum['id']}'>{$datum['subject']}</a></td><td>{$datum['type']}</td><td>{$datum['place']}</td><td>{$datum['date']} $time</td>";
    echo "<td>{$datum['comment']}</td></tr>";
  }
  echo '</table>';
  ?>
  <a href="tasks.php" class='change'>На страничку с добавлением задачи</a> 
</body>
</html>
<?php
session_start();
require_once __DIR__.'/pdo.php';

$status = "";
$user = null;

//$data = ["subject" => "", "type" => "", "place" => "", "date" => "", "time" => "", "duration" = "", "comment" => "",];
$data = [];

date_default_timezone_set('Asia/Irkutsk');
if (check_auth()) {
  $sql = pdo()->prepare("SELECT `name` FROM `users` WHERE `id` = :id");
  $sql->execute(['id' => $_SESSION['user_id']]);
  $user = $sql->fetch(PDO::FETCH_ASSOC);
}

if(isset($_GET['id']) && !empty($_GET['id'])){
  $id = $_GET['id'];

  $sql = pdo()->prepare("SELECT * FROM calendar WHERE id = :id");
  $sql->execute([
    ':id' => (int)$_GET['id']
  ]);
  $data = $sql->fetchAll(PDO::FETCH_ASSOC)[0]; 
  $status = (int)$data['status'];
}

if (isset($_POST['but1'])){
  $sql = pdo()->prepare(
    'INSERT INTO calendar (user_id, status, subject, type, place, date, time, duration, comment)
    VALUES (:user_id, :status,:subject,:type,:place,:date,:time,:duration,:comment)'
    );

  $sql->execute([
    ':user_id' => $_SESSION['user_id'],
    ':status' => 0,
    ':subject' => $_POST['subject'],
    ':type' => $_POST['type'],
    ':place' => $_POST['place'],
    ':date' => $_POST['date'],
    ':time' => $_POST['time'],
    ':duration' => (int)$_POST['duration'],
    ':comment' => $_POST['comment']
  ]);

  header('Location: tasks.php');
}

if (isset($_POST['but2'])){
  $sql = pdo()->prepare(
    'UPDATE calendar SET `status`=:status,`subject`=:subject,`type`=:type,`place`=:place,
    `date`=:date,`time`=:time,`duration`=:duration,`comment`=:comment WHERE `id` = :id'
    );

  $sql->execute([
    ':id' => (int)$_GET['id'],
    ':status' => (int)$_POST['status'],
    ':subject' => $_POST['subject'],
    ':type' => $_POST['type'],
    ':place' => $_POST['place'],
    ':date' => $_POST['date'],
    ':time' => $_POST['time'],
    ':duration' => (int)$_POST['duration'],
    ':comment' => $_POST['comment']
  ]);

  header("Location: list.php");  
}
?>

<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Мой Календарь</title>
  <link rel="stylesheet" type="text/css" href="style/tasks.css">
</head>
<body>
  <?php 
  if ($status !== ""){
    echo "<h1>Изменить задачу</h1>";
  }else{
    echo "<h1>Новая задача</h1>";
  }
  ?>
  <p class='name'><?=$user['name']?></p>
  <a class='exit' href="index.php?have_acc=1">Выйти</a>
  <div class="global">
  <br>
  <form method="POST" action="">
    <label>Тема:</label><br>
    <input type="text" name="subject" value = "<?= $data['subject']?>">
    <br>

    <br>
    <label>Тип:</label><br>
    <select name="type">
      <option value="Встреча" <?php if ($data['type'] == "Встреча"){echo 'selected';}?>>Встреча</option>
      <option value="Звонок" <?php if ($data['type'] == "Звонок"){echo 'selected';}?>>Звонок</option>
      <option value="Совещание" <?php if ($data['type'] == "Совещание"){echo 'selected';}?>>Совещание</option>
      <option value="Дело" <?php if ($data['type'] == "Дело"){echo 'selected';}?>>Дело</option>
    </select>
    <br>

    <br>
    <label>Место:</label><br>
    <input type="text" name="place" value="<?= $data['place']?>">
    <br>

    <br>
    <label>Дата и время:</label><br>
    <input type="date" name="date" required value="<?= $data['date']?>">
    <input type="time" name="time" required value="<?= $data['time'];?>">
    <br>

    <br>
    <label>Длительность:</label><br>
    <select name="duration">
      <option value="1" <?php if ($data['duration'] == "1"){echo 'selected';}?>>1 час</option>
      <option value="3" <?php if ($data['duration'] == "3"){echo 'selected';}?>>3 часа</option>
      <option value="5" <?php if ($data['duration'] == "5"){echo 'selected';}?>>5 часа</option>
      <option value="7" <?php if ($data['duration'] == "7"){echo 'selected';}?>>7 часов</option>
    </select>
    <br>

    <br>
    <label>Комментарий:</label><br>
    <textarea rows="5" cols="46" name="comment" required><?= $data['comment']?></textarea>
    <br>

    <?php 
    if ($status === 0){
      echo '<br><label>Статус "выполнена"  <input type="checkbox" name="status" value="1"></label><br>';
    }else if ($status === 1){
      echo '<br><label>Статус "выполнена"  <input type="checkbox" name="status" value="1" checked></label><br>';
    }
    ?>
    <br>
    <?php 
    if ($status !== ""){
      echo '<button type="submit" name="but2">Изменить</button>';
    }else{
      echo '<button type="submit" name="but1">Добавить</button>';
    }
    ?>
  </form>
  </div>
  <a href="list.php">На страничку со списком задач</a> 
</body>
</html>
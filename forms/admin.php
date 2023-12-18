<html>
<head>
  <meta charset="UTF-8">
  <title>Админ</title>
  <link rel="stylesheet" href="css/admin.css">
</head>
<body>
  <h1>Админ</h1>
  <h2>Отправленные заявки :</h2>
  <?php
  echo '<div class="list"><form method="POST" action="">';
  foreach (glob('users/*.txt') as $filename) {
    $contents = file_get_contents($filename);
    $name = substr($contents, 0, strpos($contents, "\nФ"));
    $d = substr($contents, strpos($contents, "\nФ"));
    $lastname = substr($d, 0, strpos($d, "\nЭ"));
    echo "<br><input type='checkbox' name='users[]' value='$filename'>$name - ";
    echo $lastname . '<br>';
  }
  echo '<br><button type="submit" name="send" class="sub_buttn">Удалить</button></form></div>';
  if (isset($_POST['send'])){
    $aDoor = $_POST['users'];  
    $len = count($aDoor);
    foreach($aDoor as $file){
      unlink($file);  
    }
    header("Location: admin.php");
  }
  ?>
  <a href="index.php">Регистрация заявки</a><br>
</body>
</html>
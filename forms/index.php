<html>
<head>
  <meta charset="UTF-8">
  <title>Регистрация на конференцию</title>
  <link rel="stylesheet" href="css/style.css">
</head>
<body>
  <h1>Регистрация на конференцию</h1>
  <div class="global">
  <br>
  <form method="POST" action="">
    <label>Имя</label><br>
    <input type="text" name="name" required>
    <br>

    <br>
    <label>Фамилия</label><br>
    <input type="text" name="lastname" required> 
    <br>

    <br>
    <label>Электронная почта</label><br>
    <input type="email" name="email" required>
    <br>

    <br>
    <label>Телефон</label><br>
    <input type="tel" name="tel" required>
    <br>

    <br>
    <label>Интересующая тематика конференции</label><br>
    <select name="topic">
      <option value="Бизнес">Бизнес</option>
      <option value="Технологии">Технологии</option>
      <option value="Реклама и Маркетинг">Реклама и Маркетинг</option>
    </select>
    <br>

    <br>
    <label>Предпочитаемый метод оплаты</label><br>
    <select name="payment">
      <option value="WebMoney">WebMoney</option>
      <option value="Яндекс.Деньги">Яндекс.Деньги</option>
      <option value="PayPal">PayPal</option>
      <option value="кредитная карта">Кредитная карта</option>
    </select>
    <br>

    <br>
    <label>Желаете получать рассылку о конференции? </label>
    <input type="checkbox" name="mailing" value="Yes" checked>
    <br>

    <br>
    <button type="submit" name="send" class="sub_buttn">Отправить</button>
  </form>
  </div>
  <a href="admin.php">Админ</a>
    <?php
      $count = 0;
      $sending = false;
      if (!empty($_POST['name']) and isset($_POST['send'])) { 
        foreach (glob('users/*.txt') as $filename) {
          $count += 1;
        }
          $str = 'Имя: ' . $_POST['name'] . "\nФамилия: " . $_POST['lastname'] . "\nЭлектронный адрес: "
          . $_POST['email'] . "\nТелефон: " . $_POST['tel'] . "\nТематика конференции: " . $_POST['topic']
            . "\nМетод оплаты: " . $_POST['payment'] . "\nРассылка: ";
    
          if ($_POST['mailing'] == "Yes"){
            $str .= "Да";
          }else{
            $str .= "Нет";
          }
          file_put_contents("users/User$count.txt", $str);
          echo "<script>alert('Заявка принята!');<\script>";
          header("Location: check.php");  
      }
    ?>
</body>
</html>
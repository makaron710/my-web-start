<?php

  $userName = $_POST['userName'];
  $userEmail = $_POST['userEmail'];
  $userPhone = $_POST['userPhone'];
  

  // Load Composer's autoloader
  require 'php-mailer/Exception.php';
  require 'php-mailer/PHPMailer.php';
  require 'php-mailer/SMTP.php';

  // Instantiation and passing `true` enables exceptions
  $mail = new PHPMailer\PHPMailer\PHPMailer();

  try {
      //Server settings
      $mail->SMTPDebug = 0;                      // Enable verbose debug output
      $mail->isSMTP();                                            // Send using SMTP
      $mail->Host       = 'smtp.gmail.com';                    // Set the SMTP server to send through
      $mail->SMTPAuth   = true;                                   // Enable SMTP authentication
      $mail->Username   = 'sm710mh@gmail.com';                     // SMTP username
      $mail->Password   = 'ronogthkq56';                               // SMTP password
      $mail->SMTPSecure = 'ssl';         // Enable TLS encryption; `PHPMailer::ENCRYPTION_SMTPS` also accepted
      $mail->Port       = 465;                                    // TCP port to connect to

      //Recipients
      $mail->setFrom('sm710mh@gmail.com', 'Mailer');
      $mail->addAddress('joe@example.net');     // Add a recipient

      // Attachments
      $mail->addAttachment('/var/tmp/file.tar.gz');         // Add attachments
      $mail->addAttachment('/tmp/image.jpg', 'new.jpg');    // Optional name

      // Content
      $mail->isHTML(true);                                  // Set email format to HTML
      $mail->Subject = 'Новая заявка с сайта';
      $mail->Body    = "Имя пользователя: ${userName}<br>Телефон: ${userPhone}<br>Email: ${userEmail}";


      $mail->send();
      echo 'Письмо отправлено';
  } catch (Exception $e) {
      echo "Письмо не отправлено. Код ошибки: {$mail->ErrorInfo}";
  }

?>
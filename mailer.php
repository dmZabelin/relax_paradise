<?php

/**
 * This example shows settings to use when sending via Google"s Gmail servers.
 * This uses traditional id & password authentication - look at the gmail_xoauth.phps
 * example to see how to use XOAUTH2.
 * The IMAP section shows how to save this message to the "Sent Mail" folder using IMAP commands.
 */

//Import PHPMailer classes into the global namespace
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

require "PHPMailer/src/Exception.php";
require "PHPMailer/src/PHPMailer.php";
require "PHPMailer/src/SMTP.php";

//SMTP needs accurate times, and the PHP time zone MUST be set
//This should be done in your php.ini, but this is how to do it if you don"t have access to that
date_default_timezone_set("Etc/UTC");

//Create a new PHPMailer instance
$mail = new PHPMailer();

$mail->CharSet = "utf-8";

$refferer = getenv("HTTP_REFERER");
$date=date("d.m.y");
$time=date("H:i");

$name = htmlspecialchars($_POST["name"]);
$tel = htmlspecialchars($_POST["tel"]);

//Tell PHPMailer to use SMTP
$mail->isSMTP();
//Enable SMTP debugging
//SMTP::DEBUG_OFF = off (for production use)
//SMTP::DEBUG_CLIENT = client messages
//SMTP::DEBUG_SERVER = client and server messages
$mail->SMTPDebug = SMTP::DEBUG_SERVER;
//Set the hostname of the mail server
$mail->Host = "mail.adm.tools";
//Set the SMTP port number - likely to be 25, 465 or 587
$mail->Port = 25;
//Whether to use SMTP authentication
$mail->SMTPAuth = true;
//Username to use for SMTP authentication
$mail->Username = "info@relax-paradise.com";
//Password to use for SMTP authentication
$mail->Password = "paradise_relax";
//Set who the message is to be sent from
$mail->setFrom("info@relax-paradise.com", "Relax Paradise");
//Set an alternative reply-to address
$mail->addReplyTo("info@dmzabelin.online", "");
//Set who the message is to be sent to
$mail->addAddress("relax.paradise.info@gmail.com", "");
//Set the subject line
$mail->Subject = "Администратору сайта";

//Read an HTML message body from an external file, convert referenced images to embedded,
//convert HTML into a basic plain-text alternative body
$mail->msgHTML(file_get_contents("contents.html"), __DIR__);
//Replace the plain text body with one created manually

$mail->Body    = "
<br>". $date . " | " . $time ."<br>
Контактные данные клиента:<br><br>
Имя: ". $name ."<br>
Телефон:". $tel ."<br>
Источник (ссылка): ". $refferer ."
";
$mail->AltBody = "";

//send the message, check for errors
if (!$mail->send()) {
    echo "Mailer Error: " . $mail->ErrorInfo;
} else {
    echo "Message sent!";
}
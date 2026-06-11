<?php
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Location: ../contact.html');
    exit;
}

$name = trim($_POST['name'] ?? '');
$email = trim($_POST['email'] ?? '');
$subject = trim($_POST['subject'] ?? 'Portfolio inquiry');
$message = trim($_POST['message'] ?? '');

$errors = [];
if ($name === '') $errors[] = 'Name is required.';
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) $errors[] = 'A valid email is required.';
if ($message === '') $errors[] = 'Message is required.';

if ($errors) {
    echo '<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8" /><meta name="viewport" content="width=device-width, initial-scale=1.0" /><title>Contact Error</title><link rel="stylesheet" href="../css/style.css" /></head><body style="display:grid;place-items:center;min-height:100vh;">';
    echo '<main class="container"><section class="card"><h1>Unable to send message</h1><ul class="bullet-list">';
    foreach ($errors as $error) echo '<li>' . htmlspecialchars($error) . '</li>';
    echo '</ul><p><a class="button secondary" href="../contact.html">Return to contact form</a></p></section></main></body></html>';
    exit;
}

$to = 'angad.girap.3@gmail.com';
$headers = "From: $email\r\n" . "Reply-To: $email\r\n" . "X-Mailer: PHP/" . phpversion();
$body = "Name: $name\nEmail: $email\n\n$message";

mail($to, $subject, $body, $headers);

header('Location: ../contact.html?status=sent');
exit;

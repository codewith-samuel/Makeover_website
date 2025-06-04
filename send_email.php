<?php
// Enable error reporting for debugging (remove in production)
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Include PHPMailer classes
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'vendor/PHPMailer/src/Exception.php';
require 'vendor/PHPMailer/src/PHPMailer.php';
require 'vendor/PHPMailer/src/SMTP.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Sanitize and validate input
    $name = filter_var(trim($_POST["name"]), FILTER_SANITIZE_STRING);
    $email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
    $message = filter_var(trim($_POST["message"]), FILTER_SANITIZE_STRING);

    // Validate email
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        http_response_code(400);
        echo "Invalid email address.";
        exit;
    }

    // Check if all fields are filled
    if (empty($name) || empty($email) || empty($message)) {
        http_response_code(400);
        echo "Please fill in all required fields.";
        exit;
    }

    // Create a new PHPMailer instance
    $mail = new PHPMailer(true);

    try {
        // Server settings
        $mail->isSMTP();
        $mail->Host = 'smtp.gmail.com';
        $mail->SMTPAuth = true;
        $mail->Username = 'realestateandbuildingcompany@gmail.com'; // Your Gmail address
        $mail->Password = 'your-app-password'; // Replace with your Gmail App Password
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port = 587;

        // Recipients
        $mail->setFrom('realestateandbuildingcompany@gmail.com', 'Makeover Real Estate');
        $mail->addAddress('realestateandbuildingcompany@gmail.com'); // Send to company email
        $mail->addReplyTo($email, $name); // Reply to the user's email

        // Content
        $mail->isHTML(false);
        $mail->Subject = "New Contact Form Submission from $name";
        $mail->Body = "Name: $name\nEmail: $email\nMessage:\n$message\n";

        // Send email
        $mail->send();
        http_response_code(200);
        echo "Thank you! Your message has been sent successfully.";
    } catch (Exception $e) {
        http_response_code(500);
        echo "Sorry, there was an error sending your message: {$mail->ErrorInfo}";
    }
} else {
    http_response_code(403);
    echo "Invalid request method.";
}
?>
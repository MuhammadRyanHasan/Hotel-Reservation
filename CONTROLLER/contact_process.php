<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');


session_start();


$response = array(
    'success' => false,
    'message' => '',
    'regenerate_captcha' => false
);


if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    $response['message'] = 'Invalid request method.';
    echo json_encode($response);
    exit;
}


function sanitizeInput($data) {
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
}

function validateEmail($email) {
    return filter_var($email, FILTER_VALIDATE_EMAIL);
}


$name = isset($_POST['name']) ? sanitizeInput($_POST['name']) : '';
$email = isset($_POST['email']) ? sanitizeInput($_POST['email']) : '';
$subject = isset($_POST['subject']) ? sanitizeInput($_POST['subject']) : '';
$message = isset($_POST['message']) ? sanitizeInput($_POST['message']) : '';
$captcha_input = isset($_POST['captcha']) ? strtoupper(trim($_POST['captcha'])) : '';
$captcha_verification = isset($_POST['captcha_verification']) ? trim($_POST['captcha_verification']) : '';


$errors = array();


if (empty($name)) {
    $errors[] = 'Name is required.';
}

if (empty($email)) {
    $errors[] = 'Email is required.';
} elseif (!validateEmail($email)) {
    $errors[] = 'Please enter a valid email address.';
}

if (empty($subject)) {
    $errors[] = 'Subject is required.';
}

if (empty($message)) {
    $errors[] = 'Message is required.';
}


if (empty($captcha_input) || empty($captcha_verification)) {
    $errors[] = 'Please enter the captcha code.';
    $response['regenerate_captcha'] = true;
} elseif ($captcha_input !== $captcha_verification) {
    $errors[] = 'Captcha code is incorrect. Please try again.';
    $response['regenerate_captcha'] = true;
}


if (strlen($name) > 100) {
    $errors[] = 'Name must be less than 100 characters.';
}

if (strlen($message) > 2000) {
    $errors[] = 'Message must be less than 2000 characters.';
}




if (!empty($errors)) {
    $response['message'] = implode(' ', $errors);
    echo json_encode($response);
    exit;
}


try {
    
    
    
    $to = 'abrarulfarhan8@gmail.com'; 
    $email_subject = 'New Contact Form Submission - ' . $subject;
    $email_body = "
    New contact form submission from the hotel website:
    
    Name: $name
    Email: $email
    Subject: $subject
    
    Message:
    $message
    
    Submitted on: " . date('Y-m-d H:i:s') . "
    IP Address: " . $_SERVER['REMOTE_ADDR'] . "
    ";
    
    $headers = "From: $email\r\n";
    $headers .= "Reply-To: $email\r\n";
    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
    
    
     mail($to, $email_subject, $email_body, $headers);
    
    
    
 
    $response['success'] = true;
    $response['message'] = 'Thank you for contacting us! We have received your message and will get back to you within 24 hours.';
    
} catch (Exception $e) {
   
    $response['message'] = 'Sorry, there was an error processing your request. Please try again later.';
    
    
   
}


echo json_encode($response);


?>
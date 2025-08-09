<?php
session_start(); // Temporary server-side storage

// Server-side validation
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = trim($_POST['name']);
    $email = trim($_POST['email']);
    $password = trim($_POST['password']);

    $errors = [];

    if (empty($name)) $errors[] = "Name is required.";
    if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) $errors[] = "Valid email is required.";
    if (empty($password) || strlen($password) < 6) $errors[] = "Password must be at least 6 characters.";

    if (!empty($errors)) {
        foreach ($errors as $err) {
            echo "<p style='color:red;'>$err</p>";
        }
        echo "<p><a href='javascript:history.back()'>Go Back</a></p>";
    } else {
        // Store in session (temporary storage)
        $_SESSION['form_data'] = [
            'name' => $name,
            'email' => $email
        ];

        echo "<h2>Form Submitted Successfully!</h2>";
        echo "<p>Name: " . htmlspecialchars($name) . "</p>";
        echo "<p>Email: " . htmlspecialchars($email) . "</p>";
    }
}
?>

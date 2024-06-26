<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST['name'];
    $email = $_POST['email'];
    $subject = $_POST['subject'];
    $message = $_POST['message'];

    $to = 'nkservivac@gmail.com';
    $headers = "From: $email";
    $body = "Nombre: $name\n\nCorreo electrónico: $email\n\nAsunto: $subject\n\nMensaje:\n$message";

    if (mail($to, $subject, $body, $headers)) {
        echo json_encode(array('success' => true, 'message' => 'El mensaje ha sido enviado.'));
    } else {
        echo json_encode(array('success' => false, 'message' => 'Error al enviar el mensaje. Por favor, inténtalo de nuevo.'));
    }
}
?>

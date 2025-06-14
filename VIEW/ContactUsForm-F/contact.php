<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Contact Us - Red Esion Hotel</title>
    <link rel="stylesheet" href="../../ASSET/CSS/ContactUsForm-F/style.css">
</head>
<body>
    <header>
        <h1>Rad Esion Hotel</h1>
        <nav>
            
            <a href="contact.html" class="active">Contact Us</a>
        </nav>
    </header>

    <main>
        <section id="contact-form " >
            <h2>Contact Us</h2>
            <p>Have a question or need assistance? Please fill out the form below.</p>
            
<?php if (isset($_GET['success'])): ?>
    <p class="success-message">Your inquiry has been sent successfully!</p>
<?php elseif (isset($_GET['error'])): ?>
    <p class="error-message">There was an error sending your inquiry. Please try again.</p>
<?php endif; ?>
            <form id="contactForm" method="post" action="../../CONTROLLER/contact_process.php">
                <div class="form-group">
                    <label for="name">Name:</label>
                    <input type="text" id="name" name="name" required>
                </div>
                <div class="form-group">
                    <label for="email">Email:</label>
                    <input type="email" id="email" name="email" required>
                </div>
                <div class="form-group">
                    <label for="phone">Phone (Optional):</label>
                    <input type="tel" id="phone" name="phone">
                </div>
                <div class="form-group">
                    <label for="subject">Subject:</label>
                    <input type="text" id="subject" name="subject" required>
                </div>
                <div class="form-group">
                    <label for="message">Message:</label>
                    <textarea id="message" name="message" rows="5" required></textarea>
                </div>

                <div class="form-group">
                    <label for="captcha">Captcha:</label>
                    <div class="captcha-container">
                        <span id="captchaText"></span>
                        <input type="text" id="captchaInput" name="captcha" placeholder="Enter Captcha" required>
                        <button type="button" id="refreshCaptcha">Refresh</button>
                    </div>
                    <p id="captchaError" class="error-message"></p>
                </div>

                <button type="submit">Submit Inquiry</button>
                <p id="submissionMessage" class="success-message"></p>
            </form>
        </section>

        <section id="submission-confirmation" class="hidden">
            <h2>Thank You!</h2>
            <p>Your inquiry has been submitted successfully. We will get back to you as soon as possible.</p>
            <p>A confirmation email has been sent to your provided email address.</p>
            <button id="backToContact">Go Back to Contact Form</button>
        </section>
    </main>

    <footer>
        <p>&copy; 2025 Rad Esion. All rights reserved.</p>
    </footer>

    <script src="../../ASSET/JS/ContactUsForm-F/script.js"></script>
</body>
</html>
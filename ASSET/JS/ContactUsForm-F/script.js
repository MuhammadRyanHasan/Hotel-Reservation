document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    const submissionConfirmation = document.getElementById('submission-confirmation');
    const submissionMessage = document.getElementById('submissionMessage');
    const backToContactButton = document.getElementById('backToContact');

    const captchaTextElement = document.getElementById('captchaText');
    const captchaInput = document.getElementById('captchaInput');
    const refreshCaptchaButton = document.getElementById('refreshCaptcha');
    const captchaError = document.getElementById('captchaError');

    let generatedCaptcha = '';

    function generateCaptcha() {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let captcha = '';
        for (let i = 0; i < 6; i++) {
            captcha += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return captcha;
    }

    function displayCaptcha() {
        generatedCaptcha = generateCaptcha();
        captchaTextElement.textContent = generatedCaptcha;
    }

    function validateCaptcha() {
        if (captchaInput.value === generatedCaptcha) {
            captchaError.textContent = '';
            return true;
        } else {
            captchaError.textContent = 'Incorrect captcha. Please try again.';
            return false;
        }
    }

    displayCaptcha(); 

    refreshCaptchaButton.addEventListener('click', displayCaptcha);

    contactForm.addEventListener('submit', function(event) {
        event.preventDefault(); 

        if (validateCaptcha()) {
            
            console.log('Form submitted!');
            console.log('Name:', document.getElementById('name').value);
            console.log('Email:', document.getElementById('email').value);
            console.log('Phone:', document.getElementById('phone').value);
            console.log('Subject:', document.getElementById('subject').value);
            console.log('Message:', document.getElementById('message').value);

            
            contactForm.classList.add('hidden');
            submissionConfirmation.classList.remove('hidden');
            submissionMessage.textContent = 'Your inquiry has been submitted successfully. A confirmation email has been sent.'; // Basic client-side message

            
        }
    });

    backToContactButton.addEventListener('click', function() {
        submissionConfirmation.classList.add('hidden');
        contactForm.classList.remove('hidden');
        contactForm.reset(); 
        displayCaptcha(); 
    });
});
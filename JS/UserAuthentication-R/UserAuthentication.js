function validateForgetPasswordForm() {
    let email = document.getElementById("email").value;
    if (email === "") {
        alert("Please enter your email.");
        return false;
    }
    return true;
}

function validateResetPasswordForm() {
    let authCode = document.getElementById("authCode").value;
    let newPassword = document.getElementById("newPassword").value;
    let confirmPassword = document.getElementById("confirmPassword").value;

    if (authCode === "" || newPassword === "" || confirmPassword === "") {
        alert("Please fill out all fields.");
        return false;
    }
    if (newPassword !== confirmPassword) {
        alert("New password and confirm password do not match.");
        return false;
    }
    return true;
}

function validateLoginForm() {
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    if (email === "" || password === "") {
        alert("Please fill out both fields.");
        return false;
    }
    return true;
}

function validateSignupForm() {
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    if (email === "" || password === "") {
        alert("Please fill out both fields.");
        return false;
    }
    return true;
}

function validateVerificationForm() {
    let verificationCode = document.getElementById("verificationCode").value;

    if (verificationCode === "") {
        alert("Please enter the verification code.");
        return false;
    }
    return true;
}

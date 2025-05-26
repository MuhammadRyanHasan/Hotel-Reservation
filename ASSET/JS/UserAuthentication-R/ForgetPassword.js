function checkPasswordsMatch() {
    let password = document.getElementById('upassword').value;
    let confirmPassword = document.getElementById('cpassword').value;
    if (password !== confirmPassword) {
        alert("Error: Passwords do not match!");
        return false;
    }
    return true;
}

function validatePasswordRules(password) {
    let hasUpper = false;
    let hasLower = false;
    let hasNumber = false;
    let hasSpecial = false;
    let specialChars = "!@#$%^&*()_+-=[]{}|;':\",./<>?\\";

    if (password.length < 8) {
        alert("Error: Password must be at least 8 characters long!");
        return false;
    }

    for (let i = 0; i < password.length; i++) {
        let char = password.charAt(i);
        let charCode = password.charCodeAt(i);

        if (charCode >= 65 && charCode <= 90) 
            {hasUpper = true;}
        else if (charCode >= 97 && charCode <= 122) 
            {hasLower = true;}
        else if (charCode >= 48 && charCode <= 57)
            {hasNumber = true;}
        else {
            for (let j = 0; j < specialChars.length; j++) {
                if (char === specialChars.charAt(j)) 
                    {hasSpecial = true;break;}
            }
        }
    }
    if (!hasUpper) {
        alert("Error: Password must contain at least one uppercase letter!");
        return false;
    }
    if (!hasLower) {
        alert("Error: Password must contain at least one lowercase letter!");
        return false;
    }
    if (!hasNumber) {
        alert("Error: Password must contain at least one number!");
        return false;
    }
    if (!hasSpecial) {
        alert("Error: Password must contain at least one special character!");
        return false;
    }
    return true;
}

function validateForm() {
    let password = document.getElementById('upassword').value;
    if (!checkPasswordsMatch()) {
        return false;
    }
    if (!validatePasswordRules(password)) {
        return false;
    }
    alert("Password reset successful!");
    return true;
}
document.getElementById('forgot-pass').onsubmit = validateForm;
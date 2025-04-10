        function validateVerificationForm() 
        {
            var verificationCode = document.getElementById("verificationCode").value;
            
            if (verificationCode == "") {
                alert("Please enter the verification code.");
                return false;
            }
            return true;
        }